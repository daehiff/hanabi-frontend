<template>
  <div>
    <span class="header">Lobby</span>
    <span class="lobbyText">Salt: {{ joinedLobby.salt }}</span>
    <div class="joinedPlayerWrapper">
      <span>Joined Player</span>
      <div class="joinedPlayerList">
        <span
          class="noPlayerSpan"
          v-if="joinedLobby.player == null || joinedLobby.player.length == 0"
        >
          No Player joined</span
        >
        <div
          class="playerNameSpan"
          v-for="player in joinedLobby.player"
          :key="player.uid"
        >
          <span>{{ player.username }}</span>
        </div>
      </div>
    </div>
    <chat
      @sendMsg="sendMsgHandle"
      class="chat"
      :chatData="joinedLobby.chat"
      :currentPlayer="user.username"
    ></chat>
    <div class="settings">
      <span class="lobbyText"> Settings</span>
      <div class="settingsLayout">
        <div>
          <p>Rainbow</p>
          &nbsp;
          <vs-switch
            :disabled="!joinedLobby.isHost || loading"
            :value="joinedLobby.gameSettings.isRainbow"
            @input="updateSettings('RAINBOW', $event)"
          ></vs-switch>
        </div>
        <vs-input-number
          :disabled="!joinedLobby.isHost || loading"
          :max="10"
          :min="2"
          :value="joinedLobby.gameSettings.amtHints"
          @input="updateSettings('HINT', $event)"
          label="Hints:"
        />
        <vs-input-number
          :disabled="!joinedLobby.isHost || loading"
          :max="4"
          :min="2"
          :value="joinedLobby.gameSettings.amtLives"
          @input="updateSettings('LIVE', $event)"
          label="Lives:"
        />
        <vs-select
          :disabled="!joinedLobby.isHost || loading"
          placeholder="Select Level"
          label="Level"
          :value="joinedLobby.gameSettings.level"
          @input="updateSettings('LEVEL', $event)"
        >
          <vs-select-item
            :key="index"
            :value="item"
            :text="item"
            v-for="(item, index) in levels"
          />
        </vs-select>
      </div>
    </div>

    <vs-button
      :disabled="!joinedLobby.isHost || loading"
      class="button"
      color="success"
      @click="launchGameHandle"
      >Launch Game</vs-button
    >
    <vs-button
      v-if="joinedLobby.isHost"
      :disabled="loading"
      @click="destroyLobbyHandle"
      class="button"
      color="danger"
      >Close Lobby</vs-button
    >
    <vs-button
      v-else
      class="button"
      :disabled="loading"
      color="danger"
      @click="leaveLobbyHandle"
      >Leave Lobby</vs-button
    >
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Chat from "../views/Chat";

