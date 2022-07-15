import api from '@/api';

export default {
  namespaced: true,

  state: () => ({
    orders: [],
    total: 0,
  }),

  mutations: {
    SET_ORDERS(state, payload) {
      state.orders = payload;
    },

    SET_TOTAL(state, payload) {
      state.total = payload;
    },
  },

  actions: {
    async fetchOrders({ commit }, {
      page = 0, color = null, isFullTank, isNeedChildChair, isRightWheel,
    } = {}) {
      try {
        const { data } = await api.orders.getOrders({
          page, color, isFullTank, isNeedChildChair, isRightWheel,
        });

        commit('SET_ORDERS', data.data);
        commit('SET_TOTAL', data.count);

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject();
      }
    },
  },
};
