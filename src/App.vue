<template>
  <div>
    <vs-popup title="Error" background-color="danger" :active.sync="active">
      <div class="errorPopup" v-if="errorType == 'LOGIN'">
        <p class="popupText">Invalid User: {{ errorMsg }}</p>
        <vs-button color="primary" type="filled" @click="backtoLogin"
          >Back to Login</vs-button
        >
      </div>
      <div v-else>
        <p>{{ errorMsg }}</p>
      </div>
    </vs-popup>
    <router-view class="view-wrapper"> </router-view>
    <div class="view-footer">
      Icons erstellt von <a href="https://www.flaticon.com/de/autoren/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/de/" title="Flaticon"> www.flaticon.com</a>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "App",
  data() {
    return {
      active: false,
      errorMsg: "Internal Error",
      errorType: "INTERNAL",
    };
  },
  created() {
    this.initialize({errorCallback: this.showErrorPopup});
  },
  methods: {
    ...mapActions(["initialize"]),
    showErrorPopup(type, msg) {
      console.error(msg);
      this.active = true;
      this.errorType = type;
      this.errorMsg = msg; 
    },
    backtoLogin() {
      this.$router.push({ name: "login" });
      this.active = false;
    },
  },
};
</script>

<style>
.view-footer {
  width: 100vw;
  height: 2vh;
}
.view-wrapper {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 97vh;
  margin: 0;
}
</style>

<style scoped>
.popupText {
  margin-bottom: 1em;
}
.errorPopup {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
