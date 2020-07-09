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
  background-color: var(--white);
  padding-bottom: 0.5em;
}

html {
  /* --black: #324442; */
  /*  --black: #3c313f; */ /*Este es el negro para la combinación rosa-verde*/

  /*  --rosa: #f2c0cb;  */ /*Este es el rosa para la combinación rosa-verde.*/
  --rosa: #84a9ac;

  --berenjena: #9d76a7;

  /*  --verde: #104945; */ /*Este es el verde para la combinación rosa-verde*/
  --verde: #3b6978;

  --brown: #f9b9b7;

  /* --yellow: #ff6361; */
  /* --white: #eeeeee; */ /*Este es el blanco para la combinación rosa-verde */

  /* --white2: #be608c;
  --white3: #f3efea;
  --red: #ff0000;
  --verdetransparente: #84a9ac;
  --verdeclaro: #a6b3b4; */

  /* --black: #2a9d8f; */
  /*  --morado: #654062;
  --salmon: #f25f5c;
  --amarillo: #ffe066;
  --roto: #ffffff;
  --salmon2: #fd6727; */
  --black: #171616;
  --white: #ffffff;
  --verdeclaro: #cbf3f0;
  --verdeoscuro: #2ec4b6;
  --naranjaclaro: #ffbf69;
  --naranjaoscuro: #ff9f1c;
  --naranjamasclaro: #2ec4b6;
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
  color: var(--black);
  font-size: 1.8em;

  -webkit-box-reflect: below -30px -webkit-gradient(
      linear,
      left top,
      left bottom,
      from(transparent),
      to(rgba(255, 255, 255, 0.26))
    );
}

/* h2 {
  font-size: 1.6em;
  color: var(--black);
} */

hr {
  height: 10px;
  border: 0;

  box-shadow: 0 10px 5px -10px var(--black) inset;
}

ul li {
  list-style: none;
}

/* .modal {
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

/* .modal {
  position: fixed;
  top: -30px; 
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(113, 122, 129, 0.048);
}  */
.modalbox {
  background: #fefefe;
  margin: 15% auto;
  padding: 90px;

  width: 50%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  /* border: solid 1px var(--black); */
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.432);
  overflow-y: auto;
  overflow-x: auto;
}
</style>
