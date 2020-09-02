<template>
  <div @click="clickedHandle" class="background" :class="background">
    <p>{{ (card.number == 0 ) ? 'x' : card.number }}</p>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    card: Object,
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
      if (this.card != null && this.card.color != null) return "background" + this.card.color;
      else return "background";
    },
  },
};
</script>

<style>
.background {
  display: flex;
  justify-content: center;
  align-items: center;
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
}
</style>
