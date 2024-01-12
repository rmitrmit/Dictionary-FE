import React from "react";
import Autocomplete from "./Autocomplete";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css"; // tabs styles
import "react-tooltip/dist/react-tooltip.css"; // tooltip styles
import { useNavigate } from "react-router-dom";

const Content = ({
  inpWord,
  setInpWord,
  randomWord,
  wordData,
  error,
  isLoading,
  handleSearchWord,
  suggestions,
  onSelectSuggestion,
  TOEFL,
  IELTS,
  favorites,
  handleAddToFavorites,
  handleRemoveFromFavorites,
  userSearchHistory,
  handleClearUserSearchHistory,
  isWordFavorited
}) => {
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId');
  const username = localStorage.getItem('username');

  const blurResultDefinition = () => {
    var wordMeaning = document.getElementsByClassName("result-definition");
    var blurButton = document.getElementById("blurResultDefinitionButton");
    for (var i = 0; i < wordMeaning.length; i++) {
      if (wordMeaning[i].style.backgroundColor === "black") {
        wordMeaning[i].style.backgroundColor = "";
        blurButton.textContent = "Blur Definition";
      } else {
        blurButton.textContent = "Disable blur";
        wordMeaning[i].style.backgroundColor = "black";
      }
    }
  };
  const onSubmitSearch = (event) => {
    event.preventDefault();
    handleSearchWord(inpWord);
  };

  const handleClickHistory = (term) => {
    setInpWord(term);
    handleSearchWord(term);
  };

  const handleClickFavorites = (term) => {
    setInpWord(term);
    handleSearchWord(term);
  };

  const handleClickIELTS = (lemma) => {
    setInpWord(lemma); 
    handleSearchWord(lemma); 
  };
  const handleClickTOEFL = (lemma) => {
    setInpWord(lemma); 
    handleSearchWord(lemma);
  };
  
  const handleLogout = () => {
    // Xóa userId khỏi localStorage
    localStorage.removeItem("userId");
    // Xoá username khỏi localStorage
    localStorage.removeItem("username")
    // Thực hiện chuyển hướng đến trang đăng nhập
    navigate("/");
  };

  return (
    <div className="dictionary-app">
      <header className="header">
        <a href="/User" className="logo">
          <p>
            BITS <span>- English Dictionary</span>
          </p>
        </a>
        <span style={{ fontSize: '14px', marginRight: '-1000px' }}>{username}</span>
        <button className="au-button" onClick={handleLogout}>
        Logout 
        </button>
      </header>

      <form className="search-box" onSubmit={onSubmitSearch}>
        <Autocomplete
          suggestions={suggestions}
          value={inpWord} 
          onChange={(value) => setInpWord(value)}
          onSelect={onSelectSuggestion}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>
      {/* Display Main Tabs*/}
      <div className="cross-section">
        <div className="half-left-section">
          {/*Tabs */}
          <Tabs>
            <TabList className={"MainTabs"}>
              <Tab>Search History</Tab>
              <Tab>TOEFL</Tab>
              <Tab>IELTS</Tab>
              <Tab>Favorite</Tab>
            </TabList>

            <TabPanel>
              <div className="history-section">
                <div className="search-history-section">
                  <h2>User Search History</h2>
                  <button className="au-button" onClick={handleClearUserSearchHistory}>
                    Clear History
                  </button>
                  {userSearchHistory.length > 0 ? (
                    <ul>
                      {userSearchHistory.map((term, index) => (
                        <li key={index} onClick={() => handleClickHistory(term)}>
                          {term}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <ul style={{ padding: '1rem' }}>No search history found.</ul>
                  )}
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              {/* Display TOEFL */}
              {TOEFL && TOEFL.length > 0 && (
                <div className="search-history-section">
                  <h2>TOEFL</h2>
                  <ul>
                    {TOEFL.map((lemma, index) => (
                      <li key={index} onClick={() => handleClickTOEFL(lemma)}>
                        {lemma}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </TabPanel>
            <TabPanel>
              {/* Display IELTS */}
              {IELTS && IELTS.length > 0 && (
                <div className="search-history-section">
                  <h2>IELTS</h2>
                  <ul>
                    {IELTS.map((lemma, index) => (
                      <li key={index} onClick={() => handleClickIELTS(lemma)}>
                        {lemma}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </TabPanel>
            <TabPanel>
            <div className="favorites-section">
              <div className="search-history-section">
                <h2>Favorites</h2>
                {favorites.length > 0 ? (
                  <ul>
                    {favorites.map((term, index) => (
                      <li key={index}>
                        <span onClick={() => handleClickFavorites(term)}>
                          {term}
                        </span>
                        <button
                          className="au-button"
                          onClick={() => handleRemoveFromFavorites(term)}
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul style={{ padding: '1rem' }}>You dont have a favorite word</ul>
                )}
              </div>
            </div>
          </TabPanel>
          </Tabs>
        </div>
        <div className="half-right-section">
          <h2>Search Results</h2>
          <div className="search-results-container">
            {error && <div className="error">{error}</div>}
            {wordData && (
              <div className="search-results-box">
                <div className="result-header">
                  <h2 className="result-word">{wordData.lemma}</h2>
                  {/* Audio will be put here later */}
                </div>
                <div className="meaning">
                  <h5 className="result-definition">{wordData.definition}</h5>
                  <h5>
                    <span className="syn">
                      Synonyms:{" "}
                      {wordData.synonyms ? (
                        wordData.synonyms &&
                        wordData.synonyms.split(", ").join(", ")
                      ) : (
                        <p>"There's no matched synonyms"</p>
                      )}
                    </span>
                  </h5>
                  <h5>
                    <span className="ant">
                      Antonyms:{" "}
                      {wordData.antonyms ? (
                        wordData.antonyms &&
                        wordData.antonyms.split(", ").join(", ")
                      ) : (
                        <p>"There's no matched antonyms"</p>
                      )}
                    </span>
                  </h5>
                </div>
              </div>
            )}
          </div>
          <br></br>
          <div className="blur-buttons">
            <div className="tooltip">
              {" "}
              <button
                className="au-button"
                id="blurResultDefinitionButton"
                onClick={blurResultDefinition}
              >
                Blur Definition
              </button>
            </div>

            <button
              className="au-button favorite-button"
              onClick={() => {
                if (isWordFavorited(wordData?.lemma)) {
                  handleRemoveFromFavorites(wordData?.lemma);
                } else {
                  handleAddToFavorites();
                }
              }}
            >
              {isWordFavorited(wordData?.lemma) ? 'Remove Favorites' : 'Add to Favorites'}
            </button>
          </div>
          <div className="todays-sentence">
            <h2>Today's Sentence</h2>
            {/* Check if randomWord is defined before trying to access its properties */}
            <p>
              {randomWord
                ? `${randomWord.lemma}: ${randomWord.definition}`
                : "Loading..."}
            </p>
          </div>
        </div>
      </div>

      <footer className="footer">© 2023 Bitsdictionary.com</footer>
    </div>
  );
};

export default Content;