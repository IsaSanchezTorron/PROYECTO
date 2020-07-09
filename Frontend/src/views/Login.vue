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
          <h1>INICIA SESIÓN 👇</h1>
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
          <button @click="login(mail, contrasenha)">INICIO DE SESIÓN</button>

          <div id="nav">
            <!-- Enlace a la vista de Registro desde el Login -->
            <p>Si no tienes cuenta, regístrate aquí</p>
            <!-- Todavía no existe ruta -->
            <a>
              <router-link :to="{ name: 'Register' }">👉 Registro</router-link>
            </a>
          </div>
        </div>
      </div>
      <div id="fotosbienvenida">
        <img src="../assets/images/login1.png" alt="Instrucciones para el login 1" />
        <img src="../assets/images/login2.png" alt="Instrucciones para el login 2" />
        <img src="../assets/images/ligin3.png" alt="Instrucciones para el login 3" />
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
import menucustom from "@/components/MenuCustom.vue";
import barraredesociales from "@/components/BarraRedesSociales.vue";
// titulos de página visibles en pestaña del navegador
import vueHeadful from "vue-headful";
// mensajes custom para el usuario
import Swal from "sweetalert2";
// Manejo de rutas y end-points.
import axios from "axios";

export default {
  name: "Login",

  components: { vueHeadful, menucustom, barraredesociales, vueHeadful },

  data() {
    return {
      mail: "",
      contrasenha: ""
    };
  },

  methods: {
    login(mail, contrasenha) {
      let self = this;
      axios
        .post("http://localhost:3003/usuarios/login", {
          mail: self.mail,
          contrasenha: self.contrasenha
        })
        .then(function(response) {
          localStorage.setItem("token", response.data.data.token);
          localStorage.setItem("mail", response.data.mail);
          localStorage.setItem("id", response.data.id);
          localStorage.setItem("name", response.data.name);
          localStorage.setItem("rol", response.data.rol);

          const Toast = Swal.mixin({
            toast: true,
            position: "top-right",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            onOpen: toast => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            }
          });

          Toast.fire({
            icon: "success",
            title: "Te has logueado correctamente"
          });
          self.$router.push("/profile");
        })
        .catch(function(error) {
          Swal.fire({
            title: "⚠️",
            text: "Debes introducir los datos para tu inicio de sesión.",
            confirmButtonText: "O.K",
            confirmButtonColor: "#FE9F1D",

            width: "800px",
            customClass: "swal-wide"
          });

          console.log("ha habido un error");
        });
    }
  }
};
</script>

<style scoped>
.contenedorlogin {
  margin-top: 30px;
  display: flex;
  flex-direction: column;

  align-items: center;
}
input {
  width: 400px;
  height: 25px;
  font-size: em;

  margin-left: 20px;
  margin-top: 6px;
  border-top: 0;
  border-right: 0;
  border-left: 0;
  background-color: var(--white);
  border-bottom: 2px solid var(--black);
  font-size: 1em;
  align-self: left;
  justify-content: left;
  justify-self: left;
  justify-items: left;
}

button {
  width: 200px;
}

p {
  font-size: 1em;
  color: var(--black);
}

a {
  text-decoration: none;
  font-size: 1em;
  color: var(--blue);
}

.todo {
  background-color: var(--white);
  align-self: center;
  padding: 3.5em;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  justify-content: center;
  justify-self: center;
  align-items: center;
  justify-items: center;
  margin-top: -120px;
  align-content: center;
}

h1 {
  color: var(--verdeoscuro);
}

button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  align-items: center;
  justify-self: center;
  margin: 15px;

  width: 350px;
  height: 30px;
  font-size: 1em;
  padding: 0.4em;
  box-shadow: 0 0 10px rgb(12, 12, 12);
  /* margin: 10px; */
  font-family: "Ubuntu", sans-serif;
  color: var(--black);
  transition: background-color 0.3s;
  background-color: var(--naranjaclaro);
  border-radius: 100px;
}

button:hover {
  background-color: var(--verdeoscuro);
}
img {
  width: 280px;
}
</style>