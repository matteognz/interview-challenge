import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('[API ERROR]', error);
    const status = error.response?.status;
    switch (status) {
      case 404:
        console.warn('Resource not found');
        break;
      case 500:
        console.warn('Internal server error');
        break;
    }
    return Promise.reject(error);
  }
);
