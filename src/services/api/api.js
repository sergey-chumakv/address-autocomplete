import { axios } from '@/services/axios';

export function getAddress(value) {
  return axios.post('/suggest/address', { query: value });
}
