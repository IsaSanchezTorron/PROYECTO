<template>
  <div id="contenedorredessociales">
    <img
      src="../assets/images/mail.png"
      alt="Correo electrónico"
      title="isasancheztorron@gmail.com"
    />

    <a title="Twitter" href="https://twitter.com/isa56k1">
      <img src="../assets/images/twitter.png" alt="Twitter" />
    </a>

    <div>
      <p>Isabel Sánchez Torrón 2020©</p>

      <a>
        <router-link :to="{ name: 'About' }">¿Quiénes somos?</router-link>
      </a>
    </div>

    <a
      title="Linkedin"
      href="https://www.linkedin.com/in/isabel-s%C3%A1nchez-torr%C3%B3n-b988161a2/"
    >
      <img src="../assets/images/linkedin.png" alt="LinkedIn" />
    </a>

    <a title="Github" href="https://github.com/IsaSanchezTorron">
      <img src="../assets/images/github.png" alt="Github" />
    </a>
  </div>
</template>

<script>
export default {
  name: "barraredessociales"
};
</script>

<style scoped>
#contenedorredessociales {
  /*  margin: 30px; */
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  background-color: var(--white);
  /* box-shadow: 0 0 10px var(--black); */
  padding-top: 1.5em;
  width: 100%;
  /*  margin: 0 auto; */
  /*  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
 */
  bottom: 0;
}

img {
  width: 50px;
  height: 50px;
}

p {
  font-size: 1.1em;
  justify-self: center;
  color: var(--blue);
}

a {
  text-decoration: none;
  color: var(--verdeoscuro);
}
</style>
