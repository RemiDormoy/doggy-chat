import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase/app';
import App from './App.vue';
import './registerServiceWorker';


Vue.use(Vuex);
Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: 'AIzaSyDuh7nn6CepecaygcTQnVpLi3kZ8JPKFhg',
  authDomain: 'doggy-chat.firebaseapp.com',
  databaseURL: 'https://doggy-chat.firebaseio.com',
  projectId: 'doggy-chat',
  storageBucket: 'doggy-chat.appspot.com',
  messagingSenderId: '237114950965',
  appId: '1:237114950965:web:eb7a2e32df63c13132787c',
};
firebase.initializeApp(firebaseConfig);

// eslint-disable-next-line no-unused-vars
if (firebase.messaging.isSupported()) {
  const messaging = firebase.messaging();

  messaging.onMessage((payload) => {
    console.log('Message received. ', payload);
    // [START_EXCLUDE]
    // Update the UI to include the received message.
    console.log(payload);
  });
}

new Vue({
  render: h => h(App),
}).$mount('#app');
