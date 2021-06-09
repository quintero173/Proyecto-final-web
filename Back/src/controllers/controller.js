const connection = require('../config/connection');

//funciones
function listaCategoria(req, res) {
    if(connection) {
        let sql = "SELECT * FROM proyecto.Categorias";
        connection.query(sql, (err, Categorias) => {
            if(err) {
                res.json(err);
            } else {
                console.log(Categorias);
                res.json(Categorias);
            }
        });
    }
}

function listaPersonal(req, res) {
    if(connection) {
        let sql = "SELECT * FROM proyecto.personal";
        connection.query(sql, (err, Personal) => {
            if(err) {
                res.json(err);
            } else {
                console.log(Personal);
                res.json(Personal);
            }
        });
    }
}

function listaTickets(req, res) {
    if(connection) {
        let sql = "SELECT * FROM proyecto.tickets";
        connection.query(sql, (err, Tickets) => {
            if(err) {
                res.json(err);
            } else {
                console.log(Tickets);
                res.json(Tickets);
            }
        });
    }
}


function obtenerCategoria(req, res) {
    if(connection){
        const { id } = req.params; 
        let sql = `SELECT * FROM proyecto.categorias WHERE idcategorias = ${connection.escape(id)}`;
        connection.query(sql, (err, Categoria) => {
            if(err){
                console.log(err);
            } else {
                var mensaje1 = "";
                if(Categoria === undefined || Categoria.length == 0)
                mensaje1 = "Categoria no encontrada";

                res.json({data: Categoria[0], mensaje: mensaje1});
            }
        })
    }

}


function obtenerPersonal(req, res) {
    if(connection){
        const { id } = req.params; 
        let sql = `SELECT * FROM proyecto.personal WHERE idpersonal = ${connection.escape(id)}`;
        connection.query(sql, (err, Personal) => {
            if(err){
                console.log(err);
            } else {
                var mensaje1 = "";
                if(Personal === undefined || Personal.length == 0)
                mensaje1 = "Personal no encontrada";

                res.json({data: Personal[0], mensaje: mensaje1});
            }
        })
    }

}

function obtenerTickets(req, res) {
    if(connection){
        const { id } = req.params; 
        let sql = `SELECT * FROM proyecto.tickets WHERE idtickets = ${connection.escape(id)}`;
        connection.query(sql, (err, Tickets) => {
            if(err){
                console.log(err);
            } else {
                var mensaje1 = "";
                if(Tickets === undefined || Tickets.length == 0)
                mensaje1 = "Tickets no encontrada";

                res.json({data: Tickets[0], mensaje: mensaje1});
            }
        })
    }

}
function obtenerCategoriaTicket(req, res) {
	if (connection) {
		const id = req.params.id;
		let sql = `SELECT * FROM proyecto.v_TicketPC WHERE idCategorias = ? ORDER BY idtickets`;
		connection.query(sql, [id], (err, Tickets) => {
			if (err) {
				console.log(err);
			} else {
				var mensaje1 = "";
				if (tickets === undefined || tickets.length == 0)
					mensaje1 = "la categoría no se ha encontrado";
				res.json({ data: Tickets, mensaje: mensaje1 });
			}
		});
	}
}


function crearCategoria(req, res){
    if(connection){
        console.log(req.body);
        const categoria = req.body;

        if(!categoria.nombre){
            return res.status(400).send({error: true, mensaje: "El nombre es obligatorio"});
        }

        if(categoria.nombre.length > 50 && categoria.nombre){
            return res.status(400).send({error: true, mensaje: "El nombre debe de ser maximo 50 caracteres"});
        }

        let sql = "INSERT INTO proyecto.categorias set ?";

        connection.query(sql, [categoria], (err, data) => {
            if(err){
                console.log(err);
            } else {
            
                res.json({error: false, data, mensaje: "Categoria creada con exito."});
            }
        })
    }
}

