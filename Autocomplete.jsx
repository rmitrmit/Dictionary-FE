import React, { useState } from 'react';
import './App.css';

const Autocomplete = ({ suggestions, value, onChange, onSelect }) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const handleInputChange = (event) => {
    const userInput = event.target.value;
    onChange(userInput);

    if (userInput.length >= 1) {
      setFilteredSuggestions(
        suggestions.filter(suggestion =>
          suggestion.toLowerCase().startsWith(userInput.toLowerCase())
        )
      );
    } else {
      setFilteredSuggestions([]); 
    }
  };

  const handleSuggestionClick = (suggestion) => {
    onSelect(suggestion); 
    setFilteredSuggestions([]);
  };

  // Toggle the active class based on whether there are filtered suggestions
  const dropdownClasses = `autocomplete-dropdown${filteredSuggestions.length ? ' active' : ''}`;

  return (
    <div className="autocomplete-wrapper">
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        className="autocomplete-input"
      />
      <ul className={dropdownClasses}>
        {filteredSuggestions.map((suggestion, index) => (
          <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Autocomplete;