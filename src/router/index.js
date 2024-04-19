import { createRouter, createWebHistory } from 'vue-router'
import {responseMessage} from "@/api/request.js";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      {
          path: '/',
          redirect: '/MyDisk'
      },
      {
          name: 'login',
          path: '/login',
          component: import('@/views/LoginView/LoginView.vue')
      },
      {
          name: 'index',
          path: '/',
          component: import('@/views/IndexView/IndexView.vue'),
          children: [
              {
                  name: 'MyDisk',
                  path: '/MyDisk',
                  component: import('@/views/IndexView/MyDisk.vue')
              },
              {
                  name: 'PtoP',
                  path: '/P-To-P',
                  component: import('@/views/IndexView/P-To-P.vue')
              },
              {
                  name: 'Center',
                  path: '/Center',
                  component: import('@/views/IndexView/Center.vue')
              },
              {
                  name: 'Cetting',
                  path: '/Setting',
                  component: import('@/views/IndexView/Setting.vue')
              },
              {
                  name: 'Share',
                  path: '/Share/:secret?',
                  component: import('@/views/IndexView/ShareView.vue')
              }
          ]
      }
  ]
})

router.beforeEach((to, from, next) => {

    let token = localStorage.getItem('token')
    if (to.name !== 'login' && (token === '' || token === undefined || token === null)) {
        responseMessage(0, '未登录')
        router.push({ name: 'login' })
    } else {
        next();
    }
})

export default router
