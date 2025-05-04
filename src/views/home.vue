<template>
  <HotKeywords />
  <SearchBar />
</template>

<script setup>
import { useRouter } from 'vue-router';
import SearchBar from '../components/SearchBar.vue'
import HotKeywords from '../components/HotKeywords.vue'
const router = useRouter();

</script>

<style scoped>
</style>