import Vue from 'vue';
import App from './App.vue';

import VueRouter from 'vue-router';
import Vuex from 'vuex';


import router from "./router";
import store from "./store";


import Vuesax from 'vuesax';

import 'vuesax/dist/vuesax.css';
import 'material-icons/iconfont/material-icons.css';


Vue.use(Vuesax, {
  theme: {
    colors: {
      primary: '#5b3cc4',
      success: 'rgb(23, 201, 100)',
      danger: 'rgb(242, 19, 93)',
      warning: 'rgb(255, 130, 0)',
      dark: 'rgb(36, 33, 69)'
    }
  }
});
Vue.use(Vuex);
Vue.use(VueRouter);


Vue.mixin({
  beforeRouteUpdate(to, from ,next) {
    console.log("Mixin", to, from, next);
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
