<script>

import {creditcarApiService} from "@/creditcar/services/creditcar-api.service";

export default {
  name: "home",
  data() {
    return {
      creditcarApi: null,
      cars: [],
      searchTerm: "",
    };
  },
  created() {
    this.creditcarApi = new creditcarApiService();
    this.creditcarApi.getCars().then((response) => {
      this.cars = response.data;
    });
  },
  computed: {
    filteredCars() {
      return this.cars.filter((car) =>
          car.brand.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          car.model.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
  },
};
</script>

<template>
  <div class="mb-6">
    <div class="shadow hero flex items-center h-fit mb-20">
      <div class="w-full md:w-1/2 text-center my-40 mx-5">
        <p class="text-6xl md:text-7xl font-bold mb-4 text-white">Bienvenido a <span
            class="text-red-500">CreditCar</span>
        </p>
        <p class="text-xl text-white">Elige tu vehículo soñado y organiza un plan de pagos</p>
      </div>
    </div>

    <div class="text-center">
      <p class="text-5xl font-bold mb-5">Descubre los vehículos disponibles</p>
      <div>
        <pv-input-text
            id="search"
            type="text"
            name="search"
            placeholder="Buscar inventario..."
            v-model="searchTerm"
            @input="filterCars"
            class="rounded-input rounded-full border border-red-500 px-3 py-2 mb-5">
        </pv-input-text>
      </div>

      <div class="flex flex-wrap justify-center mx-5">
        <router-link
            v-for="car in filteredCars"
            :to="'/car/' + car.id"
            class="card m-3 w-full md:w-3"
            :key="car.id"
        >
          <pv-card>
            <template #content>
              <img :src="car.image">
              <p class="text-lg"><b>{{ car.brand }}</b> {{ car.model }}</p>
              <p>{{ car.price }}</p>
            </template>
          </pv-card>
        </router-link>
      </div>

      <div v-if="filteredCars.length === 0" class="text-red-500">
        <p>No se encontraron resultados.</p>
      </div>
    </div>
  </div>

</template>

<style scoped>
.hero {
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), url("../../../../assets/hero.png"), center, no-repeat;
  background-size: cover;
  background-position: center;
}

pv-input-text {
  border-radius: 20px;
  border: 2px solid #F00;
  background: #FFF;
}

.shadow {
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 1px 0 rgba(0, 0, 0, 0.20);
}

.rounded-input {
  border-radius: 3rem;
  border: solid 0.14rem;
  width: 75%;
}

:deep(.p-card .p-card-body) {
  padding: 0 !important;
}
</style>