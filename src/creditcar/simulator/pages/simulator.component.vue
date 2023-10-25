<script>
import ButtonPrimary from "@/creditcar/profiles/components/button-primary.component.vue";
import axios from "axios";

export default {
  name: "simulator",
  components: {ButtonPrimary},
  data() {
    return {
      currency: "usd",
      rateType: "effective",
      rateValue: 0,
      closingDate: 0,
      gracePeriod: "total",
      vehicleCost: 0,
      downPayment: 0,
      creditLifeInsurance: 0,
      vehicleInsurance: 0,
    }
  },
  methods: {
    async handleSubmit() {
      await axios.post('/simulator', {
        currency: this.currency,
        rateType: this.rateType,
        rateValue: this.rateValue,
        closingDate: this.closingDate,
        gracePeriod: this.gracePeriod,
        vehicleCost: this.vehicleCost,
        downPayment: this.downPayment,
        creditLifeInsurance: this.creditLifeInsurance,
        vehicleInsurance: this.vehicleInsurance,
      });
    }
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <pv-card class="card md:mx-50 md:px-5">
      <template #header>
        <div class="mb-3">
          <h2 class="text-center pt-5 text-3xl">Simulador de plan de pagos de crédito vehicular</h2>
        </div>
      </template>
      <template #content>
        <form class="px-5" @submit.prevent="handleSubmit">
          <ol>
            <li class="mb-5">
              <p class="text-lg">Elige el tipo de moneda</p>
              <div class="flex space-x-3">
                <input type="radio"
                       id="usd"
                       name="currency"
                       checked
                       class="cursor-pointer">
                <label for="usd">Dólares ($)</label>
                <input type="radio"
                       id="soles"
                       name="currency"
                       class="cursor-pointer">
                <label for="soles">Soles (S/)</label>
              </div>
            </li>
            <li class="mb-5">
              <p class="text-lg">Elige la tasa de interés a trabajar</p>
              <div class="flex space-x-4 mb-4">
                <input type="radio"
                       id="effective"
                       name="rate-type"
                       checked
                       class="cursor-pointer">
                <label for="effective">Efectiva</label>
                <input type="radio"
                       id="nominal"
                       name="rate-type"
                       class="cursor-pointer">
                <label for="nominal">Nominal</label>
              </div>
              <label for="rate-value" class="font-normal">2.1 Ingresa la tasa de interés</label>
              <pv-input-number
                  inputId="rate-value"
                  suffix="%"
                  name="rate-value"
                  placeholder="Tasa de interés (%)"
                  required
                  min="0"
                  class="w-full border rounded-md"
                  v-model="rateValue">
              </pv-input-number>
            </li>
            <li class="mb-5">
              <label for="closing-date" class="text-lg">¿Cuál es el plazo de pago?</label>
              <pv-input-number
                  inputId="closing-date"
                  suffix=" meses"
                  name="closing-date"
                  placeholder="Plazo de pago (Meses)"
                  min="0"
                  required
                  class="w-full border rounded-md"
                  v-model="closingDate">
              </pv-input-number>
            </li>
            <li class="mb-5">
              <p class="text-lg">Selecciona el período de gracia</p>
              <div class="flex space-x-4">
                <input type="radio"
                       id="total"
                       name="grace-period"
                       checked
                       class="cursor-pointer">
                <label for="total">Total</label>
                <input type="radio"
                       id="partial"
                       name="grace-period"
                       class="cursor-pointer">
                <label for="partial">Parcial</label>
              </div>
            </li>
            <li class="mb-5">
              <label for="vehicle-cost" class="text-lg">¿Cuál es el costo del vehículo?</label>
              <pv-input-number
                  inputId="vehicle-cost"
                  prefix="$ "
                  name="vehicle-cost"
                  placeholder="Costo del vehículo"
                  required
                  min="0"
                  class="w-full border rounded-md"
                  v-model="vehicleCost">
              </pv-input-number>
            </li>
            <li class="mb-5">
              <label for="down-payment" class="text-lg">¿Cuál es el porcentaje de la cuota inicial?</label>
              <pv-input-number
                  inputId="down-payment"
                  suffix="%"
                  name="down-payment"
                  placeholder="Cuota inicial (%)"
                  required
                  min="0"
                  class="w-full border rounded-md"
                  v-model="downPayment">
              </pv-input-number>
            </li>
            <li class="mb-5">
              <label for="credit-life-insurance" class="text-lg">¿Cuál es la tasa del seguro de desgravamen?</label>
              <pv-input-number
                  inputId="credit-life-insurance"
                  suffix="%"
                  name="credit-life-insurance"
                  placeholder="Tasa del seguro de desgravamen (%)"
                  required
                  min="0"
                  class="w-full border rounded-md"
                  v-model="creditLifeInsurance">
              </pv-input-number>
            </li>
            <li class="mb-5">
              <label for="vehicle-life-insurance" class="text-lg">¿Cuál es la tasa del seguro vehicular?</label>
              <pv-input-number
                  inputId="vehicle-insurance"
                  suffix="%"
                  name="vehicle-insurance"
                  placeholder="Tasa del seguro vehicular (%)"
                  required
                  min="0"
                  class="w-full border rounded-md"
                  v-model="vehicleInsurance">
              </pv-input-number>
            </li>
          </ol>
          <div class="text-center">
            <button-primary
                class="px-6 mb-3"
                :text="'Continuar'"
                :buttonColor="'var(--primary-blue)'"
                :buttonTextColor="'var(--primary-white)'"
                :buttonBorderColor="'var(--primary-blue)'"
                type="submit">
            </button-primary>
          </div>
        </form>
      </template>
    </pv-card>
  </div>
</template>


<style scoped>

* {
  font-family: var(--font-primary);
}

.card {
  border-radius: 20px;
}

h2, label, p, ol {
  color: var(--primary-blue);
  font-weight: bold;
}

ol {
  list-style: number;
}
</style>