function crearPersonal(req, res){
    if(connection){
        console.log(req.body);
        const personal = req.body;

        if(!personal.nombre){
            return res.status(400).send({error: true, mensaje: "El nombre es obligatorio"});
        }

        if(!personal.apellidos){
            return res.status(400).send({error: true, mensaje: "El Apellido es obligatorio"});
        }

        if(personal.telefono.length > 0 && personal.telefono.length !== 10){
            return res.status(400).send({error: true, mensaje: "La longitud debe ser de 10 caracteres"});
        }

        let sql = "INSERT INTO proyecto.personal set ?";

        connection.query(sql, [personal], (err, data) => {
            if(err){
                console.log(err);
            } else {
            
                res.json({error: false, data, mensaje: "El personal fue creado con exito."});
            }
        })
    }
}

function crearTickets(req, res){
    if(connection){
        console.log(req.body);
        const tickets = req.body;

        if(!tickets.nombre){
            return res.status(400).send({error: true, mensaje: "El nombre es obligatorio"});
        }

        if(!tickets.prioridad){
            return res.status(400).send({error: true, mensaje: "La prioridad es obligatorio"});
        }

        if(!tickets.idPersonal){
            return res.status(400).send({error: true, mensaje: "El Personal es obligatorio"});
        }

        if(!tickets.idCategorias){
            return res.status(400).send({error: true, mensaje: "La Categoria es obligatoria"});
        }

        if(!tickets.estatus){
            return res.status(400).send({error: true, mensaje: "El Estatus es obligatorio"});
        }

        let sql = "INSERT INTO proyecto.tickets set ?";

        connection.query(sql, [tickets], (err, data) => {
            if(err){
                console.log(err);
            } else {
            
                res.json({error: false, data, mensaje: "El Ticket fue creado con exito."});
            }
        })
    }
}

function editarPersonal(req, res) {
    if(connection){
        const { id } = req.params;
        const personal = req.body;

        let sql = "UPDATE proyecto.personal set ? WHERE idPersonal = ?";

        connection.query(sql, [personal, id], (err, data) => {
            if(err) {
                res.json(err);
            } else {
                let mensaje = "";
                if(data.changedRows === 0) {
                    mensaje = "La información es la misma"
                } else {
                    mensaje = "Personal actualizado con exito."
                }

                res.json({error: false, data, mensaje});
            }
        } )
    }
}

function editarTickets(req, res) {
    if(connection){
        const { id } = req.params;
        const tickets = req.body;

        let sql = "UPDATE proyecto.tickets set ? WHERE idTickets = ?";

        connection.query(sql, [tickets, id], (err, data) => {
            if(err) {
                res.json(err);
            } else {
                let mensaje = "";
                if(data.changedRows === 0) {
                    mensaje = "La información es la misma"
                } else {
                    mensaje = "Ticket actualizado con exito."
                }

                res.json({error: false, data, mensaje});
            }
        } )
    }
}

function eliminarCategoria(req, res) {
    if(connection) {
        const { id } = req.params;
        let sql = "DELETE FROM proyecto.categorias WHERE idCategorias = ?";
        connection.query(sql, [id], (err, data) => {
            if(err) {
                res.json(err);
            } else {
                let mensaje = "";
                if(data.affectedRows === 0) {
                    mensaje = "Categoria no encontrada";
                } else {
                    mensaje = "Categoria eliminada con éxito";
                }

                res.json({error: false, data, mensaje});
            }
        })
    }
}

function eliminarPersonal(req, res) {
    if(connection) {
        const { id } = req.params;
        let sql = "DELETE FROM proyecto.personal WHERE idPersonal = ?";
        connection.query(sql, [id], (err, data) => {
            if(err) {
                res.json(err);
            } else {
                let mensaje = "";
                if(data.affectedRows === 0) {
                    mensaje = "Personal no encontrado";
                } else {
                    mensaje = "Personal se elimino con éxito";
                }

                res.json({error: false, data, mensaje});
            }
        })
    }
}

function eliminarTickets(req, res) {
    if(connection) {
        const { id } = req.params;
        let sql = "DELETE FROM proyecto.tickets WHERE idTickets = ?";
        connection.query(sql, [id], (err, data) => {
            if(err) {
                res.json(err);
            } else {
                let mensaje = "";
                if(data.affectedRows === 0) {
                    mensaje = "Ticket no encontrado";
                } else {
                    mensaje = "Ticket se elimino con éxito";
                }

                res.json({error: false, data, mensaje});
            }
        })
    }
}

module.exports = {
    listaCategoria,
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
    eliminarTickets
}