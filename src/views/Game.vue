<template>
  <div>
    <vs-popup
      :button-close-hidden="true"
      :title="wonLostTitle"
      :active.sync="showWonLost"
    >
      <div class="wonLostPopup">
        <p class="wonLostText" v-if="gameToPlay.state == 'Won'">
          Congratulations you have won with : {{ gameToPlay.points }} Points
        </p>
        <p class="wonLostText" v-else>You Lost.</p>
        <vs-button
          class="wonLostButton"
          @click="$router.push({ name: 'lobbyBrowser' })"
          >Back to Main Menu</vs-button
        >
      </div>
    </vs-popup>
    <firework
      id="firework"
      ref="firework"
      :boxHeight="'100%'"
      :boxWidth="'100%'"
    >
    </firework>
    <vs-popup :title="popupTitle" :active.sync="activatePopup">
      <div v-if="isPlayAction">
        <div>
          {{ cardData }}
        </div>
        <p class="playError" v-if="playError != null">Error: {{ playError }}</p>
        <div class="cardButtons">
          <vs-button @click="cardMoveHandle('DiscardAction')"
            >Discard Card</vs-button
          >
          <vs-button @click="cardMoveHandle('PlayAction')">Play Card</vs-button>
        </div>
      </div>
      <div v-else>
        <div class="hintWrapper">
          <div class="hintSwitch">
            <label>Color Hint</label> &nbsp;
            <vs-switch v-model="hintSettings.isColor"></vs-switch>
          </div>
          <div>
            <vs-input-number
              v-if="!hintSettings.isColor"
              :disabled="false"
              :max="5"
              :min="1"
              v-model="hintSettings.number"
              label="Number:"
            />
            <vs-select
              v-else
              :disabled="false"
              placeholder="Select Color"
              label="Color"
              v-model="hintSettings.color"
            >
              <vs-select-item
                :key="index"
                :value="item"
                :text="item"
                v-for="(item, index) in colors"
              />
            </vs-select>
          </div>
        </div>
        <p class="playError" v-if="playError != null">Error: {{ playError }}</p>
        <div class="cardButtons">
          <vs-button @click="giveHintHandle">Give Hint</vs-button>
        </div>
      </div>
    </vs-popup>
    <div class="cardWrapper">
      <p>Lives: {{ gameToPlay.lives }}</p>
      <p>Hints: {{ gameToPlay.hints }}</p>
      <p>Points {{ gameToPlay.points }}</p>
      <p>Discard Pile: {{ 1 }}</p>
      <br />
      <p>Stacks</p>
      <div class="playerCards">
        <card
          v-for="pile in gameToPlay.piles"
          :key="pile[0]"
          class="card"
          :card="{ color: pile[0], number: pile[1] }"
        ></card>
      </div>
    </div>
    <div class="cardWrapperWrapper">
      <div class="cardWrapper">
        <div
          :class="[
            'playerElement',
            user.uid == gameToPlay.currentPlayer ? 'activePlayer' : '',
          ]"
        >
          <p>{{ user.username }} (me)</p>
          <div class="playerCards">
            <action-card
              @cardMove="showCardMoveHandle"
              :class="['card']"
              v-for="card in gameToPlay.ownCards"
              :key="card.cid"
              :card="card"
            ></action-card>
          </div>
        </div>
      </div>
      <br />
      <div class="cardWrapper">
        <div
          :class="[
            'playerElement',
            player.playerId == gameToPlay.currentPlayer ? 'activePlayer' : '',
          ]"
          v-for="player in gameToPlay.players"
          :key="player.playerId"
        >
          <p>{{ player.name }}:</p>
          <div class="playerCards">
            <card
              class="card"
              v-for="card in player.cards"
              :key="card.cid"
              :card="card"
            ></card>
          </div>
          <vs-button @click="showGiveHintHandle(player)">Give Hint</vs-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "../components/Card";
