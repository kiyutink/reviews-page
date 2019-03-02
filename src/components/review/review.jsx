import React from "react";
import PropTypes from "prop-types";
import "./review.scss";
import { Star } from "../icons/star";

export const Review = ({
  title,
  content,
  stars,
  dateCreated,
  productTitle
}) => (
  <div className="review">
    <div className="review__topRow">
      <div className="review__image" />
      <div className="review__date">
        {new Date(dateCreated).toLocaleDateString()}
      </div>
      <div className="review__stars">
        <Star />
        {stars}
      </div>
      <div className="review__productTitle">{productTitle}</div>
    </div>
    <div className="review__title">{title}</div>
    <div className="review__content">{content}</div>
  </div>
);

Review.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  stars: PropTypes.number.isRequired,
  dateCreated: PropTypes.number.isRequired,
  productTitle: PropTypes.string.isRequired
};
