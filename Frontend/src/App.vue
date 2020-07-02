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
  /* color: #2c3e50; */
  background-color: var(--black);
  padding-bottom: 0.5em;
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
  color: black;
}

/* #nav a.router-link-exact-active {
  color: #204ecc;
  font-size: 1.3em;
} */

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

/* button {
  border-radius: 5px;
  font-size: 1em;
  font-weight: bold;
  padding: 10px;
  background-color: rgb(32, 33, 34);
  font-family: "Ubuntu", sans-serif;
  color: #1a99e7;
  box-shadow: 0 0 2px rgb(12, 12, 12);
} */

h1 {
  font-size: 2.5em;
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

.modal {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  border-radius: 150px;
  width: 100%;
}

/* .modalbox {
  background: var(--black);
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 50px;
  border: solid 2px var(--black);
  box-shadow: 0px 0px 3px grey;
  line-height: 1.5; */
/* overflow-y: auto;
  overflow-x: auto; */
/*   color: var(--white);
}  */

.modal {
  position: fixed;
  /* top: -30px; */
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(113, 122, 129, 0.048);
}

.modalbox {
  background: #fefefe;
  margin: 15% auto;
  padding: 90px;

  width: 50%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 20px;
  /* border: solid 1px var(--black); */
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.432);
  overflow-y: auto;
  overflow-x: auto;
}
</style>
