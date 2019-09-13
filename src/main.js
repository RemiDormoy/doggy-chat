import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase/app';
import App from './App.vue';


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

new Vue({
  render: h => h(App),
}).$mount('#app');
