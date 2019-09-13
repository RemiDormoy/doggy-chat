<template>
  <div class="inputDoggyContainer">
    <input v-model="message" class="inputDoggy">
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
    },
  },
};
</script>

<style>
  .inputDoggyContainer {
    display: inline;
  }
  .inputDoggy {
    height: 40px;
    background-color: #42b983;
    width: 80%;
  }
  .sendButton {
    height: 40px;
    background-color: brown;
    width: 20%;
  }
</style>
