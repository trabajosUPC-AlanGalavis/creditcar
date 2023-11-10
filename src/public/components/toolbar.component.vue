<script>
import {creditcarApiService} from "@/creditcar/services/creditcar-api.service";

export default {
  name: "toolbar",
  data() {
    return {
      creditcarApi: null,
      full_name: '',
      user_image: '',
      showMenu: false
    };
  },
  created() {
    this.creditcarApi = new creditcarApiService();
    this.creditcarApi.getUsers()
        .then((response) => {
          console.log(this.response);
          const first_name = response.data[0].first_name;
          const last_name = response.data[0].last_name;
          this.full_name = first_name + ' ' + last_name;
          this.user_image = response.data[0].image;
        });
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
          <router-link to="/">
            <div class="font-bold leading-relaxed flex mr-4 py-2 whitespace-nowrap items-center">
              <img src="/assets/logo-white.png" alt="logo" width="30" height="30" class="mr-2">
              <p class="text-red-500">CreditCar</p>
            </div>
          </router-link>
          <button class="cursor-pointer leading-none rounded block md:hidden outline-none focus:outline-none"
                  type="button" @click="toggleNavbar">
            <i class="fa fa-bars"></i>
          </button>
        </div>
        <div :class="{'hidden': !showMenu, 'flex': showMenu}" class="md:flex md:flex-grow items-center">
          <ul class="flex flex-col md:flex-row list-none ml-auto">
            <li>
              <router-link to="/home">
                <div class="px-3 py-2 items-center font-bold ml-2 flex">
                  <p class="text-black">Buscar inventario</p>
                </div>
              </router-link>
            </li>
            <li>
              <router-link to="/vehicle-management">
                <div class="px-3 py-2 items-center font-bold ml-2 flex">
                  <p class="text-black">Mis vehículos</p>
                </div>
              </router-link>
            </li>
            <li>
              <router-link to="/profile">
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