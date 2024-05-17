<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="loginForm.email" required>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="loginForm.password" required>
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      loginForm: {
        email: '',
        password: ''
      },
      error: ''
    };
  },
  methods: {
    login() {
  axios.post('http://localhost:8000/api/login', this.loginForm)
    .then(response => {
      const token = response.data.token;
      const id = response.data.user.id;
      localStorage.setItem('token', token); 
      localStorage.setItem('userId', id); 
      console.log('Login successful:', response.data);
      this.$router.push('/');
    })
    .catch(error => {
      console.error('Login error:', error.response.data);
      this.error = error.response.data.message;
    });
}

  }
};
</script>

  
  <style>
  .login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .form-group {
    margin-bottom: 15px;
    margin-right: 15px;
  }
  
  label {
    display: block;
    font-weight: bold;
  }
  
  input[type="email"],
  input[type="password"] {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    
  }
  
  </style>
  