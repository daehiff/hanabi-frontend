<template>
    <router-view class="view-wrapper"></router-view>
</template>

<script>
export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
.view-wrapper {
  font-family: Avenir, Helvetica, Arial, sans-serif; 
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  margin: 0;
}
</style>
