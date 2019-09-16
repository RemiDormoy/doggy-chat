<template>
  <div id="app">
    <div v-if="username">
      <MessagesList class="messageListContainer"/>
      <EndroitOuOnEcrit class="endroitOuOnEcrit"/>
    </div>
    <div v-else>
      <div>
        Entre ton blaze mon jeune, sinon t'aura pas le droit de parler
      </div>
      <input v-model="name" class="usernameInupt" v-on:keyup.enter="saveUsername">
      <div @click="saveUsername">Click pour enregistrer ton blaze</div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import MessagesList from './components/MessagesList.vue';
import EndroitOuOnEcrit from './components/EndroitOuOnEcrit.vue';
import store from './stores/navigation';
import { getMessages, addUser } from './firebase/messages';


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
    username() {
      return store.state.username;
    },
  },

  data() {
    return {
      currentPage: 'home',
      name: '',
    };
  },

  methods: {
    firebaseAdd() {
      getMessages();
    },
    saveUsername() {
      Notification.requestPermission()
        .then((permission) => {
          if (permission === 'granted') {
            const messaging = firebase.messaging();
            messaging.getToken()
              .then((token) => {
                console.log(`le token est : ${token}`);
                store.commit('saveUsername', this.name);
                store.commit('addToken', token);
                addUser(token, this.name);
              });
          } else {
            console.log('Unable to get permission to notify.');
          }
        });
    },
    logStuff() {
      store.state.messages.foreach((message) => {
        console.log(`id: ${message.id}`);
      });
    },
  },
};
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    position: relative;
    height: 100vh;
    color: #2c3e50;
  }

  .messageListContainer {
    width: 100vw;
    height: 88vh;
    overflow: scroll;
  }

  .endroitOuOnEcrit {
    position: sticky;
    height: 12vh;
    bottom: 0;
  }

  .usernameInupt {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    border-radius: 20px;
    font-size: large;
  }
</style>
