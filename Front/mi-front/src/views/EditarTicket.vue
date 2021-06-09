<template>
  <div>
    <h1>Editar</h1>
    <b-form @submit.prevent="guardarTicket()">
      <div>
        <Input
          v-model="ticket.Nombre"
          id="Nombre"
          titulo="Nombre"
          placeholder="Ingrese el nombre"
          :maxlength="50"
          :disabled= true
          class="mt-3 col-10"
        />
        <Input
          v-model="ticket.Descripcion"
          id="Descripcion"
          titulo="Descripción"
          placeholder="Ingrese la descripción"
          :maxlength="100"
          class="mt-3 col-10"
        />
        <h6>Prioridad</h6>
        <select class="mt-3 form-select"
          v-model="ticket.Prioridad"
        >
        <option
        v-for="item in PrioridadOpciones"
        :value="item.id"
        :key="item.id"
        :disabled= true
        >
        {{item.nombrePrioridad}}
        </option>
        </select>

        <h6>Personal</h6>
        <select class="mt-3 form-select"
          v-model="ticket.idPersonal"
        >
        <option
          v-for="pers in personal"
          :value="pers.idPersonal"
          :key="pers.idPersonal"
        >
        {{pers.Nombre}}
        </option>
        </select>

        <h6>Categorias</h6>
        <select class="mt-3 form-select"
          v-model="ticket.idCategorias"
        >
        <option
          v-for="cat in categorias"
          :value="cat.idCategorias"
          :key="cat.idCategorias"
        >
        {{cat.Nombre}}
        </option>
        </select>
        
      </div>
      <b-button type="submit" variant="dark">Guardar</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Input from "../components/Input";
import Vue from 'vue'
export default {
  name: "EditarTicket",
  components: {
    Input,
  },
  data() {
    return {
      ticket: {
        nombre: "",
        descripcion: "",
        prioridad: "",
        idPersonal: "",
        idCategorias: ""
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
        this.ticket.prioridad !== null
      );
    },
    validacionPersonal() {
      return (
        this.ticket.idPersonal !== null
      );
    },
    validacionCategoria() {
      return (
        this.ticket.idCategorias !== null
      );
    },
  },
  methods: {
    ...mapActions([
      "setPersonal",
      "setCategoria",
      "obtenerTicket",
      "editarTicket",
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
        this.editarTicket({
          id: this.$route.params.id,
          params: this.ticket,
          onComplete: (response) => {
            this.$notify({
              type: "success",
              title: response.data.mensaje,
            });
            this.$router.push({
              name: "HomeTicket",
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
    this.setPersonal(), this.setCategoria(),
    this.obtenerTicket({
          id: this.$route.params.id,
          onComplete: res =>
           Vue.set(this, 'ticket', res.data.data)
      })
  },
};
</script>

<style>

</style>