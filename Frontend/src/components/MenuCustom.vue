<template>
  <div>
    <!--El mendivú custom que estará en la parte de arriba de casi todas las vistas -->
    <div id="contenedorMenu">
      <!-- Los enlaces se hacen de manera dinámica, puede cambiar la ruta pero se mantiene el componente
      al invocarlo por su nombre-->
      <div>
        <a>
          <router-link :to="{ name: 'Landing' }">Portada</router-link>
        </a>
      </div>

      <div v-show="!seeUserButton">
        <router-link :to="{ name: 'Register' }">
          <a>Registro de nuevo usuario</a>
        </router-link>
      </div>
      <div v-show="!seeUserButton">
        <a>
          <router-link :to="{ name: 'Login' }">Iniciar sesión</router-link>
        </a>
      </div>
      <div v-show="seeUserButtonProfile || seeAdmin">
        <a>
          <router-link :to="{ name: 'Profile' }">🤓 Perfil</router-link>
        </a>
      </div>
    </div>

    <!--Botón que llama a la función de Logout -->
  </div>
</template>

<script>
import {
  isLoggedIn,
  checkAdmin,
  showUserButton,
  showAdminButton
} from "../api/utils.js";

export default {
  name: "menucustom",

  return: {
    seeUserButton: false,
    seeUserButtonProfile: false,
    seeAdmin: false
  },

  methods: {
    showUserButtonIn() {
      this.seeUserButton = isLoggedIn();
    },
    showAdminButtonInMenu() {
      this.seeAdmin = showAdminButton();
    },
    showUserButtonProfile() {
      this.seeUserButtonProfile = showUserButton();
    },

    created() {
      this.showProfileButton();
    }
  },
  created() {
    this.showUserButtonIn();
    this.showAdminButtonInMenu();
    this.showUserButtonProfile();
  }
};
</script>

<style scoped>
#contenedorMenu {
  width: 96%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  /*   margin: 0 auto; */
  background-color: var(--white);
  font-size: 1em;
  padding: 3em;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  /*  box-shadow: var(--salmon) 0px 0px 6px 0px inset;
} */
}

#contenedorMenu a {
  color: var(--black);
  font-size: 1.2em;
  text-decoration: none;
}

a:hover {
  background-color: var(--verdeclaro);
  border-radius: 0px;
}
</style>
