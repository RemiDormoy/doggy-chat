<template>
  <div class="inputDoggyContainer">
    <input v-model="message"
           class="inputDoggy"
           v-on:keyup.enter="sendMessagesToService" placeholder="Écrit un message ou boucle la">
    <div v-if="showSend" class="sendButton" @click="onSendButtonClicked" ref="yoloButton">
      <img class="sendButtonImage" src="https://image.flaticon.com/icons/svg/309/309456.svg">
    </div>
    <div v-else class="sendButton" @click="takePicture">
      <img class="sendButtonImage" src="https://image.flaticon.com/icons/svg/1373/1373265.svg">
      <input
        class="inputCamera"
        ref="myImage" id="inputImage"
        type="file"
        accept="image/*;capture=camera"
        @change="pictureTaken">
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import {
  TimelineLite, Back, Elastic, Expo,
} from 'gsap';
import { sendMessage, sendImage } from '../firebase/messages';

export default {
  name: 'EndroitOuOnEcrit',

  data() {
    return {
      message: '',
      showSend: false,
    };
  },

  watch: {
    message(value) {
      console.log(`la value vaut :${value}et elle a donc une longueur de :${value.length.toString()}`);
      if (value.length > 0) {
        this.showSend = true;
      } else {
        this.showSend = false;
      }
    },
  },

  methods: {
    sendMessagesToService() {
      if (this.message.length > 0) {
        sendMessage(this.message);
        this.message = '';
      }
    },

    pictureTaken() {
      const ref = firebase.storage().ref();
      const path = `${new Date().toISOString()}yolo`;
      const yolo = ref.child(path);
      const message = this.$refs.myImage.files[0];
      yolo.put(message).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          sendImage(downloadURL);
          console.log('File available at', downloadURL);
        });
      });
    },

    onSendButtonClicked() {
      if (this.message.length > 0) {
        this.sendMessagesToService();
      } else {
        this.takePicture();
      }
      const bubble = this.$refs.yoloButton;
      const timeline = new TimelineLite();
      timeline.to(bubble, 0.5, {
        scale: 0.8,
        rotation: 16,
        ease: Back.easeOut.config(1.7),
      });
      timeline.to(
        bubble,
        0.5,
        {
          scale: 0.9,
          opacity: 1,
        },
        '-=0.6',
      ).to(bubble, 1.2, {
        scale: 1,
        rotation: '-=16',
        ease: Elastic.easeOut.config(2.5, 0.5),
      });
    },

    takePicture() {
      console.log('yolo yolo yolo');
      document.getElementById('inputImage').click();
    },
  },
};
</script>

<style scoped>
  .inputDoggyContainer {
    display: inline;
    width: 98vw;
  }

  .inputDoggy {
    position: relative;
    height: 40px;
    display: inline-block;
    border-radius: 40px;
    margin-right: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
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
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    right: 0px;
    bottom: 0px;
    width: 40px;
  }

  .sendButtonImage {
    height: 40px;
    width: 40px;
  }

  .inputCamera {
    display: none;
    bottom: -40px;
    height: 40px;
    width: 40px;
  }

</style>
