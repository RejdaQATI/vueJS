<template>
  <div class="update-product">
    <h1>Update Product</h1>
    <form @submit.prevent="updateProduct" class="product-form">
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
        <input type="file" id="image" ref="fileInput" @change="fileChange" class="form-control">
      </div>
      <div class="form-group">
        <label for="categories">Categories:</label>
        <div class="checkbox-group">
          <div v-for="category in categories" :key="category.id">
            <input type="checkbox" v-model="selectedCategories" :value="category.id">
            <label>{{ category.title }}</label>
          </div>
        </div>
      </div>
      <button class="btn btn-primary">Update Product</button>
    </form>
  </div>
</template>


  
  
<script>
import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';

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
      productId: null,
    };
  },
  created() {
    this.checkAuthentication();
    this.fetchProductDetails();
    this.fetchCategories();
  },
  methods: {
    checkAuthentication() {
      const token = localStorage.getItem('token');
      if (token) {
        useAuthStore().setToken(token);
      }
    },
    fetchProductDetails() {
      const productId = this.$route.params.id;
      this.productId = productId;
      axios.get(`http://localhost:8000/api/v1/products/${productId}`)
        .then(response => {
          this.productData = response.data.product;
        })
        .catch(error => {
          console.error('Error fetching product:', error);
        });
    },
    fetchCategories() {
      axios.get('http://localhost:8000/api/v1/categories')
        .then(response => {
          this.categories = response.data.categories;
        })
        .catch(error => {
          console.error('Error fetching categories:', error);
        });
    },
    updateProduct() {
  this.productData.price = parseFloat(this.productData.price);
  let formData = new FormData();
  formData.append('title', this.productData.title);
  formData.append('description', this.productData.description);
  formData.append('price', this.productData.price);
  formData.append('stock', this.productData.stock);
  formData.append('image', this.productData.image);
  this.selectedCategories.forEach(categoryId => {
    formData.append('categories[]', categoryId); 
  });
  axios.post(`http://localhost:8000/api/v1/products/${this.productId}?_method=PUT`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  .then(response => {
    console.log('Product updated:', response.data.product);
    this.$router.push('/');
  })
  .catch(error => {
    console.error('Error updating product:', error);
  });
},

    fileChange(event) {
      this.productData.image = event.target.files[0];
    }
  }
};
</script>
  
  <style>
  .update-product {
    max-width: 600px;
    margin: auto;
  }
  
  .product-form {
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    font-weight: bold;
  }
  
  .form-control {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
  
  .btn {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }
  
  .btn:hover {
    background-color: #0056b3;
  }
  </style>
  

