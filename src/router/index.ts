import Post from '@/views/Post.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Post,
    },
    {
      path: '/post',
      name: 'post',
      component: () => import('../views/Post.vue'),
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: () => import('../views/AboutView.vue'),
    // },
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: () => import('../views/user/Login.vue'),
    // },
    // {
    //   path: '/register',
    //   name: 'register',
    //   component: () => import('../views/user/Register.vue'),
    // },
  ],
})

export default router
