<template>
    <div class="mobile-menu">
      <div class="mobile-menu__overlay" @click="$emit('close')"></div>
      <div class="mobile-menu__content">
        <button class="close-btn" @click="$emit('close')">X</button>
        <router-link to="/explore" class="menu-item" @click="$emit('close')">탐색</router-link>
        <router-link to="/alerts" class="menu-item" @click="$emit('close')">가격 알림</router-link>
        <router-link to="/stores" class="menu-item" @click="$emit('close')">매장 찾기</router-link>
        <router-link to="/chat" class="menu-item" @click="$emit('close')">채팅</router-link>
        <div class="auth-buttons">
          <button class="login-btn">로그인</button>
          <button class="signup-btn">회원가입</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .mobile-menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    z-index: 999;
  }
  
  .mobile-menu__overlay {
    flex: 1;
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  .mobile-menu__content {
    width: 250px;
    background-color: #fff;
    padding: 20px;
    display: flex;
    flex-direction: column;
  }
  
  .close-btn {
    align-self: flex-end;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
  }
  
  .menu-item {
    margin: 15px 0;
    font-size: 18px;
    text-decoration: none;
    color: #333;
  }
  
  .auth-buttons {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .login-btn,
  .signup-btn {
    background: none;
    border: 1px solid #aaa;
    padding: 10px;
    cursor: pointer;
  }
  </style>
  