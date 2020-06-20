<template>
  <div>
    <!-- Definimos el título de página visible en navegador -->
    <vue-headful title="Profile" description="Tu perfil" />

    <!-- Inserción del componente menú en la cabecera de la vista -->
    <menucustom></menucustom>

    <!--Sección de datos personales -->
    <div class="informacionusuario">
      <h3>Hola {{ user.nombre }}</h3>
      <img :src="user.url_foto" alt="Foto de perfil de usuario" />
      <p>Miembro desde {{user.fecha_registro}}</p>
      <p>Miembro con rol de: {{ user.rol}}</p>
    </div>

    <div v-show="!seeEditable">
      <div class="datosparaeditar">
        <p class="nombre">{{ user.nombre }}</p>
        <p class="apellidos">{{ user.apellidos }}</p>
        <!--  <p class="url_foto">{{ user.url_foto }}</p> -->
        <p class="descripcion">{{ user.descripcion }}</p>
      </div>
    </div>

    <button @click="showEditable()">Actualiza tu perfil</button>

    <hr />
    <!-- <button @click="seeHistory()">Ver historial de inscripciones</button> -->
    <div class="historialConcurso">
      <h3>Historial de concursos</h3>
      <ul v-for="historia in historial" :key="historia.id">
        <li>{{ historia.nombre_concurso }}</li>
        <li>{{ historia.descripcion }}</li>
        <li>{{ historia.fecha_inicio }}</li>
        <li>{{ historia.fecha_final }}</li>
        <li>--------------------------------------------------</li>
      </ul>
    </div>

    <div class="editar" v-show="seeEditable">
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
      <label for="file">Selecciona tu nueva foto:</label>
      <input type="file" id="file" name="file" />
      <br />
      <label for="descripcion">Sobre ti:</label>
      <input
        type="text"
        id="descripcion"
        name="descripcion"
        v-model="nuevaDescripcion"
        placeholder="descripcion"
      />
      <br />
      <br />
      <button @click="confirmEditUser()">Guardar</button>
      <hr />
    </div>
  </div>
</template>

<script>
//EXPORTAMOS PARA
//Manejar títulos de página en pestaña navegador
import vueHeadful from "vue-headful"
// Manejo de endpoints, peticiones, rutas:
import axios from "axios";
// Componentes internos
import menucustom from "@/components/MenuCustom.vue"


export default {
    name: "Profile",
    // Componentes de la vista
    components: { menucustom, vueHeadful},
    data(){
        
        return{
            // Declaración de variables que voy a utilizar para recoger la información
            id: null,
            user:{},
            nuevoNombre: "",
            nuevoApellido: "",
            nuevaDescripcion:"",
            // Booleano para controlar el v-show que contiene el formulario de edición.
            seeEditable: false,
            url_foto:"", 
            historial:[],
            concursos:[],

        }
    },


    methods: { 

        // FUNCIÓN PARA HACER LA PETICIÓN AL SERVIDOR.

        getDataUser(){
            const self = this;
            // Cojo token e id.
            const token = localStorage.getItem("token");
            const data = localStorage.getItem("id");
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
           
            console.log(token);
            console.log(data);

            // Petición get a mi ruta del Back para editar usuarios, concatenamos el id.
            axios.get("http://localhost:3003/usuarios/" + data)
            
            .then (function (response){
              self.historial = response.data.data;
                console.log(response);
                
                // En user tengo ahora el acceso directo a este usuario concreto.
               self.user = response.data.data;
               // Monto la ruta para poder visualizar la imagen que está en la BBDD con un nombre de archivo.
               self.user.url_foto= "http://localhost:3003/images/" + self.user.url_foto;
               console.log(self.user.url_foto);
            })
             
            .catch(function(error) {
             alert("Socorri");
            console.log(error.response.data.message); 
            
          })
          
          },
            



// FUNCIÓN PARA GUARDAR LOS CAMBIOS
      confirmEditUser() {
      const self = this;
      //Tengo la autenticación...
      const data = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      //Hago la petición a servidor
      axios
        .put("http://localhost:3003/usuarios/editar/" + data, {
          nombre: self.nuevoNombre,
          apellidos: self.nuevoApellido,
          descripcion: self.nuevaDescripcion,
          url_foto: self.data.url_foto, 
          
        })
        .then(function(response) {
          self.seeEditable = true;
        })
        .catch(function(error) {
          console.error(error);
          console.log(error.response.data.message); 
        });
    },
    


    showEditable() {
        
      this.seeEditable = true;
      this.nuevoNombre = this.user.nombre;
      this.nuevoApellido = this.user.apellidos;
      this.nuevaDescripcion= this.user.descripcion;
      this.url_foto= this.user.url_foto; 
      console.log(this.user.nombre);
    },



    seeHistory(){


        const self = this;
            // Cojo token e id.
            const token = localStorage.getItem("token");
            const data = localStorage.getItem("id");
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
           
            console.log(token);
            console.log(data);

            // Petición get a mi ruta del Back para consultar inscripciones, concatenamos el id.
            axios.get("http://localhost:3003/usuarios/historial/" + data)
            
            .then (function (response){
                console.log(response);
                
                // En user tengo ahora el acceso directo a este usuario concreto.
               self.historial = response.data.data;
              
            })
             
            .catch(function(error) {
             alert("Socorri");
            console.log(error.response.data.message); 
            
          })
          
          },
            


    },


  

      created(){
          this.getDataUser();
          this.seeHistory();
      }
    };
    
    

        
    


</script>

<style>
</style>