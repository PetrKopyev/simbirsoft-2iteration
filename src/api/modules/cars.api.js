import httpClient from '@/api/httpClient';
import { CARS_PER_PAGE } from '@/constants/cars.contants';

const getCars = ({ page, limit = CARS_PER_PAGE, categoryId = null }) => httpClient.get('/db/car', { params: { page, limit, categoryId } });

export default {
  getCars,
};
