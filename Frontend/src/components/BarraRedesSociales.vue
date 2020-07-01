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
  name: "barraredessociales",
};
</script>

<style scoped>
#contenedorredessociales {
  margin: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  background-color: var(--black);
  box-shadow: 0 0 10px var(--black);
  padding: 1em;
  border-radius: 100px;
}
#contenedorredessociales img {
  width: 100px;
}
</style>
