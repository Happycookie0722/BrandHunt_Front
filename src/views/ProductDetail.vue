<template>
  <div class="product-detail-page">
    <button class="back-button" @click="router.back()">← 목록으로</button>
    <div v-if="loading" class="state">상품 정보를 불러오는 중입니다.</div>
    <div v-else-if="error" class="state error">{{ error }}</div>
    <div v-else-if="product" class="product-detail">
      <div class="image-panel">
        <img :src="product.imageUrl" :alt="product.name" class="product-image" />
      </div>
      <div class="info-panel">
        <p class="brand">{{ product.brand }}</p>
        <h1>{{ product.name }}</h1>
        <div v-if="hasSale" class="price-area">
          <span class="original-price">{{ formatPrice(product.price) }}원</span>
          <span class="discount">{{ discountRate }}%</span>
          <strong class="sale-price">{{ formatPrice(product.salePrice) }}원</strong>
        </div>
        <div v-else class="price-area">
          <strong class="normal-price">{{ formatPrice(product.price) }}원</strong>
        </div>
        <a v-if="product.productUrl" :href="product.productUrl" target="_blank" rel="noopener noreferrer" class="product-link">
          제품 상세페이지 보러가기
        </a>
        <button class="alert-button" :class="{ active: alertEnabled }" @click="toggleAlert">
          {{ alertEnabled ? '가격 알림 해제하기' : '상품가격 알림받기' }}
        </button>
        <p class="alert-description">할인가가 변동되면 변경된 가격을 알림으로 알려드립니다.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const product = ref(null)
const loading = ref(true)
const error = ref('')
const alertEnabled = ref(false)
const API_BASE_URL = 'http://localhost:8000'

const accessToken = () => localStorage.getItem('accessToken')
const authConfig = () => ({
  withCredentials: true,
  headers: { Authorization: 'Bearer ' + accessToken() }
})

const hasSale = computed(() => {
  const price = Number(String(product.value?.price ?? '').replace(/[^0-9]/g, ''))
  const salePrice = Number(String(product.value?.salePrice ?? '').replace(/[^0-9]/g, ''))
  return salePrice > 0 && price > 0 && salePrice < price
})

const discountRate = computed(() => {
  if (!hasSale.value) return 0
  const price = Number(String(product.value.price).replace(/[^0-9]/g, ''))
  const salePrice = Number(String(product.value.salePrice).replace(/[^0-9]/g, ''))
  return Math.round(((price - salePrice) / price) * 100)
})

const formatPrice = (price) => {
  const value = Number(String(price ?? '0').replace(/[^0-9]/g, ''))
  return value.toLocaleString('ko-KR')
}

const loadProduct = async () => {
  try {
    const response = await axios.get(API_BASE_URL + '/products/' + route.params.id)
    product.value = response.data
    if (accessToken()) {
      try {
        const alertResponse = await axios.get(
          API_BASE_URL + '/products/' + route.params.id + '/price-alert',
          authConfig()
        )
        alertEnabled.value = alertResponse.data
      } catch {
        alertEnabled.value = false
      }
    }
  } catch (e) {
    console.error('상품 상세 조회 실패', e)
    error.value = e.response?.data?.message || '상품 정보를 불러오지 못했습니다.'
  } finally {
    loading.value = false
  }
}

const toggleAlert = async () => {
  if (!accessToken()) {
    alert('가격 알림을 받으려면 로그인해주세요.')
    router.push('/login')
    return
  }
  try {
    const response = await axios.post(
      API_BASE_URL + '/products/' + route.params.id + '/price-alert',
      {},
      authConfig()
    )
    alertEnabled.value = response.data
  } catch (e) {
    console.error('가격 알림 설정 실패', e)
    alert(e.response?.data?.message || '가격 알림 설정에 실패했습니다.')
  }
}

onMounted(loadProduct)
</script>

<style scoped>
.product-detail-page { max-width: 1180px; margin: 0 auto; padding: 32px 24px 64px; }
.back-button { border: 0; background: transparent; padding: 8px 0; margin-bottom: 24px; color: #555; cursor: pointer; font-size: 15px; }
.product-detail { display: grid; grid-template-columns: minmax(0, 1fr) minmax(360px, 0.9fr); gap: 56px; align-items: start; }
.image-panel { display: flex; justify-content: center; align-items: center; min-height: 520px; background: #f7f7f7; border-radius: 16px; padding: 32px; }
.product-image { width: 100%; max-width: 560px; max-height: 620px; object-fit: contain; border-radius: 12px; }
.info-panel { padding: 24px 0; }
.brand { margin: 0 0 10px; color: #777; font-size: 15px; font-weight: 600; }
.info-panel h1 { margin: 0 0 28px; font-size: 30px; line-height: 1.35; }
.price-area { display: flex; flex-direction: column; align-items: flex-start; gap: 8px; margin-bottom: 32px; }
.original-price { color: #999; text-decoration: line-through; font-size: 16px; }
.discount { color: #e53935; font-size: 24px; font-weight: 800; }
.sale-price, .normal-price { font-size: 30px; line-height: 1.2; }
.sale-price { color: #111; }
.product-link, .alert-button { width: 100%; min-height: 54px; border-radius: 8px; font-size: 16px; font-weight: 700; cursor: pointer; }
.product-link { display: flex; align-items: center; justify-content: center; margin-bottom: 12px; background: #111; color: white; text-decoration: none; }
.alert-button { border: 1px solid #111; background: white; color: #111; }
.alert-button.active { background: #111; color: white; }
.alert-description { margin-top: 12px; color: #777; font-size: 13px; line-height: 1.5; }
.state { padding: 80px 20px; text-align: center; color: #555; }
.error { color: #d32f2f; }
@media (max-width: 768px) {
  .product-detail-page { padding: 20px 16px 48px; }
  .product-detail { grid-template-columns: 1fr; gap: 24px; }
  .image-panel { min-height: 360px; padding: 20px; }
  .info-panel h1 { font-size: 24px; }
  .sale-price, .normal-price { font-size: 26px; }
}
</style>
