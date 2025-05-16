import { createRouter, createWebHistory } from "vue-router";
// import main from "./views/home.vue"

// 라우트(routes) 정의 : URL 요청에 대해 어떤 페이지(컴포넌트)를 보여줄지에 대한 매핑정보를 정의
// 기존에는 import main from "./views/home.vue" 후에 routes의 component에 main을 주입시켜 앱 시작시 한번에 모두 가져와서 사용
// 최근에는 요청 시 필요한 것만 가져오는 lazy-loading 방식인 동적 import를 사용
// component: () => import('...')

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/home.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/signup.vue')
  },
];
const router = createRouter({
  history: createWebHistory('/'),
  routes,
});
  
export default router;