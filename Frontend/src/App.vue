<template>
  <div id="app">
    <div id="nav">
      <div id="linkregistrousuario">
        <router-link :to="{ name: 'Register' }">
          <a>📍Registro de nuevo usuario</a>
        </router-link>
      </div>
      <transition name="fade">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Ubuntu&display=swap");
#app {
  font-family: "Ubuntu", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #f6f4f1;
}

#nav {
  padding: 30px;
}

div #linkregistrousuario {
  text-align: right;
}
div #linkregistrousuario a {
  text-decoration: none;
  font-size: 1em;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.25s;
}

.fade-enter-active {
  transition-delay: 0.25s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
