<script>
import ButtonPrimary from "@/creditcar/shared/components/button-primary.component.vue";
import {PaymentApiService} from "@/creditcar/payment_estimator/services/payment-api.service";
import {creditcarApiService} from "@/creditcar/shared/services/creditcar-api.service";
import router from "@/router";

export default {
  name: "payment-estimator",
  components: {ButtonPrimary},
  data() {
    return {
      creditcarApi: null,
      vehicle: null,
      simulator: new PaymentApiService(),
      currency: "usd",
      rateType: "effective",
      selectedRate: "daily",
      selectedPeriod: "annual",
      rateValue: 0,
      closingDate: 0,
      totalGracePeriod: 0,
      partialGracePeriod: 0,
      initialFee: 20,
      finalFee: 0,
      creditLifeInsurance: 0,
      vehicleInsurance: 0,
      formInvalid: true
    }
  },
  methods: {
    handleSubmit() {
      if (this.validateForm()) {
        let dataToSend;
        dataToSend = {
          currency: this.currency,
          rateType: this.rateType,
          selectedRate: this.selectedRate,
          selectedPeriod: this.selectedPeriod,
          rateValue: this.rateValue,
          closingDate: this.closingDate,
          totalGracePeriod: this.totalGracePeriod,
          partialGracePeriod: this.partialGracePeriod,
          initialFee: this.initialFee,
          finalFee: this.finalFee,
          creditLifeInsurance: this.creditLifeInsurance,
          vehicleInsurance: this.vehicleInsurance,
        }
        this.simulator.create(dataToSend)
            .then((response) => {
              console.log("Data", dataToSend)
              console.log(response);
              if (this.formInvalid) {
                router.push('/generated-plan');
              }
            })
            .catch((error) => {
              console.log(error);
            });
      }
    },
    changeCurrency() {
      if (this.currency === 'usd') {
        this.currency = 'soles';
      } else {
        this.currency = 'usd';
      }
    },
    changeRateType() {
      if (this.rateType === 'effective') {
        this.rateType = 'nominal';
      } else {
        this.rateType = 'effective';
      }
    },
    resetScrollbar() {
      window.scrollTo(0, 0);
    },
    validateForm() {
      this.formInvalid = this.currency &&
          this.rateType &&
          this.selectedRate &&
          this.selectedPeriod &&
          this.rateValue > 0 &&
          this.closingDate > 0 &&
          this.finalFee > 0 &&
          this.creditLifeInsurance > 0 &&
          this.vehicleInsurance > 0;
      return this.formInvalid;
    },
  },
  created() {
    this.creditcarApi = new creditcarApiService();
    const vehicleId = this.$route.params.id;
    this.creditcarApi.getVehiclesById(vehicleId).then((response) => {
      this.vehicle = response.data[0];
    });
  },
  mounted() {
    this.resetScrollbar();
  },
}
</script>

