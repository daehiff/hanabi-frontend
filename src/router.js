import VueRouter from 'vue-router';

//import App from "./App";
import Login from "./views/Login";
import Register from "./views/Register";

import LobbyBrowser from "./views/LobbyBrowser";
import Lobby from "./views/Lobby";

import Game from "./views/Game";

import store from "./store";

const router = new VueRouter({
  mode: 'hash',
  base: '/hanabi-frontend/',
  routes: [
    {
      name: 'lobbyBrowser',
      path: '/', component: LobbyBrowser,
      async beforeEnter(to, from, next) {

        let authToken = localStorage.getItem('hanabi-auth-token');

        if (authToken == null) {
          next({ name: 'login' }); // TOOD create fancy popup or sth...
        } else {
          next();
        }
      }
    },
    {
      name: 'login', path: 'login', component: Login
    },
    {
      name: 'register', path: 'register', component: Register
    },
    {
      name: 'lobby', path: 'lobby/:lobbyId', component: Lobby
    },
    {
      name: 'game', path: 'game/:gameId', component: Game
    }

  ]
});

router.beforeEach(async (to, from, next) => {
  try {
    await store._actions.setUser[0]();
    next();
  } catch (error) {
    if (to.name != "login" && to.name != "register") {
      next({ name: 'login' }); 
    } else next();
  }
});




export default router;