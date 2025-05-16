<template>
  <HotKeywords />
  <div class="home-page">
    <SearchBar />
    <PopularProducts />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import SearchBar from '../components/SearchBar.vue'
import HotKeywords from '../components/HotKeywords.vue'
import PopularProducts from '@/components/PopularProducts.vue';
const router = useRouter();

</script>

<style scoped>
.home-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}
</style>