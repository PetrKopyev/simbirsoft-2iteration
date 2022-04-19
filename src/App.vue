<template>
  <div id="app">
    <auth />

    <router-view />
  </div>
</template>

<script>
import Auth from '@/components/auth/Auth.vue';

export default {
  name: 'App',
  components: {
    Auth,
  },

};

</script>

<style lang="scss">
body {
  font-family: 'Roboto', sans-serif;
  height: 100%;
}
</style>
