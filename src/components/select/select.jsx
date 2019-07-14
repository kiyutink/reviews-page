import React, { useState } from "react";
import classNames from "classnames";
import "./select.scss";
import PropTypes from "prop-types";

export const SelectContext = React.createContext({
  setCurrentItem: () => {},
  currentItem: null
});

export const Select = ({
  children,
  onChange,
  defaultText,
  className,
  defaultValue,
  isActive,
  title
}) => {
  const [currentItem, setCurrentItem] = useState(defaultValue);
  const [areItemsVisible, setItemsVisiblity] = useState(false);
  const setItem = item => {
    setCurrentItem(item);
    if (onChange) {
      onChange(item);
    }
  };
  const valueTextMapping = {};
  React.Children.forEach(children, c => {
    valueTextMapping[c.props.value] = c.props.children;
  });

  return (
    <div
      className={classNames(
        "select",
        !isActive && "select--inactive",
        className
      )}
      onClick={() => {
        if (isActive) {
          setItemsVisiblity(!areItemsVisible);
        }
      }}
      title={title}
    >
      {
        <div
          className={classNames(
            "select__text",
            !isActive && "select__text--inactive"
          )}
        >
          {currentItem === null ? defaultText : valueTextMapping[currentItem]}
        </div>
      }
      {areItemsVisible && (
        <div className="select__items">
          <SelectContext.Provider
            value={{
              setItem,
              currentItem
            }}
          >
            {children}
          </SelectContext.Provider>
        </div>
      )}
    </div>
  );
};

Select.propTypes = {
  children: PropTypes.node.isRequired,
  onChange: PropTypes.func,
  defaultText: PropTypes.string.isRequired,
  className: PropTypes.string,
  defaultValue: PropTypes.string,
  isActive: PropTypes.bool,
  title: PropTypes.string
};

Select.defaultProps = {
  isActive: true
};
