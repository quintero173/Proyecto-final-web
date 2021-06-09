<template>
  <div>
    <h1>Tickets</h1>
    <b-button variant="primary" to="/agregarTicket">Agregar ticket</b-button>

    <Table :items="tickets" :fields="campos" :busy="loading">
      <template slot="actions" slot-scope="{ item }">
        <b-button class="me-1" @click="onEditar(item)">Editar</b-button>
        <b-button @click="onEliminar(item)">Eliminar</b-button>
        <b-button variant="primary" class="mb-6 mx-2" @click="onEditarEstatus(item)">Cambiar estatus</b-button>
      </template>
    </Table>
  </div>
</template>

<script>
import Table from "../components/Table";
import { mapState, mapActions } from "vuex";

export default {
  name: "HomeTicket",
  components: {
    Table
  },
  data() {
    return {
      campos: [
        {key: "idTickets", label: "ID" },
        {key: 'Nombre',
         formatter: value => {
          return value || "sin datos"
        }},
        {
          key: "Descripcion",
          formatter: (value) => {
            return value || "Sin datos";
          },
        },
        {
          key: "Prioridad",
          formatter: (value) => {
            return value || "sin datos";
          },
        },
        {
          key: "idPersonal", label: "Personal",
          formatter: (value) => {
            return value || "sin datos";
          },
        },
        {
          key: "idCategorias", label: "Categorias",
          formatter: (value) => {
            return value || "sin datos";
          },
        },
        {
          key: "Estatus",
          formatter: (value) => {
            return value || "sin datos";
          },
        },
        { key: "actions", label: "Acciones" },
      ],
    };
  },
  computed: {
    ...mapState(["tickets","loading"]),
  },
  methods: {
    ...mapActions(["setTicket", "eliminarTicket"]),
    onEditar(item) {
      console.log("Editar", item.item.idTickets);
      this.$router.push({
        name: "EditarTicket",
        params: {
          id: item.item.idTickets,
        },
      });
    },
    onEditarEstatus(item) {
      this.$router.push({
        name: "EditarEstatus",
        params: {
          id: item.item.idTickets,
        },
      });
    },
    onEliminar(item) {
      console.log("Eliminar", item.item.idTickets);

      this.$bvModal
        .msgBoxConfirm("Esta opción se eliminará.", {
          title: "Eliminar ticket",
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "Aceptar",
          cancelTitle: "Cancelar",
          footerClass: "p-2",
          centered: true,
        })
        .then((value) => {
          if (value) {
            this.eliminarTicket({
              id: item.item.idTickets,
              onComplete: (response) => {
                this.$notify({
                  type: "success",
                  title: response.data.mensaje,
                });
                setTimeout(() => this.setTicket(), 1000);
              },
            });
          }
        })
        .catch((err) => {
          // An error occurred
        });
    },
  },
  mounted() {
    this.setTicket();
  },
};
</script>
