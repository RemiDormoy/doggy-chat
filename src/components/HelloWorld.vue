<template>
  <div class="hello">
    <h1 @click="changeView">{{ msg }}</h1>
    <h1>{{ this.name }}</h1>
  </div>
</template>

<script>
import store from '../stores/navigation';

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },

  data() {
    return {
      name: 'je suis Rémi',
    };
  },
  methods: {
    changeView() {
      store.commit('saveNewPage', 'click');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h3 {
    margin: 40px 0 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
