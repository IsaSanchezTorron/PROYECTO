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
  margin: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  background-color: var(--white);
  box-shadow: 0 0 10px var(--black);
  padding: 1em;
}
</style>
