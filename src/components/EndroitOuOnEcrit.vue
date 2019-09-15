<template>
  <div class="inputDoggyContainer">
    <input v-model="message"
           class="inputDoggy"
           v-on:keyup.enter="sendMessagesToService" placeholder="Écrit un message ou boucle la">
    <div class="sendButton" @click="sendMessagesToService">
      <img src="https://image.flaticon.com/icons/svg/309/309456.svg">
    </div>
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
      if (this.message.length > 0) {
        sendMessage(this.message);
        this.message = '';
      }
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
    position: relative;
    height: 40px;
    display: inline-block;
    border-radius: 40px;
    margin-right: 10px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    overflow: hidden;
    bottom: 15px;
    min-width: 60%;
    left: 0;
  }
  .sendButton {
    position: relative;
    height: 40px;
    display: inline-block;
    background-color: white;
    padding: 10px;
    border-radius: 40px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    right: 0px;
    bottom: 0px;
    width: 40px;
  }
</style>
