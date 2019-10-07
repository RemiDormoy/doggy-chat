<template>
  <div id="app" class="appMan">
    <div v-if="username" class="toolbarDoggy">
      <img class="messageImageYoloPetite" src="https://image.flaticon.com/icons/svg/271/271220.svg">
      <img class="imagecenterTitle"
           src="https://firebasestorage.googleapis.com/v0/b/doggy-chat.appspot.com/o/doggy-logo.svg?alt=media&token=c988cddd-a199-47fd-8f02-cc0ddfebb911"
           @click="yoloYoloYolo">
    </div>
    <div v-if="username" class="containerMessagesScreen">
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

  mounted() {
    document.body.className = 'homeBOdy';

    const yolo = this.$cookies.get('yolo-doggy-name');
    console.log(yolo);
    if (yolo) {
      store.commit('saveUsername', yolo);
    }
  },

  methods: {
    firebaseAdd() {
      getMessages();
    },

    yoloYoloYolo() {
      store.commit('saveUsername', undefined);
    },

    saveUsername() {
      if (firebase.messaging.isSupported()) {
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
                  this.$cookies.set('yolo-doggy-name', this.name);
                })
                .catch(() => {
                  console.log('impossible de chopper un token');
                  store.commit('saveUsername', this.name);
                });
            } else {
              console.log('Unable to get permission to notify.');
              store.commit('saveUsername', this.name);
            }
          });
      } else {
        store.commit('saveUsername', this.name);
      }
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
    padding: 8px;
    overflow: hidden;
    position: relative;
    color: #2c3e50;
  }

  .messageListContainer {
    width: 96vw;
    height: calc(89vh - 70px);
    margin-top: 50px;
    overflow: scroll;
  }

  .endroitOuOnEcrit {
    position: sticky;
    height: 10vh;
    overflow: hidden;
    bottom: 0;
  }

  .containerMessagesScreen {
    overflow: hidden;
    height: 98vh;
  }

  .appMan {
    overflow: hidden;
  }

  .usernameInupt {
    box-shadow: 0px -4px 4px -4px rgba(0, 0, 0, 0.2);
    border-radius: 20px;
    font-size: large;
    z-index: 100;
  }

  .homeBOdy {
    overflow: hidden;
    margin: 0px;
    width: 100vw;
    height: 100vh;
    background-image: url("https://firebasestorage.googleapis.com/v0/b/doggy-chat.appspot.com/o/group%20(1).svg?alt=media&token=8d91d28f-8b03-48b1-ab21-87cd05c76f17");
  }

  .toolbarDoggy {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    z-index: 10;
    display: inline-block;
    box-shadow: 4px 4px 8px 0 rgba(0.2, 0, 0, 0.2);
    background-color: white;
    height: 60px;
  }

  .messageImageYolo {
    height: 40px;
    margin-top: 10px;
    margin-right: 10px;
  }

  .titleDoggy {
    display: inline-block;
    width: calc(100% - 100px);
    margin-top: -20px;
    height: 40px;
  }

  .messageImageYoloPetite {
    position: fixed;
    left: 20px;
    height: 20px;
    top: 20px;
  }

  .imagecenterTitle {
    height: 40px;
    margin-top: 10px;
    width: calc(100% - 120px);
  }
</style>
