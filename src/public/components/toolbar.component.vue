<script>
import {creditcarApiService} from "@/creditcar/shared/services/creditcar-api.service";
import loginComponent from "@/public/pages/login.component.vue";
import axios from "axios";

export default {
  name: "toolbar",
  data() {
    return {
      creditcarApi: null,
      user_image: '',
      showMenu: false,
      full_name: '',
    };
  },
  computed: {
    logoLink() {
      const currentRoute = this.$route.path;

      const loginSignupRoute = '/login';

      const otherRoute = '/home';

      return (currentRoute === '/login' || currentRoute === '/signup') ? loginSignupRoute : otherRoute;
    },
  },
  created() {
    this.creditcarApi = new creditcarApiService();
    const updateData = () => {
      this.creditcarApi.getNames().then((response) => {
        this.full_name = response.data[0].full_name;
        this.user_image = response.data[0].image;
      });
    };
    updateData();
    setInterval(updateData, 100);
  },
  methods: {
    toggleNavbar() {
      this.showMenu = !this.showMenu;
    }
  }
};
</script>

<template>
  <div class="toolbar-container">
    <nav class="header relative flex flex-wrap items-center justify-between pt-3 pb-2">
      <div class="container mx-auto flex flex-wrap items-center justify-between">
        <div class="w-full relative flex justify-between md:w-auto px-4 md:static md:block md:justify-start">
          <router-link :to="logoLink">
            <div class="font-bold leading-relaxed flex mr-4 py-2 whitespace-nowrap items-center">
              <img src="/assets/logo.png" alt="logo" width="30" height="30" class="mr-2">
              <p class="text-red-500">CreditCar</p>
            </div>
          </router-link>
          <button class="cursor-pointer leading-none rounded block md:hidden outline-none focus:outline-none" type="button" @click="toggleNavbar">
            <i class="fa fa-bars"></i>
          </button>
        </div>
        <div :class="{'hidden': !showMenu, 'flex': showMenu}" class="md:flex md:flex-grow items-center">
          <ul class="flex flex-col md:flex-row list-none ml-auto">
            <li>
              <router-link v-if="!($route.path.includes('/login') || $route.path.includes('/signup'))" to="/home">
                <div class="px-3 py-2 items-center font-bold ml-2 flex">
                  <p class="text-black">Buscar inventario</p>
                </div>
              </router-link>
            </li>
            <li>
              <router-link v-if="!($route.path.includes('/login') || $route.path.includes('/signup'))" to="/payment-history">
                <div class="px-3 py-2 items-center font-bold ml-2 flex">
                  <p class="text-black">Mis planes de pago</p>
                </div>
              </router-link>
            </li>
            <li>
              <router-link v-if="!($route.path.includes('/login') || $route.path.includes('/signup'))" to="/profile">
                <div class="px-3 py-2 items-center font-bold ml-2 flex">
                  <pv-avatar :image="user_image" shape="circle" class="border-2 border-red-500 mr-2"/>
                  <p class="text-black">{{ full_name }}</p>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>


<style scoped>
.header {
  background: inherit;
  position: sticky;
  color: var(--black);
  font-family: var(--font-primary);
  font-size: var(--medium-text-regular-size);
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
}

.toolbar-container {
   position: sticky;
   top: 0;
   background-color: #fff;
   z-index: 100;
 }

</style>