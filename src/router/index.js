import {createRouter, createWebHistory} from 'vue-router'
import PageNotFound from "@/public/pages/page-not-found.component.vue";
import simulator from "@/creditcar/simulator/pages/simulator.component.vue";
import userProfile from "@/creditcar/profiles/pages/user-profile.vue";
import home from "@/public/pages/home.component.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/:notFound",
            component: PageNotFound
        },
        {
            path: '/',
            redirect: '/hero'
        },
        {
            path: '/hero',
            component: home
        },
        {
            path: '/simulator',
            component: simulator
        },
        {
            path: '/profile',
            component: userProfile
        }
    ]
})

export default router