import ActionCard from "../components/ActionCard";
import { mapState, mapActions } from "vuex";
import Firework from "../components/Firework";
export default {
  name: "Game",
  components: {
    card: Card,
    "action-card": ActionCard,
    firework: Firework,
  },
  created() {
    this.pollGame();
    console.log(process.env.BACKEND_BASE_URL);
  },
  data() {
    return {
      playError: null,
      popupTitle: "UNDEFINED",
      cardData: {},
      hintSettings: {
        isColor: false,

        color: "Red",
        number: 1,
      },
      activatePopup: false,
      isPlayAction: false,
      stopPoll: true,
      showWonLost: false,
      wonLostTitle: "UNDEFINED",
    };
  },
  computed: {
    colors() {
      if (this.gameToPlay.settings.isRainbow)
        return ["Red", "Green", "Yellow", "Blue", "White", "Rainbow"];
      else return ["Red", "Green", "Yellow", "Blue", "White"];
    },
    ...mapState(["gameToPlay", "user"]),
  },
  methods: {
    async cardMoveHandle(tag) {
      this.playError = null;
      let moveAction = {
        tag: tag,
        cardId: this.cardData.cid,
      };
      try {
        await this.makeMove(moveAction);
        this.activatePopup = false;
      } catch (error) {
        this.playError = error;
      }
    },
    async giveHintHandle() {
      this.playError = null;
      // TODO loading animation
      let moveAction = {
        tag: "HintAction",
        targetPlayer: this.hintSettings.pid,
        hint: this.hintSettings.isColor
          ? { Left: this.hintSettings.color }
          : { Right: Number(this.hintSettings.number) },
      };
      try {
        await this.makeMove(moveAction);
        this.activatePopup = false;
      } catch (error) {
        this.playError = error;
      }
    },
    showCardMoveHandle(cardInfo) {
      this.playError = null;
      if (this.gameToPlay.currentPlayer != this.user.uid) {
        return; // TODO log error
      }
      this.popupTitle = "Play Card";
      this.isPlayAction = true;
      this.activatePopup = true;
      this.cardData = cardInfo;
    },
    showGiveHintHandle(player) {
      this.playError = null;
      if (this.gameToPlay.currentPlayer != this.user.uid) {
        return; // TODO log error
      }
      this.hintSettings.pid = player.playerId;
      this.popupTitle = "Give Hint";
      this.isPlayAction = false;
      this.activatePopup = true;
    },
    ...mapActions(["getGameStatus", "makeMove"]),
    async pollGame() {
      if (this.stopPoll) {
        return;
      }
      try {
        await this.getGameStatus(this.$route.params.gameId);
        if (this.gameToPlay.state == "Won") {
          this.stopPoll;
          this.$refs["firework"].createFireWork(
            this.gameToPlay.maxPoints,
            this.gameToPlay.points
          );
          this.showWonLost = true;
          this.wonLostTitle = "Won";
        } else if (this.gameToPlay.state == "Lost") {
          this.stopPoll;
          this.showWonLost = true;
          this.wonLostTitle = "Lost";
        }
        setTimeout(this.pollGame, 2000);
      } catch (error) {
        if (error == "LOGIN") {
          this.$router.push({ name: "login" });
        } else {
          console.error("", error);
        }
      }
    },
  },
};
</script>

<style scoped>
.pilesfade-enter-active,
.pilesfade-leave-active {
  transition: opacity 2s;
}
.pilesfade-enter, .pilesfade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.wonLostPopup {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.wonLostButton {
  margin-top: 2em;
}
.wonLostText {
  text-align: center;
  font-size: 150%;
}
.activePlayer {
  border: 3px solid green !important;
}
.cardWrapperWrapper {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 100%;
  overflow: auto;
}
.cardWrapper {
  width: 80%;
  margin-bottom: 0.5em;
}
.card {
  width: 18%;
  max-width: 50px;
  height: 100%;
}
.playerElement {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid black;
  padding: 0.5em;
}
.playerCards {
  width: 100%;
  height: 5em;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
  margin: 0em;
  margin-bottom: 0.5em;
}

.cardButtons {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 0.5em;
}

.hintWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.hintSwitch {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}
.playError {
  color: red;
}
</style>
