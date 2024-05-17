<template>
  <div class="update-product">
    <h1>Update User Info</h1>
    <form @submit.prevent="updateUser" class="product-form">
      <div class="form-group">
        <label for="name">User:</label>
        <input type="text" id="name" v-model="userData.name" class="form-control">
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="text" id="email" v-model="userData.email" class="form-control">
      </div>
      <div class="form-group">
        <label for="password">New Password:</label>
        <input type="password" id="password" v-model="userData.password" class="form-control">
      </div>
      <button class="btn btn-primary">Update User</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';

export default {
  data() {
    return {
      userData: {
        name: '',
        email: '',
        password: '',
      },
      userId: null,
    };
  },
  created() {
    this.checkAuthentication();
    if (this.userId) {
      this.fetchUserDetails();
    }
  },
  methods: {
    checkAuthentication() {
      const token = localStorage.getItem('token');
      if (token) {
        useAuthStore().setToken(token);
        this.authenticated = true;
        this.userId = localStorage.getItem('userId');
      }
    },
    fetchUserDetails() {
      if (!this.userId) {
        console.error('No userId found in localStorage');
        return;
      }
      axios.get(`http://localhost:8000/api/v1/users/${this.userId}`)
        .then(response => {
          this.userData = response.data.user;
        })
        .catch(error => {
          console.error('Error fetching user details:', error);
        });
    },
    updateUser() {
      if (!this.userId) {
        console.error('No userId found in localStorage');
        return;
      }

      const token = useAuthStore().token;

      if (!token) {
        console.error('No token found in store');
        return;
      }

      let formData = new FormData();
      formData.append('name', this.userData.name);
      formData.append('email', this.userData.email);
      formData.append('password', this.userData.password);

      axios.post(`http://localhost:8000/api/v1/users/${this.userId}?_method=PUT`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        })
        .then(response => {
          console.log('User updated:', response.data.user);
        })
        .catch(error => {
          if (error.response) {
            console.error('Error response data:', error.response.data);
            console.error('Error response status:', error.response.status);
            console.error('Error response headers:', error.response.headers);
          } else if (error.request) {
            console.error('Error request data:', error.request);
          } else {
            console.error('Error message:', error.message);
          }
          console.error('Error config:', error.config);
        });
    },
  }
};
</script>

  
