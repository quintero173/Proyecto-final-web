<template>
  <div>
    <h1>Agregar Personal</h1>
    <b-form @submit.prevent="guardarPersonal()">
      <Input
        v-model="persona.nombre"
        id="nombre"
        titulo="Nombre"
        placeholder="Ingrese el nombre"
        :maxlength="50"
        :error="erroresValidacion && !validacionNombre"
        mensajeError="Es necesario ingresar el nombre"
        class="mb-2"
      />
      <Input
        v-model="persona.apellidos"
        id="apellidos"
        titulo="Apellidos"
        :maxlength="80"
        :error="erroresValidacion && !validacionApellidos"
        mensajeError="Es necesario ingresar el apellido"
        placeholder="Ingrese el apellido"
        class="mb-2"
      />
      <Input
        v-model="persona.telefono"
        id="telefono"
        titulo="Telefono"
        :maxlength="10"
        placeholder="Ingrese el telefono"
        class="mb-2"
      />
      <Input
        v-model="persona.direccion"
        id="direccion"
        titulo="Dirección"
        :maxlength="150"
        :error="erroresValidacion && !validacionDireccion"
        placeholder="Ingrese la dirección"
      />
      <b-button type="submit" class="mt-2" variant="primary">Guardar</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Input from "../components/Input";

export default {
  name: "AgregarPersonal",
  components: {
    Input,
  },
  data() {
    return {
      persona: {
        nombre: "",
        apellidos:"",
        telefono: "",
        direccion: "",
      },
      erroresValidacion: false,
    };
  },
  computed: {
    validacionNombre() {
      return (
        this.persona.nombre !== undefined &&
        this.persona.nombre.trim() !== ""
      );
    },
    validacionApellidos() {
      return (
        this.persona.apellidos !== undefined && 
        this.persona.apellidos.trim() !== ""
      );
    },
  },
  methods: {
    ...mapActions(["crearPersonal"]),
    guardarPersonal() {
      if (this.validacionNombre && this.validacionApellidos) {
        this.erroresValidacion = false;

        //Guardar
        this.crearPersonal({
          params: this.persona,
          onComplete: (response) => {
            console.log(response.data);
            this.$notify({
              type: 'success', 
              title: response.data.mensaje,
            });
            this.$router.push({
                name: 'HomePersonal'
            })
          },
          onError: (error) => {
            console.log(error.response.data.mensaje);
            this.$notify({
              type: 'error', 
              title: error.response.data.mensaje,
            });
          },
        });
      } else {
        this.erroresValidacion = true;
      }
    },
  },
};
</script>

<style></style>
