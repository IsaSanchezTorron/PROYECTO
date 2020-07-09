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

        <div id="menudebotones">
          <!-- Menú de botones -->
          <h3 v-show="!seeAdmin">▶️ TUS INSCRIPCIONES</h3>

          <!-- Este botón llama a la función de abrir modal que a su vez llama a la función para ver el historial -->
          <button v-show="!seeAdmin" @click="openModalHistory()">📚 Mi historial completo</button>

          <!-- Este botón llama a la función de abrir modal que a su vez llama a la función para ver el historialver inscripciones y poder cancelarlas -->
          <button v-show="!seeAdmin" @click="openModalNext()">📖 Gestionar inscripciones activas</button>

          <!-- Ver los concursos en que estás inscritos, ya finalizados, pendientes de valoración -->
          <!--  <button @click="seePendingRatings()">⭐️ Valorar mis concursos finalizados</button> -->

          <h3 v-show="!seeAdmin">✔️ ENLACES RÁPIDOS A CONCURSOS</h3>
          <!-- Este botón es un enlace a todos los concursos hasta la fecha -->
          <button v-show="!seeAdmin">
            <router-link style="color:var(--white);" :to="{ name: 'Allconcourses' }">
              <p2 style="color:var(--black)">📌 CONCURSOS ACTIVOS</p2>
            </router-link>
          </button>

          <button v-show="!seeAdmin">
            <router-link style="color:var(--white)" :to="{ name: 'Allfinished' }">
              <p2>📌 Concursos finalizados</p2>
            </router-link>
          </button>

          <h3 v-show="!seeAdmin">▶️ NOVEDADES</h3>
          <!-- Botón que llama a la función para ver los concursos mejor valorados-->
          <!-- <button @click="seeRaking()">🥇 Ver concursos mejor valorados</button>-->
          <button v-show="!seeAdmin" id="votaciones">
            <router-link style="color:var(--white);" :to="{ name: 'Ratings' }">
              <p2>💙 Valoraciones y ranking</p2>
            </router-link>
          </button>

          <!-- Botón que abre un modal para ver los últimos ganadores publicados -->
          <button v-show="!seeAdmin" @click="openModalWinners()">🏆 Últimas ganadoras nombradas</button>

          <h3>▶️ HERRAMIENTAS</h3>

          <button v-show="seeAdmin">
            <a>
              <router-link
                style="color:var(--verdeoscuro)"
                :to="{ name: 'Admin' }"
              >⚙️ GESTIONAR CONCURSOS</router-link>
            </a>
          </button>

          <!-- Botón para editar datos de usuario -->
          <button @click="openEditModal()" style="color:var(--white);">
            <p2>⚙️ Editar perfil</p2>
          </button>

          <!-- Botón para hacer LogOut -->
          <button @click="logoutUser()" style="color:var(--white);">
            <p2>👋 Cerrar sesión</p2>
          </button>
        </div>
      </div>

      <!--Sección de saludo y datos del usuario-->
      <div class="contenedorsaludo">
        <div id="saludo">
          <h1 style="color:var(--naranjaoscuro)">Hola {{ user.nombre }}</h1>
          <!-- Imagen de perfil del usuario -->
          <img :src="user.url_foto" alt="Foto de perfil de usuario" />
          <p>Miembro desde {{ user.fecha_registro | moment(" D-MM-YYYY") }}</p>
          <p>Categoría: {{ user.rol }}</p>
          <p id="descripcion">{{user.descripcion}}</p>
        </div>
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
            <br />
            <textarea
              type="textarea"
              id="descripcion"
              name="descripcion"
              v-model="nuevaDescripcion"
              placeholder="descripcion"
              cols="45"
              rows="15"
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

            <button id="volver" @click="editUser()">GUARDAR</button>
            <hr />
            <div class="editarfotousuario">
              <button id="volver" @click="vereditar=false">VOLVER</button>
            </div>
          </div>
        </div>
      </div>
      <!-- Hasta aquí el contenedor de edición de usuario -->

      <!-- Aquí mostramos el historial de concursos del usuario -->
      <div class="modal" v-show="verhistorial">
        <div class="modalBox">
          <div class="historialconcurso">
            <!-- Recorremos el array dinámicamente, contiene la información del get de la función en methods -->

            <!--  <h3 style="color:var(--verdeoscuro)">Todavía no estás inscrita a ningún concurso</h3> -->

            <h2 style="color:var(--black)">ESTOS SON TODOS TUS CONCURSOS</h2>

            <hr />
            <ul v-for="historia in historial" :key="historia.id">
              <li style="color:var(--naranjaoscuro)">
                <b>📚 {{ historia.nombre_concurso }}</b>
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
                <li style="color:var(--verdeoscuro)">
                  Has valorado este concurso con
                  {{ historia.valoracion }} ⭐️
                </li>
              </div>
              <hr />
            </ul>
            <button id="volver" @click="closeModalHistory()">VOLVER</button>
          </div>
        </div>
      </div>

      <hr />

      <!-- Aquí mostramos con un modal los últimos ganadores nombrados -->

      <div class="modal" v-show="verganadores">
        <div class="modalBox">
          <div v-if="ganadores">
            <h1 style="color:var(--naranjaoscuro
            )">GANADORAS NOMBRADAS RECIENTEMENTE</h1>
          </div>

          <ul class="resultadosganadores" v-for="ganador in ganadores" :key="ganador.id">
            <li>
              🤓
              <b>
                <a style="color:red">{{ganador.nombreusuario}} {{ganador.apellidos}}</a>
              </b>
              ha ganado el
              <b>
                <a style="color:var(--verdeoscuro)">{{ganador.nombreconcurso}}</a>
              </b>
              el {{ganador.fecha_asignacion_ganador | moment(" D-MM-YYYY")}}
            </li>
          </ul>
          <button id="volver" @click="closeModalWinners()">VOLVER</button>
        </div>
      </div>

      <div v-show="!seeAdmin" id="globos">
        <img id="fotoayuda2" src="../assets/images/fotoperfil2.png" alt="foto informativa" />
        <img id="fotoayuda" src="../assets/images/intertextualperfil.png" alt="foto informativa" />

        <img id="fotoayuda3" src="../assets/images/fotoperfil3.png" alt="foto informativa" />

        <h1 style="color:var(--black)">Información 👆</h1>
        <p2>Puede ser de ayuda para la navegación por la web</p2>
        <p2>pasa el ratón por encima para verla mejor.</p2>
      </div>

      <!-- Visualizar Próximos concursos en los que el usuario está inscrito, puede deshacer su suscripción --->

      <div class="modal" v-show="verproximos">
        <div class="modalBox">
          <div class="proximosconcursos">
            <!-- Recorremos el array dinámicamente, contiene la información del get de la función en methods -->
            <ul v-for="proxconcurso in proxconcursos" :key="proxconcurso.id">
              <li style="color:var(--naranjaoscuro)">
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
              <button id="modalbutton" @click="cancelSuscription(proxconcurso)">Cancelar suscripción</button>
              <hr />
            </ul>
            <button id="volver" @click="closeModalNext()">VOLVER</button>
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
import VModal from "vue-js-modal";
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
import barraredessociales from "@/components/BarraRedesSociales.vue";
// FUNCIONES DEL ARCHIVO AUXULIAR.
import {
  isLoggedIn,
  checkAdmin,
  showUserButton,
  showAdminButton
} from "../api/utils.js";

