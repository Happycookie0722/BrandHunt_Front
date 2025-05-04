<template>
  <div class="search-bar">
    <div class="trending-wrapper">
      <TrendingKeyword />
    </div>
    <div class="search-bar-child">
      <input type="text" placeholder="브랜드, 상품명을 검색하세요" />
      <button class="search-button">
        <img src="@/assets/x-icon.svg" alt="삭제" />
      </button>
      <button class="search-button">
        <img src="@/assets/search-icon.svg" alt="검색" />
      </button>
    </div>
  </div>
</template>

<script setup>
import TrendingKeyword from '@/components/TrendingKeyword.vue';
</script>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative; /* 꼭 필요 */
  overflow: visible; /* 🔥 자식이 커지면 넘칠 수 있게 허용 */
}

.search-bar-child {
  display: flex;
  justify-content: space-between;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 6px;
  gap: 8px;
}

.search-bar-child input {
  width: 100%;
  border: none;
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 16px;
}

.trending-wrapper {
  position: relative; /* 🔥 추가: 여기다가 relative */
  width: 200px; /* 너비는 TrendingKeyword랑 맞춰야겠지? */
}

.search-button img {
  width: 20px;
  height: 20px;
}
</style>
