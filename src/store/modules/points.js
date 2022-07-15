import api from '@/api';

export default {
  namespaced: true,

  state: () => ({
    points: [],
  }),

  mutations: {
    SET_POINTS(state, payload) {
      state.points = payload;
    },
  },

  actions: {
    async fetchPoints({ commit }) {
      const { data } = await api.points.getPoints();

      const points = data.data;

      commit('SET_POINTS', points);
    },

    async createPoint({ commit, state }, { name, cityId, address }) {
      try {
        const { data } = await api.points.createPoint(name, cityId, address);

        const createdPoint = data.data;
        const newPoints = [...state.points, createdPoint];

        commit('SET_POINTS', newPoints);

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject();
      }
    },
    //
    async deletePoint({ commit, state }, { id }) {
      try {
        await api.points.deletePoint(id);

        const newPoints = state.points.filter((item) => item.id !== id);

        commit('SET_POINTS', newPoints);

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject();
      }
    },

    async updatePoint({ commit, state }, {
      id, name, cityId, address,
    }) {
      try {
        await api.points.updatePoint(id, name, cityId, address);

        const { points } = state;
        const editedPoint = points.find((item) => item.id === id);

        editedPoint.name = name;
        editedPoint.cityId = cityId;
        editedPoint.address = address;

        commit('SET_POINTS', points);

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject();
      }
    },
  },
};
