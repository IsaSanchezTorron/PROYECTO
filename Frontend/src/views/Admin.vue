<template>
  <div>
    <!-- Definimos el título de página visible en navegador -->
    <vue-headful title="Admin" description="Herramientas de administrador" />

    <!-- Inserción del componente menú en la cabecera de la vista -->
    <menucustom></menucustom>

    <!--Aquí es donde cargo todos los concursos con una computed -->
    <div id="concursoscontenedor">
      <br />
      <br />
      <h1>TODOS LOS CONCURSOS</h1>
      <h2>en curso o pendientes de nombramiento</h2>

      <!--Aquí un contenedor para centrar en la parte superior el botón y el buscador -->
      <div id="contenedorbuscadoryañadirconcurso">
        <!-- Forumulario de búsqueda -->
        <div id="formulariobusqueda">
          <label for="bySearch">Búsqueda</label>
          <br />
          <input
            v-model="search"
            id="search"
            name="bySearch"
            type="search"
            placeholder="🔍 Nombre/Descripción/Género/Modalidad..."
          />
        </div>
      </div>

      <!--Este es el modal donde el Admin va a añadir un nuevo concurso -->
      <div class="modal" v-show="modal">
        <div class="modalbox">
          <h2>Introduce los datos del concurso</h2>
          <label for="nombre">Nombre:</label>
          <input type="text" name="nombre" id="nombre" v-model="nombre" />

          <br />
          <label for="fecha_final">Fecha de cierre:</label>
          <input type="date" name="fecha_final" id="fecha_final" v-model="fecha_final" />

          <br />
          <label for="descripcion">Información y Bases:</label>
          <textarea
            type="text"
            cols="15"
            rows="10"
            name="descripcion"
            id="descripcion"
            v-model="descripcion"
          />

          <br />

          <label for="modalidad">Modalidad:</label>
          <div id="checks">
            <input v-model="modalidad" type="radio" name="modalidad" value="online" /> Online
            <input v-model="modalidad" type="radio" name="modalidad" value="presencial" />
            Presencial
            <br />
          </div>
          <label for="genero">Género:</label>
          <input type="text" name="genero" id="genero" v-model="genero" />

          <br />
          <label for="ciudad">Ciudad:</label>
          <input type="text" name="ciudad" id="ciudad" v-model="ciudad" />

          <br />

          <div id="selecciondefoto">
            <label for="file">👤 Selecciona una foto para el concurso 👉 📸 .</label>
            <input
              type="file"
              id="url_foto"
              name="url_foto"
              ref="url_foto"
              @change="handleFileUpload()"
            />
          </div>

          <button @click="createNewConcourse()">💾 Guardar</button>
          <button @click="closeModal()">⬅️ Cerrar</button>
        </div>
      </div>
      <div id="contenedorboton">
        <button @click="openModal()">➕ AÑADIR CONCURSO NUEVO</button>
      </div>

      <div class="contenedor">
        <br />

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

          <p style="color:red">
            <b>📆 Cierre de suscripción:</b>
            {{ concurso.fecha_final.slice(0, 10) }}
          </p>

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
            {{ concurso.fecha_asignacion_ganador }}
          </p>
          <p v-if="concurso.nombre_ganador">
            <b>🥇 Ganador:</b>
            {{concurso.nombre_ganador}}
          </p>
          <p v-if="concurso.valoracion">
            <b>🌠 Valoración media:</b>
            {{ concurso.valoracion }}
          </p>
          <button @click="deleteConcourse(index)">🗑 Eliminar</button>

          <!-- Botón para abrir modal para ver participantes del concurso -->
          <button @click="openModalInscripciones(index)">👥 Ver listado de participantes</button>
          <!-- El modal con los datos de las inscripciones -->
          <div class="modal" v-show="verInscripciones">
            <div class="modalBox">
              <h2>Estas son las personas inscritas</h2>
              <ul
                class="resultadosinscripciones"
                v-for="(inscripcion, index) in inscripciones"
                :key="inscripcion.id"
              >
                <li>👤 Id.: {{inscripcion.id_usuario}} - Nombre: {{inscripcion.nombre}} {{inscripcion.apellidos}}</li>
                <li v-if="inscripcion.id_ganador">
                  <hr />
                  <b>Nombrada ganadora la persona con id: {{inscripcion.id_ganador}} el {{inscripcion.fecha_asignacion_ganador | moment(" D-MM-YYYY")}}</b>
                </li>
                <hr />
              </ul>
              <input
                v-model="idganador"
                id="idganadorid"
                name="idganadorid"
                type="text"
                placeholder="🔍 Introduce el id. de la persona ganadora."
              />

              <button id="modalbutton" @click="setWinner()">Asignar ganador</button>
              <button id="modalbutton" @click="closeModalInscripciones()">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <barraredessociales></barraredessociales>
  </div>
