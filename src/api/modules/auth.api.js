import httpClient from '@/api/httpClient';

const auth = (username, password) => httpClient.post('auth/login', { username, password });

const logout = () => httpClient.post('auth/logout');

export default {
  auth,
  logout,
};
