import Vue from 'vue';
import VueRouter from 'vue-router';
import Auth from '@/components/auth/Auth.vue';
import AdminPanel from '@/components/AdminPanel.vue';
import OrderList from '@/components/OrderList.vue';
import Cars from '@/components/Cars.vue';
import Car from '@/components/Car.vue';
import Error500 from '@/components/Error500.vue';
import store from '@/store';
import Categories from '@/components/Categories.vue';
import Cities from '@/components/Cities.vue';
import Points from '@/components/Points.vue';
import Tariffs from '@/components/Tariffs.vue';

Vue.use(VueRouter);

const ifNotAuth = (to, from, next) => {
  if (!store.getters['auth/isAuth']) {
    next();
    return;
  }
  next('/');
};

const ifAuth = (to, from, next) => {
  if (store.getters['auth/isAuth']) {
    next();
    return;
  }
  next('/auth');
};

const routes = [
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
    beforeEnter: ifNotAuth,
  },

  {
    path: '/',
    name: 'AdminPanel',
    redirect: 'order-list',
    component: AdminPanel,
    beforeEnter: ifAuth,
    children: [
      {
        path: 'order-list',
        name: 'OrderList',
        component: OrderList,
      },
      {
        path: 'cars',
        name: 'Cars',
        component: Cars,
      },
      {
        path: 'car',
        name: 'Car',
        component: Car,
      },
      {
        path: 'categories',
        name: 'Categories',
        component: Categories,
      },
      {
        path: 'cities',
        name: 'Cities',
        component: Cities,
      },
      {
        path: 'points',
        name: 'Points',
        component: Points,
      },
      {
        path: 'tariffs',
        name: 'Tariffs',
        component: Tariffs,
      },
      {
        path: 'error500',
        name: 'Error500',
        component: Error500,
      },
    ],
  },

];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});

export default router;
