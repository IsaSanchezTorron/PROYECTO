<template>
  <div>
    <!--Encabezado de página -->
    <h2>Todos los concursos hasta la fecha</h2>
    <!-- Forumulario de búsqueda -->
    <div id="formulariobusqueda">
      <label for="bySearch">Búsqueda</label>
      <br />
      <input
        v-model="search"
        id="search"
        name="bySearch"
        type="search"
        placeholder="🔍 Nombre/Descripción..."
      />
    </div>

    <div class="contenedor">
      <br />
      <!-- Contenedor para dar formato a la ficha de productos, lo cargamos con el array de productos filtrados -->
      <div class="concursoscontenedor" v-for="concurso in concursosFiltrados" :key="concurso.id">
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
        <!-- Con una clase dinámica manejo los colores en función de la vigencia del concurso -->

        <!-- El botón de inscribir DE MENTIRIJILLAS AUN, hace una llamada a la función que nos envía un Sweet Alert -->

        <button @click="openModal()">VER BASES</button>
        <br />
        <br />
        <button @click="confirmInscription(concurso)">QUIERO INSCRIBIRME</button>
      </div>
    </div>
  </div>
</template>

<script>
// IMPORTAMOS PARA
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


    // MÉTODO PARA EL BOTÓN DE INSCRIPCIÓN EN CONCURSO.

    confirmInscription(concurso) {

      const self = this;
      
      // Cojo token e id.
      const token = localStorage.getItem("token");
      const data = localStorage.getItem("id");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      Swal.fire({
        title: "🤓",
        text: "¿Quieres suscribirte a este concurso?",
        showCancelButton: true,
         confirmButtonColor: "#1CA1F2",
        cancelButtonColor: "#EB5784",
        confirmButtonText: "Sí, quiero suscribirme.",
        cancelButtonText: "Volver",
      }).then(result => {
        if (result.value) {

      axios
        .post(
          "http://localhost:3003/concursos/inscripciones/" +
            concurso.id_concurso,
          {
            id_concurso: self.id_concurso,
            id_usuario: data,
          }
        )
        .then(function (response) {
        
          
          // Enviamos mensaje de confirmación de inscripción
          Swal.fire({
            title: "❓",
            
            text: "Te has inscrito en el concurso con éxito",
            confirmButtonText: "O.K",
            timer: 3000,
          });
        })
        //Recogemos posibles errores
        .catch(function (error) {
          console.log(error.response.data.message);

          Swal.fire({
            title: "⚠️",
            text: "Ha habido un error, es posible que ya estés inscrito",
            confirmButtonText: "O.K",
            timer: 3000,
          });
        });
    };
      },
      )},
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
  box-shadow: 0 0 10px rgb(12, 12, 12);
  padding: 3em;
  width: 300px;
  margin: 10px auto;
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
  font-size: 1.4em;
}
</style>
