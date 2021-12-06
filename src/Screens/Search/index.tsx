import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import axios from "../../Api";
import { AxiosResponse } from "axios";
import ResultGrid from "../../Components/ResultsGrid";
import { ImageResponse } from "../../interface";
import { getSearchHistory, storeSearchHistory } from "../../Helpers/storage";
import { SearchScreenProps } from "./interface";

const SearchScreen: React.FC<SearchScreenProps> = ({ isUserLoggedIn }) => {
  const [results, setResults] = useState<ImageResponse[] | any>(null);
  const [hasError, setHasError] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>("");
  const [searchHistory, setSearchHistory] = useState<string[]>();
  const [showAutocomplete, setShowAutocomplete] = useState<boolean>();
  const [currentSearch, setCurrentSearch] = useState<string>("");

  const searchImage = async (e: any, searchQuery?: string) => {
    try {
      const response: AxiosResponse = await axios.get(
        `/search/photos?query=${searchQuery ? searchQuery : userInput}`
      );
      setResults(response.data.results);
      setShowAutocomplete(false);
      setCurrentSearch(searchQuery || userInput)
    } catch (error) {
      setHasError(true);
      console.log(error);
    } finally {
      storeSearchHistory(userInput);
    }
  };

  const onInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setUserInput(e.currentTarget.value);
  };

  const onInputFocus = (e: React.FormEvent<HTMLInputElement>) => {
    setShowAutocomplete(true);

    const storedSearchHistory: string[] = getSearchHistory();

    if (storedSearchHistory) {
      setSearchHistory(storedSearchHistory.reverse());
    }
  };

  const hideAutocomplete = () => {
    setShowAutocomplete(false);
  };

  const onAutocompleteClick = (item: string) => {
    setUserInput(item);
    searchImage(null, item);
    setShowAutocomplete(false);
  };

  const refreshSearch = () =>{
    searchImage(currentSearch);
  }

  return (
    <div className={styles.container}>
      <h1>Search for your desired image</h1>

      <div className={styles["search-bar"]}>
        <div className={styles["search-bar-field-container"]}>
          <input
            onFocus={onInputFocus}
            onChange={onInputChange}
            value={userInput}
            placeholder="Type in doggo, cat, etc..."
            type="text"
          />

          <div onClick={searchImage} className={styles["search-button"]}>
            Search
          </div>
        </div>
        {searchHistory && (
          <div
            className={`${styles["search-autocomplete"]} ${
              showAutocomplete ? styles.show : ""
            }`}
          >
            <div
              onClick={hideAutocomplete}
              className={styles["hide-autocomplete-text"]}
            >
              Hide Recent Search
            </div>
            {searchHistory.map((item, index) => (
              <p
                onClick={() => {
                  onAutocompleteClick(item);
                }}
                key={index}
              >
                {item}
              </p>
            ))}
          </div>
        )}
      </div>

      {hasError ? (
        <p className={styles["error-message"]}>
          Sorry, something went wrong. try again or visit in a later time
        </p>
      ) : (
        <ResultGrid images={results} isUserLoggedIn={isUserLoggedIn} onUserLikeOrDislike={refreshSearch}/>
      )}
    </div> 
  );
};

export default SearchScreen;
