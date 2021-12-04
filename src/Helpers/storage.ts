enum localStorageKeys {
  storedSearchQueries = "storedSearchQueries",
}

export const storeSearchHistory = (searchQuery: string) => {
  const { storedSearchQueries } = localStorageKeys;

  let storedQueries = localStorage.getItem(storedSearchQueries);

  if (!storedQueries) {
    storedQueries = JSON.stringify([searchQuery]);
    localStorage.setItem(storedSearchQueries, storedQueries);
  } else if(storedQueries.includes(searchQuery)){
    return;
  } else {
      let parsedSearchQueries = JSON.parse(storedQueries);
      if(parsedSearchQueries.length >= 5){
          parsedSearchQueries.splice(-1);
      }

      parsedSearchQueries.push(searchQuery);

      localStorage.setItem(storedSearchQueries, JSON.stringify(parsedSearchQueries));
  }
};

export const getSearchHistory = () =>{
    const { storedSearchQueries } = localStorageKeys;
    const searchItems = localStorage.getItem(storedSearchQueries);
    return searchItems ? JSON.parse(searchItems): null;
}
