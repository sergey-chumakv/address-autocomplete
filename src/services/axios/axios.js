import axios from 'axios';

const apiKey = 'a47d94f8fb0548a44c1979f71aac3f553d091dda';

const config = {
  baseURL: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs',
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
    Authorization: `Token ${apiKey}`,
  },
};

export const instanceAxios = axios.create(config);

axios.interceptors.response.use((response) => response, (error) => {
  console.log(error);
  return Promise.reject(error);
});
