<template>
  <div>
    <!-- Nombre en pestaña del navegador -->
    <vue-headful title="Login" description="Login de usuario" />
    <!--Inserción del menú en parte superior de página -->
    <menucustom></menucustom>
    <br />
    <br />
    <br />
    <!-- Uso del vue headful para nombrar los títulos de pag. visibles en navegador -->
    <div class="todo">
      <div class="contenedorlogin">
        <div id="formulario">
          <h1>Haz login 👇</h1>
          <br />
          <br />
          <!-- Input para campo email -->
          <input type="text" placeholder="Tu correo electrónico" v-model="mail" />
          <br />
          <br />
          <br />
          <!--Input para campo password -->
          <input type="password" placeholder="Tu contraseña" v-model="contrasenha" />
          <br />
          <br />
          <br />
          <!-- Botón con llamada a la función Login -->
          <button @click="login(mail, contrasenha)">LOGIN</button>
          <br />
          <br />
          <br />
        </div>
        <div>
          <img
            id="fotoinformativauno"
            src="../assets/images/intertextual5.png"
            alt="foto informativa"
          />
        </div>
      </div>

      <div id="nav">
        <!-- Enlace a la vista de Registro desde el Login -->
        <p>Si no tienes cuenta, regístrate aquí</p>
        <!-- Todavía no existe ruta -->
        <a>
          <router-link :to="{ name: 'Register' }">👉 Registro</router-link>
        </a>
      </div>
    </div>
    <br />
    <br />

    <barraredesociales></barraredesociales>
  </div>
</template>


  

<script>
// IMPORTAMOS PARA
// componentes internos
import menucustom from "@/components/MenuCustom.vue"
import barraredesociales from "@/components/BarraRedesSociales.vue"
// titulos de página visibles en pestaña del navegador
import vueHeadful from "vue-headful";
// mensajes custom para el usuario
import Swal from "sweetalert2";
// Manejo de rutas y end-points.
import axios from 'axios';


export default {
    name: "Login",
    
    components: {vueHeadful, menucustom, barraredesociales},

    data(){
        return {
            mail: "",
            contrasenha: "",
    

        }
    },

    methods: {

      login( mail, contrasenha){
        let self = this;
        axios .post("http://localhost:3003/usuarios/login", {
          mail: self.mail,
          contrasenha: self.contrasenha,
        })
        .then(function(response){
          localStorage.setItem("token", response.data.data.token);
          localStorage.setItem("mail", response.data.mail);
          localStorage.setItem("id", response.data.id);
          localStorage.setItem("name", response.data.name);
          localStorage.setItem("rol", response.data.rol);
          
           const Toast = Swal.mixin({
  toast: true,
  position: 'top-right',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

Toast.fire({
  icon: 'success',
  title: 'Te has logueado correctamente'
})
 self.$router.push("/profile");
        })
        .catch(function(error){

           Swal.fire({
            title: "⚠️",
            text: error.response.data.message,
            confirmButtonText: "O.K",

          })



          console.log("ha habido un error")
        });

      },
      
    },
};

</script>

<style scoped>
#contenedorlogin {
  margin-top: 50px;
}
input {
  width: 500px;
  height: 30px;
  font-size: 1.2em;
}
button {
  width: 300px;
}

p {
  font-size: 1.3em;
  color: var(--white);
}

a {
  text-decoration: none;
  font-size: 1.1em;
  color: var(--blue);
}

.todo {
  background-color: var(--black);
  align-self: center;
  padding: 3.5em;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0 0 50px rgb(44, 41, 41);
  margin-top: -40px;
}

h1 {
  color: var(--blue);
}

button {
  border-radius: 5px;
  font-size: 1em;
  font-weight: bold;
  padding: 10px;
  background-color: rgb(32, 33, 34);
  font-family: "Ubuntu", sans-serif;
  color: #1a99e7;
  box-shadow: 0 0 2px rgb(12, 12, 12);
}
</style>