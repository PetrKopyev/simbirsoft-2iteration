import httpClient from '@/api/httpClient';

const getPoints = () => httpClient.get('/db/point');

const deletePoint = (id) => httpClient.delete(`/db/point/${id}`);

const updatePoint = (id, name, cityId, address) => httpClient.put(`/db/point/${id}`, { name, cityId, address });

const createPoint = (name, cityId, address) => httpClient.post('/db/point', { name, cityId, address });

export default {
  getPoints,
  deletePoint,
  updatePoint,
  createPoint,
};
