<template>
  <div>
    <menucustom></menucustom>
    <br />
    <br />
    <br />
    <div id="principallanding">
      <img id="fotoinformativa" src="../assets/images/intertextual.png" />

      <form>
        <h2>
          🔎 Puedes utilizar nuestro buscador 👇
        </h2>
        <p>encuentra concursos según tus preferencias</p>
        <p>
          <b>Nombre </b>

          <input
            type="search"
            name="nombre"
            size="40"
            placeholder="  No es necesario que busques el título completo"
          />
        </p>
        <p>
          <b>Entre esta fecha </b>

          <input type="date" name="fechainicio" min="2019" />
        </p>
        <p>
          <b>y esta otra fecha </b>
          <input type="date" name="fechafin" min="2019" />
        </p>
        <p>
          <b>Modalidad </b>
          <input type="radio" name="modalidad" value="o" /> Online
          <input type="radio" name="modalidad" value="p" /> Presencial
        </p>
        <p>
          <b>Ciudad </b>
          <input type="search" name="ciudad" size="40" />
        </p>
        <p>
          <b>Género </b>
          <input type="search" name="ciudad" size="40" />
        </p>
        <p>
          <input type="reset" value="Borrar" />
        </p>
        <button @click="buscar()">
          Llévame a ver los geniales concursos que me esperan
        </button>
      </form>
    </div>
    <transition>
      <barradebienvenida></barradebienvenida>
    </transition>
    <barraredessociales></barraredessociales>
  </div>
</template>

<script>
import menucustom from "@/components/MenuCustom.vue";
import barraredessociales from "@/components/BarraRedesSociales.vue";
import barradebienvenida from "@/components/BarraBienvenida.vue";

export default {
  name: "landing",
  components: {
    menucustom,
    barraredessociales,
    barradebienvenida,
  },
};
</script>

<style scoped>
#fotoinformativa {
  width: 500px;
  height: 500px;
  transition: transform 0.9s ease-in-out;
  border-radius: 30px;
}
img:hover {
  transform: scale(1.5);
}

#principallanding {
  background-color: #1ca1f2;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  box-shadow: 0 0 10px rgb(0, 0, 0);
  height: 500px;
  width: 100%;
}
h2 {
  color: #030303;
}

input {
  height: 30px;
  border-radius: 5px;
}
form p {
  font-size: 0.8em;
}
button {
  padding: 0.7em;
}

#contenedoramarillo {
  background-color: rgb(12, 12, 12);
  color: white;
  margin: 50px;
}
</style>
