import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
                  name: 'center',
                  path: '/Center',
                  component: import('@/views/IndexView/Center.vue')
              },
              {
                  name: 'setting',
                  path: '/Setting',
                  component: import('@/views/IndexView/Setting.vue')
              }
          ]
      }
  ]
})

export default router
