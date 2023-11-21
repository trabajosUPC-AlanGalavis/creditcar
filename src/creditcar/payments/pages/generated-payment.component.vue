<script>
import ButtonPrimary from "@/creditcar/shared/components/button-primary.component.vue";
import {PaymentApiService} from "@/creditcar/payments/services/payment-api.service";
import {creditcarApiService} from "@/creditcar/shared/services/creditcar-api.service";
import {CashFlowsApiService} from "@/creditcar/payments/services/cash-flows-api.service";

export default {
  name: "generated-payment",
  components: {ButtonPrimary},
  data() {
    return {
      paymentApi: null,
      cashFlowsApi: null,
      creditcarApi: null,
      payment: [],
      vehicles: [],
      cashFlows: [],
      showComponent: false,
    }
  },
  created() {
    this.paymentApi = new PaymentApiService();
    this.cashFlowsApi = new CashFlowsApiService();
    this.paymentApi.getById(this.$route.params.id).then((response) => {
      this.payment = response.data;
      this.payment.selectedDecision = this.formatDecision(this.payment.selectedDecision)
      this.cashFlowsApi.getByPaymentId(this.payment.id).then((response) => {
        this.cashFlows = response.data;
        this.cashFlows.sort(this.arrangeCashFlows)
        this.cashFlows.forEach((cashFlow) => {
          cashFlow.initialBalance = this.formatNumber(cashFlow.initialBalance)
          cashFlow.interestPayment = this.formatNumber(cashFlow.interestPayment)
          cashFlow.quota = this.formatNumber(cashFlow.quota)
          cashFlow.amortization = this.formatNumber(cashFlow.amortization)
          cashFlow.lifeInsurance = this.formatNumber(cashFlow.lifeInsurance)
          cashFlow.vehicularInsurance = this.formatNumber(cashFlow.vehicularInsurance)
          cashFlow.finalBalance = this.formatNumber(cashFlow.finalBalance)
          cashFlow.flow = this.formatNumber(cashFlow.flow)
          cashFlow.tea = this.formatPercentage(cashFlow.annualInterestRate)
          cashFlow.tep = this.formatPercentage(cashFlow.periodInterestRate)
        });
      })
    });
    this.creditcarApi = new creditcarApiService();
    this.creditcarApi.getVehicles().then((response) => {
      this.vehicles = response.data;
    });
  },
  mounted() {
    setTimeout(() => {
      this.showComponent = true;
    }, 500);
  },
  methods:{
    arrangeCashFlows(a, b){
      if (a.number < b.number){
        return -1
      } else if (a.number > b.number) {
        return 1;
      }
      return 0;
    },
    formatDecision(value){
      if (value === "keep"){
        return "Conservarlo"
      } else if (value === "sell"){
        return "Venderlo"
      }else if (value === "change"){
        return "Renovarlo"
      }
    },
    formatPercentage(value) {
      return `${parseFloat(value * 100).toFixed(2)}%`;
    },
    formatNumber(value) {
      return `${parseFloat(value).toFixed(2)}`;
    },
    formatPrice(value){
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      });
      return formatter.format(value);
    }
  }
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

  <div class="mx-auto">
    <pv-card class="card mt-0 md:mx-50 md:px-5">
      <template #content>
        <div class="px-5" v-if="showComponent">
          <h2 class="mt-4 font-bold text-2xl">Información del vehículo</h2>
          <hr class="division mb-3">
          <div class="lg:flex text-center md:text-left">
            <div class="lg:w-1/2 flex flex-column justify-center">
              <div class="justify-center items-center">
                <p v-if="vehicles[payment.vehicleId-1]" class="mb-3"><span class="font-bold">Marca:</span>  {{vehicles[payment.vehicleId-1].brand}}</p>
                <p v-if="vehicles[payment.vehicleId-1]" class="mb-3"><span class="font-bold">Modelo:</span> {{vehicles[payment.vehicleId-1].model}}</p>
                <p v-if="vehicles[payment.vehicleId-1]" class="mb-3"><span class="font-bold">Precio:</span> {{formatPrice(vehicles[payment.vehicleId-1].price)}}</p>
              </div>
            </div>
            <div class="lg:w-1/2 p-1">
              <div class="flex justify-center items-center">
                <div>
                  <img v-if="vehicles[payment.vehicleId-1]" :src="vehicles[payment.vehicleId-1].image" alt="vehicle_image">
                </div>
              </div>
            </div>
          </div>

          <h2 class="font-bold text-2xl">Información del cliente</h2>
          <hr class="division mb-3">
          <p class="mb-3"><span class=" font-bold">Nombres:</span> {{payment.clientFirstName}}</p>
          <p class="mb-3"><span class=" font-bold">Apellidos:</span> {{payment.clientLastName}}</p>
          <p class="mb-3"><span class=" font-bold">DNI</span> {{payment.clientDni}}</p>
          <p class="mb-3"><span class=" font-bold">Decisión</span> {{payment.selectedDecision}}</p>

          <h2 class="font-bold text-2xl">Información ingresada</h2>
          <hr class="division mb-3">
          <p class="mb-3"><b>Tipo de moneda:</b> {{payment.currency}}</p>
          <p class="mb-3"><b>Tasa de interés:</b> {{parseFloat(payment.formattedRateValue * 100).toFixed(2)}}%</p>
          <p class="mb-3"><b>Frecuencia de pago:</b> Mensual</p>
          <p class="mb-3"><b>Plazo de pago:</b> {{payment.closingDate}} meses</p>

          <h2 class="mt-7 font-bold text-2xl">Resultados</h2>
          <hr class="division mb-3">
          <p v-if="vehicles[payment.vehicleId-1]" class="mb-3"><b>Cuota inicial:</b> {{20/100*vehicles[payment.vehicleId-1].price}} {{payment.currency}}</p>
          <p v-if="vehicles[payment.vehicleId-1]" class="mb-3"><b>Cuota final:</b> {{payment.finalFee/100*vehicles[payment.vehicleId-1].price}} {{payment.currency}}</p>
          <p class="mb-3"><b>COKi:</b> {{parseFloat(payment.cok).toFixed(2)}}%  </p>
          <p class="mb-3"><b>TCEA:</b> {{parseFloat(payment.tcea).toFixed(2)}}%</p>
          <p class="mb-3"><b>VAN: </b>
            <span class="font-bold text-lime-600" v-if="payment.van > 0"> {{parseFloat(payment.van).toFixed(2)}}</span>
            <span class="font-bold text-black" v-if="payment.van === 0"> {{parseFloat(payment.van).toFixed(2)}}</span>
            <span class="font-bold text-red-400" v-if="payment.van < 0"> {{parseFloat(payment.van).toFixed(2)}}</span>
          </p>
          <p class="mb-3"><b>TIR: </b> {{parseFloat(payment.tir).toFixed(2)}}% </p>
          <div class="pt-5">
            <pv-data-table
                class="overflow-hidden mb-4"
                :value="this.cashFlows"
                :paginator="true"
                :rows="10"
                :rowsPerPageOptions="[10, 25, 37]"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown">
              <pv-column field="number" header="Nº"></pv-column>
              <pv-column field="tep" header="TEP"></pv-column>
              <pv-column field="gracePeriod" header="Período de gracia"></pv-column>
              <pv-column field="initialBalance" header="Saldo inicial"></pv-column>
              <pv-column field="interestPayment" header="Interés"></pv-column>
              <pv-column field="quota" header="Cuota"></pv-column>
              <pv-column field="amortization" header="Amortización"></pv-column>
              <pv-column field="lifeInsurance" header="Seguro de desgravamen"></pv-column>
              <pv-column field="vehicularInsurance" header="Seguro vehicular"></pv-column>
              <pv-column field="flow" header="Flujo"></pv-column>
              <pv-column field="finalBalance" header="Saldo final"></pv-column>
            </pv-data-table>
          </div>
        </div>
      </template>
    </pv-card>
  </div>
</template>

<style scoped>
:deep(th) {
  background-color: var(--red) !important;
  color: var(--white) !important;
}

.division {
  border-top: 2px solid var(--red);
  margin-bottom: 8px;
  margin-top: 8px;
}
</style>