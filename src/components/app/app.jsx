import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./app.scss";
import { Select } from "../select/select";
import { SelectItem } from "../select/selectItem";
import { StarsFilter } from "../starsFilter/starsFilter";
import { ReviewList } from "../reviewList/reviewList";
import { getHasMore } from "../../reducers/index";
import { Input } from "../input/input";

const mapStateToProps = state => ({
  hasMore: getHasMore(state)
});

const AppComponent = ({ hasMore }) => {
  const [showReviewsWithStars, setShowReviewsWithStars] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: true
  });
  const [groupBy, setGroupBy] = useState("day");
  const [sortOrder, setSortOrder] = useState("newestFirst");
  const [searchString, setSearchString] = useState("");

  return (
    <div className="app">
      <div className="app__controls">
        <div className="container">
          <div className="app__selects">
            <Select
              className="app__select"
              defaultText="Group by"
              defaultValue={groupBy}
              onChange={setGroupBy}
            >
              <SelectItem value="day">Group by day</SelectItem>
              <SelectItem value="week">Group by week</SelectItem>
              <SelectItem value="month">Group by month</SelectItem>
            </Select>
            <Select
              className="app__select"
              defaultText="Order by"
              defaultValue={sortOrder}
              onChange={val => {
                setSortOrder(val);
                window.scrollTo(0, 0);
              }}
              isActive={!hasMore}
              title={
                hasMore &&
                "You can't see oldest first before all the reviews are loaded"
              }
            >
              <SelectItem value="newestFirst">Newest First</SelectItem>
              <SelectItem value="oldestFirst">Oldest First</SelectItem>
            </Select>
            <Input
              className="app__input"
              value={searchString}
              onChange={setSearchString}
              placeholder="Search..."
            />
          </div>
          <div className="app__starsDescription">Filter by stars</div>
          <StarsFilter onChange={setShowReviewsWithStars} />
        </div>
      </div>
      <div className="container">
        <ReviewList
          showReviewsWithStars={showReviewsWithStars}
          groupBy={groupBy}
          searchString={searchString}
          oldestFirst={sortOrder === "oldestFirst"}
        />
      </div>
    </div>
  );
};

AppComponent.propTypes = {
  hasMore: PropTypes.bool.isRequired
};

export const App = connect(mapStateToProps)(AppComponent);
