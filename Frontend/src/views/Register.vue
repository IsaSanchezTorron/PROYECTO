<template>
  <div>
    <!-- Título para la pestaña del navegador -->
    <vue-headful title="Registro" description="Registro de nuevo usuario" />
    <!-- Inserción del componente menú en la cabecera de la vista -->
    <menucustom></menucustom>

    <div class="contenedoregisto">
      <div id="formularioyglobo">
        <div id="fotos">
          <img id="primerafoto" src="../assets/images/14.png" alt="Rellena el formulario" />
        </div>

        <div id="formulario">
          <h2>Completa todos los campos para registrarte 👇</h2>
          <br />
          <!-- Input para campo nombre -->
          <input type="text" placeholder="Tu nombre" v-model="nombre" />
          <br />
          <br />
          <!-- Input para campo apellidos -->
          <input type="text" placeholder="Tus apellidos" v-model="apellidos" />
          <br />
          <br />
          <!-- Input para campo apellidos -->
          <input type="email" placeholder="Tu correo electrónico" v-model="mail" />
          <br />
          <br />

          <!--Input para campo password -->
          <input type="password" placeholder="Tu contraseña" v-model="contrasenha" />
          <br />
          <br />
          <!-- Botón con llamada a la función Login -->
          <button @click="registerUser()">REGISTRO</button>
          <br />
          <p v-show="required">Rellena todos los datos, por favor</p>
          <br />
        </div>
      </div>
      <div id="fotos">
        <img src="../assets/images/11.png" alt="Valida tu cuenta" />
        <img src="../assets/images/12.png" alt="Comienza a navegar" />
      </div>
    </div>
    <div id="fotosbienvenida">
      <img src="../assets/images/palabra1.png" alt="Valida tu cuenta" />
      <img src="../assets/images/palabra2.png" alt="Comienza a navegar" />
      <img src="../assets/images/palabra3.png" alt="Comienza a navegar" />
    </div>

    <barraredessociales></barraredessociales>
  </div>
</template>

<script>
//IMPORTACIONES PARA
// componentes locales
import menucustom from "@/components/MenuCustom.vue";
import barraredessociales from "@/components/BarraRedesSociales";
// Títulos de página visibles en navegador
import vueHeadful from "vue-headful";
// Mensajes custom
import Swal from "sweetalert2";
// Manejo de rutas, endpoints...
import axios from "axios";

export default {
  name: "register",
  components: { vueHeadful, menucustom, barraredessociales, vueHeadful },

  data() {
    return {
      // Inicializamos strings vacíos para los campos que vamos a procesar.
      nombre: "",
      apellidos: "",
      mail: "",
      contrasenha: "",
      // Con el uso de este booleano hacemos la verificación de si hay campos vacíos
      correctData: false,
      // Con el uso de este booleano podemos manejar el v-show que hace visible un mensaje de alerta en el HTML
      required: false
    };
  },

  methods: {
    //Validamos que no haya datos sin rellenar
    validatingData() {
      if (
        this.nombre === "" ||
        this.apellidos === "" ||
        this.mail === "" ||
        this.contrasenha === ""
      ) {
        //Damos valores a los booleanos en función de los resultados para regular el uso del v-show y el control del paso de datos.
        this.correctData = false;
        this.required = true;
      } else {
        this.correctData = true;
        this.required = false;
      }
    },

    //FUNCIÓN PARA AÑADIR USUARIO CON LOS PARÁMETROS REQUERIDOS
    registerUser(nombre, apellidos, mail, contrasenha) {
      //Comprobamos que todos los datos están cumplimentados
      this.validatingData();
      if (this.correctData === true) {
        let self = this;
        //Si es correcto enviamos la petición post con los datos del formulario
        axios
          .post("http://localhost:3003/usuarios", {
            nombre: self.nombre,
            apellidos: self.apellidos,
            mail: self.mail,
            contrasenha: self.contrasenha
          })

          .then(function(response) {
            // Enviamos mensaje de confirmación de registro
            Swal.fire({
              title: "✔️",
              text:
                "Te has registrado con éxito, debes abrir tu correo electrónico y validar tu cuenta pinchando en el enlace que te enviamos. Una vez que esté activada puedes loguearte con tus datos.",
              confirmButtonText: "O.K",
              confirmButtonColor: "#FE9F1D"
            });
            self.$router.push("/profile");
            //Limpiamos los campos
            self.emptyFields();

            console.log(response);
          })
          //Recogemos posibles errores
          .catch(function(error) {
            console.log(error);

            Swal.fire({
              title: "⚠️",
              text:
                "Ha habido un error, es posible que este usuario ya esté registrado",
              confirmButtonText: "O.K",
              confirmButtonColor: "#FE9F1D",

              timer: 3000
            });
          });

        //Si faltan campos por rellenar se viene por aquí y avisa.
      } else {
        Swal.fire({
          title: "⚠️",
          text: "Debes rellenar todos los campos",
          timer: 3000,
          confirmButtonColor: "#FE9F1D"
        });
      }
    },
    //Función para dejar los campos del formulario limpios
    emptyFields() {
      (this.nombre = ""),
        (this.apellidos = ""),
        (this.mail = ""),
        (this.contrasenha = "");
    }
  }
};
</script>

<style scoped>
.contenedoregisto {
  display: flex;
  flex-direction: row;
  margin-top: 50px;
  align-items: left;
  justify-content: space-between;
  padding: 1em;
}
input {
  width: 400px;
  height: 55px;
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

p {
  font-size: 1.3em;
}

a {
  text-decoration: none;
  font-size: 1.1em;
}

h2 {
  color: var(--black);
  text-align: left;
  margin: 10px;
  font-size: 1em;
}

button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: left;
  align-items: center;
  justify-self: center;
  margin: 15px;

  width: 420px;
  height: 40px;
  font-size: 1em;
  padding: 0.4em;
  box-shadow: 0 0 10px rgb(12, 12, 12);
  /* margin: 10px; */
  font-family: "Ubuntu", sans-serif;
  color: var(--black);
  transition: background-color 0.3s;
  background-color: var(--naranjaclaro);

  border-top-right-radius: 100px;
  border-bottom-right-radius: 100px;
}

button:hover {
  background-color: var(--verdeoscuro);
  color: var(--white);
}

#formulario {
  justify-items: left;
  align-items: left;
  justify-content: left;
  justify-self: left;
  align-self: left;
  text-align: left;
}

#fotos {
  display: flex;
  flex-direction: row;

  align-self: right;
  justify-self: right;
  align-items: center;

  margin: 0 auto;
  margin-right: 200px;
}

img {
  width: 300px;
  height: 300px;
  border-radius: 1000px;
  margin-left: 60px;
}

#primerafoto {
  border-radius: 0px;
  margin: 0;
  margin-right: -180px;
}

#formularioyglobo {
  display: flex;
  flex-direction: row;
}

#fotosbienvenida img {
  width: 300px;
}

#fotosbienvenida {
  margin-top: -40px;
}
</style>