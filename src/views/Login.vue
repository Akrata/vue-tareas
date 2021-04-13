<template>
  <div class="contenedor">
        <form @submit.prevent="procesarFormulario">
            <input
                type="email"
                class="form-control"
                placeholder="Email"
                v-model="email"
            />

            <input
                type="password"
                placeholder="Password"
                class="form-control"
                v-model="pass1"
            />

            <button type="submit" class="btn btn-success" :disabled="bloquear">
                Ingresar
            </button>
        </form>
    </div>
</template>

<script>
    import { mapActions } from "vuex";
    export default {
        data() {
            return {
                email: "",
                pass1: "",
            };
        },
        methods: {
            ...mapActions(["ingresarUsuario"]),
            procesarFormulario(){
                this.ingresarUsuario({ email: this.email, password: this.pass1 })
                this.email= ""
                this.pass1= ""
            }
        },
        computed: {
            bloquear() {
                if (!this.email.includes("@")) {
                    return true;
                }
                if (
                    this.pass1 !== "" &&
                    this.pass1.length > 5
                ) {
                    return false;
                }
                return true;
            },
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

