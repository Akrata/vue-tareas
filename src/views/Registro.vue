<template>
  <div class="contenedor">
    <div class="alert alert-danger" v-if="error.message != null">
          <p>{{error.message}}</p>
      </div>
    <form @submit.prevent="procesarFormulario">
      <input
        type="email"
        class="form-control"
        placeholder="Email"
        v-model="email"
        :class="[error.tipo === 'email' ? 'is-invalid' : '']"
      />

      <input
        type="password"
        placeholder="Password"
        class="form-control"
        v-model="pass1"
      />

      <input
        type="password"
        placeholder="Repetir password"
        class="form-control"
        v-model="pass2"
      />

      <button type="submit" class="btn btn-primary" :disabled="bloquear">
        Registrar
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      email: "",
      pass1: "",
      pass2: "",
    };
  },
  methods: {
    ...mapActions(["registrarUsuario"]),
    procesarFormulario() {
      this.registrarUsuario({ email: this.email, password: this.pass1 });
      this.email = "";
      this.pass1 = "";
      this.pass2 = "";
    },
  },
  computed: {
    bloquear() {
      if (!this.email.includes("@")) {
        return true;
      }
      if (
        this.pass1 === this.pass2 &&
        this.pass1 !== "" &&
        this.pass1.length > 5
      ) {
        return false;
      }
      return true;
    },
    ...mapState(['error'])
  },
};
</script>

<style scoped>
.contenedor {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
}
form {
  width: 600px;
  display: grid;
  grid-row-gap: 15px;
}
</style>
