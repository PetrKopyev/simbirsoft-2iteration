import Vue from 'vue';
import VueRouter from 'vue-router';
import Auth from '@/components/auth/Auth.vue';
import AdminPanel from '@/components/AdminPanel.vue';
import OrderList from '@/components/OrderList.vue';
import Cars from '@/components/Cars.vue';
import Car from '@/components/Car.vue';
import Error500 from '@/components/Error500.vue';

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
    children: [
      {
        path: 'OrderList',
        component: OrderList,
      },
      {
        path: 'Cars',
        component: Cars,
      },
      {
        path: 'Car',
        component: Car,
      },
      {
        path: 'Error500',
        component: Error500,
      },
    ],
  },

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
