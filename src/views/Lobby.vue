<template>
  <div>
    <span class="header">Lobby</span>
    <span class="lobbyText">Salt: {{ joinedLobby.salt }}</span>
    <div class="joinedPlayerWrapper">
      <span>Joined Player</span>
      <div class="joinedPlayerList">
        <span
          class="noPlayerSpan"
          v-if="joinedLobby.player == null || joinedLobby.player.lenght == 0"
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
          <vs-switch :disabled="!isHost" v-model="isRainbow"></vs-switch>
        </div>
        <vs-input-number :disabled="!isHost" :max="10" :min="2" v-model="hints" label="Hints:" />
        <vs-input-number :disabled="!isHost" :max="4" :min="2" v-model="lives" label="Lives:" />
        <vs-select :disabled="!isHost" placeholder="Select Level" label="Level" v-model="level">
          <vs-select-item
            :key="index"
            :value="item"
            :text="item"
            v-for="(item, index) in levels"
          />
        </vs-select>
      </div>
    </div>
    <vs-button :disabled="!isHost" class="button" color="success"
      >Launch Game</vs-button
    >
    <vs-button v-if="isHost" class="button" color="danger"
      >Close Lobby</vs-button
    >
    <vs-button v-else class="button" color="danger"
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
    //this.pollLobbyStatus();
  },
  data() {
    return {
      isHost: true,
      hints: 8,
      lives: 3,
      isRainbow: false,
      level: "Hard", // TODO
      levels: ["Hard", "Easy", "Middle", "Beginner"],
      stopPoll: false,
    };
  },
  watch: {
    hints(newVal, oldVal) {
      if (newVal == oldVal) {
        return;
      }
      this.updateSettings({
        isRainbow: this.isRainbow,
        amtHints: Number(newVal),
        amtLives: this.lives,
        level: this.level,
      });
    },
    lives(newVal, oldVal) {
      if (newVal == oldVal) {
        return;
      }
      this.updateSettings({
        isRainbow: this.isRainbow,
        amtHints: this.hints,
        amtLives: Number(newVal),
        level: this.level,
      });
    },
    isRainbow(newVal, oldVal) {
      if (newVal == oldVal) {
        return;
      }
      this.updateSettings({
        isRainbow: newVal,
        amtHints: this.hints,
        amtLives: this.lives,
        level: this.level,
      });
    },
    level(newVal, oldVal) {
      if (newVal == oldVal) {
        return;
      }
      this.updateSettings({
        isRainbow: newVal,
        amtHints: this.hints,
        amtLives: this.lives,
        level: newVal,
      });
    },
  },
  methods: {
    handleUpdateSettings() {
      this.updateSettings({
        isRainbow: this.isRainbow,
        amtHints: this.hints,
        amtLives: this.lives,
        level: this.level,
      });
    },
    async pollLobbyStatus() {
      if (this.stopPoll) {
        return;
      }
      try {
        await this.getLobbyStatus(this.$route.params.lobbyId);
        setTimeout(this.pollLobbyStatus, 2000);
      } catch (error) {
        if (error == "LOGIN") {
          this.$router.push("login"); // TODO create global login popup
        } else {
          console.error("Lobbybrowser", error);
        }
      }
    },
    ...mapActions(["getLobbyStatus", "updateSettings"]),
  },
  computed: {
    ...mapState(["joinedLobby"]),
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
