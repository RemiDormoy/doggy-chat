<template>
  <div id="app">
    <HelloWorld v-if="page === 'home'" msg="Welcome to Your Vue.js App"/>
    <HelloWorld v-if="page === 'click'" msg="C est bien tu sais cliquer gros"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import store from './stores/navigation';

export default {
  name: 'app',
  components: {
    HelloWorld,
  },

  computed: {
    page() {
      return store.state.currentPage;
    },
  },

  data() {
    return {
      currentPage: 'home',
    };
  },
};
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
