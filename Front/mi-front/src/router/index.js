import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeInicio from '../views/HomeInicio.vue'
import HomeCategoria from '../views/HomeCategoria'
import HomePersonal from '../views/HomePersonal'
import HomeTickets from '../views/HomeTickets'


import AgregarCategoria from '../views/AgregarCategoria'
import AgregarPersonal from '../views/AgregarPersonal'
import AgregarTickets from '../views/AgregarTickets'

import EditarPersonal from '../views/EditarPersonal'
import EditarTicket from '../views/EditarTicket'
import EditarEstatus from "../views/EditarEstatus";

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
    path: '/homeTickets',
    name: 'HomeTickets',
    component: HomeTickets
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
  },
  {
    path: '/agregarTickets',
    name: 'AgregarTickets',
    component: AgregarTickets
  },
  {
    path: '/editarPersonal/:idPersonal',
    name: 'EditarPersonal',
    component: EditarPersonal
  },
  {
    path: '/editarTickets/:idTickets',
    name: 'EditarTicket',
    component: EditarTicket
  },
  {
    path: "/editarestatus/:idTickets",
    name: "EditarEstatus",
    component: EditarEstatus,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
