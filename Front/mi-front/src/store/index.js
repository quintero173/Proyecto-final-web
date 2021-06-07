import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categorias: [],
    categoria:{},

    personal: [],
    personal1:{}
    // nombreDeLaTabla1: {}
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

  },
  actions: {
  /*todos los SET*/ 
    setCategorias({commit}){
      axios.get('http://localhost:3000/')
      .then( response => {
        commit('SET_CATEGORIAS', response.data);
      })
    },
    setPersonal({commit}){
      axios.get('http://localhost:3000/')
      .then( response => {
        commit('SET_PERSONAL', response.data);
      })
    },
  /*todos los CREAR*/ 
    crearCategoria({commit}, {params, onComplete, onError}) {
      axios.post('http://localhost:3000/', params)
      .then(onComplete)
      .catch(onError)
    },
    crearPersonal({commit}, {params, onComplete, onError}) {
      axios.post('http://localhost:3000/', params)
      .then(onComplete)
      .catch(onError)
    },


    /*todos los OBTENER*/
    obtenerCategoria({commit}, {id, onComplete, onError}){
      axios.get(`http://localhost:3000/${id}`)
      .then( response => {
        commit('SET_CATEGORIA', response.data.data)
        onComplete(response)
      })
      .catch(onError)
    },
    obtenerPersonal({commit}, {id, onComplete, onError}){
      axios.get(`http://localhost:3000/${id}`)
      .then( response => {
        commit('SET_PERSONAL1', response.data.data)
        onComplete(response)
      })
      .catch(onError)
    },


    /*todos los ELIMINAR */
    eliminarCategoria({commit}, {id, onComplete, onError}){
      axios.delete(`http://localhost:3000/${id}`)
      .then(onComplete)
      .catch(onError)
    },
    eliminarPersonal({commit}, {id, onComplete, onError}){
      axios.delete(`http://localhost:3000/${id}`)
      .then(onComplete)
      .catch(onError)
    },

    
    /*todos los EDITAR */
    editarPersonal({commit}, {id, params, onComplete, onError} ) {
      axios.put(`http://localhost:3000/${id}`, params)
      .then(onComplete)
      .catch(onError)
    },
  },
  modules: {
  }
})
