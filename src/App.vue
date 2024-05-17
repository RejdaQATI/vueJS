
<template>
   <nav class="navbar">
    <template v-if="isLoggedIn">
      <router-link to="/">Home</router-link>
      <router-link to="/form">Create a product</router-link>
      <router-link to="/profil">Profile</router-link>
    </template>
    <template v-else>
      <router-link to="/login">Login</router-link>
      <router-link to="/registration">Register</router-link>
    </template>
  </nav>
  <router-view></router-view>
</template>




<script>
import { useAuthStore } from '@/stores/authStore';

export default {
  computed: {
    isLoggedIn() {
      return useAuthStore().isLoggedIn;
    },
    user() {
      return useAuthStore().user; 
    }
  },
};
</script>

<style>

nav a {
  text-decoration: none; 
  color: #333; 
  margin-right: 10px; 
}
.navbar {
  background: linear-gradient(135deg, #ffffff, #f0f0f0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
}

nav a.router-link-active {
  font-weight: bold; 
  color: #007bff; 
}
</style>
