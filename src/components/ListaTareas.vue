<template>
    <table class="table">
        <thead class="thead-dark">
            <tr>
                <!-- <th scope="col">#</th> -->
                <th scope="col">Nombre</th>
                <th scope="col">Categorias</th>
                <th scope="col">Urgencia</th>
                <th scope="col">Numero</th>
                <th scope="col">Accion</th>
                
            </tr>
        </thead>
        <tbody>
            <tr  v-for="tarea in tareas" :key="tarea.id">
                <!-- <th scope="row">{{tarea.id}}</th> -->
                <td>{{tarea.nombre}}</td>
                <!-- <td>{{tarea.categorias.join(", ")}}</td> -->
                <td>{{tarea.estado}}</td>
                <td>{{tarea.numero}}</td>
                <td>
                    <router-link :to="{
                        name: 'editarTarea',
                        params:{
                            id: tarea.id
                        }
                    }" class="btn btn-warning btn-sm mx-2">Editar</router-link>
                    <button class="btn btn-danger btn-sm" @click="eliminarTarea(tarea.id)">Eliminar</button>
                </td>

            </tr>
        </tbody>
    </table>
</template>

<script>
import { mapState, mapActions } from 'vuex';
    export default {
        methods:{
            ...mapActions(['eliminarTarea','actualizarTarea'])
        },
        computed:{
           ...mapState(["tareas"])
       }
    };

</script>

<style></style>
