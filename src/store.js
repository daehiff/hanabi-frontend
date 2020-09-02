import Vue from "vue";
import Vuex from 'vuex';
import { Request } from "./requests";

Vue.use(Vuex);



/**
 * TODO: 
 * 1) Make requests to server regarding Lobby/settings
 * 2) Get players from server
 * 3) adjust lobby towards joining/creating
 */
const store = new Vuex.Store({
  state: {
    errorCallback: (type, message) => {
      console.error(type, message);
      return;
    },
    request: new Request(process.env.VUE_APP_BACKEND_BASE_URL),
    user: {},
    availableLobbies: [],
    joinedLobby: {
      gameSettings: {}
    },
    gameToPlay: {}
  },
  mutations: {
    setErrorCallback(state, errorCallback) {
      state.errorCallback = errorCallback;
    },
    setUser(state, user) {
      state.user = user;
    },
    setAvLobbies(state, lobbies) {
      state.availableLobbies = lobbies;
    },
    setLobby(state, lobby) {
      state.joinedLobby = lobby;
    },
    setGame() {
      //state.gameToPlay = game;
    }
  },
  actions: {
    initialize({ commit }, { errorCallback }) {
      commit("setErrorCallback", errorCallback);
    },
    // Login Actions
    async logUserIn({ state, commit }, emailPw) {
      let user = await state.request.login(emailPw);
      commit("setUser", user);
    },
    async registerUser({ state, commit }, registraionData) {
      let user = await state.request.register(registraionData);
      commit("setUser", user);
    },
    async setUser({ state, commit }) {
      let user = await state.request.getUser();
      commit("setUser", user);
    },
    // Lobby Actions
    async findLobbies({ state, commit }) {
      let lobbies = await state.request.findLobbies();
      commit("setAvLobbies", lobbies);
    },
    async joinLobby({ state, commit }, salt) {
      let lobby = await state.request.joinLobby(salt);
      lobby.isHost = lobby.lobbyHost = state.user.uid;
      commit("setLobby", lobby);
      return lobby.lid;
    },
    async createLobby({ state, commit }) {
      let lobby = await state.request.createLobby(
        {
          public: true,
          settings: {
            amtLives: 2,
            amtHints: 9,
            level: "Hard",
            isRainbow: true
          }
        });
      lobby.isHost = true;
      commit("setLobby", lobby);
      return lobby.lid;
    },
    async getLobbyStatus({ state, commit }, lobbyId) {
      let lobby = await state.request.getLobbyStatus(lobbyId);
      lobby.isHost = lobby.lobbyHost == state.user.uid;
      commit("setLobby", lobby);
      return lobby;
    },
    async updateSettings({ commit }, newLobby) {
      // TODO request to adjust settings
      commit("setLobby", newLobby);
    },

    async settingsInputChange({ state, commit }, { type, input }) {
      let newLobby = state.joinedLobby;
      if (type == "RAINBOW") {
        if (state.joinedLobby.gameSettings.isRainbow == input) {
          return;
        }
        newLobby.gameSettings.isRainbow = input;
      } else if (type == "HINT") {
        if (state.joinedLobby.gameSettings.amtHints == input) {
          return;
        }
        newLobby.gameSettings.amtHints = Number(input);
      } else if (type == "LIVE") {
        if (state.joinedLobby.gameSettings.amtLives == input) {
          return;
        }
        newLobby.gameSettings.amtLives = Number(input);
      } else if (type == "LEVEL") {
        if (state.joinedLobby.gameSettings.level == input) {
          return;
        }
        newLobby.gameSettings.level = input;
      }
      await state.request.adjustSettings(newLobby); // TODO do we have to await here?
      commit("setLobby", newLobby);
    },

    async launchGame({ state, commit }) {
      let lobby = await state.request.launchGame(state.joinedLobby);
      commit("setLobby", lobby);
      return lobby;
    },

    async leaveLobby({ state, commit }) {
      await state.request.leaveLobby(state.joinedLobby);
      commit("setLobby", { gameSettings: {} });
    },

    async destroyLobby({ state, commit }) {
      await state.request.destroyLobby(state.joinedLobby);
      commit("setLobby", { gameSettings: {} });
    },

    async getGameStatus({ state, commit }, gameId = null) {
      if (gameId == null) {
        gameId = state.gameToPlay.gid;
      }
      let game = await state.request.gameStatus(gameId);
      commit("setGame", game);
    },

    async makeMove({ state, commit }, moveAction) {
      let game = await state.request.makeMove(moveAction, state.gameToPlay.gid);
      commit("setGame", game);
    }
  }
});


export default store;