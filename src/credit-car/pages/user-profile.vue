<script>
export default {
  name: "user-profile",
  data() {
    return {
      image: "https://schoolworkhelper.net/wp-content/uploads/2011/07/Winston-Smith.gif",
      name: "Winston Smith",
      email: "winstonsmith@gmail.com",
    }
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <pv-card class="card md:px-5">
      <template #content>
        <div class="lg:flex">
          <div class="lg:w-1/2 text-center align-content-center mb-5 md:mr-5">
            <p class="font-bold text-4xl mb-4">Mi cuenta</p>
            <div class="flex items-center justify-center mb-2">
              <img class="rounded-full w-56 h-56" :src="image" alt="avatar">
            </div>
            <a class="text-blue-500 text-sm underline">Cambiar foto de perfil</a>
          </div>
          <div class="lg:w-1/2 p-1 md:pt-6">
            <div>
              <div class="mb-4">
                <div class="flex justify-between items-center">
                  <p class="font-bold mr-2">Nombre:</p>
                  <p class="text-sm overflow-ellipsis">{{ name }}</p>
                </div>
                <a class="text-blue-500 text-sm underline">Cambiar nombre</a>
              </div>
              <div class="mb-4">
                <div class="flex justify-between items-center">
                  <p class="font-bold mr-2">Correo electrónico:</p>
                  <p class="text-sm overflow-ellipsis">{{ email }}</p>
                </div>
                <a class="text-blue-500 text-sm underline">Cambiar correo electrónico</a>
              </div>
              <div class="mb-4">
                <div class="flex justify-between items-center">
                  <p class="font-bold mr-2">Contraseña:</p>
                  <p class="text-sm overflow-ellipsis">●●●●●●●●</p>
                </div>
                <a class="text-blue-500 text-sm underline">Cambiar contraseña</a>
              </div>
              <div class="mb-4">
                <div class="flex justify-between items-center">
                  <p class="font-bold mr-2">Cuenta:</p>
                </div>
                <a class="text-red-500 text-sm underline">Eliminar cuenta</a>
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
  border: solid 7px var(--primary-blue);
}

.overflow-ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>