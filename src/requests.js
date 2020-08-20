import axios from "axios";

const AUTH_ERROR = 1;

class Request {
  constructor(baseUrl) {
    this.baseURL = baseUrl;
    this.instance = axios.create({
      baseURL: baseUrl,
      headers: { "auth": localStorage.getItem("hanabi-auth-token") }
    });
  }
  _updateToken(newToken) {
    this.instance.defaults.headers.auth = newToken;
    localStorage.setItem("hanabi-auth-token", newToken);
  }
  _handleServerResponse(error) { // TODO handle relogin somehow?! :D 
    if (error.response != null) {
      let resp = error.response;
      throw resp.data.error.message;
    } else {
      throw "INTERNAL";
    }
  }

  _checkAuthError(error) {
    if (error.response != null && error.response.data.error.code == AUTH_ERROR) {
      throw "LOGIN";
    }
  }

  async login(emailPW) { // TODO also make this request in inital route
    try {
      let resp = await axios.post(`${this.baseURL}/auth/login`, emailPW);
      this._updateToken(resp.headers.auth);
      return resp.data.success.message;
    } catch (error) {
      this._handleServerResponse(error);
    }
  }

  async register(registerData) {
    try {
      let resp = await axios.post(`${this.baseURL}/auth/register`, registerData);
      this._updateToken(resp.headers.auth);
      return resp.data.success.message;
    } catch (error) {
      this._handleServerResponse(error);
    }
  }
  async findLobbies() {
    try {
      let resp = await this.instance.get("lobby/find");
      this._updateToken(resp.headers.auth);
      if (resp.status == 200) {
        return resp.data.success.message;
      } // TODO exists an else case?
    } catch (error) {
      this._checkAuthError(error);
      this._handleServerResponse(error);
    }
  }
  async joinLobby(salt) {
    try {
      let resp = await this.instance.post(`lobby/join/${salt}`);
      this._updateToken(resp.headers.auth);
      if (resp.status == 200) {
        return resp.data.success.message;
      } // TODO exists an else case?
    } catch (error) {
      this._checkAuthError(error);
      this._handleServerResponse(error);
    }
  }
  async createLobby(lInitSettings) {
    try {
      let resp = await this.instance.post(`lobby/create`, lInitSettings);
      this._updateToken(resp.headers.auth);
      if (resp.status == 200) {
        return resp.data.success.message;
      } // TODO exists an else case? 
    } catch (error) {
      this._checkAuthError(error);
      this._handleServerResponse(error);
    }
  }
  async getLobbyStatus(lobbyId) {
    try {
      let resp = await this.instance.get(`lobby/${lobbyId}/status`);
      this._updateToken(resp.headers.auth);
      if (resp.status == 200) {
        return resp.data.success.message;
      } // TODO exists an else case? 
    } catch (error) {
      this._checkAuthError(error);
      this._handleServerResponse(error);
    }
  }
}

export {
  Request
};