import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./input.scss";

export const Input = ({ onChange, value, className, placeholder }) => (
  <input
    className={classNames("input", className)}
    type="text"
    onChange={e => onChange(e.target.value)}
    value={value}
    placeholder={placeholder}
  />
);

Input.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  placeholder: PropTypes.string
};
