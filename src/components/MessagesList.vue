<template>
  <div id="messageListScrollView">
    <div v-for="message in  messages" :key="message.id">
        {{ message.content }}
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

  computed: {
    messages() {
      return messagesStore.state.messages.sort((a, b) => a.time - b.time);
    },
  },
};
</script>

<style scoped>

</style>
