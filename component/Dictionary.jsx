import React, { useState, useEffect } from "react";
import Content from "../Content"; // Điều chỉnh đường dẫn đến file Content.jsx
import "../App.css";
const Dictionary = () => {
  const [inpWord, setInpWord] = useState("");
  const [displayedWord, setDisplayedWord] = useState("");
  const [wordData, setWordData] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [randomWord, setRandomWord] = useState(null);
  const [IELTS, setIELTSData] = useState([]);
  const [TOEFL, setTOEFLData] = useState([]);

  // Today sentence added
  useEffect(() => {
    fetch("http://localhost:5000/randomWord")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch random word.");
        }
        return response.json();
      })
      .then((data) => {
        setRandomWord(data);
      })
      .catch((error) => {
        console.error("Error fetching random word:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch search history from the server when the component mounts
    fetchSearchHistory();
    fetchIELTS();
    fetchTOEFL();
  }, []);

  // auto complete
  useEffect(() => {
    if (inpWord.length >= 1) {
      fetch(`http://localhost:5000/autocomplete/${inpWord}`)
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
  // search function
  const handleSearchWord = (wordToSearch) => {
    setIsLoading(true);
    setError("");
    setDisplayedWord(wordToSearch);

    fetch(`http://localhost:5000/search/${wordToSearch}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Word not found in the database.");
        }
        return response.json();
      })
      .then((data) => {
        setWordData(data);
        setIsLoading(false);

        // POST to guest search history
        fetch("http://localhost:5000/api/guestSearchHistory", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ term: wordToSearch }),
        });

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

  // guest history in the credential.db
  const fetchSearchHistory = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/guestSearchHistory"
      );
      const data = await response.json();

      // Map over the rows to get terms
      const terms = data.map((row) => row.term);

      setSearchHistory(terms);
    } catch (error) {
      console.error("Error fetching guest search history:", error);
    }
  };

  // Now the historyy search can be clear or delete for a clean website.
  const handleClearHistory = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/guestSearchHistory",
        {
          method: "DELETE",
        }
      );
      const data = await response.json();

      if (data.success) {
        setSearchHistory([]); // Clear the state after successful deletion
        alert("Search history cleared.");
      } else {
        alert("Failed to clear search history.");
      }
    } catch (error) {
      console.error("Error clearing guest search history:", error);
    }
  };

  //Ielts react tab
  const fetchIELTS = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/IELTS");

      const data = await response.json();
      setIELTSData(data);
    } catch (error) {
      console.error("Error fetching IELTS:", error);
    }
  };

  //TOEFL react tab
  const fetchTOEFL = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/TOEFL");

      const data = await response.json();
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
        randomWord={randomWord}
        isLoading={isLoading}
        handleSearchWord={handleSearchWord}
        suggestions={suggestions}
        onSelectSuggestion={onSelectSuggestion}
        searchHistory={searchHistory}
        IELTS={IELTS}
        TOEFL={TOEFL}
        handleClearHistory={handleClearHistory}
      />

      {/* Additional content or components can be added here */}
    </div>
  );
};

export default Dictionary;
