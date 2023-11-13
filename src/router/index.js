import {createRouter, createWebHistory} from 'vue-router'
import PageNotFound from "@/public/pages/page-not-found.component.vue";
import userProfile from "@/creditcar/profiles/pages/user-profile.vue";
import home from "@/creditcar/home/pages/home.component.vue";
import PaymentEstimator from "@/creditcar/payment_estimator/pages/payment-estimator.component.vue";
import GeneratedPlan from "@/creditcar/payment_estimator/pages/generated-plan.component.vue";
import Login from "@/public/pages/login.component.vue";
import Signup from "@/public/pages/signup.component.vue";
import PasswordReset from "@/public/pages/password-reset.component.vue";
import SitePolicy from "@/public/pages/site-policy.component.vue";

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
            path:'/generated-plan',
            component: GeneratedPlan
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
            path: "/password-reset",
            component: PasswordReset,
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
