<template>
  <img src="@/assets/background.svg" class="svg"/>
</template>

<script>
export default {
  name: "aboutBackground"
}
</script>

<style scoped>
.svg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: -1;
  background-color: blueviolet;
}
</style>
