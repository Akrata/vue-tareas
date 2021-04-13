<template>
    <form @submit.prevent="actualizarTarea(tarea)">
        <Inputs :tarea="tarea"></Inputs>
    </form>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Inputs from '../components/Inputs'
export default {
    methods:{
        ...mapActions(["seleccionarTarea","actualizarTarea"])
    },
    components:{
        Inputs,
    },
    computed:{
        ...mapState(['tarea'])
    },
    created(){
        this.seleccionarTarea(this.$route.params.id)
    }
    
}
</script>

<style>

</style>