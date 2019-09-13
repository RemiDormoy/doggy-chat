<template>
  <div>
    <div v-for="message in  messages" :key="message.id">

      {{ message.id }}
      -
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

  computed: {
    messages() {
      return messagesStore.state.messages;
    },
  },
};
</script>

<style scoped>

</style>
