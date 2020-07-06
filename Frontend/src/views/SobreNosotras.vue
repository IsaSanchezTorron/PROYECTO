<template>
  <div>
    <vue-headful title="Sobre nosotras" description="Sobre nosotras" />

    <menucustom></menucustom>

    <div id="todo">
      <article id="mipresentacion">
        <div id="mifoto">
          <img id="fotoisa" src="../assets/images/isa.jpg" />

          <div id="todocolor2">
            <div id="habilidades">
              <h2>Cualidades:</h2>
              <p>🗣 Buena comunicación.</p>
              <p>💪 Compromiso, dedicación y esfuerzo</p>
              <p>💙 Inteligencia emocional</p>
              <p>🤓 Actitud positiva, motivación y entusiasmo.</p>
            </div>
          </div>
        </div>

        <div id="informacionpersonal">
          <h1>Isabel Sánchez Torrón</h1>

          <div id="todocolor">
            <div id="parrafouno">
              <p>
                Me encanta
                <b>cocinar</b>, bañarme en el agua del
                <b>mar</b> hasta el otoño, ver los streamings de la
                <b>NASA</b>, los
                <b>thriller</b>, cuidar de mis queridas
                <b>plantas, internetear, pintar y mi familia, la grande y la pequeña.</b>
                Siempre se me han ido los ojos a esas plantitas y flores que nacen en los sitios más insospechados, por eso mi instagram es @rebelionnatural.
              </p>
            </div>
            <div id="parrafo2">
              <p>
                Algunas de las películas que marcaron mi infancia son
                <b>"Amarcord", los cortos de Buster Keaton o "Cuando el viento sopla".</b>
              </p>
              <p>Me adentré en el mundo de internet a finales de los 90, por aquel entonces estudiaba música, me conectaba con un módem de 56 k, chateaba en el iRC con un montón de personas reales que aún son mis amigos, tenía mi ordenador como servidor FTP, formaba parte de varias listas de correo, no existían ni Google ni Youtube, intercambiábamos tarrinas gigantes de CD's e iba a las partys informáticas en Coruña (Arroutada).</p>
            </div>
            <div id="parrafo3">
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
          </div>
        </div>

        <div id="todocolor3">
          <div id="informaciontecnologias">
            <h2>Proyecto realizado con:</h2>
            <img id="fotolenguaje" src="../assets/images/html.jpg" />
            <img id="fotolenguaje" src="../assets/images/css.png" />
            <img id="fotolenguaje" src="../assets/images/js.png" />
            <img id="fotolenguaje" src="../assets/images/vue.png" />
          </div>
        </div>
      </article>
    </div>

    <div id="compañeros">
      <h1
        id="compis"
      >Gracias a Félix Villar, Raúl Gómez, Brais Montáns, David Fraga, Víctor Tojeiro y Alberto Álvarez.</h1>
      <br />
    </div>

    <article id="miscompañeros">
      <img src="../assets/images/felix.jpeg" alt="fotocolaborador1" />
      <img src="../assets/images/raul.jpeg" alt="fotocolaborador2" />
      <img src="../assets/images/brais.jpeg" alt="fotocolaborador3" />
      <img src="../assets/images/david.jpeg" alt="fotocolaborador4" />
      <img src="../assets/images/victor.jpeg" alt="fotocolaborador5" />
      <img src="../assets/images/alberto.jpeg" alt="fotocolaborador5" />
    </article>
    <div id="agradecimientos">
      <p>
        El desarrollo del proyecto en pleno confinamiento propició que formásemos un pequeño grupo
        para trabajar paralelamente en remoto por lo que no puedo estar más que
      </p>
      <p>
        <b>
          agradecida con todos ellos por hacer que el bootcamp
          fuese una experiencia personalmente extraordinaria y porque han colaborado a que INTERTEXTUAL salga a la luz. ❤️
        </b>
      </p>
    </div>

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
  components: { menucustom, barraredessociales, vueHeadful }
};
</script>

<style scoped>
p {
  font-size: 1.3em;
  color: var(--black);
  text-align: left;
}
img {
  width: 150px;
  border-radius: 150px;
  box-shadow: 0 3px 10px var(--black);
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
  padding: 0.5em;
}

#informacionpersonal {
  width: 60%;
  line-height: 2;
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
  /* box-shadow: 0 0 50px rgb(44, 41, 41); */

  padding-bottom: 3.2em;
  height: 700px;
  margin-top: 500px;
  background-image: url("https://images.unsplash.com/photo-1530733895788-f39cc96b6ae8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80");
  margin-top: 0px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;
  width: 99.5%;
}

#miscompañeros {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: 0 auto;
  align-items: center;
  width: 100%;

  border-radius: 20px;
}

#agradecimientos p {
  font-size: 1.3em;
  color: var(--black);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  align-content: center;
  line-height: 1.2;
}

#compañeros {
  color: var(--verdeoscuro);

  opacity: 0.9;
  border-radius: 100px;
}
h1 {
  color: var(--black);
  text-align: left;
}
h2 {
  line-height: 2;
}
#todocolor {
  display: flex;
  flex-direction: row;

  padding: 1.3em;
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
}

#parrafouno {
  width: 40%;
  margin-right: 80px;
  background-color: #cbf3f096;
  padding-left: 20px;

  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
}

#parrafo2 {
  width: 60%;
  margin-right: 80px;
  background-color: #fea21748;
  padding-right: 20px;
  padding: 2em;
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
}
#parrafo3 {
  width: 40%;
  background-color: #cbf3f096;
  padding: 2em;
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
}

#todocolor2 {
  background-color: #2ec4b585;

  padding: 1.3em;
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
}
#todocolor3 {
  background-color: #2ec4b585;
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
  padding: 0.8em;
}

#compis {
  text-align: center;
  color: var(--verdeoscuro);
  font-size: 2em;
  margin-left: -30px;
}
</style>