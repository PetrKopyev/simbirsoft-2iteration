import api from '@/api';

export default {
  namespaced: true,

  state: () => ({
    cities: [],
  }),

  mutations: {
    SET_CITIES(state, payload) {
      state.cities = payload;
    },
  },

  actions: {
    async fetchCities({ commit }) {
      try {
        const { data } = await api.cities.getCities();

        const cities = data.data;

        commit('SET_CITIES', cities);

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject();
      }
    },

    async createCity({ commit, state }, { name }) {
      try {
        const { data } = await api.cities.createCity(name);

        const createdCity = data.data;
        const newCities = [...state.cities, createdCity];

        commit('SET_CITIES', newCities);

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject();
      }
    },

    async deleteCity({ commit, state }, { id }) {
      try {
        await api.cities.deleteCity(id);

        const newCities = state.cities.filter((item) => item.id !== id);

        commit('SET_CITIES', newCities);

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject();
      }
    },

    async updateCity({ commit, state }, { id, name }) {
      try {
        await api.cities.updateCity(id, name);

        const { cities } = state;
        const editedCity = cities.find((item) => item.id === id);

        editedCity.name = name;

        commit('SET_CITIES', cities);

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject();
      }
    },
  },
};
