import httpClient from '@/api/httpClient';

const getCars = () => httpClient.get('/db/car');

export default {
  getCars,
};
