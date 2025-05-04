// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// app.use(router)를 호출 함으로써 컴포넌트 내부에서 $router, $route 객체에 접근할 수 있다.
createApp(App).use(router).mount('#app')
