<script>
export default {
  name: "home",
  data() {
    return {

    }
  },
}
</script>

<template>

  <div class="hero flex items-center h-fit mb-5">
    <div class="w-full md:w-1/2 text-center my-40 mx-5">
      <p class="text-6xl md:text-7xl font-bold mb-4 text-white">Bienvenido a <span class="text-red-500">CreditCar</span></p>
      <p class="text-xl text-white">Elige tu vehículo soñado y organiza un plan de pagos</p>
    </div>
  </div>
  <div class="text-center">
    <pv-input-text
      id="search"
      type="text"
      name="search"
      class="w-1/2 border border-red-500 px-3 py-2 mb-5">
    </pv-input-text>

    <div class="flex flex-wrap justify-center">
      <pv-card v-for="card in cards" class="m-3 w-full md:w-3">
        <template #content>
          <p class="font-bold">{{card.title}}</p>
          <p class="font-bold">{{card.description}}</p>
          <p>{{card.price}}</p>
        </template>
      </pv-card>
    </div>

  </div>
</template>

<style>
.hero {
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), url("assets/hero.png"), center, no-repeat;
  background-size: cover;
  background-position: center;
}

pv-input-text {
  border-radius: 20px;
  border: 2px solid #F00;
  background: #FFF;
}

</style>