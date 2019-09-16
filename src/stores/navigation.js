import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    currentPage: 'home',
    messages: [],
    username: undefined,
    token: undefined,
  },

  mutations: {
    saveNewPage(state, newPage) {
      state.currentPage = newPage;
    },
    addToken(state, token) {
      state.token = token;
    },
    addMessages(state, messages) {
      state.messages.addAll(messages);
    },
    saveUsername(state, username) {
      state.username = username;
    },
    addMessage(state, newMessage) {
      if (state.messages.filter(message => message.id === newMessage.id).length === 0) {
        state.messages.push(newMessage);
        state.messages = state.messages.sort((a, b) => Date.parse(a.time) - Date.parse(b.time));
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
