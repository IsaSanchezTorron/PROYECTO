<template>
  <div>
    <!--Encabezado de página -->
    <h1>CONCURSOS ACTIVOS ACTUALMENTE</h1>
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
      <br />
      <!-- Contenedor para dar formato a la ficha de productos, lo cargamos con el array de productos filtrados -->
      <div
        class="concursoscontenedor"
        v-for="(concurso, index) in concursosFiltrados"
        :key="concurso.id"
      >
        <p>
          📌
          {{ concurso.id_concurso }}
        </p>
        <h3>
          <b>{{ concurso.nombre }}</b>
        </h3>
        <p>
          <img :src="concurso.url_foto" />
        </p>

        <!-- REVISAR estas clases dinámicas dependientes de FECHA -->
        <!--  <p
          :class="{
            green: concurso.fecha_final >= 'datetoday',
            red: concurso.fecha_final <= 'datetoday',
          }"
        >-->

        <p>
          <b>🏠 Modalidad:</b>
          {{ concurso.modalidad }}
        </p>

        <p>
          <b>🎭 Genero:</b>
          {{ concurso.genero }}
        </p>

        <p v-if="concurso.ciudad">
          <b>🌆 Ciudad:</b>
          {{ concurso.ciudad }}
        </p>
        <p v-if="concurso.fecha_asignacion_ganador">
          <b>📅 Publicación de ganadores:</b>
          {{ concurso.fecha_asignacion_ganador | moment(" D-MM-YYYY") }}
        </p>
        <p v-if="concurso.nombre_ganador">
          <b>🥇 Ganador:</b>
          {{concurso.nombre_ganador}}
        </p>
        <p v-if="concurso.valoracion">
          <b>🌠 Valoración media:</b>
          {{ concurso.valoracion }}
        </p>
        <p>Publicado el: {{concurso.fecha_publicacion | moment(" D-MM-YYYY") }}</p>
        <p style="color:red">
          <b>📆 Cierre de suscripción:</b>
          {{ concurso.fecha_final | moment(" D-MM-YYYY")}}
        </p>
        <!-- Un modal para consultar las bases del concurso -->
        <button id="baseseinscripciones" @click="openModal(index)">ℹ️ VER BASES</button>

        <div v-show="modal" class="modal">
          <div class="modalbox">
            <h1>Bases del concurso</h1>
            <p>{{concursobases.descripcion}}</p>
            <button id="modalbutton" @click="closeModal()">Cerrar</button>
          </div>
        </div>

        <br />
        <br />
        <button id="baseseinscripciones" @click="confirmInscription(concurso)">✅ QUIERO INSCRIBIRME</button>
      </div>
    </div>
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

export default {
  name: "listallconcourses",
  props: {
    // Le indicamos que está recibiendo un array.
    concursos: Array,
    
  },

  data() {
    return {
      // Inicializamos un string vacío que contendrá la búsqueda.
      search: "",
      id: null,
      
      concursobases: {},
      modal: false,
      descripcion:"",
    };
  },

  computed: {
    //FUNCIÓN PARA FILTRAR PRODUCTOS
    concursosFiltrados() {
      // Si en la búsqueda no hay nada nos devuelve todo.
      if (!this.search) {
        return this.concursos;
        console.log(this.concursos);
      }
      return this.concursos.filter(
        (concurso) =>
          concurso.nombre.toLowerCase().includes(this.search.toLowerCase()) ||
          concurso.descripcion
            .toLowerCase()
            .includes(this.search.toLowerCase()) ||
          concurso.modalidad
            .toLowerCase()
            .includes(this.search.toLowerCase()) ||
          concurso.genero.toLowerCase().includes(this.search.toLowerCase())
        //Ojo aquí, pendiente que funcione la búsqueda por ciudad.
        // concurso.ciudad.toLowerCase().includes(this.search.toLowerCase())
      );
    },

  },



  methods: {
openModal(index) {
      this.modal = true;
      this.concursobases=this.concursos[index];

     
      

   },
   closeModal(){
     this.modal = false;
   },





// MÉTODO PARA EL BOTÓN DE INSCRIPCIÓN EN CONCURSO.

confirmInscription(concurso) {
  console.log(concurso.id_concurso);
 const self = this; 
 

      // Cojo token e id.
      const token = localStorage.getItem("token");
      const data = localStorage.getItem("id");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
     

     Swal.fire({
        title: "🤓",
        text: "¿Quieres suscribirte a este concurso?",
        showCancelButton: true,
        confirmButtonColor: "#FE9F1D",
        cancelButtonColor: "#2EC4B6",
        confirmButtonText: "Sí, quiero suscribirme.",
        cancelButtonText: "Volver",
      })
      
      
      .then(result => {
        if (result.value) {
 
      axios
        .post(
          "http://localhost:3003/concursos/inscripciones/inscribirme/" +
            concurso.id_concurso,
           
          
        )
        .then(function (response) {
        
          
          // Enviamos mensaje de confirmación de inscripción
          Swal.fire({
            title: "✔️",
            text: "Te has inscrito en el concurso con éxito",
            confirmButtonText: "O.K",
            confirmButtonColor: "#FE9F1D",
            
            timer: 3000,
          });
        })
        
        //Recogemos posibles errores
        .catch(function (error) {
          console.log(error.response.data.message); 
        
        
 
          Swal.fire({
            title: "⚠️",
            text: "Ya estás inscrita en este concurso.",
            confirmButtonText: "O.K",
            confirmButtonColor: "#FE9F1D",
        
            timer: 3000,

          })
        })
        }},
      )}
  },
  

    
  };


</script>

<style scoped>
.green {
  color: green;
}

.red {
  color: red;
}

.concursoscontenedor {
  box-shadow: 0 0 10px var(--black);
  padding: 2em;

  margin: 40px auto;
  border-radius: 20px;
  width: 500px;
  height: 900px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  justify-self: center;
  justify-content: center;

  line-height: 0.9;
  background-color: var(--naranjaclaro);
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
  font-size: 1.3em;
}

img {
  width: 250px;
  height: 250px;
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
  font-size: 1.9em;
}

input {
  width: 500px;
  height: 50px;
  font-size: 1.5em;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  border-radius: 30px;
  width: 100%;
}

.modalbox {
  background: var(--verdeclaro);
  margin: 15% auto;
  padding: 50px;
  border: 1px solid #888;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  align-items: center;
  border-radius: 50px;

  box-shadow: 0px 0px 3px grey;
  line-height: 1.5;
  overflow-y: scroll;
  scrollbar-track-color: var(--verdeoscuro);
  box-shadow: 5px 10px 20px rgba(5, 133, 126, 0.507);
}

button {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 300px;
  height: 30px;
  font-size: 1.3em;

  /*  box-shadow: 0 0 10px rgb(12, 12, 12); */
  margin: 10px;

  font-family: "Ubuntu", sans-serif;
  color: var(--black);
  transition: background-color 0.3s;
  background-color: var(--verdeoscuro);
  border-radius: 100px;
}

#volver {
  width: 250px;
  margin-left: 55px;
}

button:hover {
  background-color: var(--blue);
  color: var(--black);
}

h1 {
  color: var(--verdeoscuro);
}

a {
  text-decoration: none;
  color: var(--white);
}

#modalbutton {
  width: 200px;
  height: 50px;
}
</style>
