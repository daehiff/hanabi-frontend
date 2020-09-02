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
          :key="player"
        >
          <span>{{ player }}</span>
        </div>
      </div>
    </div>
    <div>
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

export default {
  name: "Lobby",
  created() {
    this.stopPoll = false;
    this.pollLobbyStatus();
  },
  data() {
    return {
      levels: ["Hard", "Easy", "Middle", "Beginner"],
      stopPoll: false,
      loading: false,
    };
  },
  methods: {
    updateSettings(type, input) {
      this.settingsInputChange({ type: type, input: input });
    },
    async destroyLobbyHandle() {
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
    async closeLobby() {},
    async leaveLobbyHandle() {
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
        if (error == "LOGIN") {
          this.$router.push({ name: "login" }); // TODO create global login popup
        } else {
          this.errorCallback("INTERNAL", "Lobby has been closed");
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
    ]),
  },
  computed: {
    ...mapState(["joinedLobby", "errorCallback"]),
  },
};
</script>

<style>
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
