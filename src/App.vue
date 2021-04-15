<template>
  <Navbar />
  <div class="container">
    <router-view/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
  import Navbar from './components/Navbar'
  export default {
    methods:{
      ...mapActions(['cargarDB'])
    },
    components: {
      Navbar
    },
    created(){
      this.cargarDB()
    }
   
  }
</script>

