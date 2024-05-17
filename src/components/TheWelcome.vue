<template>
  <div>
    <button v-if="authenticated" @click="logout">Logout</button>
    <h2>All Products</h2>

    <div class="category-container">
      <h3>Filter by Category:</h3>
      <div class="category"v-for="category in categories" :key="category.id">
        <input type="checkbox" :id="category.id" v-model="selectedCategories" :value="category.id" @change="filterProducts">
        <label :for="category.id">{{ category.title }}</label>
      </div>
    </div>
    <div class="big-container">
      <div class="product-container" v-if="authenticated">
        <div v-for="product in filteredProducts" :key="product.id">
          <div class="products">
            <div class="image-container">
              <img :src="getImageUrl(product.image)" alt="Product Image" style="width: 170px; height: 170px;">
            </div>
            <h3>{{ product.title }} - {{ product.price }}$</h3>
            <p>{{ product.description }}</p>
            <p v-if="product.category_titles">Category: {{ product.category_titles }}</p>
            <button @click="deleteProduct(product.id)" class="delete-button">Supprimer</button>
            <router-link :to="{ name: 'Update', params: { id: product.id } }">
              <button class="update-button">Modifier</button>
            </router-link>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Not authenticated. Please login to view products.</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';

export default {
  data() {
    return {
      products: [],
      authenticated: false,
      categories: [],
      selectedCategories: [],
      filteredProducts: [] 
    };
  },
  created() {
    this.checkAuthentication();
    this.fetchCategories();
    this.fetchProducts();
  },
  methods: {
    checkAuthentication() {
      const token = localStorage.getItem('token');
      const id = localStorage.getItem('id');
      if (token) {
        useAuthStore().setToken(token);
        this.authenticated = true;
      }
      
    },
    fetchCategories() {
      axios.get('http://localhost:8000/api/v1/categories')
        .then(response => {
          this.categories = response.data.categories;
          console.log('Categories:', this.categories); 
        })
        .catch(error => {
          console.error('Error fetching categories:', error);
        });
    },
    fetchProducts() {
      axios.get('http://localhost:8000/api/v1/products/')
        .then(response => {
          this.products = response.data.products;
          this.filterProducts(); 
        })
        .catch(error => {
          console.error('Error fetching products:', error);
        });
    },
    deleteProduct(id) {
      axios.delete(`http://localhost:8000/api/v1/products/${id}`)
        .then(response => {
          console.log('Réponse de suppression:', response.data);
          this.fetchProducts(); 
        })
        .catch(error => {
          console.error('Error deleting product:', error);
        });
    },
    getImageUrl(image) {
      if (image) {
        return 'http://localhost:8000/' + image;
      } else {
        return 'http://localhost:8000/default-image.jpg'; 
      }
    },
    logout() {
      useAuthStore().logout();
      this.authenticated = false; 
      localStorage.removeItem('token')
      this.$router.push('/Logout');

    },
    filterProducts() {
  if (this.selectedCategories.length === 0) {
    this.filteredProducts = this.products; 
  } else {
    this.filteredProducts = this.products.filter(product => {
      for (let categoryId of product.category_ids) {
        if (this.selectedCategories.includes(categoryId)) {
          return true;
        }
      }
      return false;
    });
  }
// METHODE TEST 1
//   filterProducts() {
//   if (this.selectedCategories.length === 0) {
//     this.filteredProducts = this.products; 
//   } else {
//     const categoryFilterSet = new Set(this.selectedCategories);
//     this.filteredProducts = this.products.filter(product => {
//       for (let categoryId of product.category_ids) {
//         if (categoryFilterSet.has(categoryId)) {
//           return true;
//         }
//       }
//       return false;
//     });
//   }
// }
// METHODE TEST 2
//   filterProducts() {
//   if (this.selectedCategories.length === 0) {
//     this.filteredProducts = this.products; 
//   } else {
//     const filteredProducts = [];
//     for (let product of this.products) {
//       let hasCategory = false;
//       for (let categoryId of product.category_ids) {
//         if (this.selectedCategories.includes(categoryId)) {
//           hasCategory = true;
//           break; 
//         }
//       }
//       if (hasCategory) {
//         filteredProducts.push(product);
//       }
//     }
//     this.filteredProducts = filteredProducts;
//   }
// }

}
}
};
</script>




<style>
.body{
  height:100%;
  width:100%;
}
.big-container {
  display:flex;
  justify-content: center;
  align-items: center;

}

.product-container{
  height:100%;
  gap: 1.2em;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: center;
  margin-left: 3.2%;

}

.products {
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
  height:340px;
  width:210px;
  overflow: hidden;
}


.products p {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

img {

  border-color: black;
  margin: 0 auto;
  }

  .products {
    text-align: center; 
}

.image-container {
    display: inline-block; 
}

.category-container {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
  gap: 30px;
}

.category {
  margin-right: 10px;
}


.category label {
  margin-right: 5px;
}

.delete-button {
    background-color: rgb(255, 72, 0);
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
  }

  .update-button {
    background-color: rgb(60, 125, 205);
    color: rgb(255, 255, 255);
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
  }
</style>


