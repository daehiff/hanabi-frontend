<template>
  <div>
    <vs-popup
      title="Insert Lobby Salt"
      :active.sync="activateSaltPopup"
      :button-close-hidden="loading"
    >
      <div class="popup">
        <vs-input
          class="button"
          type="text"
          label="Salt"
          val-icon-danger="clear"
          :disabled="loading"
          :danger="errorUnknownSalt"
          v-model="lobbySalt"
        ></vs-input>
        <p class="login-errormsg" v-if="errorUnknownSalt">
          {{ errorLobbySalt }}
        </p>
        <vs-button
          class="button"
          color="success"
          @click="joinBySalt(lobbySalt)"
          :disabled="loading"
          >Join by Salt</vs-button
        >
      </div>
    </vs-popup>
    <p class="lobbyHeader">Lobbys (0.1)</p>
    <p class="publicDesciption">Public Lobbys:</p>
    <div class="lobbyListWrapper">
      <div class="lobbyList">
        <span class="noPublicLobby" v-if="avLobbys.length == 0"
          >No public lobbys found</span
        >
        <div
          v-else
          class="lobbyItem"
          v-for="lobby in avLobbys"
          @click="joinBySalt(lobby.salt)"
          :key="lobby.lid"
        >
          <span class="vs-button-text vs-button--text">{{ lobby.salt }}</span>
        </div>
      </div>
    </div>
    <vs-button
      class="button"
      color="success"
      @click="createLobbyHandler"
      :disabled="loading"
      >Create Lobby</vs-button
    >
    <vs-button
      class="button"
      color="primary"
      @click="insertLobbySalt"
      :disabled="loading"
      >Join by Salt</vs-button
    >
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "LobbyBrowse",
  created() {
    this.stopPoll = false;
    this.findAllLobbies();
  },
  data() {
    return {
      stopPoll: false,
      errorUnknownSalt: false,
      activateSaltPopup: false,
      loading: false,
      lobbySalt: "",
      errorLobbySalt: "",
    };
  },
  computed: {
    ...mapState({
      avLobbys: (state) => state.availableLobbies,
    }),
  },
  methods: {
    ...mapActions(["findLobbies", "joinLobby", "createLobby"]),
    async findAllLobbies() {
      if (this.stopPoll) {
        return;
      }
      try {
        await this.findLobbies();
        setTimeout(this.findAllLobbies, 2000);
      } catch (error) {
        if (error == "LOGIN") {
          this.$router.push({ name: "login" });
        } else {
          console.error("Lobbybrowser", error);
        }
      }
    },
    async createLobbyHandler() {
      try {
        let lobbyId = await this.createLobby();
        this.stopPoll = true;
        this.$router.push({ name: "lobby", params: { lobbyId: lobbyId } });
      } catch (error) {
        if (error == "LOGIN") {
          this.$router.push({ name: "login" });
        } else {
          console.error("Lobbybrowser", error);
        }
      }
    },

    insertLobbySalt() {
      this.errorUnknownSalt = false;
      this.lobbySalt = "";
      this.activateSaltPopup = true;
      this.errorLobbySalt = "";
    },

    async joinBySalt(salt) {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.errorUnknownSalt = false;
      try {
        let lobbyId = await this.joinLobby(salt);
        this.stopPoll = true;
        this.$router.push({ name: "lobby", params: { lobbyId: lobbyId } });
      } catch (error) {
        if (error == "LOGIN") {
          this.$router.push({ name: "login" });
        }
        this.errorLobbySalt = error;
        this.errorUnknownSalt = true;
      }
      this.loading = false;
    },
  },
};
</script>

<style scoped>
.popup {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.lobbyHeader {
  margin-bottom: 3em;
  font-size: 130%;
}
.button {
  width: 75% !important;
  margin-bottom: 1em;
}
.lobbyListWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 80%;
  height: 30%;
  padding: 0.1em;
  border: 1px solid rgba(var(--vs-primary), 1);
  border-radius: 6px;
  margin-bottom: 1em;
}
.lobbyListWrapper:hover {
  -webkit-box-shadow: 0 8px 25px -8px rgba(var(--vs-primary), 1);
  box-shadow: 0 8px 25px -8px rgba(var(--vs-primary), 1);
}
.noPublicLobby {
  display: flex;
  justify-self: center;
  color: grey;
}
.lobbyList {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-height: 100%;
  overflow: scroll;
}
.login-errormsg {
  color: rgba(var(--vs-danger), 1);
  text-align: start;
  font-size: 80%;
  margin: 0;
  padding: 0;
  width: 75%;
  margin-bottom: 0.1em;
}
.publicDesciption {
  margin-bottom: 0.1em;
  width: 80%;
  text-align: start;
}
.lobbyItem {
  margin: 0 !important;
  margin-top: 0.5em !important;
  margin-bottom: 0.5em !important;
  width: 90% !important;
  font-size: 100% !important;
  background-color: rgba(var(--vs-dark), 1);
  color: white;
  text-align: center;
  border-radius: 6px;
}
</style>
