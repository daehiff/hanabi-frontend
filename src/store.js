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
    request: new Request("http://localhost:8080"),
    user: {},
    availableLobbies: [],
    joinedLobby: {
      lobbyHost: "5f3bf3a8c3b5a07fa5000006",
      created: "2020-08-19T10:58:52Z",
      kickedPlayer: [],
      gameId: null,
      launched: false,
      salt: "careful-co-operation",
      gameSettings: {
        "isRainbow": true,
        "amtHints": 8,
        "amtLives": 3,
        "level": "Hard"
      },
      player: [ // TODO insert player objs here :) 
        "5f3d05ecc3b5a0a457000001",
        "5f3d05ecc3b5a0a457000002",
        "5f3d05ecc3b5a0a457000003",
        "5f3d05ecc3b5a0a457000004"
      ],
      lid: "5f3d05ecc3b5a0a457000001",
      public: true
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setAvLobbies(state, lobbies) {
      state.availableLobbies = lobbies;
    },
    setLobby(state, lobby) {
      state.joinedLobby = lobby;
    }
  },
  actions: {
    // Login Actions
    async logUserIn({ state, commit }, emailPw) {
      let user = await state.request.login(emailPw);
      commit("setUser", user);
    },
    async registerUser({ state, commit }, registraionData) {
      let user = await state.request.register(registraionData);
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
      let lobby = await state.request.createLobby({ public: true });
      lobby.isHost = true;
      commit("setLobby", lobby);
      return lobby.lid;
    },
    async getLobbyStatus({ state, commit }, lobbyId) {
      let lobby = await state.request.getLobbyStatus(lobbyId);
      lobby.isHost = lobby.lobbyHost = state.user.uid;
      commit("setLobby", lobby);
      return lobby.lid;
    },
    async updateSettings({state, commit}, settingsObj) {
      console.log(settingsObj);
      let newLobby = state.joinedLobby;
      newLobby.gameSettings = settingsObj;
      // TODO request to adjust settings
      commit("setLobby", newLobby);
    }
  }
});


export default store;