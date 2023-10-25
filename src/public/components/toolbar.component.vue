<script>
export default {
  name: "toolbar",
  data() {
    return {
      showMenu: false
    };
  },
  methods: {
    toggleNavbar() {
      this.showMenu = !this.showMenu;
    }
  }
};
</script>

<template>
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
          <li class="nav-item">
            <router-link to="/profile">
              <div class="px-3 py-2 flex items-center font-bold leading-snug">
                <span class="ml-2 flex items-center">
                  <pv-avatar image="" shape="circle" class="border-2 border-red-500 mr-2"/>
                  Profile
                </span>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.header {
  background: inherit;
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: var(--white);
  color: var(--black);
  font-family: var(--font-primary);
  font-size: var(--medium-text-regular-size);
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
}


</style>