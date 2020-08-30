<template>
  <div @click="clickedHandle" class="cardBackground">
    <p v-if="card.hintColor == null">x</p>
    <p v-else>{{ card.hintColor }}</p>
    <br />
    <p v-if="card.hintNumber == null">x</p>
    <p v-else>{{ card.hintNumber }}</p>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    card: Object,
  },
  methods: {
    clickedHandle() {
      this.$emit("cardMove", this.card);
    },
  },
};
</script>

<style scoped>
.cardBackground {
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
}
</style>
