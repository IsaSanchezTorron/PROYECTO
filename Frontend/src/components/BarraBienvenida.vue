<template>
  <div id="contenedorparabienvenida">
    <img src="../assets/images/intertextual2.png" alt="Facebook" />
    <img src="../assets/images/intertextual3.png" alt="Correo electrónico" />
    <img src="../assets/images/intertextual4.png" alt="Twitter" />
  </div>
</template>

<script>
export default {
  name: "barradebienvenida",
  data() {
    return {
      data: [],
    };
  },
};
</script>

<style scoped>
#contenedorparabienvenida {
  /*  margin: 30px; */
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 0 auto;
  background-color: var(--white);
  box-shadow: 0 0 30px rgb(44, 41, 41);
  padding: 2em;
  /*   border-radius: 100px; */
  background: url("https://images.unsplash.com/photo-1578658544861-37dbf6d82ea3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80");
  width: 97.7%;
  margin-top: -19.8px;
}

img {
  border-radius: 400px;
}
</style>
