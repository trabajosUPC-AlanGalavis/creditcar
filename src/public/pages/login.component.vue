<script>
import ButtonPrimary from "@/creditcar/shared/components/button-primary.component.vue";
import LoginForm from "@/public/components/login-form.component.vue";

export default {
  name: "login",
  components: {LoginForm, ButtonPrimary },
}
</script>

<template>
  <div class="max-w-xl mx-auto">
    <pv-card class="card md:mx-50 md:px-5">
      <template #content>
        <div class="mb-3 text-center md:text-left">
          <h2>Welcome to CreditCar</h2>
          <p>To use the application, please login or register</p>
        </div>
        <div class="flex mb-5 justify-content-center md:justify-content-start">
          <div class="state-color active-label">
            <input id="login" type="radio" name="login-signup">
            <div class="mx-5">
              <label class="cursor-pointer" for="login">Login</label>
            </div>
          </div>
          <div class="state-color">
            <router-link to="/signup">
              <input id="signup" type="radio" name="login-signup">
              <div class="mx-5">
                <label class="cursor-pointer" for="signup">Register</label>
              </div>
            </router-link>
          </div>
        </div>
        <login-form/>
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

h2 {
  color: var(--red);
  font-size: var(--heading-2-size);
  font-weight: bold;
  font-family: var(--font-primary);
}

p {
  color: var(--black);
}

input[type="radio"] {
  display: none;
}

.state-color{
  color: var(--gray-2);
  border-bottom: 2px solid var(--gray-2);
}

.active-label {
  color: var(--red);
  font-weight: bold;
  border-bottom: 2px solid var(--red);
}
</style>
