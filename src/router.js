import VueRouter from 'vue-router';

//import App from "./App";
import Login from "./views/Login";
import Register from "./views/Register";

import LobbyBrowser from "./views/LobbyBrowser";
import Lobby from "./views/Lobby";

import Game from "./views/Game";


const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      name: 'lobbyBrowser',
      path: '/', component: LobbyBrowser,
      beforeEnter(to, from, next) {
        let authToken = localStorage.getItem('hanabi-auth-token');
        if (authToken == null) {
          next("/login");
        } else {
          next();
        }
      }
    },
    {
      name: 'login', path: '/login', component: Login
    },
    {
      name: 'register', path: '/register', component: Register
    },
    {
      name: 'lobby', path: '/lobby/:lobbyId', component: Lobby
    },
    {
      name: 'game', path: '/game/:gameId', component: Game
    }

  ]



});



export default router;