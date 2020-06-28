<template>
  <div>
    <!-- Nombre en pestaña del navegador -->
    <vue-headful title="Login" description="Login de usuario" />
    <!--Inserción del menú en parte superior de página -->
    <menucustom></menucustom>
    <!-- Uso del vue headful para nombrar los títulos de pag. visibles en navegador -->
    <div class="contenedorlogin">
      <h2>Haz login 👇</h2>
      <br />
      <br />
      <!-- Input para campo email -->
      <input type="text" placeholder="Tu usuario" v-model="mail" />
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
</template>


  

<script>
// IMPORTAMOS PARA
// componentes internos
import menucustom from "@/components/MenuCustom.vue"
// titulos de página visibles en pestaña del navegador
import vueHeadful from "vue-headful";
// mensajes custom para el usuario
import Swal from "sweetalert2";
// Manejo de rutas y end-points.
import axios from 'axios';

export default {
    name: "Login",
    
    components: {vueHeadful, menucustom},

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
.contenedorlogin {
  margin-top: 150px;
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
}

a {
  text-decoration: none;
  font-size: 1.1em;
}
</style>