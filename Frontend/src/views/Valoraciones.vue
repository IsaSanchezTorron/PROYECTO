<template>
  <div>
    <!-- Definimos el título de página visible en navegador -->
    <vue-headful title="Perfil" description="Tu perfil" />

    <!-- Inserción del componente menú en la cabecera de la vista -->
    <menucustom></menucustom>
    <h1>GRACIAS POR FORMAR PARTE DE LA COMUNIDAD INTERTEXTUAL</h1>

    <hr />
    <div id="saludo">
      <!-- Imagen de perfil del usuario -->
      <img id="perfil" :src="user.url_foto" alt="Foto de perfil de usuario" />
    </div>

    <!-- Visualizar los concursos mejor valorados por el público -->
    <div class="ranking">
      <!--  <div id="contenedorranking"> -->
      <div id="fotoinformativa">
        <img
          id="fotoinformativa"
          src="../assets/images/intertextualranking.png"
          alt="foto informativa"
        />
      </div>

      <ul id="concursosul" v-for="top in tops" :key="top.id">
        <li>
          <h2 id="nombreconcurso">
            <b>👑 {{ top.nombre }}</b>
          </h2>
        </li>
        <li>
          <img id="fotoconcurso" :src="top.url_foto" alt="Foto de perfil de usuario" />
        </li>
        <li>
          <b>Cerrado el :</b>
          {{top.fecha_final | moment(" D MM YYYY") }}
        </li>
        <li>
          <b>Nota media :</b>
          {{ top.valoracion}}⭐️
        </li>
      </ul>

      <!-- </div> -->
    </div>
    <hr />
    <div id="contenedortotalpendientes">
      <div id="menuizquierda">
        <!-- <div id="button">
        <p>-->
        <!--   <button @click="seeRaking()">🥇 Ver concursos mejor valorados</button> -->

        <button id="volver">
          <a>
            <router-link :to="{ name: 'Profile' }">Volver a mi perfil</router-link>
          </a>
        </button>
        <!--  </p> -->
      </div>

      <div id="segundamitadvista">
        <div id="parrafovotaciones">
          <p
            id="explicacion"
          >Intertextual está creciendo para ti, valorando los concursos en que has participado contribuyes a crear comunidad, estamos trabajando para conectar a los amantes de la literatura y pronto podrás interactuar con escritores como tú y compartir gustos afines.</p>
        </div>

        <!-- Aquí muestro el historial de concursos pendientes de valoración y permito valorarlos mediante un modal -->

        <div class="historialpendientes">
          <!-- Desde aquí el usuario puede votar los concursos ya finalizados en los que se ha inscrito -->
          <!-- Recorremos el array dinámicamente y necesitamos el index para aplicar el voto -->

          <ul v-for="(pendiente, index) in pendientes" :key="pendiente.id">
            <li style="color:var(--red);">
              🔖
              <b>CONCURSO PENDIENTE DE VALORACIÓN</b>
            </li>

            <li style="color:var(--blue);">
              <h4>{{ pendiente.nombre_concurso }}</h4>
            </li>
            <li>
              <b>Apertura:</b>
              {{ pendiente.fecha_publicacion | moment(" D MM YYYY") }}
            </li>
            <li>
              <b>Cierre:</b>
              {{ pendiente.fecha_final | moment(" D MM YYYY") }}
            </li>
            <!-- El botón de votar se muestra si no hay voto -->
            <button
              id="votar"
              v-if="pendiente.valoracion !== 1 || pendiente.valoracion!==2 || pendiente.valoracion!==3 || pendiente.valoracion!==4 || pendiente.valoracion!==5"
              @click="openModal(index)"
            >VOTAR</button>
          </ul>
        </div>
        <!--Este es el div de cierre de "probarfondo">-->

        <div v-show="modal" class="modal">
          <div class="modalbox">
            <h3>¿Cómo valoras tu experiencia?</h3>

            <star-rating @rating-selected="rating = $event" :rating="rating" v-bind:star-size="20"></star-rating>

            <button @click="newRating(votedConcourse, rating)">Este es mi voto!</button>
            <button @click="closeModal()">Cerrar</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Hasta aquí la valoración -->
    ¡
    <!--Hasta aquí el top concursos -->
    <barraredessociales></barraredessociales>
  </div>
</template>

<script>
// EXPORTAMOS PARA
import VModal from 'vue-js-modal'
// Gestión de fechas
import VueMoment from "vue-moment";
// Función para el Log Out, eliminar los datos del LOCALSTORAGE.
import { clearLogin } from "../api/utils";
// Mensajes customizados
import Swal from "sweetalert2";
// Incluir valoraciones mediante estrellitas
import StarRating from "vue-star-rating";
// Manejar títulos de página en pestaña navegador
import vueHeadful from "vue-headful";
// Manejo de endpoints, peticiones, rutas:
import axios from "axios";
// Componentes internos
import menucustom from "@/components/MenuCustom.vue";
import barraredessociales from "@/components/BarraRedesSociales.vue"


