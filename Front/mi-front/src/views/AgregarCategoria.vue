<template>
  <div>
      <h1>Agregar categoria</h1>
      <b-form @submit.prevent="guardarCategoria()">
          <Input
            v-model="categorias.nombre"
            id="nombre"
            titulo="Nombre"
            placeholder="Ingrese el dato"
            :maxlength="50"
            :error="erroresValidacion && !validacionNombre"
            mensajeError="Debes ingresar el dato requerido"
            class="mb-2"
          />
        <b-button type="submit" class="mt-2" variant="primary"> Guardar </b-button>
      </b-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Input from '../components/Input'
export default {
    name: 'AgregarCategoria',
    components: {
        Input
    },
    data() {
        return {
            categorias: {
                nombre: ""
            },
            erroresValidacion: false
        };
    },
    computed: {
        validacionNombre() {
            return (
                 this.categorias.nombre !==undefined && 
                 this.categorias.nombre.trim() !== ""
            )
        }
    },
    methods: {
        ...mapActions(['crearCategoria']),
        guardarCategoria() {
            if(this.validacionNombre) {
                this.erroresValidacion = false

                this.crearCategoria({
                    params: this.categorias,
                    onComplete: (response) => {
                        console.log(response.data);
                        this.$notify({
                            type: 'success',
                            title: response.data.mensaje,
                        });
                        this.$router.push({
                            name: 'Home'
                        })
                    },
                    onError: (error) => {
                        console.log(error.response.data.mensaje);
                        this.$notify({
                            type: 'error',
                            //  title: response.data.mensaje,
                        });
                    }
                });

            } else {
                this.erroresValidacion = true
            }
        }
    }

};
</script>

<style>

</style>