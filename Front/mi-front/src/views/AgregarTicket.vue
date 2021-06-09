<template>
  <div>
    <h1>Agregar Ticket</h1>
    <b-form @submit.prevent=guardarTicket()>
      <div>
        <Input
          v-model="ticket.nombre"
          id="nombre"
          titulo="Nombre"
          placeholder="Ingrese el nombre del ticket"
          :maxlength="50"
          :error="erroresValidacion && !validacionNombre"
          mensajeError="Es necesario ingresar el nombre"
          class="mt-2 col-10"
          
        />
        <Input
          v-model="ticket.descripcion"
          id="descripcion"
          titulo="Descripción"
          placeholder="Ingrese la descripción del ticket"
          :maxlength="100"
          class="mt-2 col-10"
        />  
        <h6>Prioridad</h6>
        <select class="mt-3 form-select"
          v-model="ticket.prioridad"
        >
        <option
        v-for="item in PrioridadOpciones"
        :value="item.id"
        :key="item.id"
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
import Input from '../components/Input';
export default {
  name: "AgregarTicket",
  components: {
    Input
  },
  data() {
    return {
      ticket: {
        nombre: "",
        descripcion: "",
        prioridad: "",
        idPersonal: "",
        idCategorias: "",
        estatus:"ABT"
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
        this.ticket.nombre !== undefined &&
        this.ticket.nombre.trim() !== ""
      );
    },
    validacionPrioridad() {
      return (
        this.ticket.prioridad !== ""
      );
    },
    validacionPersonal() {
      return (
        this.ticket.idPersonal !== ""
      );
    },
    validacionCategoria() {
      return (
        this.ticket.idCategorias !== ""
      );
    },
  },
  methods: {
    ...mapActions(["crearTicket", "setPersonal", "setCategoria"]),
    guardarTicket() {
      if (
        !(this.validacionNombre && this.validacionPrioridad &&
          this.validacionPersonal && this.validacionCategoria
        )
      ) {
        this.erroresValidacion = true;
      } else {
        this.erroresValidacion = false;
        this.crearTicket({
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
    this.setPersonal(),
    this.setCategoria();
  },
};
</script>