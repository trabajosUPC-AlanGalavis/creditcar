import {createRouter, createWebHistory} from 'vue-router'
import PageNotFound from "@/public/pages/page-not-found.component.vue";
import simulator from "@/credit-car/pages/simulator.component.vue";
import userProfile from "@/credit-car/pages/user-profile.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/:notFound",
            component: PageNotFound,
        },
        {
            path: '/',
            redirect: '/simulator'
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
