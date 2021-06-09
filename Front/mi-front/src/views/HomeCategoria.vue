<template>
<div> 
  <h1>categorias</h1>
  <b-button variant="primary" to="/agregarCategoria">Agregar categoria</b-button>

  <Table :items="categorias" :fields="campos" :busy="loading">
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
  name: 'HomeCategoria',
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
    ...mapState(["categorias","loading"])
    
  },
  
  methods: {
    ...mapActions(["setCategoria","eliminarCategoria"]),

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
                setTimeout(() => this.setCategoria(), 1000);
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
    this.setCategoria();
  }
}
</script>
