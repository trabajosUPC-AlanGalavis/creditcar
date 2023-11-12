<script>


export default  {
  name: "plan-history",
  data() {
    return {
      plans: []
    }
  }
}

</script>

<template>
  <div class="shadow hero flex items-center h-fit mb-3">
    <div class="w-full md:w-1/2 text-center my-40 mx-5">
      <p class="text-6xl md:text-7xl font-bold text-white my-4">Mis planes de pago</p>
    </div>
  </div>

  <div class="flex flex-wrap justify-center mx-5">
    <router-link to="/">
      <pv-card class="card shadow px-8">
        <template #content>
          <p class="text-lg"><b>{{}}</b> {{}}</p>
          <p>Precio: {{}}</p>
          <p>Plazo de pago: {{}}</p>
          <p>Plan creado el: {{}}</p>
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