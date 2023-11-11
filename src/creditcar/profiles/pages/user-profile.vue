<script>
import { creditcarApiService } from "@/creditcar/services/creditcar-api.service";

export default {
  name: "user-profile",
  data() {
    return {
      creditcarApi: null,
      image: "",
      first_name: "",
      email: "",
    };
  },
  created() {
    this.creditcarApi = new creditcarApiService();
    this.creditcarApi.getUsers()
        .then((response) => {
          this.image = response.data[0].image;
          this.first_name = response.data[0].first_name;
          this.last_name = response.data[0].last_name;
          this.email = response.data[0].email;
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
            <a class="text-blue-500 text-sm underline">Cambiar foto de perfil</a>
          </div>
          <div class="lg:w-1/2 p-1">
            <div>
              <div class="mb-4">
                <div class="flex justify-between items-center">
                  <p class="font-bold mr-2">Nombre:</p>
                  <p class="text-sm overflow-ellipsis">{{ first_name }} {{last_name}}</p>
                </div>
                <a class="text-blue-500 text-sm underline">Cambiar nombre</a>
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
                  <p class="text-sm overflow-ellipsis">●●●●●●●●</p>
                </div>
                <a class="text-blue-500 text-sm underline cursor-pointer">Cambiar contraseña</a>
              </div>
              <div class="mb-4">
                <div class="flex justify-between items-center">
                  <p class="font-bold mr-2">Cuenta:</p>
                </div>
                <div class="mb-3">
                  <a class="text-red-500 text-sm underline cursor-pointer">Cerrar sesión</a>
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