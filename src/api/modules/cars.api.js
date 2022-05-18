import httpClient from '@/api/httpClient';
import { CARS_PER_PAGE } from '@/constants/cars.contants';

const getCar = (id) => httpClient.get(`/db/car/${id}`);

const getCars = ({ page, limit = CARS_PER_PAGE, categoryId = null }) => httpClient.get('/db/car', { params: { page, limit, categoryId } });

const createCar = (car) => httpClient.post('/db/car', { ...car });

const updateCar = (id, car) => httpClient.put(`/db/car/${id}`, { ...car });

const deleteCar = (id) => httpClient.delete(`/db/car/${id}`);

export default {
  getCar,
  getCars,
  createCar,
  updateCar,
  deleteCar,
};
