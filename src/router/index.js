import { createRouter, createWebHashHistory } from 'vue-router'

const publicRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue')
  }
];
const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes,
})

export default router
