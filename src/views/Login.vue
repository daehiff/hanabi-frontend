<template>
  <div>
    <p class="loginHeader">Login</p>
    <vs-input
      class="login-emailpw"
      type="email"
      :disabled="loading"
      label="Email"
      :danger="errorLogin"
      val-icon-danger="clear"
      v-model="loginData.email"
    ></vs-input>
    <vs-input
      class="login-emailpw"
      type="password"
      label="Password"
      :danger="errorLogin"
      val-icon-danger="clear"
      :disabled="loading"
      v-model="loginData.password"
    ></vs-input>
    <p class="login-errormsg" v-if="errorLogin">{{ errorLoginMsg }}</p>
    <vs-button
      class="login-loginbutton"
      color="primary"
      @click="logInHandle"
      :disabled="loading"
      >Login</vs-button
    >
    <vs-button
      class="login-loginbutton"
      color="primary"
      type="border"
      @click="$router.push({ name: 'register' })"
      :disabled="loading"
      >Register</vs-button
    >
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Login",
  created() {
    window.addEventListener("keydown", this.onEnter);
  },
  beforeRouteLeave(to, from, next) {
    window.removeEventListener("keydown", this.onEnter);
    next();
  },
  data() {
    return {
      errorLoginMsg: "",
      errorLogin: false,
      loading: false,
      loginData: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    onEnter(e) {
      if (e.key == "Enter") {
        this.logInHandle();
      }
    },
    ...mapActions(["logUserIn"]),
    async logInHandle() {
      this.loading = true;
      this.errorLogin = false;
      try {
        await this.logUserIn(this.loginData);
        this.$router.push({ name: "lobbyBrowser" });
      } catch (errorMsg) {
        this.errorLogin = true;
        this.errorLoginMsg = errorMsg;
      }
      this.loading = false;
    },
  },
};
</script>

<style scoped>
.loginHeader {
  margin-bottom: 3em;
  font-size: 130%;
}
.login-errormsg {
  color: rgba(var(--vs-danger), 1);
  text-align: start;
  font-size: 80%;
  margin: 0;
  padding: 0;
  width: 80%;
  margin-bottom: 0.1em;
}
.login-emailpw {
  width: 75% !important;
  margin-bottom: 1em;
}
.login-loginbutton {
  width: 80%;
  margin-bottom: 1em;
}
</style>
