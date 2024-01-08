import React, { useState, useEffect } from "react";
import Content from "./Content";
import "./App.css";

const Dictionary = () => {
  const [inpWord, setInpWord] = useState("");
  const [displayedWord, setDisplayedWord] = useState("");
  const [wordData, setWordData] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [IELTSData, setIELTSData] = useState([]);
  const [TOEFLData, setTOEFLData] = useState([]);

  useEffect(() => {
    // Fetch search history from the server when the component mounts
    fetchSearchHistory();
    fetchIELTS();
    fetchTOEFL();
  }, []);

  useEffect(() => {
    if (inpWord.length > 1) {
      fetch(`/autocomplete/${inpWord}`)
        .then((response) => response.json())
        .then((data) => {
          setSuggestions(data);
        })
        .catch((error) => {
          console.error("Error fetching suggestions:", error);
          setSuggestions([]);
        });
    } else {
      setSuggestions([]);
    }
  }, [inpWord]);

  const handleSearchWord = (wordToSearch) => {
    setIsLoading(true);
    setError("");
    setDisplayedWord(wordToSearch);

    fetch(`/search/${wordToSearch}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Word not found in the database.");
        }
        return response.json();
      })
      .then((data) => {
        setWordData(data);
        setIsLoading(false);
        // Add the searched word to the search history
        setSearchHistory((prevHistory) => [
          ...new Set([wordToSearch, ...prevHistory]),
        ]);
      })
      .catch((error) => {
        setWordData(null);
        setError(error.message);
        setIsLoading(false);
      });
  };

  const onSelectSuggestion = (suggestion) => {
    setInpWord(suggestion);
    handleSearchWord(suggestion);
  };

  const fetchSearchHistory = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/searchHistory");

      const data = await response.json();
      setSearchHistory(data);
    } catch (error) {
      console.error("Error fetching search history:", error);
    }
  };
  const fetchIELTS = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/IELTS");

      const data = await response.json();
      console.log("IELTS data:", data);
      setIELTSData(data);
    } catch (error) {
      console.error("Error fetching IELTS:", error);
    }
  };
  const fetchTOEFL = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/TOEFL");

      const data = await response.json();
      console.log("TOEFL data:", data);
      setTOEFLData(data);
    } catch (error) {
      console.error("Error fetching TOEFL:", error);
    }
  };

  return (
    <div>
      <Content
        inpWord={inpWord}
        setInpWord={setInpWord}
        displayedWord={displayedWord}
        wordData={wordData}
        error={error}
        isLoading={isLoading}
        handleSearchWord={handleSearchWord}
        suggestions={suggestions}
        onSelectSuggestion={onSelectSuggestion}
        searchHistory={searchHistory}
        TOEFL={TOEFLData}
        IELTS={IELTSData}
      />

      {/* Additional content or components can be added here */}
    </div>
  );
};

export default Dictionary;
