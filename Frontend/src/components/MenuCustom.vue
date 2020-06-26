<template>
  <div>
    <!--El menú custom que estará en la parte de arriba de casi todas las vistas -->
    <div id="contenedorMenu">
      <!-- Los enlaces se hacen de manera dinámica, puede cambiar la ruta pero se mantiene el componente
      al invocarlo por su nombre-->

      <a>
        <router-link :to="{ name: 'Landing' }">Home</router-link>
      </a>

      <a>
        <router-link :to="{ name: 'Allconcourses' }">Todos los concursos</router-link>
      </a>

      <a>
        <router-link :to="{ name: 'About' }">Contacto</router-link>
      </a>

      <a>
        <router-link :to="{ name: 'Login' }">Login</router-link>
      </a>

      <a>
        <router-link :to="{ name: 'Profile' }">👤 Perfil</router-link>
      </a>
      <a>
        <router-link :to="{ name: 'Admin' }">⚙️ Administrador</router-link>
      </a>
      <!-- No funciona PENDIENTE DE REVISAR -->

      <!--Botón que llama a la función de Logout -->

      <button @click="logoutUser()">Logout</button>
    </div>
  </div>
</template>

<script>
import { clearLogin } from "../api/utils";

export default {
  name: "menucustom",

  return: {
   
    
  },

  methods: {


    //Función de LogOut
  logoutUser() {
      //Nos lleva al login
      this.$router.push("/");
      // No deja datos en el logueo, vacío
      return clearLogin();
    
    },
  

/* showProfileButton(seeProfileButton) {
const role = localStorage.getItem("rol");
  if (role === "escritor") {
    this.seeProfileButton = false;
    return this.seeProfileButton;
  }

 this.seeProfileButton=false;
  return this.seeProfileButton;
},


  created(){
    this.showProfileButton();
  }, */
},


};
</script>

<style scoped>
#contenedorMenu {
  width: 97%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 0 auto;
  color: black;
  font-size: 1em;
  padding: 1em;
}

#contenedorMenu a {
  color: rgb(20, 20, 20);
  font-size: 1.2em;
  text-decoration: none;
}
</style>
