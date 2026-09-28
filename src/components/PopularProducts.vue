<template>
  <div class="section">
    <h2>상품 배너 제목</h2>
    <div v-if="loading" class="state">상품을 불러오는 중입니다.</div>
    <div v-else-if="error" class="state error">{{ error }}</div>
    <div v-else class="product-grid">
      <button v-for="item in products" :key="item.id" class="product-card" type="button" @click="goToDetail(item.id)">
        <img :src="item.imageUrl" :alt="item.name" />
        <p class="brand">{{ item.brand }}</p>
        <p class="name">{{ item.name }}</p>
        <p class="price">{{ formatPrice(item.salePrice || item.price) }}원</p>
      </button>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const products = ref([])
const loading = ref(true)
const error = ref('')

const loadProducts = async () => {
  try {
    const response = await axios.get('http://localhost:8000/products/list')
    products.value = response.data
  } catch (e) {
    console.error('상품 목록 조회 실패', e)
    error.value = e.response?.data?.message || '상품 목록을 불러오지 못했습니다.'
  } finally {
    loading.value = false
  }
}

const goToDetail = (id) => router.push('/products/' + id)

const formatPrice = (price) => {
  const value = Number(String(price ?? '0').replace(/[^0-9]/g, ''))
  return value.toLocaleString('ko-KR')
}

onMounted(loadProducts)
</script>

<style scoped>
.section { margin-bottom: 2rem; }
.section h2 { margin-bottom: 1rem; font-size: 1.25rem; }
.product-card { display: block; width: 100%; background-color: white; border: 1px solid #ddd; border-radius: 8px; padding: 8px; text-align: center; cursor: pointer; font: inherit; }
.product-card:hover { transform: translateY(-2px); }
.product-card img { width: 100%; height: auto; aspect-ratio: 1 / 1; object-fit: contain; border-radius: 6px; }
.brand { font-size: 0.9rem; color: #888; }
.name { font-weight: bold; margin: 4px 0; }
.price { color: #333; }
.product-grid { display: grid; gap: 16px; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); }
.state { padding: 32px; text-align: center; color: #555; }
.error { color: #d32f2f; }
@media (max-width: 768px) { .product-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 480px) { .product-grid { grid-template-columns: 1fr; } }
</style>
