<template>
  <div>
      <h1>Editar Personal</h1>
      <b-form @submit.prevent="guardarPersonal()">
      <Input
        v-model="persona.idPersonal"
        id="idPersonal"
        titulo="Clave"
        :disabled ="true"
        class="mb-2"
      />
      <Input
        v-model="persona.Nombre"
        id="Nombre"
        titulo="Nombre"
        placeholder="Ingrese el nombre"
        :maxlength="50"
        :error="erroresValidacion && !validacionNombre"
        mensajeError="Es necesario ingresar el nombre"
        class="mb-2"
      />
      <Input
        v-model="persona.Apellidos"
        id="Apellidos"
        titulo="Apellidos"
        :maxlength="80"
        :error="erroresValidacion && !validacionApellidos"
        mensajeError="Es necesario ingresar el apellido"
        placeholder="Ingrese el apellido"
        class="mb-2"
      />
      <Input
        v-model="persona.Telefono"
        id="Telefono"
        titulo="Teléfono"
        :maxlength="10"
        placeholder="Ingrese el telefono"
        class="mb-2"
      />
      <Input
        v-model="persona.Direccion"
        id="Direccion"
        titulo="Dirección"
        :maxlength="150"
        placeholder="Ingrese la dirección"
      />
      <b-button type="submit" class="mt-2" variant="primary">Guardar</b-button>
    </b-form>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions} from 'vuex'
import Input from "../components/Input";

export default {
name: 'EditarPersonal',
components: {
    Input,
  },
  data() {
    return {
      persona: {
        Nombre: "",
        Apellidos: "",
        Telefono: "",
        Direccion: "",
      },
      erroresValidacion: false,
    };
  },
computed: {
    validacionNombre() {
      return (
        this.persona.Nombre !== undefined &&
        this.persona.Nombre.trim() !== ""
      );
    },
    validacionApellidos() {
      return (
        this.persona.Apellidos !== undefined && 
        this.persona.Apellidos.trim() !== ""
      );
    },
},
methods: {
    ...mapActions(['obtenerPersonal', 'editarPersonal']),
    guardarPersonal() {
      if (this.validacionNombre &&
         this.validacionApellidos) {
          this.erroresValidacion = false;

        //Guardar
         this.editarPersonal({
          id: this.$route.params.id,
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
    }
},
created() {
    this.obtenerPersonal({
        id: this.$route.params.id,
        onComplete: (response) => {
            Vue.set(this, 'persona', response.data.data)
        }
    })
}
}
</script>

<style>

</style>