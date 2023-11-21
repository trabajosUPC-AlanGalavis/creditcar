import {createRouter, createWebHistory} from 'vue-router'
import PageNotFound from "@/public/pages/page-not-found.component.vue";
import userProfile from "@/creditcar/profiles/pages/user-profile.vue";
import home from "@/creditcar/home/pages/home.component.vue";
import Login from "@/public/pages/login.component.vue";
import Signup from "@/public/pages/signup.component.vue";
import SitePolicy from "@/public/pages/site-policy.component.vue";
import PaymentEstimator from "@/creditcar/payments/pages/payment-estimator.component.vue";
import GeneratedPayment from "@/creditcar/payments/pages/generated-payment.component.vue";
import PaymentHistory from "@/creditcar/payments/pages/payment-history.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/:notFound",
            component: PageNotFound
        },
        {
            path: '/home',
            component: home
        },
        {
            path: '/payment-estimator/vehicle/:id',
            name: 'payment-estimator',
            component: PaymentEstimator
        },
        {
            path:'/generated-payment/:id',
            name: 'generated-payment',
            component: GeneratedPayment
        },
        {
            path:'/payment-history',
            component: PaymentHistory
        },
        {
            path: "/",
            redirect: "/login",
        },
        {
            path: "/login",
            component: Login,
        },
        {
            path: "/signup",
            component: Signup,
        },
        {
            path: "/site-policy",
            component: SitePolicy,
        },
        {
            path: '/profile',
            component: userProfile
        }
    ]
})

export default router
