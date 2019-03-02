import React, { useContext } from "react";
import PropTypes from "prop-types";
import { SelectContext } from "./select";
import classNames from "classnames";
import "./selectItem.scss";

export const SelectItem = ({ children, value }) => {
  const { setItem, currentItem } = useContext(SelectContext);
  return (
    <div
      className={classNames(
        "selectItem",
        currentItem === value && "selectItem--active"
      )}
      onClick={() => setItem(value)}
    >
      {children}
    </div>
  );
};

SelectItem.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.string.isRequired
};
