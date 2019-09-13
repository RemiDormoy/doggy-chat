<template>
  <div id="app">
    <HelloWorld v-if="page === 'home'" msg="Welcome to Your Vue.js App"/>
    <HelloWorld v-if="page === 'click'" msg="C est bien tu sais cliquer gros"/>
    <div @click="firebaseAdd">
      Clique ici pour ajouter un truc
    </div>
    <div @click="logStuff">
      Clique ici pour logger
    </div>
    <MessagesList class="messageListContainer"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import MessagesList from './components/MessagesList.vue';
import store from './stores/navigation';
import { getMessages } from './firebase/messages';

export default {
  name: 'app',
  components: {
    MessagesList,
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

  methods: {
    firebaseAdd() {
      getMessages();
    },
    logStuff() {
      store.state.messages.foreach((message) => {
        console.log(`id: ${message.id}`);
      });
    },
  },
};
</script>

<style >
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  #messageListContainer {
    height: 500px;
    width: 100vw;
  }
</style>
