import React, { useState, useEffect } from "react";
import Content from "../Content2";
import "../App.css";

const Dictionary = () => {
  const [inpWord, setInpWord] = useState("");
  const [displayedWord, setDisplayedWord] = useState("");
  const [wordData, setWordData] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [randomWord, setRandomWord] = useState(null);
  const [IELTS, setIELTSData] = useState([]);
  const [TOEFL, setTOEFLData] = useState([]);
  const [userSearchHistory, setUserSearchHistory] = useState([]);
  const userId = localStorage.getItem("userId");

  // Today sentence added
  useEffect(() => {
    fetch("http://localhost:5000/randomWord")
      .then((response) => response.json())
      .then((data) => setRandomWord(data))
      .catch((error) => console.error("Error fetching random word:", error));
  }, []);

  useEffect(() => {
    // Fetch search history from the server when the component mounts
    fetchIELTS();
    fetchTOEFL();
    if (userId) {
      fetchFavorites(userId);
      fetchUserSearchHistory(userId);
    }
  }, [userId]);

  // autocomplete
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

  // search word
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

        // Add the searched word to the user's search history if logged in
        if (userId) {
          addToUserSearchHistory(userId, wordToSearch).then(() => {
            fetchUserSearchHistory(userId); // Fetch updated history
          });
        }
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

  // Fetch user search history
  const fetchUserSearchHistory = (userId) => {
    fetch(`http://localhost:5000/api/userSearchHistory/${userId}`)
      .then((response) => response.json())
      .then((data) => setUserSearchHistory(data.map((item) => item.term)))
      .catch((error) =>
        console.error("Error fetching user's search history:", error)
      );
  };

  // Function to add word to user search table
  const addToUserSearchHistory = (userId, term) => {
    return fetch("http://localhost:5000/api/userSearchHistory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, term }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.success) {
          console.error(data.message);
        }
      })
      .catch((error) => {
        console.error("Error adding word to user search history:", error);
      });
  };

  // Clear the search history when on click
  const handleClearUserSearchHistory = () => {
    fetch(`http://localhost:5000/api/userSearchHistory/${userId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setUserSearchHistory([]); // Clear local state
          console.log("User search history cleared.");
        }
      })
      .catch((error) =>
        console.error("Error clearing user's search history:", error)
      );
  };

  // fetch the actual user ID from credential, then the favorite words are save in each userId
  const handleAddToFavorites = () => {
    if (!userId) {
      console.error("User ID is not set. Please log in.");
      return;
    }
    if (!wordData) {
      alert("No word to add to favorites.");
      return;
    }
    const wordToAdd = wordData.lemma;

    fetch(`http://localhost:5000/api/favorite/${wordToAdd}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: userId }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to mark word as favorite.");
      }
      return response.json();
    })
    .then(data => {
      if (data.success) {
        alert(`"${wordToAdd}" added to favorites.`);
        setFavorites(prevFavorites => [...prevFavorites, wordToAdd]);
      } else {
        alert(data.message);
      }
    })
    .catch(error => {
      console.error("Error marking word as favorite:", error);
    });
  };

  
  // getting favorite words in the database
  const fetchFavorites = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/favorites?userId=${id}`
      );
      const data = await response.json();
      setFavorites(data);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const isWordFavorited = (word) => {
    return favorites.includes(word);
  };
  
  // remove the words from favorite
  const handleRemoveFromFavorites = (wordToRemove) => {
    fetch(`http://localhost:5000/api/favorite/${wordToRemove}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        setFavorites(favorites => favorites.filter(word => word !== wordToRemove));
        alert(`"${wordToRemove}" has been removed from favorites.`);
      } else {
        alert(data.message);
      }
    })
    .catch(error => {
      console.error('Error removing word from favorites:', error);
    });
  };

  // fetch the IETLS from dictionary ver2
  const fetchIELTS = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/IELTS");

      const data = await response.json();
      setIELTSData(data);
    } catch (error) {
      console.error("Error fetching IELTS:", error);
    }
  };

  // fetch the TOEFL from dictionary ver2
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
        isLoading={isLoading}
        handleSearchWord={handleSearchWord}
        handleAddToFavorites={handleAddToFavorites}
        suggestions={suggestions}
        onSelectSuggestion={onSelectSuggestion}
        IELTS={IELTS}
        TOEFL={TOEFL}
        favorites={favorites}
        randomWord={randomWord}
        handleRemoveFromFavorites={handleRemoveFromFavorites}
        userSearchHistory={userSearchHistory}
        handleClearUserSearchHistory={handleClearUserSearchHistory}
        isWordFavorited={isWordFavorited}
      />
    </div>
  );
};

export default Dictionary;
