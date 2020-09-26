import axios from "axios";

const AUTH_ERROR = 1;

const LOBBY_DESTROYED = 6;

class Request {
  constructor(baseUrl) {
    console.log(baseUrl);
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
  _checkLobbyDestroyed(error) {
    if (error.response != null && error.response.data.error.code == LOBBY_DESTROYED) {
      throw "LOBBY_DESTROYED";
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
      console.log(error);
      this._handleServerResponse(error);
    }
  }
  async getUser() {
    try {
      let resp = await this.instance.get("user/status");
      this._updateToken(resp.headers.auth);
      if (resp.status == 200) {
        return resp.data.success.message;
      } // TODO exists an else case?
    } catch (error) {
      this._checkAuthError(error);
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

  async kickPlayer(userId, lobbyId) {
    try {
      let resp = await this.instance.post(`lobby/${lobbyId}/kick/${userId}`);
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
        let lobby = resp.data.success.message;
        let players = await Promise.all(lobby.player.map(async (id) => this.getUserByID(id)));
        lobby.player = players;
        return resp.data.success.message;
      } // TODO exists an else case? 
    } catch (error) {
      this._checkAuthError(error);
      this._checkLobbyDestroyed(error);
      this._handleServerResponse(error);
    }
  }
  async getChat(chatId) {
    try {
      let resp = await this.instance.get(`chat/${chatId}/status`);
      this._updateToken(resp.headers.auth);
      if (resp.status == 200) {
        let chat = resp.data.success.message;
        let participantIds = Array.from(new Set(chat.messages.map((msg) => msg.sender)));
        let participants = await Promise.all(participantIds.map(async (id) => this.getUserByID(id)));
        let idName = participants.reduce(function (map, participant) {
          map[participant.uid] = participant.username;
          return map;
        }, {});

        chat.messages = chat.messages.map((msg) => {
          msg.sender = idName[msg.sender];
          return msg;
        });
        return resp.data.success.message;
      } // TODO exists an else case? 
    } catch (error) {
      console.log(error);
      this._checkAuthError(error);
      this._handleServerResponse(error);
    }
  }

  async getUserByID(id) {
    try {
      let resp = await this.instance.get(`user/${id}/status`);
      this._updateToken(resp.headers.auth);
      if (resp.status == 200) {
        return resp.data.success.message;
      } // TODO exists an else case? 
    } catch (error) {
      this._checkAuthError(error);
      this._handleServerResponse(error);
    }
  }

  async adjustSettings(newLobby) {
    try {
      let resp = await this.instance.post(`lobby/${newLobby.lid}/settings`, { "settings": newLobby.gameSettings });
      this._updateToken(resp.headers.auth);
      if (resp.status == 200) {
        return resp.data.success.message;
      } // TODO exists an else case? 
    } catch (error) {
      this._checkAuthError(error);
      this._handleServerResponse(error);
    }
  }
  async launchGame(lobby) {
    try {
      let resp = await this.instance.post(`lobby/${lobby.lid}/launch`);
      this._updateToken(resp.headers.auth);
      if (resp.status == 200) {
        return resp.data.success.message;
      } // TODO exists an else case? 
    } catch (error) {
      this._checkAuthError(error);
      this._handleServerResponse(error);
    }
  }

  async leaveLobby(lobby) {
    try {
      let resp = await this.instance.post(`lobby/${lobby.lid}/leave`);
      this._updateToken(resp.headers.auth);
      if (resp.status == 200) {
        return resp.data.success.message;
      } // TODO exists an else case? 
    } catch (error) {
      this._checkAuthError(error);
      this._handleServerResponse(error);
    }
  }

  async destroyLobby(lobby) {
    try {
      let resp = await this.instance.post(`lobby/${lobby.lid}/remove`);
      this._updateToken(resp.headers.auth);
      if (resp.status == 200) {
        return resp.data.success.message;
      } // TODO exists an else case? 
    } catch (error) {
      this._checkAuthError(error);
      this._handleServerResponse(error);
    }
  }
  async gameStatus(gameId) {
    try {
      let resp = await this.instance.get(`game/${gameId}/status`);
      let cResps = await this.instance.get(`game/${gameId}/cards`);
      let ocResp = await this.instance.get(`game/${gameId}/ownCards`);
      this._updateToken(resp.headers.auth);
      if (resp.status == 200 && cResps.status == 200 && ocResp.status == 200) {
        let game = resp.data.success.message;
        let cards = cResps.data.success.message;
        let ownCards = ocResp.data.success.message;
        //let chat = await this.instance.get(`game/${game.}`)
        game.discardPile = cards.discardPile;
        game.players.forEach(player => {
          player.cards = cards[player.playerId];
          return player;
        });
        game.ownCards = ownCards;
        return game;
      } // TODO exists an else case? 
    } catch (error) {
      this._checkAuthError(error);
      this._handleServerResponse(error);
    }
  }

  async makeMove(moveAction, gameId) {
    try {
      let resp = await this.instance.post(`game/${gameId}/move`, moveAction);
      this._updateToken(resp.headers.auth);
      if (resp.status == 200) {
        return resp.data.success.message;
      } // TODO exists an else case? 
    } catch (error) {
      this._checkAuthError(error);
      this._handleServerResponse(error);
    }
  }

  async sendMsg(chatId, msg) {
    try {
      let resp = await this.instance.post(`chat/${chatId}/send`, { "message": msg });
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