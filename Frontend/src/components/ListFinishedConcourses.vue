<template>
  <div>
    <!--Encabezado de página -->
    <h1>CONCURSOS QUE YA HAN FINALIZADO</h1>
    <!--  <button id="volver">
      <a>
        <router-link :to="{ name: 'Profile' }">Volver a mi perfil</router-link>
      </a>
    </button>-->

    <!-- Forumulario de búsqueda -->
    <div id="formulariobusqueda">
      <label for="bySearch">Búsqueda</label>
      <br />
      <input
        v-model="search"
        id="search"
        name="bySearch"
        type="search"
        placeholder="🔍 Nombre/Descripción, Modalidad, Genero..."
      />
    </div>

    <div class="contenedor">
      <!-- Contenedor para dar formato a la ficha de productos, lo cargamos con el array de productos filtrados -->
      <div
        class="concursoscontenedor"
        v-for="finalizado in finalizadosFiltrados"
        :key="finalizado.id"
      >
        <p>
          📌
          {{ finalizado.id_concurso }}
        </p>
        <h3>
          <b>{{ finalizado.nombre }}</b>
        </h3>
        <p>
          <img :src="finalizado.url_foto" />
        </p>

        <p>
          <b>🏠 Modalidad:</b>
          {{ finalizado.modalidad }}
        </p>

        <p>
          <b>🎭 Genero:</b>
          {{ finalizado.genero }}
        </p>

        <p v-if="finalizado.ciudad">
          <b>🌆 Ciudad:</b>
          {{ finalizado.ciudad }}
        </p>

        <p style="color:grey">Publicado el: {{finalizado.fecha_publicacion | moment(" D-MM-YYYY") }}</p>
        <p style="color:grey">
          <b>📆 Cierre de suscripción:</b>
          {{ finalizado.fecha_final | moment(" D-MM-YYYY")}}
        </p>

        <p v-if="finalizado.fecha_asignacion_ganador">
          <b>📅 Publicación de ganadoras:</b>
          {{ finalizado.fecha_asignacion_ganador | moment(" D-MM-YYYY") }}
        </p>
        <p v-if="finalizado.nombre_ganador" style="color:red">
          <b>🥇 Ganadora:</b>
          {{finalizado.nombre_ganador}} {{finalizado.apellidos_ganador}}
        </p>
        <p v-if="finalizado.valoracion">
          <b>🌠 Valoración media:</b>
          {{ finalizado.valoracion }}
        </p>

        <!-- Un modal para consultar las bases del concurso -->
      </div>
    </div>

    <barraredessociales></barraredessociales>
  </div>
</template>

<script>
// IMPORTAMOS PARA
// formatear fechas
import VueMoment from "vue-moment";
// enviar mensajes custom
import Swal from "sweetalert2";
// manejo de rutas y endpoints
import axios from "axios";
// componentes internos
import barraredessociales from "@/components/BarraRedesSociales.vue";

export default {
  name: "listfinished",
  components: { barraredessociales },
  props: {
    // Le indicamos que está recibiendo un array.
    finalizados: Array
  },

  data() {
    return {
      // Inicializamos un string vacío que contendrá la búsqueda.
      search: ""
    };
  },

  computed: {
    //FUNCIÓN PARA FILTRAR PRODUCTOS
    finalizadosFiltrados() {
      // Si en la búsqueda no hay nada nos devuelve todo.
      if (!this.search) {
        return this.finalizados;
        console.log(this.finalizados);
      }
      return this.finalizados.filter(
        concurso =>
          finalizado.nombre.toLowerCase().includes(this.search.toLowerCase()) ||
          finalizado.descripcion
            .toLowerCase()
            .includes(this.search.toLowerCase()) ||
          finalizado.modalidad
            .toLowerCase()
            .includes(this.search.toLowerCase()) ||
          finalizado.genero.toLowerCase().includes(this.search.toLowerCase())
        //Ojo aquí, pendiente que funcione la búsqueda por ciudad.
        // concurso.ciudad.toLowerCase().includes(this.search.toLowerCase())
      );
    }
    /* 
      checkDate(finalizado){
        console.log("comprueba la fecha");
        const today = new Date();
        if (concurso.fecha_final < today){
         
          return true;
        }else{
          return false;concursos
        }
        
      },
 */
  }
};
</script>

<style scoped>
.green {
  color: green;
}

.red {
  color: red;
}
/* .concursoscontenedor {
  box-shadow: 0 0 10px var(--black);
  padding: 3em;
  width: 300px;
  margin: 50px auto;
  flex-wrap: wrap;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.contenedor {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 90%;
  margin: 10px auto;
} */

.concursoscontenedor {
  box-shadow: 0 0 10px var(--black);
  padding: 1em;
  width: 300px;
  margin: 40px auto;
  border-radius: 20px;

  height: 800px;
  display: flex;
  flex-direction: column;
  /* s */
  background-color: var(--white);
  background-color: var(--verdeclaro);
}

.contenedor {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 90%;
  margin: 10px auto;
}

p {
  font-size: 1em;
}

img {
  width: 180px;
  height: 180px;
  border-radius: 20px;
  transition: transform 0.5s ease-in-out;
}
img:hover {
  transform: scale(1.3);
}

#formulariobusqueda {
  padding: 2em;
}

h3 {
  text-transform: uppercase;
  font-size: 1.1em;
  line-height: 2;
}

h1 {
  color: var(--blue);
}

button {
  color: white;
}

input {
  width: 500px;
  height: 40px;
  font-size: 1.1em;
}

/* .modal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  border-radius: 150px;
  width: 100%;
}

.modalbox {
  background: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 50px;
  border: solid 2px var(--black);
  box-shadow: 0 0 1px var(--black); 
}*/

#volver {
  width: 250px;
  margin-left: 55px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 450px;
  height: 50px;
  font-size: 1.5em;
  padding: 0.4em;
  box-shadow: 0 0 10px rgb(12, 12, 12);
  margin: 10px;
  font-family: "Ubuntu", sans-serif;
  color: var(--white);
  transition: background-color 0.3s;
  background-color: var(--black);
  border-radius: 100px;
}
#volver:hover {
  background-color: var(--blue);
  color: var(--black);
}

a {
  text-decoration: none;
  color: var(--white);
}
</style>
