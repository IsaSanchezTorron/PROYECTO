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
      data: []
    };
  }
};
</script>

<style scoped>
#contenedorparabienvenida {
  /* margin: 30px; */
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  /* margin: 0 auto; */
  background-color: var(--white);
  box-shadow: 0 0 30px rgb(44, 41, 41);
  /*   border-radius: 100px; */
  background: url("https://images.unsplash.com/photo-1525358180237-7399f908a1d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1357&q=80");

  width: 100%;
  /*   margin-top: 30px; */
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  box-shadow: 5px 5px 25px var(--black) inset;

  padding-top: 1em;
  padding-bottom: 1em;

  /*  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px; */
}

/* #contenedorparabienvenida:before {
  content: "";
  position: relative;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #2e0d36;
}
 */
img {
  width: 280px;
  border-radius: 300px;
}
</style>
