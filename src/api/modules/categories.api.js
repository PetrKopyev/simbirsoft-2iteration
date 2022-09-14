import httpClient from '@/api/httpClient';

const getCategories = () => httpClient.get('/db/category');

const deleteCategory = (id) => httpClient.delete(`/db/category/${id}`);

const updateCategory = (id, name, description) => httpClient.put(`/db/category/${id}`, { name, description });

const createCategory = (name, description) => httpClient.post('/db/category', { name, description });

export default {
  getCategories,
  deleteCategory,
  updateCategory,
  createCategory,
};
