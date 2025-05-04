<template>
  <Header v-if="!hiddenHeaderRoutes.includes(route.path)" />
  <body>
    <router-view />
  </body>
</template>

<script setup>
import Header from './components/Header.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
// 헤더 숨기고 싶은 경로들
const hiddenHeaderRoutes = ['/login', '/signup'];
</script>

<style scoped>
:global(body) {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:global(#app) {
  width: 100%;
}
</style>
