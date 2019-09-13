<template>
  <div id="app">
    <MessagesList class="messageListContainer"/>
    <EndroitOuOnEcrit class="endroitOuOnEcrit" />
  </div>
</template>

<script>
import MessagesList from './components/MessagesList.vue';
import EndroitOuOnEcrit from './components/EndroitOuOnEcrit.vue';
import store from './stores/navigation';
import { getMessages } from './firebase/messages';

export default {
  name: 'app',
  components: {
    EndroitOuOnEcrit,
    MessagesList,
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

  .messageListContainer {
    height: 500px;
    width: 100vw;
  }

  .endroitOuOnEcrit {
    position: sticky;
    top: 0;
  }
</style>
