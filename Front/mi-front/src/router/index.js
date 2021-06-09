import Vue from 'vue'
import VueRouter from 'vue-router'

import HomeInicio from '../views/HomeInicio.vue'
import HomePersonal from '../views/HomePersonal.vue'
import HomeCategoria from '../views/HomeCategoria.vue'
import HomeTicket from '../views/HomeTicket.vue'



import AgregarPersonal from '../views/AgregarPersonal'
import AgregarCategoria from '../views/AgregarCategoria'
import AgregarTicket from '../views/AgregarTicket'


import EditarPersonal from '../views/EditarPersonal'
import EditarTicket from '../views/EditarTicket'
import EditarEstatus from '../views/EditarEstatus'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomeInicio',
    component: HomeInicio
  },
  {
    path: '/homePersonal',
    name: 'HomePersonal',
    component: HomePersonal
  },
  {
    path: '/homeTicket',
    name: 'HomeTicket',
    component: HomeTicket
  },
  {
    path: '/homeCategoria',
    name: 'HomeCategoria',
    component: HomeCategoria
  },
  {
    path: '/agregarPersonal',
    name: 'AgregarPersonal',
    component: AgregarPersonal
  },
  {
    path: '/agregarCategoria',
    name: 'AgregarCategoria',
    component: AgregarCategoria
  },
  {
    path: '/agregarTicket',
    name: 'AgregarTicket',
    component: AgregarTicket
  },
  {
    path: '/editarPersonal/:id',
    name: 'EditarPersonal',
    component: EditarPersonal
  },
  {
    path: '/editarTicket/:id',
    name: 'EditarTicket',
    component: EditarTicket
  },
  {
    path: '/editarEstatus/:id',
    name: 'EditarEstatus',
    component: EditarEstatus
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
