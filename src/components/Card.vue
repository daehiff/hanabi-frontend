<template>
  <div @click="clickedHandle" class="background" :class="background">
    <p>{{ card.number == 0 ? "x" : card.number }}</p>
    <div v-if="!isStack" class="cardhints">
      <p v-if="card.hintColor != null || card.hintColor.length != 0">Color</p>
      <p
        v-for="color in card.hintColor"
        :key="color"
      >
        {{ color }}
      </p>
      <br />
      <p>Number</p>
      <p v-if="card.hintNumber == null"></p>
      <p v-else>{{ card.hintNumber }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    card: Object,
    isStack: Boolean,
  },
  methods: {
    async clickedHandle() {
      this.$emit("cardMove", this.card);
    },
    computedColor() {
      return this.color.toLowerCase();
    },
  },
  computed: {
    background() {
      if (this.card != null && this.card.color != null)
        return "background" + this.card.color;
      else return "background";
    },
  },
};
</script>

<style>
.cardhints {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 40%;
  margin-top: 1em;
}
.background {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  text-align: center;
  border: 1px solid black;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  color: white;
  font-size: 150%;
}
.backgroundRed {
  background-color: #fa4242;
}
.backgroundBlue {
  background-color: blue;
}
.backgroundWhite {
  background-color: white;
  color: black;
}
.backgroundYellow {
  background-color: orange;
}
.backgroundGreen {
  background-color: green;
}

.backgroundRainbow {
  background-image: linear-gradient(
    to right,
    red,
    orange,
    yellow,
    green,
    blue,
    indigo,
    violet
  );
  color: black;
}
</style>
