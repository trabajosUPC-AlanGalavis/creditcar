<script>

import {creditcarApiService} from "@/creditcar/services/creditcar-api.service";

export default {
  name: "home",
  data() {
    return {
      creditcarApi: null,
      vehicles: [],
      searchTerm: "",
      hoverVehicle: null,
    };
  },
  created() {
    this.creditcarApi = new creditcarApiService();
    this.creditcarApi.getVehicles().then((response) => {
      this.vehicles = response.data;
    });
  },
  computed: {
    filteredVehicles() {
      return this.vehicles.filter((vehicle) =>
          vehicle.brand.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          vehicle.model.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
  },
  methods: {
    showShadow(vehicleId) {
      this.hoverVehicle = vehicleId;
    },
    hideShadow(vehicleId) {
      this.hoverVehicle = null;
    },
  }
};
</script>

<template>
  <div class="mb-6">
    <div class="shadow hero flex items-center h-fit">
      <div class="w-full md:w-1/2 text-center my-40 mx-5">
        <p class="text-6xl md:text-7xl font-bold mb-4 text-white">Bienvenido a <span
            class="text-red-500">CreditCar</span>
        </p>
        <p class="text-xl text-white">Elige tu vehículo soñado y organiza un plan de pagos</p>
      </div>
    </div>

    <div class="text-center">
      <div class="bg-gray-200 pt-6 pb-2 mb-4">
      <p class="text-5xl font-bold mb-5 ">Descubre los vehículos disponibles</p>
      <div>
        <pv-input-text
            id="search"
            type="text"
            name="search"
            placeholder="Buscar inventario..."
            v-model="searchTerm"
            @input="filterVehicles"
            class="rounded-input bg-transparent rounded-full border border-red-500 px-3 py-2 mb-5">
        </pv-input-text>
      </div>
      </div>
      <div class="flex flex-wrap justify-center mx-5">
        <router-link
            v-for="vehicle in filteredVehicles"
            :to="'/payment-estimator/vehicle/' + vehicle.id"
            class="m-3 w-full md:w-3 relative"
            :key="vehicle.id"
            @mouseenter="showShadow(vehicle.id)"
            @mouseleave="hideShadow(vehicle.id)">
          <pv-card class="shadow" :class="{ 'card-hover': hoverVehicle === vehicle.id }">
            <template #content>
              <img :src="vehicle.image">
              <p class="text-lg"><b>{{ vehicle.brand }}</b> {{ vehicle.model }}</p>
              <p>{{ vehicle.price }}</p>
            </template>
          </pv-card>
        </router-link>
      </div>

      <div v-if="filteredVehicles.length === 0" class="text-red-500">
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


.card-hover {
  box-shadow: 0 7px 12px rgba(0, 0, 0, 0.14);
}

</style>