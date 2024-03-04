import React, { useState } from "react";
import './Custom.css';

const Radios = ({ options, selectedOption, onOptionChange }) => {

  return (
    <div  className="radioOptionsContainer">
      {options.map((option) => (
        <div key={option.value}>
          <input
            type="radio"
            id={option.value}
            name="dynamicRadio"
            value={option.value}
            checked={selectedOption === option.value}
            onChange={() => onOptionChange(option.value)}
          />
          <label htmlFor={option.value}>{option.label}</label>
        </div>
      ))}
    </div>
  );
};

export default Radios;
