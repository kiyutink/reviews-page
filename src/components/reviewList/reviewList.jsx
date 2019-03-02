import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getGroupedReviews,
  getHasMore,
  getLastPageFetched,
  getIsLoading
} from "../../reducers/index";
import { fetchReviews } from "../../actionCreators/reviewsActions";
import { ReviewGroup } from "../reviewGroup/reviewGroup";
import { Loader } from "../icons/loader";
import "./reviewList.scss";
import { fuzzySearch } from "../../helpers/fuzzySearch";
import defer from "lodash/defer";

const mapStateToProps = (state, ownProps) => ({
  reviewGroups: getGroupedReviews(state, ownProps.groupBy),
  hasMore: getHasMore(state),
  lastPageFetched: getLastPageFetched(state),
  isLoading: getIsLoading(state)
});

const mapDispatchToProps = {
  fetchReviews
};

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const formatDay = timestamp => {
  const date = new Date(timestamp);
  return `${date.getDate()} ${
    monthNames[date.getMonth()]
  } ${date.getFullYear()}`;
};

const getTitle = (group, groupedBy) => {
  switch (groupedBy) {
    case "day": {
      return formatDay(group.date);
    }
    case "week":
      return `${formatDay(group.start)} - ${formatDay(group.end)}`;
    case "month":
      return `${monthNames[group.month]} ${group.year}`;
  }
};

class ReviewList extends React.Component {
  static propTypes = {
    reviewGroups: PropTypes.arrayOf(PropTypes.object).isRequired,
    groupBy: PropTypes.string.isRequired,
    showReviewsWithStars: PropTypes.object.isRequired,
    fetchReviews: PropTypes.func.isRequired,
    lastPageFetched: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    hasMore: PropTypes.bool.isRequired,
    oldestFirst: PropTypes.bool.isRequired,
    searchString: PropTypes.string
  };

  monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  formatDay = timestamp => {
    const date = new Date(timestamp);
    return `${date.getDate()} ${
      this.monthNames[date.getMonth()]
    } ${date.getFullYear()}`;
  };

  getTitle = (group, groupedBy) => {
    switch (groupedBy) {
      case "day": {
        return this.formatDay(group.date);
      }
      case "week":
        return `${this.formatDay(group.start)} - ${this.formatDay(group.end)}`;
      case "month":
        return `${monthNames[group.month]} ${group.year}`;
    }
  };

  componentDidMount() {
    const { fetchReviews, lastPageFetched } = this.props;
    fetchReviews(lastPageFetched + 1).then(this.createObserver);
  }

  componentWillUnmount() {
    this.observer.unobserve(this.intersectionHook);
  }

  isHookInView = false;

  handleIntersect = entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        this.isHookInView = true;
      } else {
        this.isHookInView = false;
      }
    });

    this.loadMore();
  };

  loadMore = () => {
    const { fetchReviews, lastPageFetched, hasMore } = this.props;
    if (this.isHookInView && hasMore) {
      fetchReviews(lastPageFetched + 1).then(() => defer(this.loadMore));
    }
  };

  createObserver = () => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.01
    };

    this.observer = new IntersectionObserver(this.handleIntersect, options);
    this.observer.observe(this.intersectionHook);
  };

  search = (searchString, review) => {
    const title = review.title.toLowerCase();
    const content = review.content.toLowerCase();
    const productTitle = review.productTitle.toLowerCase();
    const string = searchString.toLowerCase();

    return (
      fuzzySearch(string, title) ||
      fuzzySearch(string, productTitle) ||
      content.indexOf(string) !== -1
    );
  };

  render() {
    const {
      reviewGroups,
      showReviewsWithStars,
      groupBy,
      isLoading,
      hasMore,
      oldestFirst,
      searchString
    } = this.props;
    let reviewsGrouped = reviewGroups;
    if (oldestFirst) {
      reviewsGrouped = reviewGroups.slice().reverse();
    }

    return (
      <div className="reviewList">
        {reviewsGrouped.map(group => {
          const reviewsInThisGroup = oldestFirst
            ? group.reviews.slice().reverse()
            : group.reviews;
          return (
            <ReviewGroup
              reviews={reviewsInThisGroup.filter(
                r =>
                  showReviewsWithStars[r.stars] && this.search(searchString, r)
              )}
              key={getTitle(group, groupBy)}
              title={getTitle(group, groupBy)}
            />
          );
        })}
        {hasMore ? (
          <div
            style={{ height: 1, transform: "translateY(-0px)" }}
            ref={el => (this.intersectionHook = el)}
          />
        ) : (
          <div className="reviewList__noMore">
            There&#39;s no other reviews :(
          </div>
        )}

        {isLoading && (
          <div className="reviewList__loader">
            <Loader />
          </div>
        )}
      </div>
    );
  }
}

ReviewList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewList);

export { ReviewList };
