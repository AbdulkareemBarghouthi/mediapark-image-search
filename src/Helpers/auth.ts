import Axios from "../Api";
import { localStorageKeys, userObject } from "../interface";
const accessToken = "3yPcxQbHhIxobeWxe799ZVHjNfafXazpsJdpCIa38pU";
const redirect_uri = "http://localhost:3000/callback";

export const login = () => {
  window.location.href = `https://unsplash.com/oauth/authorize?client_id=${accessToken}&redirect_uri=${redirect_uri}&response_type=code`;
};

export const logout = () => {
  localStorage.removeItem(localStorageKeys.user);
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

    if (document.location.pathname !== "/callback" || !codeQueryParam) return;

    try {
      const response = await Axios.post("https://unsplash.com/oauth/token", {
        client_id: accessToken,
        client_secret: "G6ivmboq2B5nUX8c5Ye68S6NmYYeOQslQ0nz_2_hRSo",
        redirect_uri: redirect_uri,
        code: codeQueryParam,
        grant_type: "authorization_code",
      });

      if (response.status === 200) {
        setUser(response.data as any);
        resolve(response.data);
      }
    } catch (e) {
      reject(e)
    }
  });
};
