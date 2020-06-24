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
        <router-link :to="{ name: 'Login' }">Login</router-link>
      </a>
      <a>
        <router-link :to="{ name: 'Register' }">Registro</router-link>
      </a>

      <a>
        <router-link :to="{ name: 'Allconcourses' }"
          >Todos los concursos</router-link
        >
      </a>

      <a>
        <router-link :to="{ name: 'About' }">Contacto</router-link>
      </a>
      <a>
        <router-link :to="{ name: 'Profile' }">Mi Perfil</router-link>
      </a>
      <!-- No funciona PENDIENTE DE REVISAR -->
      <div class="verboton" v-show="!seeButton">
        <!--Botón que llama a la función de Logout -->

        <button @click="logoutUser()">Logout</button>
      </div>
    </div>
  </div>
</template>

<script>
import { clearLogin } from "../api/utils";

export default {
  name: "menucustom",

  return: {
    seeButton: false,
  },

  methods: {
    //Función de LogOut
    logoutUser() {
      //Nos lleva al login
      this.$router.push("/");
      // No deja datos en el logueo, vacío.
      self.seeButton = true;
      return clearLogin();
    },
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