export default {
  name: "Ratings",
  // Componentes de la vista
  components: { menucustom, vueHeadful, StarRating, barraredessociales },
  data() {
    return {
      // Declaración de variables que voy a utilizar para recoger la información
      id: null,
      user: {},
      userData:{},
      
      // Booleano para controlar el v-show que contiene el formulario de edición.
      
      url_foto: "",
     
      concursos: [],
      rating: 0,
      modal: false,
      votedConcourse: {},
      seeIsVoted: false,
      mostrarvotables: false,
      
      pendientes: [],
      proxconcursos: [],
      tops: [],
      
     

    };
  },

  methods: {


   
    openModal(index) {
      this.modal = true;
      this.votedConcourse = this.pendientes[index];
    },

   /*  openModalTwo(){
      this.modal=true;
    }, */

    closeModal() {
      this.modal = false;
    },


    // FUNCIÓN PARA HACER LA PETICIÓN AL SERVIDOR.

    getDataUser() {
      const self = this;
      // Cojo token e id.
      const token = localStorage.getItem("token");
      const data = localStorage.getItem("id");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Petición get a mi ruta del Back para editar usuarios, concatenamos el id.
      axios
        .get("http://localhost:3003/usuarios/perfil/" + data)

        .then(function (response) {
          console.log(response);

          // En user tengo ahora el acceso directo a este usuario concreto.
          self.user = response.data.data;
          // Monto la ruta para poder visualizar la imagen que está en la BBDD con un nombre de archivo.
            
          self.user.url_foto =
            "http://localhost:3003/images/" + self.user.url_foto;
        })

        .catch(function (error) {
          alert("Socorri");
          console.log(error.response.data.message);
        });
    },

    
    // FUNCIÓN PARA VER SOLAMENTE LOS CONCURSOS EN LOS QUE SE HA INSCRITO Y ESTÁN PENDIENTES DE VALORACIÓN
    seePendingRatings() {
      const self = this;
      // Cojo token e id.
      const token = localStorage.getItem("token");
      const data = localStorage.getItem("id");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      console.log(token);
      console.log(data);

      // Petición get a mi ruta del Back para consultar inscripciones finalizadas, concatenamos el id.
      axios
        .get(
          "http://localhost:3003/usuarios/concursos-pendientes-valoracion/" +
            data
        )

        .then(function (response) {
          console.log(response);

          // En pendientes tengo ahora el acceso directo a este usuario concreto.
          self.pendientes = response.data.data;
        })

        .catch(function (error) {
          Swal.fire({
            title: "⁉️",
            text: error.response.data.message,
            confirmButtonText: "O.K",
          }).then((result) => {
            if (result.value) {
              self.getDataUser();
            }
          });
          console.log(error.response.data.message);
        });
    },

    //FUNCIÓN PARA QUE EL USUARIO PUNTUE UN CONCURSO EN EL QUE HA PARTICIPADO

    newRating(pendiente, rating) {
      console.log(pendiente);
      const self = this;
      const id_concurso = pendiente.CONCURSOS_id_concurso;
       /* console.log(id_concurso); */

      //Cojo token e id
      const token = localStorage.getItem("token");
      const data = localStorage.getItem("id");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .post("http://localhost:3003/valoraciones/" + id_concurso, {
          valoracion: rating,
        })

        .then(function (response) {
          location.reload();
          // Enviamos mensaje de valoración
          console.log(response);

          Swal.fire({
            title: "✅",
            text: "Gracias por valorar este concurso",
            confirmButtonText: "O.K",
          })
          
          
          })
          .catch(function (error) {
            /*  console.log(error.response.data); */
            Swal.fire({
              title: "⚠️",
              text:
                "Ya has valorado este concurso",
              confirmButtonText: "O.K",
            });
          });
        },
    
     seeRanking() {
      const self = this;
      
      // Cojo token e id.
      const token = localStorage.getItem("token");
      const data = localStorage.getItem("id");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      axios
        .get(
          "http://localhost:3003/valoraciones/ranking/"

        )
      // Petición get a mi ruta del Back para consultar inscripciones finalizadas, concatenamos el id.
        .then(function (response) {
          console.log(response);
            self.tops = response.data.data.map((top) =>{
          top.url_foto = "http://localhost:3003/images/" + top.url_foto;
          // HE INTENTADO AQUÍ HACER UN SLICE (0,3) Y NO ME DEVUELVE NADA
          return top;
        });
        })

        .catch(function (error) {
          Swal.fire({
            title: "✅",
            text: error.response.data.message,
            confirmButtonText: "O.K",
          }).then((result) => {
            if (result.value) {
              self.getDataUser();
            }
          });
          console.log(error.response.data.message);
        });
    },



seeLastWinners() {
      const self = this;
      
      // Cojo token e id.
      const token = localStorage.getItem("token");
      const data = localStorage.getItem("id");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      axios
        .get(
          "http://localhost:3003/concursos/ultimosganadores/"
        )
      // Petición get a mi ruta del Back para consultar inscripciones finalizadas, concatenamos el id.
        .then(function (response) {
          console.log(response);

          // En user tengo ahora el acceso directo a este usuario concreto.
          self.ganadores = response.data.data;
        })

        .catch(function (error) {
          Swal.fire({
            title: "✅",
            text: error.response.data.message,
            confirmButtonText: "O.K",
          }).then((result) => {
            if (result.value) {
              self.getDataUser();
            }
          });
          console.log(error.response.data.message);
        });
    
},
  },

created(){
  this.getDataUser();
  this.seeRanking();
  this.seePendingRatings();
}


};
</script>

