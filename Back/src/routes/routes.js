const express = require('express');

const routes = express.Router();

const {listaCategoria,
listaPersonal,
listaTickets,
obtenerCategoria,
obtenerPersonal,
obtenerTickets,
obtenerCategoriaTicket,
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
routes.get('/CategoriaTicket/:id', obtenerCategoriaTicket);

routes.post('/Categoria', crearCategoria);
routes.post('/Personal', crearPersonal);
routes.post('/Tickets', crearTickets);

routes.put('/Personal/:id', editarPersonal);
routes.put('/Tickets/:id', editarTickets);

routes.delete('/Categoria/:id', eliminarCategoria);
routes.delete('/Personal/:id', eliminarPersonal);
routes.delete('/Tickets/:id', eliminarTickets);

module.exports = routes;