export default {
  name: "Lobby",
  components: {
    chat: Chat,
  },
  created() {
    this.stopPoll = false;
    this.pollLobbyStatus();
  },
  async beforeRouteLeave(to, from, next) {
    if (this.buttonCLicked) {
      next();
      return;
    }
    const answer = window.confirm(this.leaveText);
    if (answer) {
      this.loading = true;
      if (this.joinedLobby.isHost) {
        await this.destroyLobby();
      } else {
        await this.leaveLobby();
      }
      this.stopPoll = true;
      this.loading = false;
      next();
    } else next(false);
  },
  data() {
    return {
      levels: ["Hard", "Easy", "Middle", "Beginner"],
      stopPoll: false,
      loading: false,
      buttonCLicked: false,
    };
  },
  methods: {
    async sendMsgHandle(msg) {
      await this.sendChatMsg(msg);
    },
    updateSettings(type, input) {
      this.settingsInputChange({ type: type, input: input });
    },
    async destroyLobbyHandle() {
      this.buttonCLicked = true;
      this.loading = true;
      await this.destroyLobby();
      this.stopPoll = true;
      this.loading = false;
      this.$router.push({ name: "lobbyBrowser" });
    },
    async launchGameHandle() {
      this.loading = true;
      try {
        let lobby = await this.launchGame();
        this.$router.push({ name: "game", params: { gameId: lobby.gameId } });

        this.loading = false;
        this.stopPoll = true;
      } catch (error) {
        if (error == "LOGIN") {
          this.errorCallback("LOGIN", "Pease Login Again");
        } else {
          this.errorCallback("INTERNAL", error);
        }
        console.error(error);
        this.loading = false;
      }
    },
    async leaveLobbyHandle() {
      this.buttonCLicked = true;
      this.loading = true;
      try {
        await this.leaveLobby();
        this.loading = false;
        this.stopPoll = true;
        this.$router.push({ name: "lobbyBrowser" });
      } catch (error) {
        if (error == "LOGIN") {
          this.errorCallback("LOGIN", "Pease Login Again");
        } else {
          this.errorCallback("INTERNAL", error);
        }
        console.error(error);
        this.loading = false;
      }
    },
    async pollLobbyStatus() {
      if (this.stopPoll) {
        return;
      }
      try {
        let lobby = await this.getLobbyStatus(this.$route.params.lobbyId);
        if (lobby.launched) {
          this.stopPoll = true;
          this.$router.push({ name: "game", params: { gameId: lobby.gameId } });
        }
        setTimeout(this.pollLobbyStatus, 2000);
      } catch (error) {
        console.error(error);
        if (error == "LOGIN") {
          this.$router.push({ name: "login" });
        } else if (error == "LOBBY_DESTROYED") {
          this.buttonCLicked = true;
          this.errorCallback("INTERNAL", "Lobby has been closed"); // Dirty but i am lazy :)
          this.$router.push({ name: "lobbyBrowser" });
        } else {
          this.buttonCLicked = true;
          this.errorCallback("INTERNAL", "Internal Error :( Sorry");
          this.$router.push({ name: "lobbyBrowser" });
        }
      }
    },
    ...mapActions([
      "getLobbyStatus",
      "settingsInputChange",
      "launchGame",
      "leaveLobby",
      "destroyLobby",
      "sendChatMsg",
    ]),
  },
  computed: {
    ...mapState(["joinedLobby", "errorCallback", "user"]),
    leaveText() {
      if (this.joinedLobby.isHost) {
        return "Do you really want to exit? You will close this lobby.";
      } else {
        return "Do you really want to exit? You will leave this lobby.";
      }
    },
  },
};
</script>

<style>
.chat:hover {
  -webkit-box-shadow: 0 8px 25px -8px rgba(var(--vs-primary), 1);
  box-shadow: 0 8px 25px -8px rgba(var(--vs-primary), 1);
}

.chat {
  width: 80% !important;
  border: 1px solid rgba(var(--vs-primary), 1);
  border-radius: 6px;
  padding: 0.5em;
  margin-bottom: 1em;
}
.button {
  width: 75% !important;
  margin-bottom: 1em;
}
.settingsLayout {
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto auto;
  grid-auto-flow: row;
}
.settingsLayout div {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 0.5em;
}
.header {
  margin-bottom: 1em;
  font-size: 130%;
}
.lobbyText {
  margin-bottom: 0.5em;
  font-size: 120%;
}
.noPlayerSpan {
  color: grey;
}
.joinedPlayerWrapper {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  width: 80%;
  height: 30%;
  padding: 0.5em;
  border: 1px solid rgba(var(--vs-primary), 1);
  border-radius: 6px;
  margin-bottom: 1em;
}
.joinedPlayerWrapper:hover {
  -webkit-box-shadow: 0 8px 25px -8px rgba(var(--vs-primary), 1);
  box-shadow: 0 8px 25px -8px rgba(var(--vs-primary), 1);
}

.joinedPlayerList {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: scroll;
}

.playerNameSpan {
  margin: 0 !important;
  margin-top: 0.5em !important;
  margin-bottom: 0.5em !important;
  width: 90% !important;
  font-size: 100% !important;
  border: 1px solid rgba(var(--vs-dark), 1);
  color: rgba(var(--vs-dark), 1);
  text-align: center;
  border-radius: 6px;
  padding: 1em;
}
</style>
