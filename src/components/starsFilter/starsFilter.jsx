import React, { useState } from "react";
import PropTypes from "prop-types";
import { Checkmark } from "../checkmark/checkmark";
import "./starsFilter.scss";

export const StarsFilter = ({ onChange }) => {
  const [chosenStars, setChosenStars] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: true
  });

  return (
    <div>
      {Object.keys(chosenStars).map(star => (
        <Checkmark
          className="starsFilter__checkmark"
          key={star}
          isChecked={chosenStars[star]}
          onClick={() => {
            const newChosenStars = {
              ...chosenStars,
              [star]: !chosenStars[star]
            };
            setChosenStars(newChosenStars);
            if (onChange) {
              onChange(newChosenStars);
            }
          }}
        >
          {star}
        </Checkmark>
      ))}
    </div>
  );
};

StarsFilter.propTypes = {
  onChange: PropTypes.func
};