export default {
  name: "Profile",
  // Componentes de la vista
  components: {
    menucustom,
    vueHeadful,
    StarRating,
    barraredessociales,
    vueHeadful
  },
  data() {
    return {
      // Declaración de variables que voy a utilizar para recoger la información
      id: null,
      user: {},
      userData: {},
      nuevoNombre: "",
      nuevoApellido: "",
      nuevaDescripcion: "",
      // Booleano para controlar el v-show que contiene el formulario de edición.
      showEdit: false,
      showHistorial: false,
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
      ganadores: [],
      verganadores: false,
      verproximos: false,
      verhistorial: false,
      vereditar: false,
      seeUserButton: false,

      seeAdmin: false
    };
  },

  methods: {
    showUserButtonIn() {
      this.seeUserButton = isLoggedIn();
    },
    showAdminButtonInMenu() {
      this.seeAdmin = showAdminButton();
    },

    logoutUser() {
      //Nos lleva al login
      this.$router.push("/");
      // No deja datos en el logueo, vacío
      return clearLogin();
    },

    handleFileUpload() {
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

    openModalWinners() {
      this.verganadores = true;
      this.seeLastWinners();
    },

    closeModalWinners() {
      this.verganadores = false;
    },

    openModalNext() {
      this.verproximos = true;
      this.seeNextConcourses();
    },

    closeModalNext() {
      this.verproximos = false;
    },

    openModalHistory() {
      this.verhistorial = true;
      this.seeHistory();
    },

    closeModalHistory() {
      this.verhistorial = false;
    },

    openEditModal() {
      this.vereditar = true;
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

        .then(function(response) {
          console.log(response);

          // En user tengo ahora el acceso directo a este usuario concreto.
          self.user = response.data.data;
          // Monto la ruta para poder visualizar la imagen que está en la BBDD con un nombre de archivo.

          self.user.url_foto =
            "http://localhost:3003/images/" + self.user.url_foto;
        })

        .catch(function(error) {
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
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(function(response) {
          self.showEdit = true;

          Swal.fire({
            icon: "✔️",
            title: "Has editado tus datos correctamente.",
            timer: "5000"
          });
          location.reload();
        })
        .catch(function(error) {
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

        .then(function(response) {
          /*   console.log(response); */
          // En user tengo ahora el acceso directo a este usuario concreto.
          self.historial = response.data.data;
        })

        .catch(function(error) {
          Swal.fire({
            title: "✅",
            text:
              "Comienza a explorar los concursos para inscribirte, todavía no tienes historial de inscripciones.",
            confirmButtonText: "O.K",
            confirmButtonColor: "#FE9F1D"
          }).then(result => {
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

        .then(function(response) {
          console.log(response);

          // En user tengo ahora el acceso directo a este usuario concreto.
          self.pendientes = response.data.data;
        })

        .catch(function(error) {
          Swal.fire({
            title: "⁉️",
            text: error.response.data.message,
            confirmButtonText: "O.K",
            confirmButtonColor: "#FE9F1D"
          }).then(result => {
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
          valoracion: rating
        })

        .then(function(response) {
          location.reload();
          // Enviamos mensaje de valoración
          console.log(response);

          Swal.fire({
            title: "✅",
            text: "Gracias por valorar este concurso",
            confirmButtonText: "O.K",
            confirmButtonColor: "#FE9F1D"
          });
        })
        .catch(function(error) {
          /*  console.log(error.response.data); */
          Swal.fire({
            title: "⚠️",
            text: "Ya has valorado este concurso",
            confirmButtonText: "O.K",
            confirmButtonColor: "#FE9F1D"
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

        .then(function(response) {
          console.log(response);

          // En user tengo ahora el acceso directo a este usuario concreto.
          self.proxconcursos = response.data.data;
        })

        .catch(function(error) {
          Swal.fire({
            title: "✅",
            text: error.response.data.message,
            confirmButtonText: "O.K",
            confirmButtonColor: "#FE9F1D"
          }).then(result => {
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
      //Cojo token e id
      const token = localStorage.getItem("token");
      const data = localStorage.getItem("id");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      Swal.fire({
        title: "Vas a cancelar tu suscripción a este concurso ¿Estás segura?",
        showCancelButton: true,
        width: 1000,
        confirmButtonColor: "#FE9F1D",
        cancelButtonColor: "#2EC4B6",
        confirmButtonText: "Quiero cancelar esta suscripción",

        cancelButtonText: "Mantengo mi suscripción"
      }).then(result => {
        if (result.value) {
          axios
            .delete(
              "http://localhost:3003/concursos/inscripciones/borrar/" +
                id_concurso
            )
            .then(function(response) {})
            .catch(function(error) {
              console.error(error.response.data.message);
            });
          Swal.fire({
            title: "Se ha cancelado tu suscripción",
            confirmButtonText: "O.K",
            confirmButtonColor: "#FE9F1D",

            timer: 4000
          });

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
        .get("http://localhost:3003/valoraciones/ranking/")
        // Petición get a mi ruta del Back para consultar inscripciones finalizadas, concatenamos el id.
        .then(function(response) {
          console.log(response);

          // En user tengo ahora el acceso directo a este usuario concreto.
          self.tops = response.data.data;
        })

        .catch(function(error) {
          Swal.fire({
            title: "✅",
            text: error.response.data.message,
            confirmButtonText: "O.K",
            confirmButtonColor: "#FE9F1D"
          }).then(result => {
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
        .get("http://localhost:3003/concursos/ultimosganadores/")
        // Petición get a mi ruta del Back para consultar inscripciones finalizadas, concatenamos el id.
        .then(function(response) {
          console.log(response);

          // En user tengo ahora el acceso directo a este usuario concreto.
          self.ganadores = response.data.data;
        })

        .catch(function(error) {
          Swal.fire({
            title: "✅",
            text: error.response.data.message,
            confirmButtonText: "O.K",
            confirmButtonColor: "#FE9F1D"
          }).then(result => {
            if (result.value) {
              self.getDataUser();
            }
          });
          console.log(error.response.data.message);
        });
    }
  },

  created() {
    this.getDataUser();
    this.showUserButtonIn();
    this.showAdminButtonInMenu();
    this.showUserButtonProfile();
  }
};
</script>


<style scoped>
hr {
  color: var(--verdeoscuro);
}
.modal {
  position: fixed;
  align-content: center;
  justify-self: center;
  align-self: center;
  justify-self: center;
  margin: 30px auto;
  background-color: rgba(85, 175, 168, 0.603);
  overflow-y: auto;
  padding: 1.5em;
}

.modalBox {
  background-color: var(--white);
  padding: 90px;
  width: 50%;
  height: 60%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-self: center;
  justify-items: center;
  align-self: center;
  align-content: center;
  align-items: center;
  border-radius: 40px;
  /* border: solid 1px var(--black); */
  box-shadow: 0 0 20px rgba(183, 236, 232, 0.432);
  overflow-y: auto;
}

h3 {
  text-transform: uppercase;
  font-size: 1em;
  color: var(--naranjaoscuro);
  text-decoration: underline;
}

h1 {
  font-size: 1em;
}

.editar {
  height: 700px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3em;
}

form {
  padding-left: 20px;
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
  border-radius: 25px;
  width: 250px;
  height: 250px;

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
  width: 300px;
  height: 40px;
  font-size: 1em;

  /*  box-shadow: 0 0 10px rgb(12, 12, 12); */
  margin: 10px;

  font-family: "Ubuntu", sans-serif;
  color: var(--white);
  transition: background-color 0.3s;
  background-color: rgba(22, 14, 14, 0.514);
}

#menubotones button:hover {
  background-color: var(--verdeclaro);
  color: var(--black);
}

a {
  color: var(--white);
  font-size: 1em;
  text-decoration: none;
}

#contenedorperfil {
  display: flex;
  flex-direction: row;
  justify-content: center;

  justify-self: center;
  align-items: center;
  align-content: center;

  background-color: var(--white);
  background-repeat: no-repeat;
  width: 95.9%;

  padding: 1em;
}

/* #saludo {
  
} */

p {
  font-size: 1em;

  color: var(--white);
}

#fotoayuda {
  /* margin-top: -600px;
  margin-left: -400px; */
  width: 150px;
  height: 150px;
  border-radius: 300px;
  transition: transform 0.5s ease-in-out;
  margin-bottom: 60px;
}

#fotoayuda2 {
  /* margin-top: -300px;
  margin-left: -100px; */
  width: 100px;
  height: 100px;
  border-radius: 300px;
  margin-bottom: 70px;
  transition: transform 0.5s ease-in-out;
}

#fotoayuda3 {
  /*  margin-top: -500px;
  margin-left: 300px; */

  width: 200px;
  height: 200px;
  border-radius: 150px;
  transition: transform 0.5s ease-in-out;
}

img #fotoayuda4 {
  padding: 1rem;
}

#globos {
  display: flex;
  flex-direction: column;

  margin-left: 40px;
}

#fotoayuda:hover {
  transform: scale(2);
}
#fotoayuda3:hover {
  transform: scale(2);
}
#fotoayuda2:hover {
  transform: scale(2);
}

button {
  justify-content: center;
  margin: 0 auto;
  width: 300px;
  height: 40px;
  font-size: 1.2em;

  /*  box-shadow: 0 0 10px rgb(12, 12, 12); */
  /* margin: 10px; */

  font-family: "Ubuntu", sans-serif;
  color: var(--white);
  transition: background-color 0.3s;
  background-color: var(--black);
  border-radius: 20px;
}

button:hover {
  background-color: var(--naranjaoscuro);
  color: var(--black);
}

a {
  color: black;
}

.modal button {
  width: 200px;
  height: 50px;
  font-size: 0.8em;
}

#modalbutton {
  font-size: 0.9em;
  width: 150px;
  height: 25px;
  background-color: var(--verdeoscuro);
  color: var(--black);
}

#modalbutton:hover {
  background-color: var(--verdeclaro);
}

ul {
  font-size: 0.8em;
  line-height: 1.5;
}

#volver {
  font-size: 1em;
  /*  margin-left: 50px; */
  width: 200px;
  height: 25px;
}

#perfilusuario input {
  width: 400px;
  margin: 15px;
  height: 20px;
  font-size: 1em;
}
/* #perfilusuario input {
  width: 500px;
  margin: 20px;
  height: 40px;
  font-size: 1.2em;
} */

label {
  display: table-cell;

  font-size: 1em;
  font-weight: bold;
  vertical-align: top;
  text-align: right;
  padding-right: 3px;
}

#menudebotones {
  padding: 2em;
  /*  background-image: url("https://images.unsplash.com/photo-1417721955552-a49ac2d334e8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"); */
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 35px;
}

#saludo {
  margin-left: 300px;
  width: 750px;
  height: 650px;
  display: flex;
  flex-direction: column;
  justify-self: center;
  align-self: center;
  margin: 0 auto;
  margin-left: 40px;
  margin-right: 40px;
  color: var(--white);
  /* padding-bottom: 2rem; */
  /*  padding-top: 2rem; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, 0.562);
}

.contenedorsaludo {
  background-image: url("https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60");
  background-repeat: no-repeat;
  background-size: cover;
  width: 1500px;
  height: 650px;
  border-top-left-radius: 200px;
  border-top-right-radius: 50px;
}

h1 {
  color: var(--white);
}

p2:hover {
  color: var(--black);
}
</style>
