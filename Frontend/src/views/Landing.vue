<template>
  <div>
    <!-- Título para la pestaña del navegador -->
    <vue-headful title="INTERTEXTUAL" description="Landing" />

    <menucustom></menucustom>
    <br />

    <div id="landing">
      <div id="principallanding">
        <img id="fotoinformativauno" src="../assets/images/intertextual.png" alt="foto informativa" />
        <div id="buscador">
          <form>
            <h1>
              <b>ENCUENTRA CONCURSOS SEGÚN TUS PREFERENCIAS</b>
            </h1>
            <br />

            <div id="busqueda1">
              <p>
                <b>NOMBRE DEL CONCURSO</b>
              </p>
              <input
                v-model="nombre"
                type="search"
                name="nombre"
                size="40"
                placeholder="  No es necesario que busques el título completo"
              />

              <p>
                <b>ENTRE ESTA FECHA</b>

                <input v-model="fecha_publicacion" type="date" name="fecha_publicacion" min="2010" />
              </p>
              <p>
                <b>Y ESTA FECHA</b>
                <input id="fechas" v-model="fecha_final" type="date" name="fecha_final" min="2010" />
              </p>
            </div>
            <br />
            <div id="busqueda2">
              <p>
                <b>MODALIDAD</b>
              </p>
              <input id="check" v-model="modalidad" type="radio" name="modalidad" value="online" />
              <a>Online</a>
              <input
                id="check"
                v-model="modalidad"
                type="radio"
                name="modalidad"
                value="presencial"
              />
              <a>Presencial</a>

              <p>
                <b>CIUDAD</b>
                <input v-model="ciudad" type="search" name="ciudad" size="40" />
              </p>
              <p>
                <b>GÉNERO</b>
                <input v-model="genero" type="search" name="ciudad" size="40" />
              </p>
              <p>
                <input type="reset" value="Borrar" />
              </p>
            </div>
          </form>
          <br />
          <br />
          <br />
          <div id="botonformulario">
            <button @click="searching()">¡QUIERO VER QUÉ CONCURSOS ME ESPERAN!</button>
          </div>
        </div>
      </div>

      <div id="contenedorbusqueda">
        <!-- Recorremos el array dinámicamente, contiene la información del get de la función en methods -->
        <ul v-for="(resultadobusqueda, index) in resultadobusquedas" :key="resultadobusqueda.id">
          <div class="resultadosbusqueda">
            <li>
              <h3>{{ resultadobusqueda.nombre }}</h3>
            </li>

            <li>
              <img :src="resultadobusqueda.url_foto" alt="Foto de concurso" />
            </li>

            <li>
              <b>📆 Apertura:</b>
              {{resultadobusqueda.fecha_publicacion | moment(" D-MM-YYYY") }}
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
              <li>
                <b>Nombrada ganadora: {{resultadobusqueda.nombre_ganador}} {{resultadobusqueda.apellidos }} el {{resultadobusqueda.fecha_asignacion_ganador.slice(1,10) }}</b>
              </li>
            </div>

            <li>
              <button @click="openModal(index)">➕ MÁS INFORMACIÓN</button>
            </li>

            <div v-show="modal" class="modal">
              <div class="modalbox">
                <h1>BASES DEL CONCURSO</h1>

                <p>{{concursobases.descripcion}}</p>
                <h3>Recuerda que debes tener una cuenta con nosotras para inscribirte</h3>

                <router-link :to="{ name: 'Register' }">
                  <p id="registro">Quiero registrarme en INTERTEXTUAL</p>
                </router-link>

                <button @click="closeModal()">Cerrar</button>
              </div>
            </div>
          </div>
        </ul>
      </div>

      <barradebienvenida></barradebienvenida>
      <div id="footer">
        <barraredessociales></barraredessociales>
      </div>
    </div>
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
// Texto visible en pestaña del navegador
import vueHeadful from "vue-headful";

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
      fecha_publicacion: "",
      fecha_final: "",  
      genero: "",
      modalidad:"",
      ciudad: "",
      url_foto:"",
      modal : false,
      descripcion:"",
      concursobases:{},
      

    }
  },


methods: {
   openModal(index) {
      this.modal = true;
      this.concursobases=this.resultadobusquedas[index];

     
      

   },
   closeModal(){
     this.modal = false;
   },



makingSearchURL(){
const params = new URLSearchParams();

if(!!this.nombre){
  params.append("nombre", this.nombre);

}
if(!!this.fecha_publicacion){
  params.append("fecha_publicacion", this.fecha_publicacion);
 
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
          self.resultadobusquedas = response.data.data.map((resultadobusqueda) =>{
            resultadobusqueda.url_foto = "http://localhost:3003/images/" + resultadobusqueda.url_foto;

          return resultadobusqueda;
          });
        
        })

        .catch(function (error) {
          
          console.log(error.response.data.message);
          console.log("aqui");
        });

  }

},



};





</script>

<style scoped>
#fotoinformativauno {
  width: 500px;
  height: 500px;
  transition: transform 0.9s ease-in-out;
}
#fotoinformativa {
  width: 500px;
  height: 500px;
  transition: transform 0.9s ease-in-out;
}

img:hover {
  transform: scale(1.1);
}

#principallanding {
  background-color: #171616;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  box-shadow: 0 0 50px rgb(44, 41, 41);
  height: 600px;
  width: 100%;
  padding: 0em;
  margin: 0 auto;
  /* padding-top: 30px; */
  /* padding-bottom: 40px; */
  /* border-radius: 80px; */
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

input {
  height: 35px;
  border-radius: 5px;
  margin-left: 20px;
}
form p {
  font-size: 1.5em;
  color: var(--yellow);
}
button {
  padding: 0.7em;
}

#contenedoramarillo {
  background-color: var(--black);
  color: var(--white);
  margin: 0px;
}

.resultadosbusqueda {
  box-shadow: 0 0 10px var(--black);
  padding: 2em;
  width: 300px;
  margin: 10px auto;
  border-radius: 20px;
  width: 400px;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background: var(--white);
}

#contenedorbusqueda {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 90%;
  margin: 10px auto;
  /*  padding: 1em; */
}

img {
  width: 200px;
  height: 200px;
  border-radius: 20px;
  transition: transform 0.5s ease-in-out;
}
img:hover {
  transform: scale(1.4);
}

ul li {
  list-style: none;
  font-size: 1.2em;
}
h3 {
  text-transform: uppercase;
  font-size: 1.4em;
  color: var(--blue);
}

button {
  border-radius: 20px;
  font-size: 1.3em;
  font-weight: bold;
  padding: 16px;
  background-color: var(--black);
  font-family: "Ubuntu", sans-serif;
  color: var(--white);
  box-shadow: 2px 2px 2px var(--blue);
}

button:hover {
  color: var(--blue);
}

h1 {
  color: var(--blue);
  font-size: 2.3em;
}

#busqueda1 {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}

#busqueda2 {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}

form {
  width: 1500px;
}

a {
  color: var(--white);
  font-size: 1.4em;
}

#registro {
  color: var(--black);
  font-size: 1.3em;
}
</style>
