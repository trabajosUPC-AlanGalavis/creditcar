<script>
import ButtonPrimary from "@/creditcar/shared/components/button-primary.component.vue";
import axios from "axios";
import {creditcarApiService} from "@/creditcar/shared/services/creditcar-api.service";
export default {
  name: "login-form",
  components: {ButtonPrimary},
  data() {
    return {
      email: "",
      password: "",
      creditcarApi: new creditcarApiService(),
      passwordAuth: false,
      emailAuth: false,
      full_name: '',
      user_id: '',
      image: '',
    }
  },
  methods: {
    async handleSubmit() {
      const response = await this.creditcarApi.getUserByEmail(this.email);
      const response2 = await this.creditcarApi.getNames();
      for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].password === this.password && response.data[i].email === this.email) {
          if (response2.data.length > 0) {
            await this.creditcarApi.deleteName();
          }
          this.full_name = response.data[i].first_name + ' ' + response.data[i].last_name;
          this.user_id = response.data[i].id;
          this.image = response.data[i].image;
          await this.creditcarApi.create('names', {
            full_name: this.full_name,
            email: this.email,
            password: this.password,
            user_id: this.user_id,
            image: this.image,
          });
          this.passwordAuth = true;
          this.emailAuth = true;
        }
      }
      if (this.emailAuth === true && this.passwordAuth === true) {
        this.$router.push("/home");
      } else {
        alert("Wrong email or password");
      }
    }
  }
}
</script>

<template>
  <form id="login" @submit.prevent="handleSubmit">
    <div class="mb-3 p-float-label">
      <pv-input-text
          id="email"
          type="email"
          name="email"
          :placeholder="Email"
          required
          class="w-full border rounded-md px-3 py-2"
          v-model="email">
      </pv-input-text>
      <label for="email">Email</label>
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
      <label for="password">Password</label>
    </div>
    <div class="flex items-center md:items-start mb-3">
      <div class="h-5">
        <input id="remember" aria-describedby="remember" type="checkbox" class="rounded cursor-pointer">
      </div>
      <div class="text-sm ml-3">
        <label for="remember" class="font-medium">Remember me</label>
      </div>
    </div>
    <div class="text-center">
      <button-primary
          class="px-7 mb-3"
          :text="'Login'"
          :buttonColor="'var(--red)'"
          :buttonTextColor="'var(--white)'"
          :buttonBorderColor="'var(--red)'"
          type="submit">
      </button-primary>
      <p class="text-blue-500 text-sm underline">
        <router-link to="/password-reset">Forgot my password</router-link>
      </p>
    </div>
  </form>
</template>

<style scoped>

</style>