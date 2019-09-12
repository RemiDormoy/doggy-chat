import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    currentPage: 'home',
  },

  mutations: {
    saveNewPage(state, newPage) {
      state.currentPage = newPage;
    },
  },

  actions: {
    changePage(context, newPage) {
      context.commit('navigation/saveNewPage', newPage);
    },
  },
});

export default store;
