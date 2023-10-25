import {createRouter, createWebHistory} from 'vue-router'
import PageNotFound from "@/public/pages/page-not-found.component.vue";
import simulator from "@/creditcar/simulator/pages/simulator.component.vue";
import userProfile from "@/creditcar/profiles/pages/user-profile.vue";
import home from "@/creditcar/simulator/pages/home.component.vue";
import CarDetails from "@/creditcar/simulator/pages/car-details.component.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/:notFound",
            component: PageNotFound
        },
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            component: home
        },
        {
            path: '/car/:id',
            name: 'car-details',
            component: CarDetails
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
