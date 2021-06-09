<template>
  <div>
    <h1>Personal</h1>
    <b-button variant="primary" to="/agregarPersonal">Agregar Personal</b-button>

    <Table :items="personal" :fields="campos" :busy="loading">
      <template slot="actions" slot-scope="{ item }">
        <b-button class="me-1" @click="onEditar(item)">Editar</b-button>
        <b-button @click="onEliminar(item)">Eliminar</b-button>
      </template>
    </Table>
  </div>
</template>

<script>
import Table from "../components/Table";
import { mapState, mapActions } from "vuex";

export default {
  name: "HomePersonal",
  components: {
    Table,
  },
  data() {
    return {
        campos: [
        {key: "idPersonal", label: "ID" },
        {key: 'Nombre',
         formatter: value => {
          return value || "sin datos"
        }},
        {
          key: "Apellidos",
          formatter: (value) => {
            return value || "Sin datos";
          },
        },
        {
          key: "Telefono",
          formatter: (value) => {
            return value || "sin datos";
          },
        },
        {
          key: "Direccion",
          formatter: (value) => {
            return value || "sin datos";
          },
        },
        { key: "actions", label: "Acciones" },
      ],

    };
  },
  computed: {
    ...mapState(["personal", "loading"]),
  },
  methods: {
    ...mapActions(["setPersonal", "eliminarPersonal"]),
    onEditar(item) {
      console.log("Editar", item.item.idPersonal);
      this.$router.push({
        name: "EditarPersonal",
        params: {
          id: item.item.idPersonal,
        },
      });
    },
    onEliminar(item) {
      console.log("Eliminar", item.item.idPersonal);

      this.$bvModal
        .msgBoxConfirm("Esta opción se va a eliminar.", {
          title: "Eliminar Personal",
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
            this.eliminarPersonal({
              id: item.item.idPersonal,
              onComplete: (response) => {
                this.$notify({
                  type: "success",
                  title: response.data.mensaje,
                });
                setTimeout(() => this.setPersonal(), 1000);
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
    this.setPersonal();
  },
};
</script>
