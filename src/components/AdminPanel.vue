<template>
  <div class="admin-panel">
    <sidebar />
    <div class="admin-panel__main">
      <v-header />
      <router-view />
      <v-footer />
    </div>
  </div>
</template>
<script>
import Sidebar from '@/components/Sidebar.vue';
import vHeader from '@/components/vHeader.vue';
import vFooter from '@/components/vFooter.vue';

export default {
  name: 'AdminPanel',
  components: {
    Sidebar,
    vFooter,
    vHeader,
  },

};
</script>

<style lang="scss">
.admin-panel {
  display: flex;
  background: $light-grayish-blue;
  max-width: 100%;
  height: 100%;

  @include mobile {
    justify-content: space-between;
    flex-direction: column-reverse;
  }

  &__main {
    display: flex;
    flex-direction: column;
    width: 80%;

    @include tablet {
      width: 90%;
    }

    @include mobile {
      width: 100%;
      overflow: auto;
      height: 95%;
    }
  }
}

</style>
