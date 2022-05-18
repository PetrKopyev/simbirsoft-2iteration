import api from '@/api';

export default {
  namespaced: true,

  state: () => ({
    cars: [],
    total: 0,
  }),

  mutations: {
    SET_CARS(state, payload) {
      state.cars = payload;
    },

    SET_TOTAL(state, payload) {
      state.total = payload;
    },
  },

  actions: {
    async fetchCar(_, id) {
      try {
        const { data } = await api.cars.getCar(id);

        return Promise.resolve(data.data);
      } catch (e) {
        console.error(e);

        return Promise.reject();
      }
    },

    async fetchCars({ commit }, { page = 1, categoryId = null }) {
      try {
        const { data } = await api.cars.getCars({ page: page - 1, categoryId });

        commit('SET_CARS', data.data);
        commit('SET_TOTAL', data.count);

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject();
      }
    },
  },
};
