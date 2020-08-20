<template>
  <div>
    <p>Register</p>
    <vs-input
      class="register-emailpwuname"
      type="email"
      :disabled="loading"
      label="Email"
      val-icon-danger="clear"
      :danger="errorRegister"
      v-model="registrationData.email"
    ></vs-input>
    <vs-input
      class="register-emailpwuname"
      type="text"
      :disabled="loading"
      label="Username"
      val-icon-danger="clear"
      :danger="errorRegister"
      v-model="registrationData.username"
    ></vs-input>
    <vs-input
      class="register-emailpwuname"
      type="password"
      label="Password"
      val-icon-danger="clear"
      :disabled="loading"
      :danger="errorRegister"
      v-model="registrationData.password"
    ></vs-input>
    <p class="register-errormsg" v-if="errorRegister">
      {{ errorRegistrationMsg }}
    </p>

    <vs-button
      class="register-button"
      color="primary"
      :disabled="loading"
      @click="registrationHandle"
      >Register</vs-button
    >
    <vs-button
      class="register-button"
      color="primary"
      type="border"
      :disabled="loading"
      @click="$router.push('login')"
      >Back to Login</vs-button
    >
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Register",
  data() {
    return {
      loading: false,
      errorRegistrationMsg: "",
      errorRegister: false,
      registrationData: {
        email: "",
        username: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions(["registerUser"]),
    async registrationHandle() {
      this.loading = true;
      this.errorRegister = false;
      try {
        await this.registerUser(this.registrationData);
        this.$router.push({ name: "lobbyBrowser" });
      } catch (errorMsg) {
        this.errorRegister = true;
        this.errorRegistrationMsg = errorMsg;
      }
      this.loading = false;
    },
  },
};
</script>

<style scoped>
.register-errormsg {
  color: red;
  text-align: start;
  font-size: 80%;
  margin: 0;
  padding: 0;
  width: 80%;
  margin-bottom: 0.1em;
}
.register-emailpwuname {
  width: 75% !important;
  margin-bottom: 1em;
}
.register-button {
  width: 80%;
  margin-bottom: 1em;
}
</style>
