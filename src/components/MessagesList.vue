<template>
  <div id="messageListScrollView">
    <div v-for="message in  messages" :key="message.id">
      <div class="messageContainer" :class="{'senderMessageContainer': isSender(message)}">
        <div v-if="message.type === 'image'">
          <img class="messageImage" :src="message.imageUrl">
        </div>
        <div v-else>
          {{ message.content }}
        </div>
      </div>
      <div class="messageInfoContainer">
        <div class="senderInformation">
          {{ message.sender }}
        </div>
        <div class="hourOfSending">
          {{ formatDate(new Date(message.time))}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import messagesStore from '../stores/navigation';
import { refreshMessages } from '../firebase/messages';


export default {
  name: 'MessagesList',

  mounted() {
    refreshMessages();
  },

  watch: {
    messages() {
      setTimeout(() => {
        const objDiv = document.getElementById('messageListScrollView');
        objDiv.scrollTop = objDiv.scrollHeight;
      }, 100);
    },
  },

  methods: {
    isSender(message) {
      return message.sender === this.username;
    },

    formatDate(date) {
      let hours = date.getHours()
        .toString();
      let minutes = date.getMinutes()
        .toString();
      if (hours.length === 1) {
        hours = `0${hours}`;
      }
      if (minutes.length === 1) {
        minutes = `0${minutes}`;
      }
      return `${hours}:${minutes}`;
    },
  },

  computed: {
    messages() {
      // eslint-disable-next-line max-len
      return messagesStore.state.messages;
    },
    username() {
      // eslint-disable-next-line max-len
      return messagesStore.state.username;
    },
  },
};
</script>

<style scoped>
  .messageContainer {
    position: relative;
    width: 50vw;
    left: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    background-color: beige;
  }
  .senderMessageContainer {
    position: relative;
    width: 50vw;
    left: 40vw;
    padding-top: 10px;
    padding-bottom: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    background-color: aquamarine;
  }

  .messageInfoContainer {
    left: 20px;
    display: inline;
  }

  .hourOfSending {
    display: inline-block;
    margin-left: 40px;
    left: 0;
  }

  .senderInformation {
    display: inline-block;
    right: 0;
  }

  .messageImage {
    height: 120px;
  }
</style>
