import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    currentPage: 'home',
    messages: [],
  },

  mutations: {
    saveNewPage(state, newPage) {
      state.currentPage = newPage;
    },
    addMessages(state, messages) {
      state.messages.addAll(messages);
    },
    addMessage(state, newMessage) {
      if (state.messages.filter(message => message.id === newMessage.id).length === 0) {
        state.messages.push(newMessage);
      }
    },
  },

  actions: {
    changePage(context, newPage) {
      context.commit('navigation/saveNewPage', newPage);
    },
    addMessages(context, messages) {
      context.commit('messagesStore/addMessages', messages);
    },
    addMessage(context, message) {
      context.commit('messagesStore/addMessage', message);
    },
  },
});

export default store;
