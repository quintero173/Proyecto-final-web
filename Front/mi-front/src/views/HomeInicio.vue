<template>
	<div>
		<template>
			<div>
				<Select
					:items="categorias"
					showAll="Filtrar categorías"
					v-model="tickets.idTickets"
					id="idCategoria"
					iditem="idCategoria"
					name="nombre"
					titulo="Ver categorías"
					@filter="filtrarPorCategorias"
					class="col-3"
					
				/>
			</div>
			<div>

			<div class="tickets">
				<Select
					v-for="t in ticketsFiltrados"
					:key="t.idTickets"
					:id="t.idTickets"
					:titulo="t.nombre"
					:mensaje="t.descripcion"
					:tags="[obtenerPrioridad(t.ticket_prioridad), 
          obtenerEstatus(t.estatus)] "/>
			</div>


			</div>
		</template>
	</div>
</template>

<script>
import Select from "../components/Select";
import { mapState, mapActions } from "vuex";
export default {
	name: "HomeInicio",
	components: {
    Select
	
	},
	computed: {
		...mapState(["tickets", "categorias"]),
		ticketsFiltrados() {
			if (this.categoriaFiltro == 0) {
				return this.tickets;
			} else {
				return this.tickets.filter(row => {
					return row.idCategorias == this.categoriaFiltro;
				})
			}
		},
	},
	methods: {
		...mapActions([
			"setTickets",
			"setCategorias",
			"obtenerCategoriaTicket",
		]),
		obtenerEstatus(estatus) {
			if (estatus === "ABT") return "Abierto";
			if (estatus === "ESP") return "En espera";
			if (estatus === "FIN") return "Finalizado";
		},
		obtenerPrioridad(prioridad) {
			if (prioridad == 1) return "Baja";
			if (prioridad == 2) return "Media";
			if (prioridad == 3) return "Alta";
		},
		filtrarPorCategorias(idCategorias) {
			this.categoriaFiltro = idCategorias;
		},
	},
	data() {
		return {
			categoriaFiltro: 0,
			campos: [
				{
					key: "nombre",
					label: "Nombre del ticket",
				},
				{
					key: "nombre",
					label: "Categoría",
				},
			],
			tickets: {
				nombre: "",
				descripcion: "",
				prioridad: "",
				idPersonal: "",
				idCategorias: ""
			},
		};
	},
	mounted() {
		this.setTickets();
		this.setCategorias();
	},
};
</script>

<style>

</style>