<script>
import {PaymentApiService} from "@/creditcar/payments/services/payment-api.service";
export default  {
  name: "payment-history",
  data() {
    return {
      paymentApi: null,
      payments: []
    }
  },
  created() {
    this.paymentApi = new PaymentApiService();
    this.paymentApi.getByUserId(1).then((response) => {
      this.payments = response.data;
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

  <div class="flex flex-column justify-center items-center">
    <router-link v-for="payment in payments" to="/">
      <pv-card class=" shadow px-8 my-3">
        <template #content>
          <div class="lg:flex text-center md:text-left">
            <div class="lg:w-1/2 flex flex-column justify-center">
              <div class="flex justify-center items-center">
                <img :src="payment.vehicleId" alt="vehicle_image">
              </div>
            </div>
            <div class="lg:w-1/2 p-1">
              <div class="items-center justify-right">
                <div>
                  <!-- To-do: Extract vehicle brand, model, price and payment creation date -->
                  <p class="text-lg"><b>{{payment.vehicleId}}</b> {{payment.vehicleId}}</p>
                  <p>Precio: {{payment.vehicleId}}</p>
                  <p>Plazo de pago: {{payment.closingDate}} meses</p>
                  <p>Fecha de creación: {{}}</p>
                </div>
              </div>
            </div>
          </div>
        </template>
      </pv-card>
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