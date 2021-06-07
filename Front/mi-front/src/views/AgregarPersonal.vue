<template>
  <div>
      <h1>Agregar personal</h1>
      <b-form @submit.prevent="guardarPersonal()">
          <Input
            v-model="personal.nombre"
            id="nombre"
            titulo="Nombre"
            placeholder="Ingrese el dato"
            :maxlength="50"
            :error="erroresValidacion && !validacionNombre"
            mensajeError="Debes ingresar el dato requerido"
            class="mb-2"
          />
           <Input
            v-model="personal.apellidos"
            id="apellidos"
            titulo="Apellidos"
            placeholder="Ingrese el dato"
            :maxlength="80"
            :error="erroresValidacion && !validacionApellidos"
            mensajeError="Debes ingresar el dato requerido"
            class="mb-2"
          />
            <Input
            v-model="personal.telefono"
            id="telefono"
            titulo="Telefono"
            placeholder="Ingrese el dato"
            :maxlength="10"
            class="mb-2"
          />
            <Input
            v-model="personal.direccion"
            id="direccion"
            titulo="Direccion"
            placeholder="Ingrese el dato"
            :maxlength="150"
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
    name: 'AgregarPersonal',
    components: {
        Input
    },
    data() {
        return {
            Personal: {
                nombre: "",
                apellidos:"",
                telefono:"",
                direccion:""
            },
            erroresValidacion: false
        };
    },
    computed: {
        validacionNombre() {
            return (
                 this.Personal.nombre !==undefined && 
                 this.Personal.nombre.trim() !== ""
            )
        },
        validacionApellidos() {
            return (
                 this.Personal.apellidos !==undefined && 
                 this.Personal.apellidos.trim() !== ""
            )
        },
        validacionTelefono() {
            return (
                 this.Personal.telefono !==undefined && 
                 this.Personal.telefono.trim() !== ""
            )
        },
          validacionDireccion() {
            return (
                 this.Personal.direccion !==undefined && 
                 this.Personal.direccion.trim() !== ""
            )
        },
    },
    methods: {
        ...mapActions(['crearPersonal']),
        guardarPersonal() {
            if(this.validacionNombre && this.validacionApellidos) {
                this.erroresValidacion = false

                this.crearPersonal({
                    params: this.Personal,
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