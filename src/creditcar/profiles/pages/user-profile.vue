<script>
import { creditcarApiService } from "@/creditcar/shared/services/creditcar-api.service";
import password from "primevue/password/Password.vue";

export default {
  name: "user-profile",
  computed: {
    password() {
      return password
    },
    passwordCircles() {
      return this.password.replace(/./g, '●');
    },
  },
  data() {
    return {
      creditcarApi: null,
      image: "",
      full_name: "",
      email: "",
      password: "",
    };
  },
  created() {
    this.creditcarApi = new creditcarApiService();
    this.creditcarApi.getNames().then((response) => {
      this.full_name = response.data[0].full_name;
      this.email = response.data[0].email;
      this.password = response.data[0].password;
    });
    this.creditcarApi.getUsers()
        .then((response) => {
          this.image = response.data[0].image;
        });
  },
};
</script>


<template>

  <div class="mb-6">
    <div class="flex items-center h-fit mb-20 bg-gray-200">
      <div class="w-full md:w-1/2 text-center my-20 mx-5">
        <p class="text-6xl md:text-7xl font-bold mb-4">Mi cuenta</p>
        <p class="text-xl">Actualiza la información de tu cuenta.</p>
      </div>
    </div>
  </div>

  <div class="mb-3">
    <div class="text-center">
        <p class="text-5xl font-bold mb-4">Información personal</p>
    </div>
  </div>

  <div class="max-w-4xl mx-auto">
    <pv-card class="card bg-gray-200 md:px-5">
      <template #content>
        <div class="lg:flex items-center">
          <div class="lg:w-1/2 text-center align-middle mb-5 md:mr-5">
            <div class="flex items-center justify-center mb-2">
              <img class="rounded-full w-56 h-56" :src="image" alt="avatar">
            </div>
            <a class="text-blue-500 text-sm underline cursor-pointer">Cambiar foto de perfil</a>
          </div>
          <div class="lg:w-1/2 p-1">
            <div>
              <div class="mb-4">
                <div class="flex justify-between items-center">
                  <p class="font-bold mr-2">Nombre:</p>
                  <p class="text-sm overflow-ellipsis">{{ full_name }}</p>
                </div>
                <a class="text-blue-500 text-sm underline cursor-pointer">Cambiar nombre</a>
              </div>
              <div class="mb-4">
                <div class="flex justify-between items-center">
                  <p class="font-bold mr-2">Correo electrónico:</p>
                  <p class="text-sm overflow-ellipsis">{{ email }}</p>
                </div>
                <a class="text-blue-500 text-sm underline cursor-pointer">Cambiar correo electrónico</a>
              </div>
              <div class="mb-4">
                <div class="flex justify-between items-center">
                  <p class="font-bold mr-2">Contraseña:</p>
                  <p class="text-sm overflow-ellipsis">{{ passwordCircles }}</p>
                </div>
                <a class="text-blue-500 text-sm underline cursor-pointer">Cambiar contraseña</a>
              </div>
              <div class="mb-4">
                <div class="flex justify-between items-center">
                  <p class="font-bold mr-2">Cuenta:</p>
                </div>
                <div class="mb-3">
                  <router-link to="/login">
                    <button class="text-red-500 text-sm underline cursor-pointer">
                      Cerrar sesión
                    </button>
                  </router-link>
                </div>

                <a class="text-red-500 text-sm underline cursor-pointer">Eliminar cuenta</a>
              </div>
            </div>
          </div>
        </div>
      </template>
    </pv-card>
  </div>
</template>

<style scoped>
* {
  color: var(--black);
}

img {
  border: solid 7px var(--red);
}

.shadow {
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 1px 0 rgba(0, 0, 0, 0.20);
}


.overflow-ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>