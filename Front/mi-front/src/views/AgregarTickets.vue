<template>
  <div>
    <h1>Agregar un Ticket</h1>
    <b-form @submit.prevent=guardarTickets()>
      <div class="inputs">
        <Input
          v-model="tickets.nombre"
          id="nombre"
          titulo="Nombre"
          placeholder="Ingrese el nombre del ticket"
          :maxlength="50"
          :error="erroresValidacion && !validacionNombre"
          mensajeError="Es necesario ingresar el nombre"
          class="mt-2 col-10"
          
        />
        <Input
          v-model="tickets.descripcion"
          id="descripcion"
          titulo="Descripción"
          placeholder="Ingrese la descripción del ticket"
          :maxlength="100"
          class="mt-2 col-10"
        />
        <Select
          :items="PrioridadOpciones"
          v-model="tickets.prioridad"
          id="prioridad"
          iditem="id"
          name="nombrePrioridad"
          titulo="Prioridad"
          :error="erroresValidacion && !validacionPrioridad"
          mensajeError="Es necesario ingresar la prioridad"
          class="mt-2 col-10"
        />
          <Select
            :items="personal"
            v-model="tickets.idPersonal"
            id="idPersonal"
            iditem="idPersonal"
            name="nombre"
            lastname="apellidos"
            titulo="Personal"
            :error="erroresValidacion && !validacionPersonal"
            mensajeError="Es necesario ingresar el personal"
            class="mt-2 col-10"
          />
          <Select
            :items="categorias"
            v-model="tickets.idCategorias"
            id="idCategorias"
            iditem="idCategorias"
            name="nombre"
            titulo="Categoría"
            :error="erroresValidacion && !validacionCategoria"
            mensajeError="Es necesario ingresar la categoria"
            class="mt-2 col-10"
          />
        </div>
    
      <b-button type="submit" variant="dark">Guardar</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Select from '../components/Select';
import Input from '../components/Input';
export default {
  name: "AgregarTickets",
  components: {
    Select,
    Input
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
        { id: 3, nombrePrioridad: "ALTA" }
      ],
      erroresValidacion: false,
    };
  },
  computed: {
    ...mapState(["personal", "categorias"]),
    validacionNombre() {
      return (
        this.tickets.nombre !== undefined &&
        this.tickets.nombre.trim() !== ""
      );
    },
    validacionPrioridad() {
      return (
        this.tickets.prioridad !== ""
      );
    },
    validacionPersonal() {
      return (
        this.tickets.idPersonal !== ""
      );
    },
    validacionCategoria() {
      return (
        this.tickets.idCategorias !== ""
      );
    },
  },
  methods: {
    ...mapActions(["crearTickets", "setPersonal", "setCategorias"]),
    guardarTickets() {
      if (
        !(this.validacionNombre && this.validacionPrioridad &&
          this.validacionPersonal && this.validacionCategoria
        )
      ) {
        this.erroresValidacion = true;
      } else {
        this.erroresValidacion = false;
        this.crearTickets({
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
    this.setPersonal(),
    this.setCategorias();
  },
};
</script>