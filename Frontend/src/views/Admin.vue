<template>
  <div>
    <!-- Definimos el título de página visible en navegador -->
    <vue-headful title="Admin" description="Herramientas de administrador" />

    <!-- Inserción del componente menú en la cabecera de la vista -->
    <menucustom></menucustom>

    <!--Aquí es donde cargo todos los concursos con una computed -->
    <div id="concursoscontenedor">
      <h2>Todos los concursos hasta la fecha</h2>

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
            placeholder="🔍 Nombre/Descripción..."
          />
        </div>
      </div>

      <!--Este es el modal donde el Admin va a añadir un nuevo concurso -->
      <div class="modal" v-show="seeNewConcourse">
        <div class="modalBox">
          <form>
            <label for="nombre">Nombre:</label>
            <br />
            <input type="text" name="nombre" id="nombre" v-model="nombre" />

            <label for="fecha_final">Fecha de cierre:</label>
            <br />
            <input type="date" name="fecha_final" id="fecha_final" v-model="fecha_final" />

            <label for="descripcion">Información y Bases:</label>
            <br />
            <input type="text" name="descripcion" id="descripcion" v-model="descripcion" />

            <label for="modalidad">Modalidad:</label>
            <br />
            <input type="text" name="modalidad" id="modalidad" v-model="modalidad" />

            <label for="genero">Género:</label>
            <br />
            <input type="text" name="genero" id="genero" v-model="genero" />

            <label for="fecha_publicacion">Publicado el:</label>
            <br />
            <input
              type="date"
              name="fecha_publicacion"
              id="fecha_publicacion"
              v-model="fecha_publicacion"
            />
          </form>
        </div>
      </div>
      <button @click="createNewConcourse()">AÑADIR CONCURSO NUEVO</button>

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
          <button @click="editConcourse()">✍️Editar</button>
          <button @click="seeParticipants()">👥 Ver listado de participantes</button>
        </div>
      </div>
    </div>
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
import menucustom from "@/components/MenuCustom.vue"
export default {
    name: "Admin",
    components: {menucustom},

    data(){
        return{
        concursos :[],
        search:"",
        nombre: "",
        fecha_final: "",
        descripcion: "",
        modalidad:"",
        genero:"",
        fecha_publicacion:"",
        seeNewConcourse: false,
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

 showAllConcourses(){
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
  
 

deleteConcourse(index){
 
      const self = this;
      const id_concurso = self.concursos[index].id_concurso;
     ;
      //Cojo token e id
      const token = localStorage.getItem("token");
      const data = localStorage.getItem("id")
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      

Swal.fire({
        title:"🤓",
        text: "Vas a eliminar definitivamente este concurso ¿Estás segura?",
        showCancelButton: true,
        confirmButtonColor: "#1CA1F2",
        cancelButtonColor: "#EB5784",
        confirmButtonText: "Quiero eliminar este concurso",
        cancelButtonText: "Quiero mantenerlo en la BBDD",
        
      }).then((result) => {
        if (result.value) {
          axios
            .delete( "http://localhost:3003/concursos/delete/" + id_concurso)
            .then(function(response) {
              
            })
            .catch(function(error) {
              console.error(error.response.data.message);
            });
          Swal.fire({
            title: "✅",
            text: "Se ha eliminado correctamente",
            confirmButtonText: "O.K",
            timer: 4000
          })


          location.reload();
        }
      });
    },




 createNewConcourse() {
      
      var self = this;
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .post("http://localhost:3003/concursos/nuevo_concurso", {

        nombre: self.nombre,
        fecha_final: self.date,
        descripcion: self.descripcion,
        modalidad:self.modalidad,
        genero:self.genero,
        fecha_publicacion: self.fecha_publicacion,
        })
        .then(function(response) {
          Swal.fire({
            title: "El concurso ha sido agregado correctamente",
          });
          
          self.seeNewConcourse = false;
          location.reload();
        })
        .catch(function(error) {
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

<style scoped>
.concursoscontenedor {
  box-shadow: 0 0 10px rgb(12, 12, 12);
  padding: 2em;
  width: 250px;
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
  width: 100px;
  height: 100px;
  border-radius: 20px;
  transition: transform 0.5s ease-in-out;
}
img:hover {
  transform: scale(1.9);
}

#formulariobusqueda {
  padding: 2em;
}

h3 {
  text-transform: uppercase;
  font-size: 1.3em;
}
p {
  font-size: 0.8em;
}

#contenedorbuscadoryañadirconcurso {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
</style>