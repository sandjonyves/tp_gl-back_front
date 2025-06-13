import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    // Extract role from localStorage
    let role = 'user'; // Default role if not found
    try {
      const user = localStorage.getItem('user');
      
      if (user) {
        const parsedUser = JSON.parse(user);
        
        role = parsedUser.dataValues?.role || 'user';
      }
    } catch (error) {
      console.error('Failed to parse user data from localStorage:', error);
    }
    // Add role to headers
    config.headers['X-User-Role'] = role;
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const { response, config, code, message } = err;

    if (code === 'ECONNABORTED') {
      return Promise.reject(new Error('Request timeout. Please try again.'));
    }

    if (!response) {
      return Promise.reject(new Error('Network error. Please check your connection.'));
    }

    if (response.status === 401) {
      try {
        await api.post('users/refresh');
        return api(config);
      } catch {
        if (typeof window !== 'undefined') window.location.href = 'users/signin';
        return Promise.reject(new Error('Session expired. Please login again.'));
      }
    }

    // Handle 404 errors by returning an empty array
    if (response.status === 404) {
      return Promise.resolve({ data: [], status: 404 });
    }

    return Promise.reject(new Error(response.data?.message || message || 'An error occurred'));
  }
);

export default api;