import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import "./checkmark.scss";

export const Checkmark = ({ isChecked, onClick, children, className }) => (
  <div className={classNames("checkmark", className)} onClick={onClick}>
    <div
      className={classNames(
        "checkmark__mark",
        isChecked && "checkmark__mark--checked"
      )}
    />
    {children && <div className="checkmark__label">{children}</div>}
  </div>
);

Checkmark.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node,
  className: PropTypes.string
};