<template>
  <div class="max-w-4xl mx-5 md:mx-auto mt-4">
    <div class="lg:flex text-center md:text-left">
      <div class="lg:w-1/2 flex flex-column justify-center md:ml-5">
        <div>
          <p class="text-4xl leading-snug">Planifica la compra de tu <br> <b>{{ vehicle.brand }}</b> {{vehicle.model }}</p>
          <hr class="division mb-3">
        </div>
        <p class="font-normal">Desde ${{ vehicle.price }}</p>
      </div>
      <div class="lg:w-1/2 p-1">
        <div class="items-center justify-right">
          <div class="flex justify-center items-center">
            <img :src="vehicle.image" alt="car_image">
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="max-w-4xl mx-auto">
    <pv-card class="card mt-0 md:mx-50 md:px-5">
      <template #content>
        <form class="pt-3 px-5" @submit.prevent="handleSubmit">
          <ol>
            <li class="mb-6">
              <p class="text-lg mb-2">Elige el tipo de moneda</p>
              <div class="flex space-x-3 items-center">
                <input type="radio"
                       id="usd"
                       name="currency"
                       checked
                       class="cursor-pointer"
                       :value="currency"
                       @input="changeCurrency">
                <label for="usd">Dólares ($)</label>
                <input type="radio"
                       id="soles"
                       name="currency"
                       class="cursor-pointer"
                       :value="currency"
                       @input="changeCurrency">
                <label for="soles">Soles (S/)</label>
              </div>
            </li>
            <li class="mb-6">
              <p class="text-lg mb-2">Elige la tasa de interés a trabajar</p>
              <div class="flex space-x-4 mb-4 items-center">
                <input type="radio"
                       id="effective"
                       name="rate-type"
                       checked
                       class="cursor-pointer"
                       :value="rateType"
                       @input="changeRateType">
                <label for="effective">Efectiva</label>
                <input type="radio"
                       id="nominal"
                       name="rate-type"
                       class="cursor-pointer"
                       :value="rateType"
                       @input="changeRateType">
                <label for="nominal">Nominal</label>
              </div>
              <div class="mb-3">
                <p class="font-normal mb-2"> 2.1.1 Plazo de Tasa: </p>
                <div>
                  <select class="font-bold mb-2 bg-[--red] text-white border-round p-2 cursor-pointer"
                          v-model="selectedPeriod" id="periodOptions">
                    <option class="text-[--red] bg-white" value="daily">Diaria</option>
                    <option class="text-[--red] bg-white" value="weekly">Semanal</option>
                    <option class="text-[--red] bg-white" value="biweekly">Quincenal</option>
                    <option class="text-[--red] bg-white" value="monthly">Mensual</option>
                    <option class="text-[--red] bg-white" value="bimonthly">Bimestral</option>
                    <option class="text-[--red] bg-white" value="quarterly">Trimestral</option>
                    <option class="text-[--red] bg-white" value="semiannual">Semestral</option>
                    <option class="text-[--red] bg-white" value="annual">Anual</option>
                  </select>
                </div>
              </div>
              <div v-if="rateType === 'effective'" class="mb-3">
                <p class="font-normal mb-2"> 2.1.2 Con capitalización:</p>
                <div>
                  <select class="font-bold mb-2 bg-[--red] text-white border-round p-2 cursor-pointer"
                          v-model="selectedRate" id="rateOptions">
                    <option class="text-[--red] bg-white" value="daily">Diaria</option>
                    <option class="text-[--red] bg-white" value="weekly">Semanal</option>
                    <option class="text-[--red] bg-white" value="biweekly">Quincenal</option>
                    <option class="text-[--red] bg-white" value="monthly">Mensual</option>
                    <option class="text-[--red] bg-white" value="bimonthly">Bimestral</option>
                    <option class="text-[--red] bg-white" value="quarterly">Trimestral</option>
                    <option class="text-[--red] bg-white" value="semiannual">Semestral</option>
                    <option class="text-[--red] bg-white" value="annual">Anual</option>
                  </select>
                </div>
              </div>
              <label for="rate-value" class="font-normal mb-2">2.2 Ingresa la tasa de interés</label>
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
            <li class="mb-6">
              <label for="closing-date" class="text-lg mb-2">¿Cuál es el plazo de pago?</label>
              <pv-input-number
                  inputId="closing-date"
                  suffix=" meses"
                  name="closing-date"
                  placeholder="Plazo de pago (Meses)"
                  min="24"
                  max="36"
                  required
                  class="w-full border rounded-md"
                  v-model="closingDate">
              </pv-input-number>
            </li>
            <li class="mb-6">
              <p class="text-lg  mb-2">Selecciona el período de gracia</p>
              <label for="total-grace-period" class="font-normal mb-5">4.1 Ingresa el número de cuotas sobra las cuales
                aplica el período de gracia total</label>
              <pv-input-number
                  inputId="total-grace-period"
                  suffix=" cuotas"
                  name="total-grace-period"
                  placeholder="0"
                  required
                  min="0"
                  max="36"
                  class="w-full border rounded-md mb-5"
                  v-model="totalGracePeriod">
              </pv-input-number>

              <label for="partial-grace-period" class="font-normal mb-2">4.2 Ingresa el número de cuotas sobra las
                cuales aplica el período de gracia parcial</label>
              <pv-input-number
                  inputId="partial-grace-period"
                  suffix=" cuotas"
                  name="partial-grace-period"
                  placeholder="0"
                  required
                  min="0"
                  max="36"
                  class="w-full border rounded-md"
                  v-model="partialGracePeriod">
              </pv-input-number>
            </li>
            <li class="mb-6">
              <label for="final-fee" class="text-lg mb-2">¿Cuál es el porcentaje de la cuota final?</label>
              <pv-input-number
                  inputId="final-fee"
                  suffix="%"
                  name="final-fee"
                  placeholder="Cuota final (%)"
                  required
                  min="0"
                  class="w-full border rounded-md"
                  v-model="finalFee">
              </pv-input-number>
            </li>
            <li class="mb-6">
              <label for="credit-life-insurance" class="text-lg mb-2">¿Cuál es la tasa del seguro de
                desgravamen?</label>
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
            <li class="mb-6">
              <label for="vehicle-life-insurance" class="text-lg mb-2">¿Cuál es la tasa del seguro vehicular?</label>
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
                class="px-6 mb-3 font-bold"
                :text="'Generar plan de pagos'"
                :buttonColor="'var(--red)'"
                :buttonTextColor="'var(--white)'"
                :buttonBorderColor="'var(--red)'"
                type="submit"
                v-model="handleSubmit">
            </button-primary>
          </div>
          <p v-if="formInvalid === false" class="text-center text-[--red]">Por favor completa todos los campos antes de continuar</p>
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

h2, label, ol {
  color: var(--black);
  font-weight: bold;
}

input[type="radio"] {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 20%;
  border: 2px solid var(--red);
  outline: none;
  cursor: pointer;
}

input[type="radio"]:checked {
  background-color: var(--red);
  border-color: var(--red);
}

ol {
  list-style: number;
}

.division {
  border-top: 2px solid var(--red);
  margin-bottom: 8px;
  margin-top: 8px;
}

</style>
