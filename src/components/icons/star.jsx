import React from "react";
import PropTypes from "prop-types";

export const Star = ({ height, width, color }) => (
  <svg fill={color} height={height} width={width} viewBox="0 0 260 245">
    <path d="m55,237 74-228 74,228L9,96h240" />
  </svg>
);

Star.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  color: PropTypes.string
};

Star.defaultProps = {
  height: 16,
  width: 16,
  color: "lightslategrey"
};
