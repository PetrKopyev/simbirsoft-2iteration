import Vue from 'vue';
import VueRouter from 'vue-router';
import Auth from '@/components/auth/Auth.vue';
import AdminPanel from '@/components/AdminPanel.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Auth',
    component: Auth,
  },
  {
    path: '/admin-panel',
    name: 'AdminPanel',
    component: AdminPanel,
  },

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
