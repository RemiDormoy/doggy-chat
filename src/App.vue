<template>
  <div id="app" class="appMan">
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
    height: 86vh;
    overflow: scroll;
  }

  .endroitOuOnEcrit {
    position: sticky;
    height: 10vh;
    overflow: hidden;
    bottom: 0;
  }

  .containerMessagesScreen {
    width: 98vw;
    overflow: hidden;
    height: 98vh;
  }

  .appMan {
    overflow: hidden;
  }

  .usernameInupt {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    border-radius: 20px;
    font-size: large;
  }

  .homeBOdy {
    overflow: hidden;
    margin: 0px;
    width: 100vw;
    height: 100vh;
    background-color: #00b7ff;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='540' height='450' viewBox='0 0 1080 900'%3E%3Cg fill-opacity='.1'%3E%3Cpolygon fill='%23444' points='90 150 0 300 180 300'/%3E%3Cpolygon points='90 150 180 0 0 0'/%3E%3Cpolygon fill='%23AAA' points='270 150 360 0 180 0'/%3E%3Cpolygon fill='%23DDD' points='450 150 360 300 540 300'/%3E%3Cpolygon fill='%23999' points='450 150 540 0 360 0'/%3E%3Cpolygon points='630 150 540 300 720 300'/%3E%3Cpolygon fill='%23DDD' points='630 150 720 0 540 0'/%3E%3Cpolygon fill='%23444' points='810 150 720 300 900 300'/%3E%3Cpolygon fill='%23FFF' points='810 150 900 0 720 0'/%3E%3Cpolygon fill='%23DDD' points='990 150 900 300 1080 300'/%3E%3Cpolygon fill='%23444' points='990 150 1080 0 900 0'/%3E%3Cpolygon fill='%23DDD' points='90 450 0 600 180 600'/%3E%3Cpolygon points='90 450 180 300 0 300'/%3E%3Cpolygon fill='%23666' points='270 450 180 600 360 600'/%3E%3Cpolygon fill='%23AAA' points='270 450 360 300 180 300'/%3E%3Cpolygon fill='%23DDD' points='450 450 360 600 540 600'/%3E%3Cpolygon fill='%23999' points='450 450 540 300 360 300'/%3E%3Cpolygon fill='%23999' points='630 450 540 600 720 600'/%3E%3Cpolygon fill='%23FFF' points='630 450 720 300 540 300'/%3E%3Cpolygon points='810 450 720 600 900 600'/%3E%3Cpolygon fill='%23DDD' points='810 450 900 300 720 300'/%3E%3Cpolygon fill='%23AAA' points='990 450 900 600 1080 600'/%3E%3Cpolygon fill='%23444' points='990 450 1080 300 900 300'/%3E%3Cpolygon fill='%23222' points='90 750 0 900 180 900'/%3E%3Cpolygon points='270 750 180 900 360 900'/%3E%3Cpolygon fill='%23DDD' points='270 750 360 600 180 600'/%3E%3Cpolygon points='450 750 540 600 360 600'/%3E%3Cpolygon points='630 750 540 900 720 900'/%3E%3Cpolygon fill='%23444' points='630 750 720 600 540 600'/%3E%3Cpolygon fill='%23AAA' points='810 750 720 900 900 900'/%3E%3Cpolygon fill='%23666' points='810 750 900 600 720 600'/%3E%3Cpolygon fill='%23999' points='990 750 900 900 1080 900'/%3E%3Cpolygon fill='%23999' points='180 0 90 150 270 150'/%3E%3Cpolygon fill='%23444' points='360 0 270 150 450 150'/%3E%3Cpolygon fill='%23FFF' points='540 0 450 150 630 150'/%3E%3Cpolygon points='900 0 810 150 990 150'/%3E%3Cpolygon fill='%23222' points='0 300 -90 450 90 450'/%3E%3Cpolygon fill='%23FFF' points='0 300 90 150 -90 150'/%3E%3Cpolygon fill='%23FFF' points='180 300 90 450 270 450'/%3E%3Cpolygon fill='%23666' points='180 300 270 150 90 150'/%3E%3Cpolygon fill='%23222' points='360 300 270 450 450 450'/%3E%3Cpolygon fill='%23FFF' points='360 300 450 150 270 150'/%3E%3Cpolygon fill='%23444' points='540 300 450 450 630 450'/%3E%3Cpolygon fill='%23222' points='540 300 630 150 450 150'/%3E%3Cpolygon fill='%23AAA' points='720 300 630 450 810 450'/%3E%3Cpolygon fill='%23666' points='720 300 810 150 630 150'/%3E%3Cpolygon fill='%23FFF' points='900 300 810 450 990 450'/%3E%3Cpolygon fill='%23999' points='900 300 990 150 810 150'/%3E%3Cpolygon points='0 600 -90 750 90 750'/%3E%3Cpolygon fill='%23666' points='0 600 90 450 -90 450'/%3E%3Cpolygon fill='%23AAA' points='180 600 90 750 270 750'/%3E%3Cpolygon fill='%23444' points='180 600 270 450 90 450'/%3E%3Cpolygon fill='%23444' points='360 600 270 750 450 750'/%3E%3Cpolygon fill='%23999' points='360 600 450 450 270 450'/%3E%3Cpolygon fill='%23666' points='540 600 630 450 450 450'/%3E%3Cpolygon fill='%23222' points='720 600 630 750 810 750'/%3E%3Cpolygon fill='%23FFF' points='900 600 810 750 990 750'/%3E%3Cpolygon fill='%23222' points='900 600 990 450 810 450'/%3E%3Cpolygon fill='%23DDD' points='0 900 90 750 -90 750'/%3E%3Cpolygon fill='%23444' points='180 900 270 750 90 750'/%3E%3Cpolygon fill='%23FFF' points='360 900 450 750 270 750'/%3E%3Cpolygon fill='%23AAA' points='540 900 630 750 450 750'/%3E%3Cpolygon fill='%23FFF' points='720 900 810 750 630 750'/%3E%3Cpolygon fill='%23222' points='900 900 990 750 810 750'/%3E%3Cpolygon fill='%23222' points='1080 300 990 450 1170 450'/%3E%3Cpolygon fill='%23FFF' points='1080 300 1170 150 990 150'/%3E%3Cpolygon points='1080 600 990 750 1170 750'/%3E%3Cpolygon fill='%23666' points='1080 600 1170 450 990 450'/%3E%3Cpolygon fill='%23DDD' points='1080 900 1170 750 990 750'/%3E%3C/g%3E%3C/svg%3E");
  }
</style>
