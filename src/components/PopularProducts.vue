<template>
  <div class="section">
    <h2>상품 배너 제목</h2>
    <div class="product-grid">
      <div class="product-card" v-for="item in products" :key="item.id">
        <img :src="item.image" :alt="item.name" />
        <p class="brand">{{ item.brand }}</p>
        <p class="name">{{ item.name }}</p>
        <p class="price">{{ item.price.toLocaleString() }}원</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const products = ref([
  {
    id: 1,
    brand: 'Nike',
    name: '에어맥스 97',
    image: 'https://via.placeholder.com/150',
    price: 149000
  },
  {
    id: 2,
    brand: 'Adidas',
    name: '슈퍼스타 클래식',
    image: 'https://via.placeholder.com/150',
    price: 129000
  },
  {
    id: 3,
    brand: 'New Balance',
    name: '990 v5',
    image: 'https://via.placeholder.com/150',
    price: 189000
  },
  {
    id: 4,
    brand: 'G-Shock',
    name: 'GM-B2100',
    image: 'https://via.placeholder.com/150',
    price: 230000
  },
  {
    id: 5,
    brand: 'G-Shock',
    name: 'GM-B2100',
    image: 'https://via.placeholder.com/150',
    price: 230000
  },
  {
    id: 6,
    brand: 'G-Shock',
    name: 'GM-B2100',
    image: 'https://via.placeholder.com/150',
    price: 230000
  },
  {
    id: 7,
    brand: 'G-Shock',
    name: 'GM-B2100',
    image: 'https://via.placeholder.com/150',
    price: 230000
  },
  {
    id: 8,
    brand: 'G-Shock',
    name: 'GM-B2100',
    image: 'https://via.placeholder.com/150',
    price: 230000
  }
])
</script>

<style scoped>
.section {
  margin-bottom: 2rem;
}

.section h2 {
  margin-bottom: 1rem;
  font-size: 1.25rem;
}

.product-card {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 8px;
  text-align: center;
}

.product-card img {
  width: 100%;
  height: auto;
  border-radius: 6px;
}

.brand {
  font-size: 0.9rem;
  color: #888;
}

.name {
  font-weight: bold;
  margin: 4px 0;
}

.price {
  color: #333;
}

.product-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
}

@media (max-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .product-grid {
    grid-template-columns: 1fr;
  }
}

</style>
  