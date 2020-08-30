<template>
  <div>
    <vs-popup :title="popupTitle" :active.sync="activatePopup">
      <div v-if="isPlayAction">
        <div>
          {{ cardData }}
        </div>
        <div class="cardButtons">
          <vs-button>Play Card</vs-button>
          <vs-button>Discard Card</vs-button>
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
        <div class="cardButtons">
          <vs-button>Give Hint</vs-button>
        </div>
      </div>
    </vs-popup>
    <div class="cardWrapper">
      <div class="playerElement">
        <p>{{ user.username }} (me)</p>
        <div class="playerCards">
          <action-card
            @cardMove="showCardMoveHandle"
            class="card"
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
        class="playerElement"
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
        <vs-button @click="showGiveHintHandle">Give Hint</vs-button>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "../components/Card";
import ActionCard from "../components/ActionCard";
import { mapState, mapActions } from "vuex";
export default {
  name: "Game",
  components: {
    card: Card,
    "action-card": ActionCard,
  },
  created() {
    this.pollGame();
  },
  data() {
    return {
      popupTitle: "UNDEFINED",
      cardData: {},
      hintSettings: {
        isColor: false,
        color: "Red",
        number: 1,
      },
      activatePopup: false,
      isPlayAction: false,
      stopPoll: false,
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
    cardMoveHandle() {},
    giveHintHandle() {},
    showCardMoveHandle(cardInfo) {
      if (this.gameToPlay.currentPlayer != this.user.uid) {
        // TODO check if valid
        return; // TODO log error
      }
      this.popupTitle = "Play Card";
      this.isPlayAction = true;
      this.activatePopup = true;
      this.cardData = cardInfo;
    },
    showGiveHintHandle() {
      if (this.gameToPlay.currentPlayer != this.user.uid) {
        return; // TODO log error
      }
      this.popupTitle = "Give Hint";
      this.isPlayAction = false;
      this.activatePopup = true;
    },
    ...mapActions(["getGameStatus"]),
    async pollGame() {
      if (this.stopPoll) {
        return;
      }
      try {
        await this.getGameStatus(this.$route.params.gameId); // TODO check if game is won
        setTimeout(this.pollGame, 2000);
      } catch (error) {
        if (error == "LOGIN") {
          this.$router.push("login");
        } else {
          console.error("", error);
        }
      }
    },
  },
};
</script>

<style scoped>
.cardWrapper {
  width: 80%;
  margin-bottom: 0.5em;
}
.card {
  width: 2em;
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
  margin: 0.5em;
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
</style>
