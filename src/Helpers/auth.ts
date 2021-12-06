import Axios from "../Api";
import { localStorageKeys, userObject } from "../interface";

const access_token = process.env.REACT_APP_ACCESS_TOKEN;
const redirect_uri = process.env.REACT_APP_REDIRECT_URI;
const client_secret = process.env.REACT_APP_CLIENT_SECRET;

export const login = () => {
  window.location.href = `https://unsplash.com/oauth/authorize?client_id=${access_token}&redirect_uri=${redirect_uri}&response_type=code&scope=public+write_likes`;
};

export const logout = () => {
  localStorage.removeItem(localStorageKeys.user);
  window.location.reload();
};

export const getUser = (): userObject | null => {
  const user = localStorage.getItem(localStorageKeys.user);

  return user ? JSON.parse(user) : null;
};

export const setUser = (userData: userObject) => {
  if (!userData || !userData.access_token || !userData.token_type) return;

  localStorage.setItem(localStorageKeys.user, JSON.stringify(userData));
};

export const handleAuthRedirect = () => {
  return new Promise(async (resolve, reject) => {
    const codeQueryParam = new URLSearchParams(document.location.search).get(
      "code"
    );

    if (!codeQueryParam) return;

    try {
      const response = await Axios.post("https://unsplash.com/oauth/token", {
        client_id: access_token,
        client_secret: client_secret,
        redirect_uri: redirect_uri,
        code: codeQueryParam,
        grant_type: "authorization_code",

      });

      if (response.status === 200) {
        console.log(response)
        setUser(response.data as any);
        resolve(response.data);
      }
    } catch (e) {
      reject(e)
    }
  });
};
