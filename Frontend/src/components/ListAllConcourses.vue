
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
      <div
        class="concursoscontenedor"
        v-for="concurso in concursosFiltrados"
        :key="concurso.id_concurso"
      >
        <p>
          <b>id.:</b>
          {{concurso.id_concurso}}
        </p>
        <p>
          <img :src="concurso.url_foto" />
        </p>
        <p>
          <b>Nombre:</b>
          {{concurso.nombre}}
        </p>
        <p>
          <b>Abierto a suscripción desde:</b>
          {{concurso.fecha_inicio}}
        </p>

        <!-- REVISAR estas clases dinámicas dependientes de FECHA -->
        <p
          :class="{ green: concurso.fecha_final >= 'datetoday' , red: concurso.fecha_final <= 'datetoday' }"
        >
          <b>Cierre de suscripción:</b>
          {{concurso.fecha_final}}
        </p>

        <p>
          <b>Información y bases:</b>
          {{concurso.descripcion}}
        </p>
        <p>
          <b>Modalidad:</b>
          {{concurso.modalidad}}
        </p>
        <p>
          <b>Genero:</b>
          {{concurso.genero}}
        </p>
        <p>
          <b>Ciudad:</b>
          {{concurso.ciudad}}
        </p>
        <p>
          <b>Valoración media:</b>
          {{concurso.valoracion}}
        </p>

        <!-- Con una clase dinámica manejo los colores en función de la vigencia del concurso -->
        <hr />
        <!-- El botón de inscribir DE MENTIRIJILLAS AUN, hace una llamada a la función que nos envía un Sweet Alert -->
        <button @click="inscribir()">INSCRIBIRME</button>
      </div>
    </div>
  </div>
</template>

<script>
// IMPORTAMOS PARA
// enviar mensajes custom
import Swal from "sweetalert2";
// componentes internos


export default {
name: 'listallconcourses',
props:{
  // Le indicamos que está recibiendo un array.
concursos: Array,


},

data(){
  return {
    // Inicializamos un string vacío que contendrá la búsqueda.
    search:"",
    datetoday: new Date(),
    
}
},

computed: {
  
  //FUNCIÓN PARA FILTRAR PRODUCTOS
concursosFiltrados() {
     
      // Si en la búsqueda no hay nada nos devuelve todo.
  if (!this.search) {
        return this.concursos;
        console.log(this.concursos);
      }
 return this.concursos.filter ( 
        concurso  => 
        concurso.nombre.toLowerCase().includes(this.search.toLowerCase()) ||
        concurso.descripcion.toLowerCase().includes(this.search.toLowerCase()) ||
        concurso.modalidad.toLowerCase().includes(this.search.toLowerCase()) ||
        concurso.genero.toLowerCase().includes(this.search.toLowerCase()) 
        //Ojo aquí, pendiente que funcione la búsqueda por ciudad.
        // concurso.ciudad.toLowerCase().includes(this.search.toLowerCase()) 
 )
    },
  

},

methods:{
// Método para el botón de "comprar"
inscribir(){
  Swal.fire({
    title: "🆗",
    text:`Te has inscrito correctamenrte a este concurso`,
    confirmButtonText: "O.K.",

  });
 
},

},
/* FUNCIÓN PARA TRAER FECHA Y UTILIZAR EN CLASES DINÁMICAS pendiente de funcionamiento 
getTodayDate (datetoday) {
  datetoday = new Date();
  return format(datetoday, 'yyyy-MM-dd HH:mm:ss');
},  */




};
</script>

<style>
.green {
  color: green;
}

.red {
  color: red;
}
.concursoscontenedor {
  box-shadow: 1px 1px 1px 1px #888888;
  padding: 3em;
  width: 300px;
  margin: 10px auto;
  border-radius: 20px;
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
</style>