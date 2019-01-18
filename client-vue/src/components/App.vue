<template>
  <div class="app">
    <h1>Welcome to Vue Again</h1>
    <div class="app__links">
      <router-link to="/">Home</router-link>
      <router-link to="/otherpage">Other Page</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
@import "~#/main.scss";
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
