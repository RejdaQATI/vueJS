import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    token: null,
    user: null,
    email: null,
  }),
  actions: {
    setToken(token) {
      this.token = token;
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },
    setUser(user) {
      this.user = user;
      this.email = email;
    },
    clearToken() {
      this.token = null;
      this.user = null;
      this.email = null;
      delete axios.defaults.headers.common['Authorization'];
    },
    logout() {
      this.clearToken();
    },
    async fetchUser() {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/user'); 
        const userData = response.data.user;
        this.setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    },
  },
  getters: {
    isLoggedIn() {
      return !!this.token;
    },
  },
});






