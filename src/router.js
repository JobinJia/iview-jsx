import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue')
    }, {
      path: '/head',
      name: 'head',
      component: () => import('@/views/jsx-table-head.vue')
    }, {
      path: '/modal',
      name: 'modal',
      component: () => import('@/views/jsx-modal.vue')
    }, {
      path: '/test',
      name: 'test',
      component: () => import('@/views/test.vue')
    }
  ]
})
