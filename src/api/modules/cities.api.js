import httpClient from '@/api/httpClient';

const getCities = () => httpClient.get('/db/city');

const deleteCity = (id) => httpClient.delete(`/db/city/${id}`);

const updateCity = (id, name) => httpClient.put(`/db/city/${id}`, { name });

const createCity = (name) => httpClient.post('/db/city', { name });

export default {
  getCities,
  deleteCity,
  updateCity,
  createCity,
};
