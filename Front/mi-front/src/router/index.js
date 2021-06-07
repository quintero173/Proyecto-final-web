import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeInicio from '../views/HomeInicio.vue'
import HomeCategoria from '../views/HomeCategoria'
import HomePersonal from '../views/HomePersonal'

import AgregarCategoria from '../views/AgregarCategoria'
import AgregarPersonal from '../views/AgregarPersonal'

/*import Editar from '../views/Editar'*/

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomeInicio',
    component: HomeInicio
  },
  {
    path: '/homeCategoria',
    name: 'HomeCategoria',
    component: HomeCategoria
  },
  {
    path: '/homePersonal',
    name: 'HomePersonal',
    component: HomePersonal
  },
  {
    path: '/agregarCategoria',
    name: 'AgregarCategoria',
    component: AgregarCategoria
  },
  {
    path: '/agregarPersonal',
    name: 'AgregarPersonal',
    component: AgregarPersonal
  }
  /*{
    path: '/editar/:id',
    name: 'Editar',
    component: Editar
  }*/
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
