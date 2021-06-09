import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    personal: [],
    persona: {},

    categorias: [],
    categoria: {},

    tickets: [],
    ticket: {},
    
    loading: false
  },
  mutations: {
    //CATEGORIAS
    SET_CATEGORIAS(state, categorias) {
      state.categorias = categorias;
    },
    SET_CATEGORIA(state, categoria) {
      state.categoria = categoria;
    },
    //PERSONAL
    SET_PERSONAl(state, personal) {
      state.personal = personal;
    },
    SET_PERSONA(state, persona) {
      state.persona = persona;
    },
    //TICKETS
    SET_TICKETS(state, tickets) {
      state.tickets = tickets;
    },
    SET_TICKET(state, ticket) {
      state.ticket = ticket;
    },
    SET_LOADING(state, payload) {
      state.loading = payload;
    },
  },
  actions: {
    //CATEGORIAS
    setCategoria({commit}){
      commit("SET_LOADING", true);
      axios.get('http://localhost:3000/Categoria')
      .then( response => {
        commit('SET_CATEGORIAS', response.data);
      })
      .finally(() => commit('SET_LOADING', false))
    },
    crearCategoria({commit}, {params, onComplete, onError}) {
      axios.post('http://localhost:3000/Categoria', params)
      .then(onComplete)
      .catch(onError)
    },
    obtenerCategoria({commit}, {id, onComplete, onError}) {
      axios.get(`http://localhost:3000/Categoria/${id}`)
      .then( response => {
        commit('SET_CATEGORIA', response.data.data);
        onComplete(response)
      })
      .catch(onError)
    },
    eliminarCategoria({commit}, {id, onComplete, onError}){
      axios.delete(`http://localhost:3000/Categoria/${id}`)
      .then(onComplete)
      .catch(onError)
    },
    //PERSONAL
    setPersonal({commit}){
      commit("SET_LOADING", true);
      axios.get('http://localhost:3000/Personal')
      .then( response => {
        commit('SET_PERSONAl', response.data);
      })
      .finally(() => commit('SET_LOADING', false))
    },
    crearPersonal({commit}, {params, onComplete, onError}) {
      axios.post('http://localhost:3000/Personal', params)
      .then(onComplete)
      .catch(onError)
    },
    obtenerPersonal({commit}, {id, onComplete, onError}) {
      axios.get(`http://localhost:3000/Personal/${id}`)
      .then( response => {
        commit('SET_PERSONA', response.data.data);
        onComplete(response)
      })
      .catch(onError)
    },
    editarPersonal({commit}, {id, params, onComplete, onError} ) {
      axios.put(`http://localhost:3000/Personal/${id}`, params)
      .then(onComplete)
      .catch(onError)
    },
    eliminarPersonal({commit}, {id, onComplete, onError}){
      axios.delete(`http://localhost:3000/Personal/${id}`)
      .then(onComplete)
      .catch(onError)
    },
    //TICKETS
    setTicket({commit}){
      commit("SET_LOADING", true);
      axios.get('http://localhost:3000/Tickets')
      .then( response => {
        commit('SET_TICKETS', response.data);
      })
      .finally(() => commit('SET_LOADING', false))
    },
    crearTicket({commit}, {params, onComplete, onError}) {
      axios.post('http://localhost:3000/Tickets', params)
      .then(onComplete)
      .catch(onError)
    },
    obtenerTicket({commit}, {id, onComplete, onError}) {
      axios.get(`http://localhost:3000/Tickets/${id}`)
      .then( response => {
        commit('SET_TICKET', response.data.data);
        onComplete(response)
      })
      .catch(onError)
    },
    editarTicket({commit}, {id, params, onComplete, onError} ) {
      axios.put(`http://localhost:3000/Tickets/${id}`, params)
      .then(onComplete)
      .catch(onError)
    },
    eliminarTicket({commit}, {id, onComplete, onError}){
      axios.delete(`http://localhost:3000/Tickets/${id}`)
      .then(onComplete)
      .catch(onError)
    },

  },
  modules: {
  }
})
