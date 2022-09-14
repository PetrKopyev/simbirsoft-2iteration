import httpClient from '@/api/httpClient';
import { ORDERS_PER_PAGE } from '@/constants/order.constants';

const getOrders = ({
  page = 0,
  limit = ORDERS_PER_PAGE,
  color = null,
  isFullTank,
  isNeedChildChair,
  isRightWheel,
} = {}) => httpClient.get('/db/order', {
  params: {
    page, limit, color, isFullTank, isNeedChildChair, isRightWheel,
  },
});

const updateOrder = (id, order) => httpClient.put(`/db/order/${id}`, { ...order });

const deleteOrder = (id) => httpClient.delete(`/db/order/${id}`);

export default {
  getOrders,
  deleteOrder,
  updateOrder,
};
