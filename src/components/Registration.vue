<template>
    <div class="register-container">
      <h2>Register</h2>
      <form @submit.prevent="register">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" v-model="registerForm.name" required>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="registerForm.email" required>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="registerForm.password" required>
        </div>
        <div class="form-group">
          <label for="password_confirmation">Confirm Password</label>
          <input type="password" id="password_confirmation" v-model="registerForm.password_confirmation" required>
        </div>
        <button type="submit">Register</button>
      </form>
      <p v-if="error">{{ error }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        registerForm: {
          name: '',
          email: '',
          password: '',
          password_confirmation: ''
        },
        error: ''
      };
    },
    methods: {
      register() {
  
        axios.post('http://localhost:8000/api/register', this.registerForm)
          .then(response => {
            console.log('Registration successful:', response.data);
          this.$router.push('/login');
          })
          .catch(error => {
            console.error('Registration error:', error.response.data);
            this.error = error.response.data.message;
          });
      }
    }
  };
  </script>
  
  <style>
  .register-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    font-weight: bold;
  }
  
  input[type="text"],
  input[type="email"],
  input[type="password"] {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  


  

  </style>
  