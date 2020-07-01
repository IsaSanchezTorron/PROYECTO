<template>
  <div id="app">
    <div id="nav">
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

html {
  --black: #171616;
  --blue: #1ca0f2;
  --yellow: #fedd09;
  --white: #f6f4f1;
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
  color: #204ecc;
  font-size: 1.3em;
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

h1 {
  font-size: 3em;
  color: var(--black);
  -webkit-text-stroke: 0.5px var(--blue);
  -webkit-box-reflect: below -30px -webkit-gradient(
      linear,
      left top,
      left bottom,
      from(transparent),
      to(rgba(255, 255, 255, 0.26))
    );
}
h2 {
  font-size: 1.6em;
  color: var(--blue);
}

hr {
  height: 10px;
  border: 0;
  box-shadow: 0 10px 10px -10px var(--yellow) inset;
}

ul li {
  list-style: none;
}
</style>
