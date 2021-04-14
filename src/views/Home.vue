<template>
    <h1 class="my-5">Formularios con Vue.js</h1>

    <form @submit.prevent="procesarFormulario">
        <Inputs :tarea="tarea" />
    </form>
    <hr />
    <ListaTareas></ListaTareas>
</template>

<script>
    import Inputs from "../components/Inputs";
    import ListaTareas from "../components/ListaTareas";
    const shortid = require('shortid');
    import {mapActions} from 'vuex'
    export default {
        name: "Home",
        components: {
            Inputs,
            ListaTareas
        },
        data() {
            return {
                tarea: {
                    id: "",
                    nombre: "",
                    categorias: [],
                    estado: "",
                    numero: 0,
                },
            };
        },
        methods: {
            ...mapActions(['agregarTarea','cargarDB']),
            procesarFormulario() {
                if (this.tarea.nombre.trim() === "") {
                    console.log("nombre vacio");
                    return;
                }
                this.tarea.id = shortid.generate()
                this.agregarTarea(this.tarea)
                
                this.tarea = {
                    id:"",
                    nombre: "",
                    categorias: [],
                    estado: "",
                    numero: 0,
                }
            },

        },
        created(){
            this.cargarDB()
        }
       
    };
</script>
