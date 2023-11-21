<script>
export default {
  name: 'add-vehicle',
  data() {
    return {
      newVehicle: {
        brand: '',
        model: '',
        image: '',
        price: '',
      },
    };
  },
  props: ['showModal'],
  methods: {
    addVehicle() {
      // Validate the input fields before emitting the event
      if (this.isValidInput()) {
        this.$emit('vehicleAdded', this.newVehicle);
        this.closeModal();
        //window.location.reload();
      } else {
        // You can add error handling or display a message to the user
        console.error('Invalid input. Please fill in all fields.');
      }
    },
    closeModal() {
      this.clearForm();
      this.$emit('close');
    },
    clearForm() {
      this.newVehicle = {
        brand: '',
        model: '',
        image: '',
        price: '',
      };
    },
    isValidInput() {
      // Add your validation logic here
      return (
          this.newVehicle.brand &&
          this.newVehicle.model &&
          this.newVehicle.image &&
          this.newVehicle.price
      );
    },
  },
};
</script>


<template>
  <div v-if="showModal" class="modal-overlay">
    <div class="modal">
      <h2>Agregar vehículo</h2>
      <div>
        <label for="brand">Marca:</label>
        <input type="text" v-model="newVehicle.brand" />
      </div>
      <div>
        <label for="model">Modelo:</label>
        <input type="text" v-model="newVehicle.model" />
      </div>
      <div>
        <label for="image">URL de la imagen:</label>
        <input type="text" v-model="newVehicle.image" />
      </div>
      <div>
        <label for="price">Precio:</label>
        <input type="text" v-model="newVehicle.price" />
      </div>
      <button @click="addVehicle">Agregar vehículo</button>
      <button @click="closeModal">Cerrar</button>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 1.5em;
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px 15px;
  background-color: var(--red);
  color: var(--white);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: var(--red);
}

button + button {
  margin-left: 10px;
}

</style>