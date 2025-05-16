<template>
    <div class="login-container">
      <div class="login-box">
        <h2>회원가입</h2>
        <input type="email" v-model="email" placeholder="이메일을 입력하세요" :disabled="emailVerified"/>
        <button v-if="!emailSent" @click="sendVerificationCode" :disabled="isSending || !email">
          인증 메일 발송
        </button>
        <div v-if="emailSent && !emailVerified">
          <p>이메일을 확인해 주세요.</p>
          <button @click="resendVerificationCode" :disabled="isSending">인증 메일 재발송</button>
          <input v-model="verificationCode" placeholder="인증 코드를 입력하세요" />
          <button @click="verifyCode" :disabled="emailVerified">인증 확인</button>
        </div>
  
        <input type="text" v-model="nickname" placeholder="닉네임을 입력하세요" />
        <input type="password" v-model="password" placeholder="비밀번호를 입력하세요" />
        <input type="password" v-model="confirmPassword" placeholder="비밀번호를 다시 입력하세요" />
  
        <button @click="signup" :disabled="!emailVerified || isSending">회원가입</button>
  
        <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
        <p v-if="successMsg" class="success">{{ successMsg }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import axios from 'axios'
  import { useRouter } from 'vue-router'
  
  const email = ref('')
  const verificationCode = ref('')
  const nickname = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  
  const emailSent = ref(false)
  const emailVerified = ref(false)
  const isSending = ref(false)
  
  const errorMsg = ref('')
  const successMsg = ref('')
  
  const router = useRouter()
  
  const sendVerificationCode = async () => {
    if (!email.value || isSending.value) return
  
    try {
      isSending.value = true
      await axios.post('http://localhost:8000/auth/send-verification', {
        email: email.value,
      })
      emailSent.value = true
      errorMsg.value = ''
      alert('인증 메일을 보냈습니다.')
    } catch (e) {
      errorMsg.value = e.response?.data?.message || '인증 메일 발송 실패'
    } finally {
      isSending.value = false
    }
  }
  
  const resendVerificationCode = async () => {
    if (isSending.value) return
  
    try {
      isSending.value = true
      await axios.post('http://localhost:8000/auth/send-verification', {
        email: email.value,
      })
      errorMsg.value = ''
      alert('인증 메일을 재발송했습니다.')
    } catch (e) {
      errorMsg.value = e.response?.data?.message || '재발송 실패'
    } finally {
      isSending.value = false
    }
  }
  
  const verifyCode = async () => {
    try {
      await axios.post('http://localhost:8000/auth/verify-code', {
        email: email.value,
        code: verificationCode.value,
      })
      emailVerified.value = true
      errorMsg.value = ''
      alert('이메일 인증이 완료되었습니다.')
    } catch (e) {
      errorMsg.value = e.response?.data?.message || '인증 실패'
    }
  }
  
  const signup = async () => {
    if (password.value !== confirmPassword.value) {
      errorMsg.value = '비밀번호가 일치하지 않습니다.'
      return
    }
  
    try {
      isSending.value = true
      await axios.post('http://localhost:8000/auth/signup', {
        email: email.value,
        nickname: nickname.value,
        password: password.value,
      })
      successMsg.value = '회원가입이 완료되었습니다!'
      errorMsg.value = ''
      alert('회원가입 성공! 로그인 페이지로 이동합니다.')
      router.push('/login')
    } catch (e) {
      errorMsg.value = e.response?.data?.message || '회원가입 실패'
    } finally {
      isSending.value = false
    }
  }
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
    background-color: #10b981;
    color: white;
    padding: 0.6rem;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    cursor: pointer;
  }
  
  .login-box button:disabled {
    background-color: #a7f3d0;
    cursor: not-allowed;
  }
  
  .login-box button:hover:not(:disabled) {
    background-color: #059669;
  }
  
  .error {
    color: red;
    font-size: 0.9rem;
    text-align: center;
  }
  
  .success {
    color: green;
    font-size: 0.9rem;
    text-align: center;
  }
  </style>
  