</template>

<script>
//IMPORTAMOS PARA
// manejar endpoints y rutas
import axios from "axios";
// alertas custom
import Swal from "sweetalert2";
// Titular las pestañas visibles en el navegador
import vueHeadful from "vue-headful";
// componentes internos
import menucustom from "@/components/MenuCustom.vue";
import barraredessociales from "@/components/BarraRedesSociales.vue";
export default {
  name: "Admin",
  components: { menucustom, barraredessociales, vueHeadful },

  data() {
    return {
      concursos: [],
      search: "",
      nombre: "",
      fecha_final: "",
      descripcion: "",
      modalidad: "",
      genero: "",
      ciudad: "",
      fecha_publicacion: "",
      modal: false,
      verInscripciones: false,
      inscripciones: [],
      concursoinscripciones: {},
      idganador: ""
    };
  },

  computed: {
    //FUNCIÓN PARA FILTRAR PRODUCTOS
    concursosFiltrados() {
      // Si en la búsqueda no hay nada nos devuelve todo.
      if (!this.search) {
        return this.concursos;
      }
      return this.concursos.filter(
        concurso =>
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
    }
  },

  methods: {
    setWinner() {
      const self = this;

      const token = localStorage.getItem("token");
      const id_concurso = self.concursoinscripciones.id_concurso;

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      //Hago la petición a servidor

      console.log(self.idganador);
      console.log(id_concurso);

      axios
        .put("http://localhost:3003/concursos/asignar_ganador", {
          id_usuario: self.idganador,
          id_concurso: id_concurso
        })
        .then(function(response) {
          Swal.fire({
            icon: "success",
            title: "Gracias por asignar ganador a este concurso. ",
            timer: "5000"
          }).then(function(result) {
            if (result.value) {
              location.reload();
            }
          });
        })
        .catch(function(error) {
          console.error(error);
          console.log(error.response.data.message);
        });
    },

    openModal() {
      this.modal = true;
    },

    closeModal() {
      this.modal = false;
    },

    openModalInscripciones(index) {
      this.verInscripciones = true;
      this.concursoinscripciones = this.concursos[index];
      console.log(this.concursoinscripciones);
      this.showInscribed();
    },

    closeModalInscripciones() {
      this.verInscripciones = false;
    },

    showAllConcourses() {
      let self = this;
      axios
        .get("http://localhost:3003/concursos/todos")
        //SI SALE BIEN
        .then(function(response) {
          self.concursos = response.data.data.map(concurso => {
            concurso.url_foto =
              "http://localhost:3003/images/" + concurso.url_foto;

            return concurso;
            console.log(response);
          });
        })
        //SI SALE MAL
        .catch(function(error) {
          console.error(error);
        });
    },

    deleteConcourse(index) {
      const self = this;
      const id_concurso = self.concursos[index].id_concurso;
      //Cojo token e id
      const token = localStorage.getItem("token");
      const data = localStorage.getItem("id");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      Swal.fire({
        title: "🤓",
        text: "Vas a eliminar definitivamente este concurso ¿Estás segura?",
        showCancelButton: true,
        confirmButtonColor: "#FE9F1D",
        cancelButtonColor: "#2EC4B6",
        confirmButtonText: "Quiero eliminar este concurso",
        cancelButtonText: "Quiero mantenerlo en la BBDD"
      }).then(result => {
        if (result.value) {
          axios
            .delete("http://localhost:3003/concursos/delete/" + id_concurso)
            .then(function(response) {})
            .catch(function(error) {
              console.error(error.response.data.message);
            });
          Swal.fire({
            title: "✅",
            text: "Se ha eliminado correctamente",
            confirmButtonText: "O.K",
            confirmButtonColor: "#FE9F1D",

            timer: 4000
          });

          location.reload();
        }
      });
    },

    handleFileUpload() {
      this.url_foto = this.$refs.url_foto.files[0];
    },

    showInscribed() {
      const self = this;
      // Cojo token e id de concurso.
      const token = localStorage.getItem("token");

      const data = self.concursoinscripciones.id_concurso;

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      axios
        .get("http://localhost:3003/concursos/inscripciones/" + data)
        //SI SALE BIEN
        .then(function(response) {
          self.inscripciones = response.data.data;
          console.log(response.data.data);

          console.log(response);
        })

        //SI SALE MAL
        .catch(function(error) {
          console.error(error.response.data.message);
        });
    },

    /* setWinner(index){

 }  ,    */

    createNewConcourse() {
      var self = this;
      const token = localStorage.getItem("token");
      const data = localStorage.getItem("id");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      let formData = new FormData();
      formData.append("url_foto", self.url_foto);
      formData.append("nombre", self.nombre);
      formData.append("fecha_final", self.fecha_final);
      formData.append("descripcion", self.descripcion);
      formData.append("modalidad", self.modalidad);
      formData.append("genero", self.genero);
      formData.append("ciudad", self.ciudad);

      axios
        .post("http://localhost:3003/concursos/nuevo_concurso", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(function(response) {
          self.closeModal();
          Swal.fire({
            title: "El concurso ha sido agregado correctamente"
          });
          setTimeout(function() {
            location.reload();
          }, 2000);
        })
        .catch(function(error) {
          console.error(error.response.data.message);
        });
    }
  },
  // LA LLAMADA A LA FUNCIÓN EN LA CARGA
  created() {
    this.showAllConcourses();
  }
};
</script>

<style scoped>
.concursoscontenedor {
  box-shadow: 0 0 10px var(--black);
  padding: 2em;

  margin: 40px auto;
  border-radius: 20px;
  width: 300px;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  line-height: 0.6;
  background-color: var(--verdeclaro);
}

.contenedor {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 90%;
  margin: 45px auto;
}

img {
  width: 75px;
  height: 75px;
  border-radius: 20px;
  transition: transform 0.5s ease-in-out;
}
img:hover {
  transform: scale(1.9);
}

#formulariobusqueda {
  padding: 1em;
}

#formulariobusqueda input {
  width: 500px;
  height: 40px;
}