<style scoped>
.modal {
  position: fixed;
  top: -30px;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(113, 122, 129, 0.5);
}

.modalBox {
  background: #fefefe;
  margin: 15% auto;
  padding: 90px;

  width: 50%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 20px;
  /* border: solid 1px var(--black); */
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.432);
  overflow-y: auto;
  overflow-x: auto;
}

h3 {
  text-transform: uppercase;
  font-size: 1.4em;
  color: red;
}

#perfil {
  border-radius: 150px;
  width: 110px;
  height: 110px;
  margin: 30px;
  box-shadow: 0 0 50px rgba(19, 19, 19, 0.623);
  -webkit-box-reflect: below -30px -webkit-gradient(
      linear,
      left top,
      left bottom,
      from(transparent),
      to(rgba(255, 255, 255, 0.26))
    );

  position: absolute;
  top: 10px;
  left: 10px;
}

/* #menubotones {
} */
button {
  width: 300px;
  height: 60px;
  font-size: 1.5em;

  /*  box-shadow: 0 0 10px rgb(12, 12, 12); */

  font-family: "Ubuntu", sans-serif;
  color: var(--black);
  transition: background-color 0.3s;
  background-color: var(--blue);
  border-radius: 100px;
}

button:hover {
  background-color: var(--white);
  color: var(--black);
}

a {
  color: var(--black);
  text-decoration: none;
}

p {
  font-size: 1.2em;
  font-weight: bold;
}

h1 {
  color: var(--blue);
  margin-top: 80px;
}

.concursos {
  /*  box-shadow: 0 0 10px var(--black); */

  display: flex;
  flex-direction: column;

  border-radius: 20px;
  width: 400px;
  height: 400px;

  line-height: 2.4;
  background-color: var(--black);

  align-self: center;
  justify-content: center;
  /*  margin: 4px; */
}

#nombreconcurso {
  color: var(--blue);
  font-size: 1.3em;
}

#fotoconcurso {
  border-radius: 150px;
  width: 75px;
  height: 75px;
  box-shadow: 0 0 50px rgba(19, 19, 19, 0.623);
  -webkit-box-reflect: below -30px -webkit-gradient(
      linear,
      left top,
      left bottom,
      from(transparent),
      to(rgba(255, 255, 255, 0.26))
    );
  border: 3px solid white;
}

li:last-child {
  color: var(--yellow);
  font-size: 1.3em;
}
li {
  color: white;
  font-size: 1.1em;
  line-height: 3;
}

#fotoinformativa {
  width: 400px;
  border-radius: 200px;

  align-self: center;
}

.ranking {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;

  padding: 1em;
}

#explicacion {
  font-size: 1.5em;
  color: var(--white);
  line-height: 2em;
  font-weight: 400;

  width: 80%;
  margin: 0 auto;
}

#menuizquierda {
  width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  margin-left: 30px;
  margin-top: 30px;
}

#concursosul {
  display: flex;
  flex-direction: column;
  margin: 40px;
  justify-content: center;
  line-height: 3;
  display: flex;
}

#segundamitadvista {
  display: flex;
  flex-direction: row;
  margin: 20px;
  align-items: center;
}

.historialpendientes {
  display: flex;
  flex-direction: row;
  width: 7000px;
}

#votar {
  width: 100px;
  font-size: 1.2em;
  height: 30px;
}

h4 {
  font-size: 1.1em;
}
</style>
