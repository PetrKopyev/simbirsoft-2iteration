import api from '@/api';

export default {
  namespaced: true,

  state: () => ({
    rates: [],
  }),

  mutations: {
    SET_RATES(state, payload) {
      state.rates = payload;
    },
  },

  actions: {
    async fetchRates({ commit }) {
      try {
        const { data } = await api.rates.getRates();

        const rates = data.data;

        commit('SET_RATES', rates);

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject();
      }
    },

    async createRate({ commit, state }, { rateTypeId, price }) {
      try {
        const { data } = await api.rates.createRate(rateTypeId, price);

        const createdRate = data.data;
        const newRates = [...state.rates, createdRate];

        commit('SET_RATES', newRates);

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject();
      }
    },

    async deleteRate({ commit, state }, { id }) {
      try {
        await api.rates.deleteRate(id);

        const newRates = state.rates.filter((item) => item.id !== id);

        commit('SET_RATES', newRates);

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject();
      }
    },

    async updateRate({ commit, state }, { id, rateTypeId, price }) {
      try {
        await api.rates.updateRate(id, rateTypeId, price);

        const { rates } = state;
        const editedRate = rates.find((item) => item.id === id);

        editedRate.name = rateTypeId.name;
        editedRate.price = price;

        commit('SET_RATES', rates);

        return Promise.resolve();
      } catch (e) {
        return Promise.reject();
      }
    },
  },
};
