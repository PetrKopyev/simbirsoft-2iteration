import httpClient from '@/api/httpClient';

const getRateTypes = () => httpClient.get('/db/rateType');

const deleteRateType = (id) => httpClient.delete(`/db/rateType/${id}`);

const updateRateType = (id, name, unit) => httpClient.put(`/db/rateType/${id}`, { name, unit });

const createRateType = (name, unit) => httpClient.post('/db/rateType', { name, unit });

export default {
  getRateTypes,
  deleteRateType,
  updateRateType,
  createRateType,
};
