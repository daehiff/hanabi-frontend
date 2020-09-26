<template>
  <div class="chat">
    <p>Chat</p>
    <br />
    <div id="chat" class="chatWrapper">
      <div
        :class="{
          chatBubbleWrapper: true,
          senderMsg: chat.sender == currentPlayer,
          receiverMsg: chat.sender !== currentPlayer,
        }"
        v-for="(chat, idx) in chatData"
        :key="idx"
      >
        <div class="chatBubble">
          <p class="sender">
            {{ chat.sender == currentPlayer ? "You" : chat.sender }}
          </p>
          <p class="message">{{ chat.message }}</p>
        </div>
      </div>
    </div>
    <div class="chatTextArea">
      <vs-textarea class="chatSendButton" v-model="text" />
      <br />
      <vs-button class="chatSendButton" color="primary" @click="emitMsg"
        >Send</vs-button
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    chatData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    currentPlayer: String,
  },
  data() {
    return {
      text: "",
      isEscape: true,
      prevElements: 0,
    };
  },
  created() {
    window.scrollChat = window.setInterval(
      function() {
        if (this.prevElements !== this.chatData.length) {
          let elem = document.getElementById("chat");
          elem.scrollTop = elem.scrollHeight;
        }
        this.prevElements = this.chatData.length;
      }.bind(this),
      500
    );
    window.addEventListener("keyup", this.onKeyUp);
    window.addEventListener("keydown", this.onKeyDown);
  },
  methods: {
    onKeyUp(e) {
      console.log(e);
      if (e.key == "Shift") {
        this.isEscape = true;
      }
    },
    onKeyDown(e) {
      if (e.key == "Enter") {
        if (this.isEscape) {
          this.emitMsg();
        }
      } else if (e.key == "Shift") {
        this.isEscape = false;
      }
    },
    emitMsg() {
      this.$emit("sendMsg", this.text);
      this.text = "";
    },
  },
};
</script>

<style scoped>
.chatSendButton {
  height: 100% !important;
  margin: 0 !important;
}
.chatTextArea {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100%;
  height: 2.5em;
}
.chat {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
}
.chatWrapper {
  width: 100%;
  height: 7em;
  overflow: auto;
  padding: 1em;
}
.chatBubbleWrapper {
  display: flex;
  width: 100%;
}
.senderMsg {
  justify-content: flex-end;
}
.receiverMsg {
  justify-content: flex-start;
}
.sender {
  font-size: 60%;
}
.message {
  font-size: 90%;
}

.chatBubble {
  display: flex;
  flex-direction: column;
  margin-bottom: 1em;
  border: 1px solid grey;
  border-radius: 1em;
  width: 10em;
  padding: 0.25em;
  padding-left: 0.5em;
}
</style>
