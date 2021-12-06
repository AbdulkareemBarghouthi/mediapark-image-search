import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import SearchScreen from "../Search";
import Header from "../../Components/Header";
import { getUser, handleAuthRedirect } from "../../Helpers/auth";

const Main = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const handleUserStatus = async () => {
    const user = getUser();

    if (user) {
        setIsUserLoggedIn(true);
    } else {
      try {
        const response = await handleAuthRedirect();
        if (response) {
          setIsUserLoggedIn(true);
        }
      } catch (e) {
        setIsUserLoggedIn(false)
      }
    }
  };

  const onUserLogout = () =>{
      setIsUserLoggedIn(false);
  }

  useEffect(() => {
    handleUserStatus();
  }, []);
  
  return (
    <div className={styles.container}>
      <Header isUserLoggedIn={isUserLoggedIn} onUserLogout={onUserLogout}/>
      <SearchScreen isUserLoggedIn={isUserLoggedIn}/>
    </div>
  );
};

export default Main;
