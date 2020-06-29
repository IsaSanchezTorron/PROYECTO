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
          <!--Sección de datos personales -->
          <div class="informacionusuario">
            <h3>👤 Hola {{ user.nombre }}</h3>

            <p>Miembro desde {{ user.fecha_registro | moment(" D-MM-YYYY") }}</p>
            <p>Miembro con rol de: {{ user.rol }}</p>
          </div>
        </div>

        <img :src="user.url_foto" alt="Foto de perfil de usuario" />
        <button v-if="historial" @click="seeHistory()">📚 Mi historial completo</button>
        <button @click="seeNextConcourses()">📖 Gestionar inscripciones activas</button>
        <button @click="seePendingRatings()">⭐️ Valorar mis concursos finalizados</button>
        <!-- Botón que llama a la función para ver el historial -->

        <button @click="seeRaking()">🥇 Ver concursos mejor valorados</button>
        <button>
          <router-link style="color:#EB5885" :to="{ name: 'Allconcourses' }">📌 Todos los concursos</router-link>
        </button>
        <button @click="showEditProfile()" style="color:#3CA17A">⚙️ Editar perfil</button>
        <button @click="logoutUser()" style="color:#3CA17A">👋 Logout</button>
      </div>

      <!--Sección de datos personales editables -->

      <div id="perfilusuario">
        <div class="editar" v-show="showEdit">
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

          <button id="botonesedicion" @click="editUser()">Guardar</button>

          <div class="editarfotousuario">
            <button id="botonesedicion" @click="showEdit=false">Volver</button>
            <hr />
          </div>

          <hr />
        </div>
        <!-- Hasta aquí el contenedor de edición de usuario -->

        <!-- Aquí mostramos el historial de concursos del usuario -->
        <div class="historialconcurso">
          <!-- Recorremos el array dinámicamente, contiene la información del get de la función en methods -->
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
          </ul>

          <hr />
        </div>

        <!--Hasta aquí la sección del historial del concurso -->

        <!-- Aquí muestro el historial de concursos pendientes de valoración y permito valorarlos mediante un modal -->

        <div class="historialpendientes">
          <!-- Desde aquí el usuario puede votar los concursos ya finalizados en los que se ha inscrito -->
          <!-- Recorremos el array dinámicamente y necesitamos el index para aplicar el voto -->
          <ul v-for="(pendiente, index) in pendientes" :key="pendiente.id">
            <li>
              <b>{{ pendiente.nombre_concurso }}</b>
            </li>
            <li>
              <b>Bases:</b>
              {{ pendiente.descripcion }}
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
              v-if="pendiente.valoracion !== 1 || pendiente.valoracion!==2 || pendiente.valoracion!==3 || pendiente.valoracion!==4 || pendiente.valoracion!==5"
              @click="openModal(index)"
            >VOTAR</button>

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
          </ul>
        </div>
        <!-- Hasta aquí la valoración -->
        <hr />

        <!-- Visualizar Próximos concursos en los que el usuario está inscrito, puede deshacer su suscripción --->

        <div class="proximosconcursos">
          <!-- Recorremos el array dinámicamente, contiene la información del get de la función en methods -->
          <ul v-for="proxconcurso in proxconcursos" :key="proxconcurso.id">
            <li>
              <b>{{ proxconcurso.nombre }}</b>
            </li>
            <li>
              <b>Bases:</b>
              {{ proxconcurso.descripcion }}
            </li>
            <li>
              Apertura:
              {{ proxconcurso.fecha_publicacion | moment(" D-MM-YYYY") }}
            </li>
            <li>
              <b>Cierre:</b>
              {{ proxconcurso.fecha_final | moment(" D-MM-YYYY") }}
            </li>
            <button @click="cancelSuscription(proxconcurso)">Cancelar suscripción</button>
            <li>--------------------------------------------------</li>
          </ul>

          <hr />
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
    </div>
  </div>
</template>

<script>
// EXPORTAMOS PARA

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
import VModal from 'vue-js-modal'

export default {
  name: "Profile",
  // Componentes de la vista
  components: { menucustom, vueHeadful, StarRating },
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

    openModalTwo(){
      this.modal=true;
    },

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



  },

created(){
  this.getDataUser();
}


};
</script>

<style scoped>
.modal {
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
  height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 50px;
  border: solid 1px black;
  box-shadow: 0 0 1px rgb(12, 12, 12);
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
  border: solid 1px black;
}

.editar input {
  width: 500px;
  height: 30px;
  border-radius: 5px;
  align-self: center;
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
  border: 1px solid black;
}

#botonesedicion {
  margin: 10px;
}

img {
  border-radius: 50px;
  width: 250px;
  height: 250px;
  margin: 50px;
  box-shadow: 0 0 10px rgb(12, 12, 12);
}

#menubotones {
  border: solid 1px black;
}
#menubotones button {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 450px;
  height: 60px;
  font-size: 1.5em;

  /*  box-shadow: 0 0 10px rgb(12, 12, 12); */
  margin: 10px;
  background-color: transparent;
  font-family: "Ubuntu", sans-serif;
  color: #1a99e7;
  transition: background-color 0.3s;
}

#menubotones button:hover {
  background-color: #171616;
  color: white;
}
#menubotones button:active {
  background-color: #171616;
}

.historialconcurso {
  border: 1px solid black;
}
.historialpendiente {
  margin: 0 auto;
}

proximosconcursos {
  margin: 0 auto;
}

topconcursos {
  margin: 0 auto;
}

#contenedorperfil {
  display: flex;
  flex-direction: row;
}

a {
  color: #171616;
  text-decoration: none;
}
</style>
