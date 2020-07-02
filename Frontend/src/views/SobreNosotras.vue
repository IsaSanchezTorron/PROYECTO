<template>
  <div>
    <vue-headful title="Sobre nosotras" description="Sobre nosotras" />

    <menucustom></menucustom>

    <div id="todo">
      <article id="mipresentacion">
        <div id="mifoto">
          <img id="fotoisa" src="../assets/images/isa.jpg" />

          <div id="habilidades">
            <h2>Cualidades:</h2>
            <p>🗣 Buena comunicación.</p>
            <p>💪 Compromiso, dedicación y esfuerzo</p>
            <p>💙 Inteligencia emocional</p>
            <p>🤓 Actitud positiva, motivación y entusiasmo.</p>
            <hr />
          </div>
        </div>

        <div id="informacionpersonal">
          <h1>Isabel Sánchez Torrón</h1>
          <hr />
          <p>
            Me encanta
            <b>cocinar</b>, bañarme en el agua del
            <b>mar</b> hasta el otoño, ver los streamings de la
            <b>NASA</b>, los
            <b>thriller</b>, cuidar de mis queridas
            <b>plantas, internetear, pintar y mi familia, la grande y la pequeña.</b>
            Siempre se me han ido los ojos a esas plantitas y flores que nacen en los sitios más insospechados, por eso mi instagram es @rebelionnatural.
          </p>
          <p>
            Algunas de las películas que marcaron mi infancia son
            <b>"Amarcord", los cortos de Buster Keaton o "Cuando el viento sopla".</b>
          </p>
          <p>Me adentré en el mundo de internet a finales de los 90, por aquel entonces estudiaba música, me conectaba con un módem de 56 k, chateaba en el iRC con un montón de personas reales que aún son mis amigos, tenía mi ordenador como servidor FTP, formaba parte de varias listas de correo, no existían ni Google ni Youtube, intercambiábamos tarrinas gigantes de CD's e iba a las partys informáticas en Coruña (Arroutada).</p>
          <p>
            Estudié guitarra y batería, le debo a mis padres y hermanos
            <b>el amor por la música.</b>
            Soy entusiasta, voluntariosa, cumplidora y creo que es el trato con las personas lo que da sentido a la vida
          </p>
          <p>
            Soy
            <b>amante de las tecnologías</b> y estoy en el firme camino de
            <b>seguir aprendiendo y dedicarme a ello profesionalmente con todas las ganas del mundo.</b>
          </p>
        </div>

        <div id="informaciontecnologias">
          <h2>Proyecto realizado con:</h2>
          <img id="fotolenguaje" src="../assets/images/html.jpg" />
          <img id="fotolenguaje" src="../assets/images/css.png" />
          <img id="fotolenguaje" src="../assets/images/js.png" />
          <img id="fotolenguaje" src="../assets/images/vue.png" />
        </div>
      </article>
    </div>

    <div id="compañeros">
      <h1>Gracias a Félix Villar, Raúl Gómez, Brais Montáns, David Fraga, Víctor Tojeiro y Alberto Álvarez.</h1>
      <br />

      <hr />
    </div>

    <article id="miscompañeros">
      <img src="../assets/images/felix.jpeg" alt="fotocolaborador1" />
      <img src="../assets/images/raul.jpeg" alt="fotocolaborador2" />
      <img src="../assets/images/brais.jpeg" alt="fotocolaborador3" />
      <img src="../assets/images/david.jpeg" alt="fotocolaborador4" />
      <img src="../assets/images/victor.jpeg" alt="fotocolaborador5" />
      <img src="../assets/images/alberto.jpeg" alt="fotocolaborador5" />
    </article>
    <h2 id="agradecimientos">
      El desarrollo del proyecto en pleno confinamiento propició que formásemos un pequeño grupo para trabajar paralelamente en remoto por lo que no puedo estar más que
      <b>agradecida con todos ellos por hacer que el bootcamp fuese una experiencia personalmente extraordinaria y porque han colaborado a que INTERTEXTUAL salga a la luz. ❤️</b>
    </h2>

    <!--  <div id="fotospersonales">
      <img id="fotopersonal" src="../assets/images/isa2.jpg" />
      <img id="fotopersonal" src="../assets/images/rebelionnatural2.jpg" />
      <img id="fotopersonal" src="../assets/images/isa3.jpg" />
      <img id="fotopersonal" src="../assets/images/isa4.jpg" />
      <img id="fotopersonal" src="../assets/images/rebelionnatural4.jpg" />
      <img id="fotopersonal" src="../assets/images/isa5.jpg" />
      <img id="fotopersonal" src="../assets/images/rebelionnatural5.jpg" />
      <img id="fotopersonal" src="../assets/images/perritas2.jpg" />
      <img id="fotopersonal" src="../assets/images/rebelionnatural3.jpg" />
    </div>
    -->
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
p {
  font-size: 1.3em;
  color: var(--white);
  text-align: left;
}
img {
  width: 150px;
  border-radius: 150px;
  box-shadow: 0 0 10px var(--black);
  border: solid 1px var(--black);
  -webkit-box-reflect: below -120px -webkit-gradient(
      linear,
      left top,
      left bottom,
      from(transparent),
      to(rgba(255, 255, 255, 0.26))
    );
  transition: transform 0.5s ease-in-out;
  margin: 30px;
}

img:hover {
  transform: scale(1.5);
}

#mipresentacion {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  align-content: center;
}

#informacionpersonal {
  width: 60%;
  line-height: 2;
  padding: 0.5em;
  text-align: center;
}

#habilidades {
  width: 100%;
}

#fotoisa {
  width: 300px;
  border-radius: 150px;
}

#informaciontecnologias {
  display: flex;
  flex-direction: column;
  align-items: center;

  /*  justify-content: space-evenly; */
}

#fotolenguaje {
  width: 100px;
  padding: 0.5em;
  margin-bottom: 0.4em;
}

#todo {
  background-repeat: inherit;
  border-radius: 30px;
  background: var(--black);
  box-shadow: 0 0 50px rgb(44, 41, 41);
  padding: 0.3em;
  height: 700px;
  margin-top: 20px;
}

#miscompañeros {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: 0 auto;
  align-items: center;
  width: 100%;
  /*   background-color: var(--blue); */
  border-radius: 20px;
}

#agradecimientos {
  font-size: 1.2em;
  color: var(--white);
}

#compañeros {
  color: var(--black);

  opacity: 0.9;
  border-radius: 100px;
}
h1 {
  color: var(--blue);
}
h2 {
  line-height: 2;
  font-weight: lighter;
}
</style>