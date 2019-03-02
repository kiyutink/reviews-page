import React from "react";
import PropTypes from "prop-types";
import "./reviewGroup.scss";
import { Review } from "../review/review";

export const ReviewGroup = ({ reviews, title }) =>
  !reviews.length ? null : (
    <div className="reviewGroup">
      <div className="reviewGroup__title">{title}</div>
      <div>
        {reviews.map(r => (
          <Review
            key={r.reviewId}
            title={r.title}
            content={r.content}
            productTitle={r.productTitle}
            dateCreated={r.reviewCreated}
            stars={r.stars}
          />
        ))}
      </div>
    </div>
  );

ReviewGroup.propTypes = {
  title: PropTypes.string.isRequired,
  reviews: PropTypes.arrayOf(PropTypes.object).isRequired
};
