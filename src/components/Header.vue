<template>
    <header class="header">
      <div class="header__left">
        <router-link to="/" class="logo">BrandHunt</router-link>
      </div>
  
      <nav class="header__center" v-if="!isMobile">
        <router-link to="/explore" class="nav-item">탐색</router-link>
        <router-link to="/alerts" class="nav-item">가격 알림</router-link>
        <router-link to="/stores" class="nav-item">매장 찾기</router-link>
        <router-link to="/chat" class="nav-item">채팅</router-link>
      </nav>
  
      <div class="header__right">
        <div v-if="!isMobile">
          <button class="login-btn" @click="goToLogin">로그인</button>
          <button class="signup-btn" @click="goToSignup">회원가입</button>
        </div>
        <div v-else>
          <button class="hamburger" @click="toggleMobileMenu">☰</button>
        </div>
      </div>
  
      <!-- 모바일 메뉴 -->
      <MobileMenu v-if="isMobileMenuOpen" @close="toggleMobileMenu" />
    </header>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  import { useRouter } from 'vue-router';
  import MobileMenu from './MobileMenu.vue';
  
  const router = useRouter();
  const isMobile = ref(false);
  const isMobileMenuOpen = ref(false);
  
  const goToLogin = () => {
    router.push('/login');
  };

  const goToSignup = () => {
    router.push('/signup');
  };

  const checkIsMobile = () => {
    isMobile.value = window.innerWidth <= 768;
  };
  
  const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
  };
  
  onMounted(() => {
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
  });
  
  onUnmounted(() => {
    window.removeEventListener('resize', checkIsMobile);
  });
  </script>
  
  <style scoped>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    height: 60px;
    background-color: #ffffff;
    border-bottom: 1px solid #eee;
  }
  
  .header__left .logo {
    font-weight: bold;
    font-size: 24px;
    color: #333;
    text-decoration: none;
  }
  
  .header__center {
    display: flex;
    gap: 20px;
  }
  
  .nav-item {
    text-decoration: none;
    color: #555;
    font-size: 16px;
  }
  
  .nav-item:hover {
    color: #000;
  }
  
  .header__right {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .login-btn,
  .signup-btn,
  .hamburger {
    background: none;
    border: none;
    font-size: 16px;
    cursor: pointer;
  }
  
  .hamburger {
    font-size: 26px;
  }
  
  @media (max-width: 768px) {
    .header__center {
      display: none;
    }
  }
  </style>
  