const express = require('express');

const routes = express.Router();

const {listaCategoria,
listaPersonal,
listaTickets,
obtenerCategoria,
obtenerPersonal,
obtenerTickets,
crearCategoria,
crearPersonal,
crearTickets,
editarPersonal,
editarTickets,
eliminarCategoria,
eliminarPersonal,
eliminarTickets} = require('../controllers/controller');

routes.get('/', listaCategoria);
routes.get('/Categoria', listaCategoria);
routes.get('/Personal', listaPersonal);
routes.get('/Tickets', listaTickets);

routes.get('/Categoria/:id', obtenerCategoria);
routes.get('/Personal/:id', obtenerPersonal);
routes.get('/Tickets/:id', obtenerTickets);

routes.get('/Categoria', crearCategoria);
routes.get('/Personal', crearPersonal);
routes.get('/Tickets', crearTickets);

routes.get('/Personal/:id', editarPersonal);
routes.get('/Tickets/:id', editarTickets);

routes.get('/Categoria/:id', eliminarCategoria);
routes.get('/Personal/:id', eliminarPersonal);
routes.get('/Tickets/:id', eliminarTickets);

module.exports = routes;