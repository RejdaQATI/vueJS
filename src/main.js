import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';
import App from './App.vue';
import TheWelcome from './components/TheWelcome.vue';
import Form from './components/Form.vue';
import Update from './components/Update.vue';
import Login from './components/Login.vue';
import Registration from './components/Registration.vue';
import Profil from './components/Profil.vue';
import Logout from './components/Logout.vue';
const app = createApp(App);

app.use(createPinia());

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: TheWelcome }, 
    { path: '/form', component: Form },  
    { path: '/update/:id',name: 'Update', component: Update, props: true },
    { path: '/login' ,name: 'Login', component: Login },
    { path: '/logout' ,name: 'Logout', component: Logout },
    { path: '/registration' ,name: 'Registration', component: Registration },
    { path: '/profil' ,name: 'Profil', component: Profil, props: true  },
  ],
});

app.use(router);

app.mount('#app');
