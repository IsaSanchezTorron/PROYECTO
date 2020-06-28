<template>
  <div>
    <vue-headful title="Sobre nosotras" description="Sobre nosotras" />
    <menucustom></menucustom>
    <article id="mipresentacion">
      <img id="fotoisa" src="../assets/images/isa.jpg" />

      <div id="informacionpersonal">
        <h1 id="minombre">Isabel Sánchez Torrón</h1>
        <hr />
        <p>Me adentré en el mundo de internet a finales de los 90, por aquel entonces estudiaba música, me conectaba con un módem de 56 k, chateaba en el iRC con un montón de personas reales que aún son mis amigos, tenía mi ordenador como servidor FTP, formaba parte de varias listas de correo, no existían ni Google ni Youtube, intercambiábamos tarrinas gigantes de CD's e iba a las partys informáticas en Coruña (Arroutada).</p>
        <p>
          Soy
          <b>amante de las teconologías</b> y estoy en el firme camino de
          <b>seguir aprendiendo y dedicarme a ello profesionalmente.</b>
        </p>
        <p>
          El desarrollo del proyecto en pleno confinamiento propició que formásemos un pequeño grupo para trabajar paralelamente en remoto por lo que no puedo estar más que
          <b>agradecida con todos ellos por hacer que el bootcamp fuese una experiencia personalmente extraordinaria y porque han colaborado en que INTERTEXTUAL salga a la luz. ❤️</b>
        </p>
      </div>
    </article>
    <h1
      id="compañeros"
    >Gracias a Félix Villar, Raúl Gómez, Brais Montáns, David Fraga, Víctor Tojeiro y Alberto Álvarez.</h1>
    <hr />
    <article id="miscompañeros">
      <img src="../assets/images/felix.jpeg" alt="fotocolaborador1" />
      <img src="../assets/images/raul.jpeg" alt="fotocolaborador2" />
      <img src="../assets/images/brais.jpeg" alt="fotocolaborador3" />
      <img src="../assets/images/david.jpeg" alt="fotocolaborador4" />
      <img src="../assets/images/victor.jpeg" alt="fotocolaborador5" />
      <img src="../assets/images/alberto.jpeg" alt="fotocolaborador5" />
    </article>
    <barraredessociales></barraredessociales>
  </div>
</template>

<script>
//IMPORTAMOS PARA
// componentes internos
import barraredessociales from "@/components/BarraRedesSociales.vue";
import menucustom from "@/components/MenuCustom.vue";
import vueHeadful from "vue-headful";

export default {
    name: "About",
     components: {menucustom, barraredessociales}
}
</script>

<style scoped>
#compañeros {
  font-size: 3em;
  color: #1ca1f2;
  -webkit-text-stroke: 1.8px black;
}
#minombre {
  color: #100f0d;
}
p {
  font-size: 1.6em;
  color: #171616;
}
img {
  width: 200px;
  border-radius: 150px;
  box-shadow: 0 0 10px rgb(0, 0, 0);
}

#mipresentacion {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;

  align-items: center;
  align-content: center;
  width: 75%;
  padding: 4em;
  margin: auto;
  margin-top: 40px;
}

#miscompañeros {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: 0 auto;

  align-items: center;
  width: 75%;
  padding: 4em;
}
#informacionpersonal {
  width: 60%;
}

#fotoisa {
  width: 350px;
  border-radius: 175px;
}
hr {
  height: 10px;
  border: 0;
  box-shadow: 0 10px 10px -10px #8c8b8b inset;
}
</style>