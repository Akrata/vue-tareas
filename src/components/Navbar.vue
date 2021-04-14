<template>
  <div class="navbar navbar-dark bg-dark">
    <router-link to="/" class="navbar-brand">
      Formularios
    </router-link>
    <div class="d-flex gap-2">
      <router-link v-if="userAutenticado" class="btn btn-dark" to="/">
        Tareas
      </router-link>
      <button v-if="userAutenticado" class="btn btn-dark " @click="cerrarSesion">
        Cerrar Sesion
      </button>
      <router-link  to="/registro" v-if="!userAutenticado" class="btn btn-dark">
        Registrar
      </router-link>
      <router-link to="/login" v-if="!userAutenticado" class="btn btn-dark">
        Ingresar
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  methods:{
    ...mapActions(['cerrarSesion'])
  },
  computed: {
    ...mapGetters(["userAutenticado"]),
  },
};
</script>
