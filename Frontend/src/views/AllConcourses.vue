<template>
  <div>
    <!-- Inserción del componente menú en el encabezado de la página -->
    <menucustom></menucustom>
    <div class="allconcourses">
      <!-- Vue headful para hacer visible el título en la pestaña del navegador -->
      <!--Llamada al spinner con condicional de que en cuanto nos dé el primer resultado, deje de cargar -->
      <!-- <spinner v-if="productos.length === 0"></spinner> -->
      <vue-headful title="Todos los concursos" />
      <!--Indicamos la equivalencia de los arrays para concursos -->
      <div class="contenedorproductos">
        <listallconcourses :concursos="concursos"></listallconcourses>
      </div>
    </div>
  </div>
</template>

<script>
// Importaciones para 
// manejar rutas, endpoints...
import axios from "axios";
// manejar títulos de página visibles en navegador.
import vueHeadful from "vue-headful";
// componentes internos:
import listallconcourses from "@/components/ListAllConcourses.vue";
import menucustom from "@/components/MenuCustom.vue";
//import footercustom from "@/components/FooterCustom.vue";
//import spinner from "@/components/Spinner.vue";


export default {
name: "concursos",
//Componentes en esta vista:
components:{
    vueHeadful,
    listallconcourses,
    menucustom,
},

// El array que manejamos con los concursos
data(){
    return {
        concursos: [],
    };
},

methods :{
    //FUNCIÓN PARA MOSTRAR TODOS LOS CONCURSOS

showAllConcourses (){
    let self= this;
    axios
        .get("http://localhost:3003/concursos/listado")
        //SI SALE BIEN
        .then(function (response) {
          self.concursos = response.data.data;
          console.log(response);
        })
        //SI SALE MAL
        .catch(function (error) {
          console.error(error);
        });
    },
  },
  // LA LLAMADA A LA FUNCIÓN EN LA CARGA
  created() {
    this.showAllConcourses();
    
},

};
</script>

<style>
</style>