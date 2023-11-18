<script>
import {PaymentApiService} from "@/creditcar/payments/services/payment-api.service";
import {creditcarApiService} from "@/creditcar/shared/services/creditcar-api.service";
import ButtonPrimary from "@/creditcar/shared/components/button-primary.component.vue";
export default  {
  name: "payment-history",
  components: {ButtonPrimary},
  data() {
    return {
      paymentApi: null,
      creditcarApi: null,
      payments: [],
      vehicles: [],
      user_id: 0,
    }
  },
  methods:{
    formatPrice(value){
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      });
      return formatter.format(value);
    }
  },
  created() {
    this.creditcarApi = new creditcarApiService();
    this.creditcarApi.getVehicles().then((response) => {
      this.vehicles = response.data;
    });
    this.paymentApi = new PaymentApiService();
    this.creditcarApi.getNames().then((response) => {
      this.user_id = response.data[0].user_id;
      this.paymentApi.getByUserId(this.user_id).then((response) => {
        this.payments = response.data;
      });
    });
  },
}

</script>

<template>
  <div class="shadow hero flex items-center h-fit mb-3">
    <div class="w-full md:w-1/2 text-center my-40 mx-5">
      <p class="text-6xl md:text-7xl font-bold text-white my-4">Mis planes de pago</p>
    </div>
  </div>

  <div class="flex flex-column justify-center items-center ">
      <router-link
          v-for="payment in payments"
          :to="'/generated-payment/' + payment.id"
          :key="payment.id">
      <pv-card class="shadow my-3 max-w-4xl mx-auto">
        <template #content>
          <div class="lg:flex text-center md:text-left">
            <div class="lg:w-1/2 flex flex-column justify-center">
              <div class="flex justify-center items-center">
                <img v-if="vehicles[payment.vehicleId-1]" :src="vehicles[payment.vehicleId-1].image" alt="vehicle_image">
              </div>
            </div>
            <div class="lg:w-1/2 p-1">
              <div class="items-center justify-right">
                <div>
                  <p class="text-lg" v-if="vehicles[payment.vehicleId-1]">
                    <b>{{vehicles[payment.vehicleId-1].brand}}</b> {{vehicles[payment.vehicleId-1].model}}
                  </p>
                  <p v-if="vehicles[payment.vehicleId-1]">Precio: {{formatPrice(vehicles[payment.vehicleId-1].price)}}</p>
                  <p>Plazo de pago: {{payment.closingDate}} meses</p>
                  <p>Fecha de creación: {{payment.createDate}}</p>
                </div>
              </div>
            </div>
          </div>
        </template>
      </pv-card>
    </router-link>
    <router-link :to="'/home'">
      <button-primary
          class="px-6 mb-3 mt-3 font-bold"
          :text="'Generar nuevo plan de pagos'"
          :buttonColor="'var(--red)'"
          :buttonTextColor="'var(--white)'"
          :buttonBorderColor="'var(--red)'"
          type="submit"
          v-model="handleSubmit">
      </button-primary>
    </router-link>
  </div>

</template>

<style scoped>
.hero {
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%), url("../../../../assets/generated_plan_bg.jpg"), center, no-repeat;
  background-size: cover;
  background-position: center;
}

.shadow {
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 1px 0 rgba(0, 0, 0, 0.20);
}
</style>