<template>
    <div class="login-container">
      <div class="login-box">
        <h2>로그인</h2>
        <input
          type="text"
          v-model="id"
          placeholder="이메일을 입력하세요"
        />
        <input
          type="password"
          v-model="pass"
          placeholder="비밀번호를 입력하세요"
        />
        <button @click="login">로그인</button>
        <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import axios from 'axios';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const id = ref('');
  const pass = ref('');
  const errorMsg = ref('');
  
  const login = async () => {
    try {
      const res = await axios.post(
        'http://localhost:8000/auth/login',
        {
          email: id.value,
          password: pass.value,
        },
        {
          withCredentials: true, // 쿠키 or CORS 용도
        }
      );
  
      const { accessToken, refreshToken } = res.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
  
      // TODO: 로그인 성공 후 페이지 이동
      router.push('/');
  
    } catch (e) {
      console.error('❌ 로그인 실패', e);
      errorMsg.value = e.response?.data?.message || '로그인에 실패했습니다.';
    }
  };
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f3f4f6;
  }
  
  .login-box {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    width: 320px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .login-box h2 {
    text-align: center;
    margin-bottom: 1rem;
  }
  
  .login-box input {
    padding: 0.6rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 1rem;
  }
  
  .login-box button {
    background-color: #3b82f6;
    color: white;
    padding: 0.6rem;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    cursor: pointer;
  }
  
  .login-box button:hover {
    background-color: #2563eb;
  }
  
  .error {
    color: red;
    font-size: 0.9rem;
    text-align: center;
  }
  </style>
  