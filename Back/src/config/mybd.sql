CREATE DATABASE Proyecto;

USE Proyecto;

CREATE TABLE `proyecto`.`categorias` (
  `idCategorias` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`idCategorias`));

CREATE TABLE `proyecto`.`personal` (
  `idPersonal` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(50) NOT NULL,
  `Apellidos` VARCHAR(80) NOT NULL,
  `Telefono` VARCHAR(10) NULL,
  `Direccion` VARCHAR(150) NULL,
  PRIMARY KEY (`idPersonal`));

CREATE TABLE `proyecto`.`tickets` (
  `idTickets` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(50) NOT NULL,
  `Descripcion` VARCHAR(100) NULL,
  `Prioridad` CHAR(1) NOT NULL,
  `idPersonal` INT NOT NULL,
  `idCategorias` INT NOT NULL,
  `Estatus` CHAR(3) NOT NULL,
  PRIMARY KEY (`idTickets`),
  INDEX `Categorias-Tickets_idx` (`idCategorias` ASC) VISIBLE,
  INDEX `Personal-Tickets_idx` (`idPersonal` ASC) VISIBLE,
  CONSTRAINT `Categorias-Tickets`
    FOREIGN KEY (`idCategorias`)
    REFERENCES `proyecto`.`categorias` (`idCategorias`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `Personal-Tickets`
    FOREIGN KEY (`idPersonal`)
    REFERENCES `proyecto`.`personal` (`idPersonal`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    
INSERT INTO Proyecto.Categorias(nombre) VALUES('Incidencia');
INSERT INTO Proyecto.Categorias(nombre) VALUES('Consulta');
INSERT INTO Proyecto.Categorias(nombre) VALUES('Pëticion de servicio');
insert into personal(nombre,apellidos,telefono,direccion)values("alvin","yakitori","6673241642","Villas del rio");
insert into personal(nombre,apellidos,telefono,direccion)values("Paul","yamaguchi","6721252356","Navolato city");
insert into personal(nombre,apellidos,telefono,direccion)values("Benjamin","camacho","6673242642","Villas del rio");
insert into tickets(nombre,descripcion,prioridad,idpersonal,idcategorias,estatus)values("inconformidad","deseo saber cómo funciona el sistema",1,1,1,"FIN");
insert into tickets(nombre,descripcion,prioridad,idpersonal,idcategorias,estatus)values("Consulta","deseo saber cómo funciona la consulta",2,2,2,"ABT");
insert into tickets(nombre,descripcion,prioridad,idpersonal,idcategorias,estatus)values("Catalogo incorrecto","error en el catalogo",3,3,3,"ESP");

CREATE VIEW V_TicketsPC AS
SELECT t.idTickets, t.Nombre, t.Descripcion, t.Prioridad, t.Estatus, 
p.idPersonal, "NombrePersonal" = p.Nombre, p.Apellidos, c.idCategorias, "NombreCategorias" = c.Nombre
FROM Tickets t
INNER JOIN personal p ON p.idPersonal = t.idPersonal
INNER JOIN categorias c ON c.idCategorias = t.idCategorias;