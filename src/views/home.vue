<template>
  <div class="home-page">
    <section class="scraping-test">
      <div>
        <h2>스크래핑 테스트</h2>
        <p>나이키와 아디다스 상품을 수집하고 DB에 저장합니다.</p>
      </div>
      <button type="button" :disabled="scraping" @click="runScraping">
        {{ scraping ? '스크래핑 진행 중...' : '나이키·아디다스 스크래핑 실행' }}
      </button>
      <p v-if="result" class="success">
        완료: 처리 {{ result.total }}개 / 신규 저장 {{ result.inserted }}개 / 기존 상품 확인 {{ result.updated }}개
      </p>
      <p v-if="error" class="error">{{ error }}</p>
    </section>

    <HotKeywords />
    <SearchBar />
    <PopularProducts />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import SearchBar from '../components/SearchBar.vue'
import HotKeywords from '../components/HotKeywords.vue'
import PopularProducts from '@/components/PopularProducts.vue'

const scraping = ref(false)
const result = ref(null)
const error = ref('')

const runScraping = async () => {
  if (scraping.value) return

  scraping.value = true
  result.value = null
  error.value = ''

  try {
    const accessToken = localStorage.getItem('accessToken')
    const response = await axios.post(
      'http://localhost:8000/admin/scraping',
      {},
      {
        withCredentials: true,
        headers: accessToken
          ? { Authorization: `Bearer ${accessToken}` }
          : {}
      }
    )

    result.value = response.data
  } catch (e) {
    console.error('스크래핑 실행 실패', e)

    if (e.response?.status === 401) {
      error.value = '로그인이 필요합니다.'
    } else if (e.response?.status === 403) {
      error.value = '관리자 계정으로 로그인해야 실행할 수 있습니다.'
    } else {
      error.value = e.response?.data?.message || '스크래핑에 실패했습니다. 백엔드 서버와 로그를 확인하세요.'
    }
  } finally {
    scraping.value = false
  }
}
</script>

<style scoped>
.home-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.scraping-test {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px 20px;
  margin-bottom: 24px;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fafafa;
}

.scraping-test h2 {
  margin: 0 0 6px;
  font-size: 1.1rem;
}

.scraping-test p {
  margin: 0;
}

.scraping-test button {
  margin-left: auto;
  padding: 10px 16px;
  border: 0;
  border-radius: 6px;
  background: #222;
  color: #fff;
  cursor: pointer;
}

.scraping-test button:disabled {
  cursor: wait;
  opacity: 0.6;
}

.scraping-test .success,
.scraping-test .error {
  flex-basis: 100%;
}

.scraping-test .success {
  color: #187245;
}

.scraping-test .error {
  color: #c62828;
}
</style>
