<template>
  <div>
    <!-- Título en la pestaña del navegador -->
    <vue-headful title="Concursos finalizados" description="Todos los concursos" />
    <!-- Inserción del componente menú en el encabezado de la página -->
    <menucustom></menucustom>
    <div class="allconcourses">
      <!-- Vue headful para hacer visible el título en la pestaña del navegador -->
      <!--Llamada al spinner con condicional de que en cuanto nos dé el primer resultado, deje de cargar -->
      <!-- <spinner v-if="productos.length === 0"></spinner> -->
      <!--Indicamos la equivalencia de los arrays para concursos -->
      <div class="contenedorproductos">
        <listfinished :finalizados="finalizados"></listfinished>
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
import listfinished from "@/components/ListFinishedConcourses.vue";
import menucustom from "@/components/MenuCustom.vue";
//import footercustom from "@/components/FooterCustom.vue";
//import spinner from "@/components/Spinner.vue";


export default {
name: "finalizados",
//Componentes en esta vista:
components:{
    vueHeadful,
    listfinished,
    menucustom,
   
},

// El array que manejamos con los concursos
data(){
    return {
        finalizados: [],
    };
},

methods :{
    //FUNCIÓN PARA MOSTRAR TODOS LOS CONCURSOS

showAllFinishedConcourses (){
    let self= this;
    axios
        .get("http://localhost:3003/concursos/finalizados")
        //SI SALE BIEN
        .then(function (response) {
          

           self.finalizados = response.data.data.map((finalizado) =>{
          finalizado.url_foto = "http://localhost:3003/images/" + finalizado.url_foto;

          return finalizado;
          console.log(response);
           });
        })

        //SI SALE MAL
        .catch(function (error) {
          console.error(error);
        });
    }
},
  // LA LLAMADA A LA FUNCIÓN EN LA CARGA
created() {
    this.showAllFinishedConcourses();
}
};


</script>

<style>
</style>