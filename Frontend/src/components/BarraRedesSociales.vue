<template>
  <div id="contenedorredessociales">
    <img src="../assets/images/facebook.png" alt="Facebook" />
    <img src="../assets/images/mail.png" alt="Correo electrónico" />
    <img src="../assets/images/twitter.png" alt="Twitter" />
    <img src="../assets/images/linkedin.png" alt="LinkedIn" />
    <img src="../assets/images/github.png" alt="GitHub" />
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
  background-color: #fedd0a;
  box-shadow: 0 0 10px rgb(12, 12, 12);
  padding: 1em;
}
#contenedorredessociales img {
  width: 100px;
}
</style>
