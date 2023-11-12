<script>
import ButtonPrimary from "@/creditcar/shared/components/button-primary.component.vue";

export default {
  name: "generated-plan",
  components: {ButtonPrimary},
}

</script>

<template>
  <div class="mb-6">
    <div class="flex items-center h-fit mb-20 bg-gray-200">
      <div class="w-full md:w-1/2 text-center my-20 mx-5">
        <p class="text-6xl font-bold mb-4">Plan de pagos resultante</p>
      </div>
    </div>
  </div>

  <div class="max-w-4xl mx-auto">
    <pv-card class="card mt-0 md:mx-50 md:px-5">
      <template #content>
        <h2 class="text-center font-bold">Información del vehículo</h2>
        <p>Tipo de moneda</p>
        <p>Tasa de interés</p>
        <p>Frecuencia de pago</p>
        <p>Plazo de pago</p>
        <p>Cuota final</p>
        <h2 class="text-center font-bold">Resultados</h2>
        <p>TEA</p>
        <p>TCEA</p>
        <p>VAN</p>
        <p>TIR</p>
      </template>
    </pv-card>
  </div>

</template>

<style scoped>

</style>