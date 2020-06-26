<template>
  <div>
    <menucustom></menucustom>
    <br />

    <div id="principallanding">
      <img id="fotoinformativa" src="../assets/images/intertextual5.png" />
      <div id="buscador">
        <form>
          <h2>🔎 Puedes utilizar nuestro buscador 👇</h2>
          <p>
            <b>ENCUENTRA CONCURSOS SEGÚN TUS PREFERENCIAS</b>
          </p>
          <p>
            <b>Nombre 👉</b>

            <input
              v-model="nombre"
              type="search"
              name="nombre"
              size="40"
              placeholder="  No es necesario que busques el título completo"
            />
          </p>
          <p>
            <b>Entre esta fecha 👉</b>

            <input v-model="fecha_inicio" type="date" name="fecha_inicio" min="2010" />
          </p>
          <p>
            <b>y esta otra fecha 👉</b>
            <input v-model="fecha_final" type="date" name="fecha_final" min="2010" />
          </p>
          <p>
            <b>Modalidad 👉</b>
            <input v-model="modalidad" type="radio" name="modalidad" value="online" /> Online
            <input v-model="modalidad" type="radio" name="modalidad" value="presencial" /> Presencial
          </p>
          <p>
            <b>Ciudad 👉</b>
            <input v-model="ciudad" type="search" name="ciudad" size="40" />
          </p>
          <p>
            <b>Género 👉</b>
            <input v-model="genero" type="search" name="ciudad" size="40" />
          </p>
          <p>
            <input type="reset" value="Borrar" />
          </p>
        </form>
        <div id="botonformulario">
          <button @click="searching()">¡QUIERO VER QUÉ CONCURSOS ME ESPERAN!</button>
        </div>
      </div>
      <img id="fotoinformativa" src="../assets/images/intertextual.png" />
    </div>

    <div id="contenedorbusqueda">
      <!-- Recorremos el array dinámicamente, contiene la información del get de la función en methods -->
      <ul v-for="resultadobusqueda in resultadobusquedas" :key="resultadobusqueda.id">
        <div class="resultadosbusqueda">
          <li>
            <h3>{{ resultadobusqueda.nombre }}</h3>
          </li>

          <li>
            <img :src="resultadobusqueda.url_foto" alt="Foto de concurso" />
          </li>

          <li>
            <b>📆 Apertura:</b>
            {{resultadobusqueda.fecha_inicio | moment(" D-MM-YYYY") }}
          </li>

          <li>
            <b>📆 Cierre:</b>
            {{ resultadobusqueda.fecha_final | moment(" D-MM-YYYY") }}
          </li>

          <!-- Sólo si el concurso ha sido valorado se muestra su valoración -->
          <div v-if="resultadobusqueda.valoracionmedia > 0">
            <li>
              La valoración media de este concurso es de:
              {{ resultadobusqueda.valoracionmedia }} ⭐️
            </li>
          </div>

          <div v-if="resultadobusqueda.nombre_ganador">
            <li>Nombrada ganadora: {{resultadobusqueda.nombre_ganador}} {{resultadobusqueda.apellidos }} el {{resultadobusqueda.fecha_asignacion_ganador}}</li>
          </div>

          <li>
            <button @click="openModal(index)">Ver Bases</button>
          </li>

          <div v-show="modal" class="modal">
            <div class="modalbox">
              <h3>Bases del concurso</h3>
              <p>{{resultadobusqueda.descripcion}}</p>
              <button @click="closeModal()">Cerrar</button>
            </div>
          </div>
        </div>
      </ul>
    </div>

    <barradebienvenida></barradebienvenida>
    <barraredessociales></barraredessociales>
  </div>
</template>

<script>
//IMPORTACIONES PARA
// componentes internos
import menucustom from "@/components/MenuCustom.vue";
import barraredessociales from "@/components/BarraRedesSociales.vue";
import barradebienvenida from "@/components/BarraBienvenida.vue";
// Manejar rutas y endpoints
import axios from "axios";
// customizar mensajes
import Swal from "sweetalert2";

export default {
  name: "landing",
  components: {
    menucustom,
    barraredessociales,
    barradebienvenida,
  },

  data(){
    return{
      resultadobusquedas: [],
      search:{},
      nombre:"",
      fecha_inicio: "",
      fecha_final: "",  
      genero: "",
      modalidad:"",
      ciudad: "",
      modal : false,

    }
  },


methods: {
   openModal(index) {
      this.modal = true;
      return index;
      

   },
   closeModal(){
     this.modal = false;
   },



makingSearchURL(){
const params = new URLSearchParams();

if(!!this.nombre){
  params.append("nombre", this.nombre);

}
if(!!this.fecha_inicio){
  params.append("fecha_inicio", this.fecha_inicio);

}

if(!!this.fecha_final){
  params.append("fecha_final", this.fecha_final);

}
if(!!this.genero){
  params.append("genero", this.genero);

}
if(!!this.modalidad){
  params.append("modalidad", this.modalidad);

}
if(!!this.ciudad){
  params.append("ciudad", this.ciudad);

}
return params;




},


searching(){

      const self = this;
      // Cojo token e id.
      const token = localStorage.getItem("token");
      const data = localStorage.getItem("id");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const searchingParams= self.makingSearchURL();

      // Petición get a mi ruta del Back para consultar los resultados de la búsqueda
      axios
        .get(`http://localhost:3003/busqueda?${searchingParams}`)

        .then(function (response) {
          console.log(response);
          self.resultadobusquedas = response.data.data;
          console.log(self.resultadobusquedas);
         
        })

        .catch(function (error) {
          console.error(error);
          console.log(error.response.data.message);
        });

  }

},



};





</script>

<style scoped>
#fotoinformativa {
  width: 500px;
  height: 500px;
  transition: transform 0.9s ease-in-out;
  border-radius: 30px;
}
img:hover {
  transform: scale(1.1);
}

#principallanding {
  background-color: #100f0d;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  box-shadow: 0 0 10px rgb(0, 0, 0);
  height: 500px;
  width: 100%;
  padding: 1em;
}
h2 {
  color: #fedd0a;
}

input {
  height: 30px;
  border-radius: 5px;
}
form p {
  font-size: 1.1em;
  color: #1ca1f2;
}
button {
  padding: 0.7em;
}

#contenedoramarillo {
  background-color: rgb(12, 12, 12);
  color: white;
  margin: 50px;
}

.resultadosbusqueda {
  box-shadow: 0 0 10px rgb(12, 12, 12);
  padding: 2em;
  width: 300px;
  margin: 10px auto;
  border-radius: 20px;
  width: 400px;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

#contenedorbusqueda {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 90%;
  margin: 10px auto;
}
img {
  width: 200px;
  height: 200px;
  border-radius: 20px;
  transition: transform 0.5s ease-in-out;
}
img:hover {
  transform: scale(1.1);
}

ul li {
  list-style: none;
  font-size: 1.2em;
}
h3 {
  text-transform: uppercase;
  font-size: 1.4em;
}

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
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 50px;
  border: solid 2px black;
  box-shadow: 0 0 1px rgb(12, 12, 12);
}
</style>
