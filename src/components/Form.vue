<template>
    <div class="update-product">
      <h1>Create Product</h1>
      <form @submit.prevent="createProduct" class="product-form">
        <div class="form-group">
          <label for="title">Title:</label>
          <input type="text" id="title" v-model="productData.title" class="form-control">
        </div>
        <div class="form-group">
          <label for="description">Description:</label>
          <input type="text" id="description" v-model="productData.description" class="form-control">
        </div>
        <div class="form-group">
    <label for="price">Price:</label>
    <input type="text" id="price" v-model="productData.price" class="form-control">
</div>

        <div class="form-group">
          <label for="stock">Stock:</label>
          <input type="number" id="stock" v-model="productData.stock" class="form-control">
        </div>
        <div class="form-group">
          <label for="image">Image:</label>
          <input type="file" id="image" ref="fileInput" @change="FileChange" class="form-control">
        </div>
        <div class="form-group">
          <label>Categories:</label>
          <div class="checkbox-group">
            <div v-for="category in categories" :key="category.id">
              <input type="checkbox" v-model="selectedCategories" :value="category.id">
              <label>{{ category.title }}</label>
            </div>
          </div>
        </div>
        <button class="btn btn-primary">Create Product</button>
      </form>
    </div>
  </template>


<script>
import axios from 'axios';

export default {
    data() {
        return {
            productData: {
                title: '',
                description: '',
                price: 0,
                stock: 0,
                image: null,
                
            },
            selectedCategories: [],
            categories: [], 
        };
    },
    created() {
        this.fetchCategories(); 
    },
    methods: {
      checkAuthentication() {
      const token = localStorage.getItem('token');
      if (token) {
        useAuthStore().setToken(token);
      }
    },
        createProduct() {
 
            this.productData.price = parseFloat(this.productData.price);
            let formData = new FormData();
            formData.append('title', this.productData.title);
            formData.append('description', this.productData.description);
            formData.append('price', this.productData.price);
            formData.append('stock', this.productData.stock);
            formData.append('image', this.productData.image);
            formData.append('categories', JSON.stringify(this.selectedCategories))
            
            axios.post('http://localhost:8000/api/v1/products/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
         
                })
                .then(response => {
                    console.log(response.data.product);
                    this.$router.push('/');
                })
                .catch(error => {
                    console.error('Erreur lors de la création du produit :', error);
                });
        },
        FileChange(event) {
            this.productData.image = event.target.files[0];
        },
        fetchCategories() {
            axios.get('http://localhost:8000/api/v1/categories')
                .then(response => {
                    this.categories = response.data.categories;
                    
                })
              
                .catch(error => {
                    console.error('Erreur lors de la récupération des catégories :', error);
                    
                });
                
        }
     
    }
   
}
</script>

<style>

</style>