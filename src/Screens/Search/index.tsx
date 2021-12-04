import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import axios from "../../Api";
import { AxiosResponse } from "axios";
import ResultGrid from "../../Components/ResultsGrid";
import { ImageResponse } from "../../interface";
import { getSearchHistory, storeSearchHistory } from "../../Helpers/storage";

const SearchScreen = () => {
  const [results, setResults] = useState<ImageResponse[] | any>(null);
  const [hasError, setHasError] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>("");
  const [searchHistory, setSearchHistory] = useState<string[]>();
  const [inputFocused, setInputFocused] = useState<boolean>(false);
  const [showAutocomplete, setShowAutocomplete] = useState<boolean>();

  const searchImage = async (e: any, searchQuery?: string) => {
    try {
      const response: AxiosResponse = await axios.get(
        `/search/photos?query=${searchQuery ? searchQuery : userInput}`
      );
      setResults(response.data.results);
      setShowAutocomplete(false);
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
    setInputFocused(true);
    setShowAutocomplete(true);
    
    const storedSearchHistory: string[] = getSearchHistory();

    if (storedSearchHistory) {
      setSearchHistory(storedSearchHistory.reverse());
    }
  };

  const hideAutocomplete = () => {
    setInputFocused(false);
  };

  const onAutocompleteClick = (item: string) => {
    setUserInput(item);
    searchImage(null, item);
    setShowAutocomplete(false);
  };


  return (
    <div className={styles.container}>
      <h1>Search for your desired image</h1>

      <div className={styles["search-bar"]}>
        <input
          onFocus={onInputFocus}
          onChange={onInputChange}
          value={userInput}
          placeholder="Type in doggo, cat, etc..."
          type="text"
        />
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

        <div onClick={searchImage} className={styles["search-button"]}>
          Search
        </div>
      </div>

      {hasError ? (
        <p>Sorry, something went wrong. try again or visit in a later time</p>
      ) : (
        <ResultGrid images={results} />
      )}
    </div>
  );
};

export default SearchScreen;
