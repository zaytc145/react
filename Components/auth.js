import axios from "axios";

export const API = axios.create({
  baseURL: `http://localhost:8080`
});

class Auth {
  constructor() {
    this.userId = null;
    this.role = null;
    this.accessToken = null;
    // this.accessTokenExpiresAt = null;
    // this.refreshToken = null;
    // this.refreshTokenExpiresAt = null;
  }

  setItems = data => {
    this.userId = data.userId;
    this.role = data.role;
    this.accessToken = data.accessToken;
    // this.accessTokenExpiresAt = data.accessTokenExpiresAt;
    // this.refreshToken = data.refreshToken;
    // this.refreshTokenExpiresAt = data.refreshTokenExpiresAt;
  };

  setToLocalStorage = data => {
    localStorage.setItem("userId", data.userId);
    localStorage.setItem("role", data.role);
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("accessTokenExpiresAt", data.accessTokenExpiresAt);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("refreshTokenExpiresAt", data.refreshTokenExpiresAt);
  };

  clearItems = () => {
    this.userId = null;
    this.role = null;
    this.accessToken = null;
    // this.accessTokenExpiresAt = null;
    // this.refreshToken = null;
    // this.refreshTokenExpiresAt = null;
  };

  signup = async data => {
    let response = await API.post("/clients/register", {
      email: data.email,
      login: data.login,
      password: data.password
    });

    console.log(response);
    this.setItems(response.data);
    this.setToLocalStorage(response.data);
    API.defaults.headers.common["Authorization"] = "Bearer " + response.data.accessToken;
    this.setRefreshTokenTimer();
  };

  login = async data => {
    let response = await API.post("/auth/login", {
      email: data.email,
      login: data.login,
      password: data.password
    });
    console.log(response);
    this.setItems(response.data);
    this.setToLocalStorage(response.data);
    API.defaults.headers.common["Authorization"] = "Bearer " + response.data.accessToken;
    this.setRefreshTokenTimer();
  };

  tryAutoLogin = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      return;
    }

    this.setItems({
      userId: localStorage.getItem("userId"),
      role: localStorage.getItem("role"),
      accessToken: localStorage.getItem("accessToken")
    });
    
    const expirationDate = localStorage.getItem("accessTokenExpiresAt");
    const now = new Date().getTime();
    if (now >= expirationDate){
      await this.refreshUserToken();
      this.setRefreshTokenTimer();
      return;
    }
    API.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("accessToken");
    this.setRefreshTokenTimer();
  };

  setRefreshTokenTimer = () => {
    setTimeout(async () => {
      await this.refreshUserToken();
      this.setRefreshTokenTimer();
    }, localStorage.getItem("accessTokenExpiresAt") - new Date().getTime());
  };

  logout = () => {
    this.clearItems();
    localStorage.clear();
    API.defaults.headers.common["Authorization"] = "";
  };

  refreshUserToken = async () => {
    let response = await API.post(
      "/token/refresh",
      {},
      {
        headers: {
          Authorization:
            localStorage.getItem("refreshToken") !== "null" && localStorage.getItem("refreshToken")
              ? "Bearer " + localStorage.getItem("refreshToken")
              : ""
        }
      }
    );
    this.setItems(response.data);
    this.setToLocalStorage(response.data);
    API.defaults.headers.common["Authorization"] = "Bearer " + response.data.accessToken;
    return response;
  };

  getAuthStatus = () => {
    return this.accessToken !== null;
  };

  getUserId = () => {
    return this.userId;
  };

  getAuthUserRole = () => {
    return this.role;
  };
}

export default new Auth();
