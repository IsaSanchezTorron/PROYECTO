<template>
  <div>
    <!-- Definimos el título de página visible en navegador -->
    <vue-headful title="Perfil" description="Tu perfil" />

    <!-- Inserción del componente menú en la cabecera de la vista -->
    <menucustom></menucustom>

    <div id="contenedorperfil">
      <!-- Menú de navegación del pergil de usuario -->

      <div id="menubotones">
        <div id="perfilusuario">
          <!--Sección de datos personales en el saludo del perfil  -->
          <div class="informacionusuario"></div>
        </div>

        <!-- Menú de botones -->
        <h3>TUS INSCRIPCIONES</h3>
        <!-- Este botón llama a la función de abrir modal que a su vez llama a la función para ver el historial -->
        <button @click="openModalHistory()">📚 Mi historial completo</button>

        <!-- Este botón llama a la función de abrir modal que a su vez llama a la función para ver el historialver inscripciones y poder cancelarlas -->
        <button @click="openModalNext()">📖 Gestionar inscripciones activas</button>

        <!-- Ver los concursos en que estás inscritos, ya finalizados, pendientes de valoración -->
        <!--  <button @click="seePendingRatings()">⭐️ Valorar mis concursos finalizados</button> -->

        <h3>NOVEDADES</h3>
        <!-- Botón que llama a la función para ver los concursos mejor valorados-->
        <!-- <button @click="seeRaking()">🥇 Ver concursos mejor valorados</button>-->
        <button id="votaciones">
          <router-link style="color:var(--rosa)" :to="{ name: 'Ratings' }">💙 Votaciones y ranking</router-link>
        </button>

        <!-- Botón que abre un modal para ver los últimos ganadores publicados -->
        <button @click="openModalWinners()">🏆 Últimas ganadoras nombradas</button>

        <h3>CATÁLOGO</h3>
        <!-- Este botón es un enlace a todos los concursos hasta la fecha -->
        <button>
          <router-link
            style="color:var(--rosa)"
            :to="{ name: 'Allconcourses' }"
          >📌 Concursos activos actualmente</router-link>
        </button>

        <button>
          <router-link
            style="color:var(--rosa)"
            :to="{ name: 'Allfinished' }"
          >📌 Concursos finalizados</router-link>
        </button>
        <h3>HERRAMIENTAS</h3>
        <!-- Botón para editar datos de usuario -->
        <button @click="openEditModal()" style="color:var(--blue)">⚙️ Editar perfil</button>

        <!-- Botón para hacer LogOut -->
        <button @click="logoutUser()" style="color:#F35224">👋 Cerrar sesión</button>
      </div>

      <!--Sección de saludo y datos del usuario-->
      <div id="saludo">
        <h1>Hola {{ user.nombre }}</h1>
        <!-- Imagen de perfil del usuario -->
        <img :src="user.url_foto" alt="Foto de perfil de usuario" />
        <p>Miembro desde {{ user.fecha_registro | moment(" D-MM-YYYY") }}</p>
        <p>Categoría: {{ user.rol }}</p>
        <div id="descripcion">{{user.descripcion}}</div>
        <img
          id="fotoayuda"
          src="../assets/images/intertextualperfil.jpg"
          alt="foto informativa"
          title="intertextual@intertextual-concursos.com"
        />
      </div>

      <!--Sección de datos personales editables -->
      <div class="modal" v-show="vereditar">
        <div class="modalBox">
          <div id="perfilusuario">
            <label for="nombre">Tu nombre:</label>
            <input type="text" id="nombre" name="nombre" v-model="nuevoNombre" placeholder="nombre" />
            <br />

            <label for="apellidos">Tus apellidos:</label>
            <input
              type="text"
              id="apellidos"
              name="apellidos"
              v-model="nuevoApellido"
              placeholder="apellidos"
            />
            <br />

            <label for="descripcion">Sobre ti:</label>
            <textarea
              type="textarea"
              id="descripcion"
              name="descripcion"
              v-model="nuevaDescripcion"
              placeholder="descripcion"
              cols="50"
              rows="20"
            />
            <div id="selecciondefoto">
              <label for="file">👤 Selecciona tu nueva foto 👉 📸 .</label>
              <input
                type="file"
                id="url_foto"
                name="url_foto"
                ref="url_foto"
                @change="handleFileUpload()"
              />
            </div>
            <br />

            <button id="volver" @click="editUser()">Guardar</button>

            <div class="editarfotousuario">
              <button id="volver" @click="vereditar=false">Volver</button>
              <hr />
            </div>

            <hr />
          </div>
        </div>
      </div>
      <!-- Hasta aquí el contenedor de edición de usuario -->

      <!-- Aquí mostramos el historial de concursos del usuario -->
      <div class="modal" v-show="verhistorial">
        <div class="modalBox">
          <div class="historialconcurso">
            <!-- Recorremos el array dinámicamente, contiene la información del get de la función en methods -->
            <h2>ESTOS SON TODOS LOS CONCURSOS EN QUE HAS PARTICIPADO</h2>
            <ul v-for="historia in historial" :key="historia.id">
              <li>
                <b>{{ historia.nombre_concurso }}</b>
              </li>
              <li>
                <b>Apertura:</b>
                {{ historia.fecha_publicacion | moment(" D-MM-YYYY") }}
              </li>
              <li>
                <b>Cierre:</b>
                {{ historia.fecha_final | moment(" D-MM-YYYY") }}
              </li>
              <!-- Sólo si el concurso ha sido valorado se muestra su valoración -->
              <div v-if="historia.valoracion > 0">
                <li>
                  Has valorado este concurso con
                  {{ historia.valoracion }} ⭐️
                </li>
              </div>
              <hr />
            </ul>
            <button id="volver" @click="closeModalHistory()">⬅️ VOLVER</button>
          </div>
        </div>
      </div>

      <!--Hasta aquí la sección del historial del concurso -->

      <!-- Aquí muestro el historial de concursos pendientes de valoración y permito valorarlos mediante un modal -->
      <!--  <div class="modal" v-show="verproximos">
        <div class="modalBox">
          <div class="historialpendientes">
      <!-- Desde aquí el usuario puede votar los concursos ya finalizados en los que se ha inscrito-->
      <!-- Recorremos el array dinámicamente y necesitamos el index para aplicar el voto -->
      <!-- 
            <ul v-for="(pendiente, index) in pendientes" :key="pendiente.id">
              <li>
                <b>{{ pendiente.nombre_concurso }}</b>
              </li>
              <li>
                <b>Bases:</b>
                {{ pendiente.descripcion }}
      </li>-->
      <!-- <li>
                <b>Apertura:</b>
                {{ pendiente.fecha_publicacion | moment(" D MM YYYY") }}
      </li>-->
      <!-- <li>
                <b>Cierre:</b>
                {{ pendiente.fecha_final | moment(" D MM YYYY") }}
      </li>-->
      <!-- El botón de votar se muestra si no hay voto -->
      <!--   <button
                v-if="pendiente.valoracion !== 1 || pendiente.valoracion!==2 || pendiente.valoracion!==3 || pendiente.valoracion!==4 || pendiente.valoracion!==5"
                @click="openModal(index)"
      >VOTAR</button>-->
      <!--   </ul>

            <div v-show="modal" class="modal">
              <div class="modalbox">
                <h3>¿Cómo valoras tu experiencia?</h3>

                <star-rating
                  @rating-selected="rating = $event"
                  :rating="rating"
                  v-bind:star-size="20"
                ></star-rating>

                <button @click="newRating(votedConcourse, rating)">Este es mi voto!</button>
                <button @click="closeModal()">Cerrar</button>
              </div>
            </div>
          </div>
          <button @click="closeModaNext()">⬅️ VOLVER</button>
        </div>
      </div>-->
      <!-- Hasta aquí la valoración -->
      <hr />

      <!-- Aquí mostramos con un modal los últimos ganadores nombrados -->

      <div class="modal" v-show="verganadores">
        <div class="modalBox">
          <div v-if="ganadores">
            <h1>GANADORAS NOMBRADAS RECIENTEMENTE</h1>
          </div>

          <ul class="resultadosganadores" v-for="ganador in ganadores" :key="ganador.id">
            <li>👤 {{ganador.nombreusuario}} {{ganador.apellidos}} ha ganado el {{ganador.nombreconcurso}} el {{ganador.fecha_asignacion_ganador | moment(" D-MM-YYYY")}}</li>
            <hr />
          </ul>
          <button id="volver" @click="closeModalWinners()">⬅️ VOLVER</button>
        </div>
      </div>

      <!-- Visualizar Próximos concursos en los que el usuario está inscrito, puede deshacer su suscripción --->

      <div class="modal" v-show="verproximos">
        <div class="modalBox">
          <div class="proximosconcursos">
            <!-- Recorremos el array dinámicamente, contiene la información del get de la función en methods -->
            <ul v-for="proxconcurso in proxconcursos" :key="proxconcurso.id">
              <li>
                <b>{{ proxconcurso.nombre }}</b>
              </li>
              <!-- <li>
                  <b>Bases:</b>
                  {{ proxconcurso.descripcion }}
              </li>-->
              <li>
                Apertura:
                {{ proxconcurso.fecha_publicacion | moment(" D-MM-YYYY") }}
              </li>
              <li>
                <b>Cierre:</b>
                {{ proxconcurso.fecha_final | moment(" D-MM-YYYY") }}
              </li>
              <button @click="cancelSuscription(proxconcurso)">Cancelar suscripción</button>
              <hr />
            </ul>
            <button id="volver" @click="closeModalNext()">⬅️ VOLVER</button>

            <hr />
          </div>
        </div>
      </div>

      <!-- Visualizar los concursos mejor valorados por el público -->

      <div class="topconcursos">
        <ul v-for="top in tops" :key="top.id">
          <li>
            <b>{{ top.nombre }}</b>
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
      </div>
      <!--Hasta aquí el top concursos -->
    </div>
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
  name: "Profile",
  // Componentes de la vista
  components: { menucustom, vueHeadful, StarRating,barraredessociales },
  data() {
    return {
      // Declaración de variables que voy a utilizar para recoger la información
      id: null,
      user: {},
      userData:{},
      nuevoNombre: "",
      nuevoApellido: "",
      nuevaDescripcion: "",
      // Booleano para controlar el v-show que contiene el formulario de edición.
      showEdit: false,
      showHistorial:false,
      seeEditable: false,
      url_foto: "",
      historial: [],
      concursos: [],
      rating: 0,
      modal: false,
      votedConcourse: {},
      seeIsVoted: false,
      mostrarvotables: false,
      
      pendientes: [],
      proxconcursos: [],
      tops: [],
      ganadores:[],
      verganadores : false,
      verproximos: false,
      verhistorial: false,
      vereditar: false,

    };
  },

  methods: {


    logoutUser() {
      //Nos lleva al login
      this.$router.push("/");
      // No deja datos en el logueo, vacío
      return clearLogin();
    
    },

    handleFileUpload(){
    this.url_foto = this.$refs.url_foto.files[0];
  },
    
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


    openModalWinners(){
      this.verganadores = true;
      this.seeLastWinners();
    },

    closeModalWinners(){
      this.verganadores=false;
    },

    openModalNext(){
      this.verproximos= true;
      this.seeNextConcourses();
    },

    closeModalNext(){
      this.verproximos = false;
    },

    openModalHistory(){
      this.verhistorial=true;
      this.seeHistory();
    },

    closeModalHistory(){
      this.verhistorial = false;
    },

    openEditModal(){
      this.vereditar =true;
      this.showEditProfile();

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

    // FUNCIÓN PARA GUARDAR LOS CAMBIOS
    editUser() {
      const self = this;
      //Tengo la autenticación...
      const data = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      

     let formData = new FormData();
      formData.append("url_foto", self.url_foto);
      formData.append("descripcion", self.nuevaDescripcion);
      formData.append("nombre", self.nuevoNombre);
      formData.append("apellidos", self.nuevoApellido);


    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      //Hago la petición a servidor

      axios
        .put("http://localhost:3003/usuarios/editar/" + data, formData, {
          headers:{
             "Content-Type": "multipart/form-data",
          },
        })
        .then(function (response) {
          self.showEdit = true;

          Swal.fire({
            icon: "✔️",
            title: "Has editado tus datos correctamente.",
            timer: "5000"
          });
        location.reload();
        })
        .catch(function (error) {
          console.error(error);
          console.log(error.response.data.message);
        });
    },

    showEditProfile() {
     
      this.nuevoNombre = this.userData.nombre;
      this.nuevoApellido = this.userData.apellidos;
      this.nuevaDescripcion = this.userData.descripcion;
      this.showEdit = true;
     
    },

    seeHistory() {
      const self = this;
      // Cojo token e id.
      const token = localStorage.getItem("token");
      const data = localStorage.getItem("id");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      console.log(token);
      console.log(data);

      // Petición get a mi ruta del Back para consultar historial de  inscripciones, concatenamos el id.
      axios
        .get("http://localhost:3003/usuarios/historial/" + data)

        .then(function (response) {
        /*   console.log(response); */

          // En user tengo ahora el acceso directo a este usuario concreto.
          self.historial = response.data.data;
          
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

          // En user tengo ahora el acceso directo a este usuario concreto.
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
    


  seeNextConcourses() {
      const self = this;
      // Cojo token e id.
      const token = localStorage.getItem("token");
      const data = localStorage.getItem("id");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      console.log(token);
      console.log(data);

      // Petición get a mi ruta del Back para consultar próximos concursos en los que no está todavía inscrito
      axios
        .get("http://localhost:3003/concursos/proximamente/" + data)

        .then(function (response) {
          console.log(response);

          // En user tengo ahora el acceso directo a este usuario concreto.
          self.proxconcursos = response.data.data;
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

  cancelSuscription(proxconcurso) {
      
      const self = this;
      const id_concurso = proxconcurso.id_concurso;
     ;
      //Cojo token e id
      const token = localStorage.getItem("token");
      const data = localStorage.getItem("id")
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      

Swal.fire({
        title:"🤓",
        text: "Vas a cancelar tu suscripción a este concurso ¿Estás segura?",
        showCancelButton: true,
        confirmButtonColor: "#1CA1F2",
        cancelButtonColor: "#EB5784",
        confirmButtonText: "Quiero cancelar esta suscripción",
        cancelButtonText: "Mantengo mi suscripción",
        
      }).then((result) => {
        if (result.value) {
          axios
            .delete( "http://localhost:3003/concursos/inscripciones/borrar/" + id_concurso)
            .then(function(response) {
              
            })
            .catch(function(error) {
              console.error(error.response.data.message);
            });
          Swal.fire({
            title: "✅",
            text: "Se ha cancelado tu suscripción",
            confirmButtonText: "O.K",
            timer: 4000
          })


          location.reload();
        }
      });
    },

     

     seeRaking() {
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

          // En user tengo ahora el acceso directo a este usuario concreto.
          self.tops = response.data.data;
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
  background-color: #1049454d;
}

.modalBox {
  background: var(--white);
  margin: 10% auto;
  padding: 90px;
  width: 40%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  /* border: solid 1px var(--black); */
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.432);
  overflow-y: auto;
  overflow-x: auto;
}

h3 {
  text-transform: uppercase;
  font-size: 1.4em;
}

.editar {
  height: 700px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.editar input {
  width: 500px;
  height: 30px;
  border-radius: 5px;
  align-self: center;
  margin-left: 20px;
  /*  border-top: 0;
  border-right: 0;
  border-left: 0;
  background-color: var(--white);
  border-bottom: 2px solid var(--black); */
}

.editar textarea {
  width: 500px;
  height: 100px;
  border-radius: 5px;
  align-self: center;
}

.editar button {
  width: 100px;
  align-self: center;
}

.editarfotousuario button {
  width: 100px;
  align-self: flex-start;
}

#selecciondefoto {
  margin: 0 auto;
  padding: 0.5em;
}

#botonesedicion {
  margin: 10px;
}

img {
  border-radius: 150px;
  width: 250px;
  height: 250px;
  margin: 40px;
  box-shadow: 0 0 50px rgba(19, 19, 19, 0.623);
  -webkit-box-reflect: below -30px -webkit-gradient(
      linear,
      left top,
      left bottom,
      from(transparent),
      to(rgba(255, 255, 255, 0.26))
    );
}

/* #menubotones {
} */
#menubotones button {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 450px;
  height: 60px;
  font-size: 1.5em;

  /*  box-shadow: 0 0 10px rgb(12, 12, 12); */
  margin: 10px;

  font-family: "Ubuntu", sans-serif;
  color: var(--rosa);
  transition: background-color 0.3s;
  background-color: #3c313fa2;
  border-radius: 100px;
}

#menubotones button:hover {
  background-color: var(--verde);
  color: var(--rosa);
}

a {
  color: var(--black);
  text-decoration: none;
}

#contenedorperfil {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-self: flex-start;
  justify-self: center;
  align-items: center;
  align-content: center;

  background-image: url(https://images.unsplash.com/photo-1522794338816-ee3a17a00ae8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80);
  background-repeat: no-repeat;
  width: 95.9%;
  background-size: cover;
  padding: 3em;
  box-shadow: 0 0 10px var(--black);
}

#saludo {
  padding-bottom: 30rem;

  padding-left: 701px;
}

p {
  font-size: 1.2em;
  font-weight: bold;
}

#fotoayuda {
  position: fixed;
  margin-top: -10px;
  margin-left: 900px;
  width: 600px;
  height: 600px;
  border-radius: 300px;
}

button {
  justify-content: center;
  margin: 0 auto;
  width: 450px;
  height: 60px;
  font-size: 1.2em;

  /*  box-shadow: 0 0 10px rgb(12, 12, 12); */
  /* margin: 10px; */

  font-family: "Ubuntu", sans-serif;
  color: var(--white);
  transition: background-color 0.3s;
  background-color: var(--black);
  border-radius: 100px;
}

button:hover {
  background-color: var(--white);
  color: var(--black);
}

a {
  color: white;
}

.modal button {
  width: 200px;
  height: 50px;
  font-size: 0.6em;
}

ul {
  font-size: 1.5em;
  line-height: 1.5;
}

#volver {
  font-size: 1.3em;
  margin-left: 50px;
}

#perfilusuario input {
  width: 500px;
  margin: 20px;
  height: 40px;
}
#perfilusuario input {
  width: 500px;
  margin: 20px;
  height: 40px;
}

label {
  display: table-cell;

  font-size: 1em;
  font-weight: bold;
  vertical-align: top;
  text-align: right;
  padding-right: 3px;
}
</style>
