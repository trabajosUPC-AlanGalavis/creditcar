<script>
import ButtonPrimary from "@/creditcar/shared/components/button-primary.component.vue";
import axios from "axios";
import {creditcarApiService} from "@/creditcar/shared/services/creditcar-api.service";

export default {
  name: "signup-form",
  components: {ButtonPrimary},
  data() {
    return {
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      password_confirmation: "",
      dni: "",
      zip_code: "",
      image: "",
      creditcarApi: new creditcarApiService(),
    }
  },
  methods: {
    async handleSubmit() {
      if (this.password !== this.password_confirmation) {
        alert("Password and password confirmation must be the same")
      }
      if (this.dni.length !== 8) {
        alert("DNI must be 8 characters long")
      }
      if (this.zip_code.length !== 5) {
        alert("Zip code must be 5 characters long")
      }
      if (this.password === this.password_confirmation && this.dni.length === 8 && this.zip_code.length === 5) {
        await this.creditcarApi.create('users', {
          email: this.email,
          first_name: this.first_name,
          last_name: this.last_name,
          password: this.password,
          image: "https://static.vecteezy.com/system/resources/previews/005/129/844/non_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg",
          dni: this.dni,
          zip_code: this.zip_code,
        });
        this.$router.push("/login");
      }
    }
  }
}
</script>

<template>
  <form id="signup" @submit.prevent="handleSubmit">
    <div class="mb-3 p-float-label">
      <pv-input-text
          id="email"
          type="email"
          name="email"
          autocomplete="email"
          required
          class="w-full border rounded-md px-3 py-2"
          v-model="email"
      ></pv-input-text>
      <label for="email">Correo electrónico</label>
    </div>
    <div class="mb-3 p-float-label">
      <pv-input-text
          id="first-name"
          type="text"
          name="first-name"
          autocomplete="given-name"
          required
          class="w-full border rounded-md px-3 md:py-2"
          v-model="first_name"
      ></pv-input-text>
      <label for="first-name">Nombres</label>
    </div>
    <div class="mb-3 p-float-label">
      <pv-input-text
          id="last-name"
          type="text"
          name="last-name"
          autocomplete="family-name"
          required
          class="w-full border rounded-md px-3 md:py-2"
          v-model="last_name"
      ></pv-input-text>
      <label for="last-name">Apellidos</label>
    </div>
    <div class="mb-3 p-float-label">
      <pv-input-text
          id="password"
          type="password"
          name="password"
          autocomplete="current-password"
          required
          class="w-full border rounded-md px-3 py-2"
          v-model="password"
      ></pv-input-text>
      <label for="password">Contraseña</label>
    </div>
    <div class="mb-3 p-float-label">
      <pv-input-text
          id="confirm-password"
          type="password"
          name="confirm-password"
          autocomplete="current-password"
          required
          class="w-full border rounded-md px-3 py-2"
          v-model="password_confirmation"
      ></pv-input-text>
      <label for="confirm-password">Confirmar contraseña</label>
    </div>
    <div class="mb-3 p-float-label">
      <pv-input-text
          id="dni"
          type="number"
          name="dni"
          autocomplete="dni"
          required
          class="w-full border rounded-md px-3 md:py-2"
          v-model="dni"
      ></pv-input-text>
      <label for="dni">DNI</label>
    </div>
    <div class="mb-3 p-float-label">
      <pv-input-text
          id="zip-code"
          type="number"
          name="zip code"
          autocomplete="zip code"
          required
          class="w-full border rounded-md px-3 md:py-2"
          v-model="zip_code"
      ></pv-input-text>
      <label for="zip-code">Código zip</label>
    </div>
    <div class="flex items-center md:items-start mb-3">
      <div class="h-5">
        <input id="remember" aria-describedby="remember" type="checkbox" required class="rounded cursor-pointer">
      </div>
      <div class="text-sm ml-3">
        <label for="remember" class="font-medium">
          <span>He leído y acepto los</span>
          <router-link to="site-policy" class="text-blue-500 underline cursor-pointer">Términos y condiciones
          </router-link>
          y
          <router-link to="site-policy" class="text-blue-500 underline cursor-pointer">Política de privacidad
          </router-link>
        </label>
      </div>
    </div>
    <div class="text-center">
      <button-primary
          class="px-7 mb-3"
          :text="'Registrarse'"
          :buttonColor="'var(--red)'"
          :buttonTextColor="'var(--white)'"
          :buttonBorderColor="'var(--red)'"
          type="submit">
      </button-primary>
    </div>
  </form>
</template>

<style scoped>

</style>