h3 {
  text-transform: uppercase;
  font-size: 1.2em;
  line-height: 1;
}

p {
  font-size: 1em;
}

ul {
  list-style: none;
}

#contenedorbuscadoryañadirconcurso {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

button {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-self: center;
  width: 250px;
  height: 30px;
  font-size: 0.9em;
  padding: 0.2em;
  box-shadow: 0 0 10px rgb(12, 12, 12);
  margin: 10px;
  font-family: "Ubuntu", sans-serif;
  color: var(--black);
  transition: background-color 0.3s;
  background-color: var(--naranjaclaro);
  border-radius: 100px;
}

button:hover {
  background-color: var(--verdeoscuro);
}

h1 {
  color: var(--blue);
}

/* .modal {
  position: fixed;

  border-radius: 150px;
  width: 1200px;
  height: 1000px;
  margin-bottom: 1000px;
  margin: 0 auto;
}

.modalbox {
  background: var(--white);
  margin-top: -600px;
  padding: 10px;
  border: 1px solid #888;

  border-radius: 50px;
  border: solid 1px rgba(22, 22, 22, 0.753);
  box-shadow: 0 0 5px rgba(247, 183, 87, 0.548);
  font-size: 1em;

  margin: 0 auto;
} */

.modal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  border-radius: 150px;
  width: 100%;
}
.modalBox {
  background: var(--white);
  margin: 10% auto;
  padding: 10px;
  border: 1px solid #888;
  width: 40%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 50px;
  border: solid 1px rgba(22, 22, 22, 0.753);
  box-shadow: 0 0 5px rgba(247, 183, 87, 0.548);
  font-size: 1.3em;
}

hr {
  height: 10px;
  border: 0;
  box-shadow: 0 10px 10px -10px #8c8b8b inset;
}

input {
  width: 500px;
  height: 35px;
  margin-left: 20px;
  margin-top: 6px;
  border-top: 0;
  border-right: 0;
  border-left: 0;
  background-color: var(--white);
  border-bottom: 2px solid var(--black);
  font-size: 1em;
}

input[type="radio"] {
  border: 10px;
  width: 100%;
  height: 20px;
  width: 30px;
}

#checks {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 auto;
}

img {
  width: 150px;
  height: 150px;
  border-radius: 20px;
  transition: transform 0.5s ease-in-out;
}
img:hover {
  transform: scale(1.3);
}

#contenedorboton {
  display: flex;
  flex-direction: column;
  justify-self: center;
}

#modalbutton {
  font-size: 0.8em;
}
h2 {
  font-size: 1em;
  color: var(--verdeoscuro);
}
</style>