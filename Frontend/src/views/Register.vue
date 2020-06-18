<template>
  <div>
    <!-- Inserción del componente menú en la cabecera de la vista -->
    <menucustom></menucustom>

    <div class="contenedorlogin">
      <!-- Uso del vue headful para nombrar los títulos de pag. visibles en navegador -->
      <vue-headful title="Registro" description="Registro de nuevo usuario" />
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
</template>


  

<script> 
//IMPORTACIONES PARA
// componentes locales
import menucustom from "@/components/MenuCustom.vue"
// Títulos de página visibles en navegador
import vueHeadful from "vue-headful";
// Mensajes custom
import Swal from "sweetalert2";
// Manejo de rutas, endpoints...
import axios from "axios";

export default {
    name: "register",
    components: {vueHeadful, menucustom},

    data(){
        return {
            // Inicializamos strings vacíos para los campos que vamos a procesar.
            nombre:"",
            apellidos:"",
            mail: "",
            contrasenha: "",
            // Con el uso de este booleano hacemos la verificación de si hay campos vacíos
            correctData: false,
            // Con el uso de este booleano podemos manejar el v-show que hace visible un mensaje de alerta en el HTML
            required: false,
        }
    },

    methods:{

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
    registerUser(nombre, apellidos, mail, contrasenha){
        //Comprobamos que todos los datos están cumplimentados
            this.validatingData();
            if(this.correctData === true){
                let self = this;
                //Si es correcto enviamos la petición post con los datos del formulario
                axios.post ("http://localhost:3003/usuarios",{
                    nombre: self.nombre,
                    apellidos: self.apellidos,
                    mail: self.mail,
                    contrasenha: self.contrasenha,
                })
                //Limpiamos los campos
                .then (function(response){
                     // Enviamos mensaje de confirmación de registro
                     Swal.fire({
                    title: "✅",
                    text: "Te has registrado con éxito",
                    confirmButtonText: "O.K",
                    timer: 3000,
                });
                    self.emptyFields();
                    console.log(response);
                })
                //Recogemos posibles errores
                .catch(function(error){
                    console.log(error);

                    Swal.fire({
                    title: "⚠️",
                    text: "Ha habido un error, es posible que este usuario ya esté registrado",
                    confirmButtonText: "O.K",
                    timer: 3000,
                });
                });
                

            //Si faltan campos por rellenar se viene por aquí y avisa.
            } else {

                Swal.fire({
                    title: "⚠️",
                    text: "Debes rellenar todos los campos",
                    timer: 3000,
                });

            }
        },
        //Función para dejar los campos del formulario limpios
        emptyFields(){
            this.nombre="",
            this.apellidos="",
            this.mail="",
            this.contrasenha=""
        },
    },
};
</script>