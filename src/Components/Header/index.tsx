import React from "react";
import { login, logout } from "../../Helpers/auth";
import { HeaderProps } from "./interface";
import styles from "./styles.module.scss";

const Header: React.FC<HeaderProps> = ({ isUserLoggedIn, onUserLogout }) => {

  const handleAuth = () => {
      
      if(isUserLoggedIn){
        logout();
        onUserLogout();
      } else {
        login();
      }
  };

  return (
    <div className={styles.container}>
      <button onClick={handleAuth}>{isUserLoggedIn? 'logout': 'login'}</button>
    </div>
  );
};

export default Header; 
