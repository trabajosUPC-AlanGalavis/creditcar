import { createRouter, createWebHistory } from 'vue-router'
import PageNotFound from "@/public/pages/page-not-found.component.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/:notFound",
      component: PageNotFound,
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
    },
  ]
})

export default router
