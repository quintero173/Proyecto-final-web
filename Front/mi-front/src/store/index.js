import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categorias: [],
    categoria:{},

    personal: [],
    personal1:{},

    tickets: [],
    tickets1: {}
  },
  mutations: {
    SET_CATEGORIAS(state, categorias) {
      state.categorias = categorias;
    },
    SET_CATEGORIA(state, categoria) {
      state.categoria = categoria;
    },

    SET_PERSONAL(state, personal) {
      state.personal = personal;
    },
    SET_PERSONAL1(state, personal1) {
      state.personal1 = personal1;
    },

    SET_TICKETS (state, tickets) {
      state.tickets = tickets;
    },
    SET_TICKETS1 (state, tickets1) {
      state.tickets1 = tickets1;
    }

  },
  actions: {
  /*todos los SET*/ 
    setCategorias({commit}){
      axios.get('http://localhost:3000/Categoria')
      .then( response => {
        commit('SET_CATEGORIAS', response.data);
      })
    },
    setPersonal({commit}){
      axios.get('http://localhost:3000/Personal')
      .then( response => {
        commit('SET_PERSONAL', response.data);
      })
    },
    setTickets({commit}){
      axios.get('http://localhost:3000/Tickets')
      .then( response => {
        commit('SET_TICKETS', response.data);
      })
    },

  /*todos los CREAR*/ 
    crearCategoria({commit}, {params, onComplete, onError}) {
      axios.post('http://localhost:3000/Categoria', params)
      .then(onComplete)
      .catch(onError)
    },
    crearPersonal({commit}, {params, onComplete, onError}) {
      axios.post('http://localhost:3000/Personal', params)
      .then(onComplete)
      .catch(onError)
    },
    crearTickets({commit}, {params, onComplete, onError}) {
      axios.post('http://localhost:3000/Tickets', params)
      .then(onComplete)
      .catch(onError)
    },

    /*todos los OBTENER*/
    obtenerCategoria({commit}, {id, onComplete, onError}){
      axios.get(`http://localhost:3000/Categoria/${id}`)
      .then( response => {
        commit('SET_CATEGORIA', response.data.data)
        onComplete(response)
      })
      .catch(onError)
    },
    obtenerPersonal({commit}, {id, onComplete, onError}){
      axios.get(`http://localhost:3000/Personal/${id}`)
      .then( response => {
        commit('SET_PERSONAL1', response.data.data)
        onComplete(response)
      })
      .catch(onError)
    },
    obtenerTickets({commit}, {id, onComplete, onError}){
      axios.get(`http://localhost:3000/Tickets/${id}`)
      .then( response => {
        commit('SET_TICKETS1', response.data.data)
        onComplete(response)
      })
      .catch(onError)
    },

    /*todos los ELIMINAR */
    eliminarCategoria({commit}, {id, onComplete, onError}){
      axios.delete(`http://localhost:3000/Categoria/${id}`)
      .then(onComplete)
      .catch(onError)
    },
    eliminarPersonal({commit}, {id, onComplete, onError}){
      axios.delete(`http://localhost:3000/Personal/${id}`)
      .then(onComplete)
      .catch(onError)
    },
    eliminarTickets({commit}, {id, onComplete, onError}){
      axios.delete(`http://localhost:3000/Tickets/${id}`)
      .then(onComplete)
      .catch(onError)
    },
    
    /*todos los EDITAR */
    editarPersonal({commit}, {id, params, onComplete, onError} ) {
      axios.put(`http://localhost:3000/Personal/${id}`, params)
      .then(onComplete)
      .catch(onError)
    },
    editarTickets({commit}, {id, params, onComplete, onError} ) {
      axios.put(`http://localhost:3000/Tickets/${id}`, params)
      .then(onComplete)
      .catch(onError)
    },
  },
  modules: {
  }
})
