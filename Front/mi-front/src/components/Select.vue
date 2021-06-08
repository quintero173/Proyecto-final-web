<template>
  <div>
    <label :for="id">{{ titulo }}</label>
    <div>
      <select
        :id="id"
        :disabled="disabled"
        @change="$emit('filter', $event.target.value)"
        @input="$emit('input', $event.target.value)"
      >
        <option :value="null" selected disabled>– Selecciona una de las opciones existentes –</option>
        <option v-if="showAll" :value="0" selected> {{ showAll }} </option>
        <option
          v-for="item in items"
          :value="item[iditem]"
          :key="item[iditem]"
          :selected="item[iditem]==vmodel"
        >
          {{ item[name] }} {{ item[lastname] }}
        </option>
      </select>
    </div>
    <span v-if="error">{{ mensajeError }}</span>
  </div>
</template>

<script>
export default {
  name: "Select",
  props: {
    showAll: String,
    items: Array,
    vmodel: {
      type: [String, Number],
      default: null,
    },
    iditem: String,
    name: String,
    lastname: String,
    id: {
      type: [String, Number],
      required: true,
    },
    titulo: String,
    disabled: {
      type: Boolean,
      default: false,
    },
    mensajeError: {
      type: String,
      default: "El campo es obligatorio",
    },
    error: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
</style>