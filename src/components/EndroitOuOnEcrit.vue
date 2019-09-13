<template>
  <div class="inputDoggyContainer">
    <input v-model="message" class="inputDoggy" v-on:keyup.enter="sendMessagesToService">
    <div class="sendButton" @click="sendMessagesToService"></div>
  </div>
</template>

<script>
import { sendMessage } from '../firebase/messages';

export default {
  name: 'EndroitOuOnEcrit',

  data() {
    return {
      message: '',
    };
  },

  methods: {
    sendMessagesToService() {
      sendMessage(this.message);
      this.message = '';
    },
  },
};
</script>

<style>
  .inputDoggyContainer {
    display: inline;
    width: 100vw;
  }
  .inputDoggy {
    height: 40px;
    display: inline-block;
    background-color: #42b983;
    width: 80%;
    right: 0;
  }
  .sendButton {
    height: 40px;
    display: inline-block;
    background-color: brown;
    left: 0px;
    width: 40px;
  }
</style>
