<template>
<div> 
  <h1>categorias</h1>
  <b-button variant="primary" to="/agregarCategoria">Agregar categoria</b-button>

  <Table :items="categorias" :fields="campos" >
    <template slot="actions" slot-scope="{ item }">
        <b-button @click="onEliminar(item)">Eliminar</b-button>
    </template> 
  </Table>    
</div>
</template>

<script>
import Table from '../components/Table'
import {mapState, mapActions } from 'vuex'

export default {
  name: 'HomCategoria',
  components: {
    Table
  },
  data() {
    return {
      campos: [
        {key: 'idCategorias', label: 'ID'},
        {key: 'Nombre', label: 'Nombre',
         formatter: value => {
          return value || "sin datos"
        }},
        {key: "actions",label: "Acciones"}
      ]
    }
  },
  computed: {
    ...mapState(["categorias"])
    
  },
  
  methods: {
    ...mapActions(["setCategorias","eliminarCategoria"]),

     onEliminar(item) {
      console.log("Eliminar", item.item.idCategorias);

      this.$bvModal
        .msgBoxConfirm("Esta opción se eliminará.", {
          title: "Eliminar categoria",
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
            this.eliminarCategoria({
              id: item.item.idCategorias,
              onComplete: (response) => {
                this.$notify({
                  type: "success",
                  title: response.data.mensaje,
                });
                setTimeout(() => this.setCategorias(), 1000);
              },
            });
          }
        })
        .catch((err) => {
          // An error occurred
        });
    },
  },
  created() {
    this.setCategorias();
  }
}
</script>
