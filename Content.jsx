import React from "react";
import Autocomplete from "./Autocomplete";
import MainTabs from "./MainTabs";

const Content = ({
  inpWord,
  setInpWord,
  displayedWord,
  randomWord,
  wordData,
  error,
  isLoading,
  handleSearchWord,
  suggestions,
  onSelectSuggestion,
  searchHistory,
  TOEFL,
  IELTS,
}) => {
  const onSubmitSearch = (event) => {
    event.preventDefault();
    handleSearchWord(inpWord);
  };

  const handleClickHistory = (term) => {
    setInpWord(term);
    handleSearchWord(term);
  };
  const handleClickIELTS = (term) => {
    handleSearchWord(term);
  };
  const handleClickTOEFL = (term) => {
    handleSearchWord(term);
  };

  return (
    <div className="dictionary-app">
      <header className="header">
        <p>
          BITS <span>- English Dictionary</span>
        </p>
        <div className="ath-buttons">
          <button className="au-button">
            <a href="/Login">Login</a>
          </button>
          <button className="au-button">
            <a href="/Signup">Signup</a>
          </button>
        </div>
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

      {/*Tabs */}
      <MainTabs></MainTabs>

      {/* Display Search History */}
      <div className="cross-section">
        <div className="half-left-section">
          <div className="history-section">
            {searchHistory.length > 0 && (
              <div className="search-history-section">
                <h2>Search History</h2>
                <ul>
                  {searchHistory.map((term, index) => (
                    <li key={index} onClick={() => handleClickHistory(term)}>
                      {term}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="half-right-section">
          <h2>Search Results</h2>
          <div className="search-results-container">
            {error && <div className="error">{error}</div>}
            {wordData && (
              <div className="search-results-box">
                <div className="result-header">
                  <h3 className="result-word">{wordData.lemma}</h3>
                  {/* Audio will be put here later */}
                </div>
                <div className="meaning">
                  <p className="result-definition">{wordData.definition}</p>
                  <p>
                    <span className="syn">
                      Synonyms:{" "}
                      {wordData.synonyms ? (
                        wordData.synonyms &&
                        wordData.synonyms.split(", ").join(", ")
                      ) : (
                        <p>"There's no matched synonyms"</p>
                      )}
                    </span>
                  </p>
                  <p>
                    <span className="ant">
                      Antonyms:{" "}
                      {wordData.antonyms ? (
                        wordData.antonyms &&
                        wordData.antonyms.split(", ").join(", ")
                      ) : (
                        <p>"There's no matched antonyms"</p>
                      )}
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>
          <br></br>
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

      {/* Display TOEFL */}
      {TOEFL.length > 0 && (
        <div className="search-history-section">
          <h2>TOEFL</h2>
          <ul>
            {TOEFL.map((term, index) => (
              <li key={index} onClick={() => handleClickTOEFL(term)}>
                {term}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Display IELTS */}
      {IELTS.length > 0 && (
        <div className="search-history-section">
          <h2>IELTS</h2>
          <ul>
            {IELTS.map((term, index) => (
              <li key={index} onClick={() => handleClickIELTS(term)}>
                {term}
              </li>
            ))}
          </ul>
        </div>
      )}
      <footer className="footer">© 2023 Bitsdictionary.com</footer>
    </div>
  );
};

export default Content;
