import api from '@/api';

export default {
  namespaced: true,

  state: () => ({
    rateTypes: [],
  }),

  mutations: {
    SET_RATE_TYPES(state, payload) {
      state.rateTypes = payload;
    },
  },

  actions: {
    async fetchRateTypes({ commit }) {
      try {
        const { data } = await api.rateTypes.getRateTypes();

        const rateTypes = data.data;

        commit('SET_RATE_TYPES', rateTypes);

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject();
      }
    },

    async createRateType({ commit, state }, { name, unit }) {
      try {
        const { data } = await api.rateTypes.createRateType(name, unit);

        const createdRateType = data.data;
        const newRateTypes = [...state.rateTypes, createdRateType];

        commit('SET_RATE_TYPES', newRateTypes);

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject();
      }
    },

    async deleteRateType({ commit, state }, { id }) {
      try {
        await api.rateTypes.deleteRateType(id);

        const newRateTypes = state.rateTypes.filter((item) => item.id !== id);

        commit('SET_RATE_TYPES', newRateTypes);

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject();
      }
    },

    async updateRateType({ commit, state }, { id, name, unit }) {
      try {
        await api.rateTypes.updateRateType(id, name, unit);

        const { rateTypes } = state;
        const editedRateType = rateTypes.find((item) => item.id === id);

        editedRateType.name = name;
        editedRateType.unit = unit;

        commit('SET_RATE_TYPES', rateTypes);

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject();
      }
    },
  },
};
