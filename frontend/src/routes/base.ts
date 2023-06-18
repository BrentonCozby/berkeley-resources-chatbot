import * as VueRouter from 'vue-router'

import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage.vue'
import HomePage from '@/pages/HomePage/HomePage.vue'

const routes: VueRouter.RouteRecordRaw[] = [
  { path: '/', name: 'HomePage', component: HomePage },
  { path: '/:catchAll(.*)*', name: 'NotFoundPage', component: NotFoundPage },
]

export const mainRouter = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
})
