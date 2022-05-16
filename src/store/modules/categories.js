import api from '@/api';

export default {
  namespaced: true,

  state: () => ({
    categories: [],
  }),

  mutations: {
    SET_CATEGORIES(state, payload) {
      state.categories = payload;
    },
  },

  actions: {
    async fetchCategories({ commit }) {
      try {
        const { data } = await api.categories.getCategories();

        const categories = data.data;

        commit('SET_CATEGORIES', categories);
      } catch (e) {
        console.error(e);
      }
    },

    async createCategory({ commit, state }, { name, description }) {
      try {
        const { data } = await api.categories.createCategory(name, description);

        const createdCategory = data.data;
        const newCategories = [...state.categories, createdCategory];

        commit('SET_CATEGORIES', newCategories);

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject();
      }
    },

    async deleteCategory({ commit, state }, { id }) {
      try {
        await api.categories.deleteCategory(id);

        const newCategories = state.categories.filter((item) => item.id !== id);

        commit('SET_CATEGORIES', newCategories);

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject();
      }
    },

    async updateCategory({ commit, state }, { id, name, description }) {
      try {
        await api.categories.updateCategory(id, name, description);

        const { categories } = state;
        const editedCategory = categories.find((item) => item.id === id);

        editedCategory.name = name;
        editedCategory.description = description;

        commit('SET_CATEGORIES', categories);

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject();
      }
    },
  },
};
