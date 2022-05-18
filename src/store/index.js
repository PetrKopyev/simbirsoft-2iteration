import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import categories from './modules/categories';
import cars from './modules/cars';
import points from './modules/points';
import cities from './modules/cities';
import rates from './modules/rates';
import rateTypes from './modules/rateTypes';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    categories,
    cars,
    points,
    cities,
    rates,
    rateTypes,
  },
});
