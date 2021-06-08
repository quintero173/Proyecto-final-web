<template>
  <div>
    <h1>Editar</h1>
    <b-form @submit.prevent="guardarTicket()">
      <div class="inputs">
        <Input
          v-model="tickets.nombre"
          id="nombre"
          titulo="Nombre"
          placeholder="Ingrese el nombre"
          :maxlength="50"
          :disabled= true
          class="mt-3 col-10"
        />
        <Input
          v-model="tickets.descripcion"
          id="descripcion"
          titulo="Descripción"
          placeholder="Ingrese la descripción"
          :maxlength="100"
          class="mt-3 col-10"
        />
        <Select
          :items="PrioridadOpciones"
          v-model="tickets.prioridad"
          :vmodel="tickets.prioridad"
          id="prioridad"
          iditem="id"
          name="nombrePrioridad"
          titulo="Prioridad"
          :error="erroresValidacion && !validacionPrioridad"
          mensajeError="Es necesario ingresar la prioridad"
          class="mt-3 col-10"
        />
        <Select
          :items="personal"
          v-model="tickets.idPersonal"
          :vmodel="tickets.idPersonal"
          id="personal"
          iditem="idPersonal"
          name="nombre"
          lastname="apellidos"
          titulo="Personal"
          :error="erroresValidacion && !validacionPersonal"
          mensajeError="Es necesario ingresar el personal"
          class="mt-3 col-10"
        />
        <Select
          :items="categorias"
          v-model="tickets.idCategorias"
          :vmodel="tickets.idCategorias"
          id="categorias"
          iditem="idCategorias"
          name="nombre"
          titulo="Categoría"
          :error="erroresValidacion && !validacionCategoria"
          mensajeError="Es necesario ingresar la categoria"
          class="mt-3 col-10"
        />
      </div>
      <b-button type="submit" class="mt-4 boton-guardar" variant="dark">Guardar</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Select from "../components/Select";
import Input from "../components/Input";
import Vue from 'vue'
export default {
  name: "EditarTicket",
  components: {
    Select,
    Input,
  },
  data() {
    return {
      tickets: {
        nombre: "",
        descripcion: "",
        prioridad: "",
        idPersonal: "",
        idCategorias: "",
      },
      selected: null,
      PrioridadOpciones: [
        { id: 1, nombrePrioridad: "BAJA" },
        { id: 2, nombrePrioridad: "MEDIA" },
        { id: 3, nombrePrioridad: "ALTA" },
      ],
      erroresValidacion: false,
    };
  },
  computed: {
    ...mapState(["personal", "categorias"]),
    validacionPrioridad() {
      return (
        this.tickets.prioridad !== null
      );
    },
    validacionPersonal() {
      return (
        this.tickets.idPersonal !== null
      );
    },
    validacionCategoria() {
      return (
        this.tickets.idCategorias !== null
      );
    },
  },
  methods: {
    ...mapActions([
      "setPersonal",
      "setCategorias",
      "obtenerTickets",
      "editarTickets",
    ]),
    guardarTicket() {
      console.log(this.ticket)
      if (
        !(this.validacionPrioridad && this.validacionPersonal &&
          this.validacionCategoria
        )
      ) {
        this.erroresValidacion = true;
      } else {
        this.erroresValidacion = false;
        this.editarTickets({
          id: this.$route.params.id,
          params: this.tickets,
          onComplete: (response) => {
            this.$notify({
              type: "success",
              title: response.data.mensaje,
            });
            this.$router.push({
              name: "HomeTickets",
            });
          },
          onError: (err) => {
            this.$notify({
              type: "error",
              title: err.response.data.mensaje,
            });
          },
        });
      }
    },
  },
  created() {
    this.setPersonal(), this.setCategorias(),
    this.obtenerTickets({
          id: this.$route.params.id,
          onComplete: res =>
           Vue.set(this, 'tickets', res.data.data)
      })
  },
};
</script>

<style>

</style>