import * as VueRouter from 'vue-router'

import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage.vue'
import HomePage from '@/pages/HomePage/HomePage.vue'
import AssistantWelcomePage from '@/pages/AssistantWelcomePage/AssistantWelcomePage.vue'
import AssistantChatPage from '@/pages/AssistantChatPage/AssistantChatPage.vue'
import EntrepreneurshipDirectoryPage from '@/pages/EntrepreneurshipDirectoryPage/EntrepreneurshipDirectoryPage.vue'
import InnovationRoadmapPage from '@/pages/InnovationRoadmapPage/InnovationRoadmapPage.vue'

const routes: VueRouter.RouteRecordRaw[] = [
  { path: '/', name: 'HomePage', component: HomePage },
  { path: '/assistant-welcome', name: 'AssistantWelcomePage', component: AssistantWelcomePage },
  { path: '/assistant-chat', name: 'AssistantChatPage', component: AssistantChatPage },
  { path: '/entrepreneurship-directory', name: 'EntrepreneurshipDirectoryPage', component: EntrepreneurshipDirectoryPage },
  { path: '/innovation-roadmap-page', name: 'InnovationRoadmapPage', component: InnovationRoadmapPage },
  { path: '/:catchAll(.*)*', name: 'NotFoundPage', component: NotFoundPage },
]

export const mainRouter = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
})
