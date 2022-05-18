import httpClient from '@/api/httpClient';

const getRates = () => httpClient.get('/db/rate');

const deleteRate = (id) => httpClient.delete(`/db/rate/${id}`);

const updateRate = (id, rateTypeId, price) => httpClient.put(`/db/rate/${id}`, { rateTypeId, price });

const createRate = (rateTypeId, price) => httpClient.post('/db/rate', { rateTypeId, price });

export default {
  getRates,
  deleteRate,
  updateRate,
  createRate,
};
