import api from '@/api';
import { deleteToken, setToken } from '@/api/httpClient';

export default {
  namespaced: true,

  state: () => ({
    token: localStorage.getItem('token') || '',
    refreshToken: localStorage.getItem('refreshToken') || '',
    userId: localStorage.getItem('userId') || '',
  }),

  mutations: {
    SET_USER_DATA(state, { token, refreshToken, userId }) {
      state.token = token;
      state.refreshToken = refreshToken;
      state.userId = userId;

      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('userId', userId);
    },

    CLEAR_USER_DATA(state) {
      state.token = '';
      state.refreshToken = '';
      state.userId = '';

      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userId');
    },
  },

  actions: {
    async auth({ commit }, { username = null, password = null } = {}) {
      const { data } = await api.auth.auth(username, password);
      const token = data.access_token;
      const refreshToken = data.refresh_token;
      const userId = data.user_id;

      setToken(token);

      commit('SET_USER_DATA', { token, refreshToken, userId });

      await window.vm.$router.push('/');
    },

    async logout({ commit }) {
      await api.auth.logout();
      commit('CLEAR_USER_DATA');
      deleteToken();
      await window.vm.$router.push('/auth');
    },
  },

  getters: {
    isAuth(state) {
      return !!state.token;
    },
  },
};
