<template>
    <div class="hot-keywords">
      <div class="keyword-slider">
        <div class="keywords">
          <span
            v-for="(keyword, index) in doubleKeywords"
            :key="index"
            class="keyword-item"
          >
            #{{ keyword }}
          </span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  
  // 인기 검색어 리스트
  const keywords = ref([]);
  
  onMounted(() => {
    keywords.value = [
      '나이키 덩크',
      '젠틀몬스터 선글라스',
      'G-Shock',
      '아디다스 이지부스트',
      '뉴발란스 530'
    ];
  });
  
  // 원래 리스트를 두 번 이어붙여서 자연스럽게 반복
  const doubleKeywords = computed(() => [...keywords.value, ...keywords.value]);
  </script>
  
  <style scoped>
  .hot-keywords {
    overflow: hidden;
    height: 40px;
    display: flex;
    align-items: center;
    background-color: #f9f9f9;
    padding: 8px 12px;
    border-radius: 8px;
  }
  
  .keyword-slider {
    display: flex;
    width: max-content;
    animation: slide 20s linear infinite;
  }
  
  .keywords {
    display: flex;
    gap: 24px;
  }
  
  .keyword-item {
    font-weight: bold;
    color: #555;
    white-space: nowrap;
  }
  
  @keyframes slide {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
  </style>
  