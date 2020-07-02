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
        <router-link :to="{ name: 'About' }">Sobre mí - Contacto</router-link>
      </a>

      <a>
        <router-link :to="{ name: 'Login' }">Iniciar sesión</router-link>
      </a>

      <a>
        <router-link :to="{ name: 'Profile' }">👤 Perfil</router-link>
      </a>
      <a>
        <router-link :to="{ name: 'Admin' }">⚙️ Administrador</router-link>
      </a>
      <router-link :to="{ name: 'Register' }">
        <a>Registro de nuevo usuario</a>
      </router-link>
    </div>

    <!--Botón que llama a la función de Logout -->
  </div>
</template>

<script>


export default {
  name: "menucustom",

  return: {
   
    
  },

  methods: {


    //Función de LogOut
  
  

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
  width: 96%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  /*   margin: 0 auto; */
  background-color: var(--black);
  font-size: 1em;
  padding: 3em;
  border-radius: 30px;
  box-shadow: 0 0 30px rgb(44, 41, 41);
}

#contenedorMenu a {
  color: var(--blue);
  font-size: 1.2em;
  text-decoration: none;
}
</style>
