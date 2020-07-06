import axios from "axios";
import jwt from "jwt-decode";

const ENDPOINT = "http://localhost:3003";
const AUTH_TOKEN_KEY = "authToken";
const ROLE = "rol";
const USER = "mail";

export function singInUser(mail, contrasenha) {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await axios({
        url: `${ENDPOINT}/usuarios/login`, //URL DE LA AUTENTICACIÓN
        method: "POST", //MÉTODO DE LA AUTENTICACIÓN
        data: {
          //DATOS DE LA AUTENTICACIÓN
          mail: mail, //USUARIo
          contrasenha: contrasenha, //PASSWORD
          grant_type: "password",
        },
      });
      setAuthToken(res.data.token);
      setIsAdmin(res.data.admin); //aquí set

      resolve();
    } catch (err) {
      console.log("Error en login: ", err);
      reject(err);
    }
  });
}

//GUARDAR TOKEN EN LOCALSTORAGE

export function setAuthToken(token) {
  axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

//FUNCIÓN DE LOGOUT

export function clearLogin() {
  axios.defaults.headers.common["Authorization"] = "";
  localStorage.removeItem("token");
  localStorage.removeItem("id");
  localStorage.removeItem("rol");
  localStorage.removeItem("mail");
  localStorage.removeItem("name");
  clearAdmin();
}

// COGER EL TOKEN DEL LOCALSTORAGE

export function getAuthToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

//CONSIGUIENTE LA FECHA DE EXPIRACIÓN DEL TOKEN

export function getTokenExpirationDate(encodedToken) {
  let token = jwt(encodedToken);
  // SI NO HAY, NO SIGUE
  if (!token.exp) {
    return null;
  }

  let date = new Date(0);
  date.setUTCSeconds(token.exp);
  return date;
}

//COMPROBANDO VIGENCIA DE LA FECHA

export function isTokenExpired(token) {
  let expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}

//COMPROBAR SI EL USER ESTÁ LOGEADO O NO

export function isLoggedIn() {
  /* let authToken = getAuthToken();
  return !!authToken && !isTokenExpired(authToken); */

  const token = localStorage.getItem("token");
  if (token) {
    return true;
  }
  return false;
}

//FUNCIONES PARA COMPROBAR EL ROL DEL USER ===========

//GUARDAR SI ES ADMIN EN LOCAL STORAGE

export function setIsAdmin(admin) {
  localStorage.setItem(ROLE, admin);
}

//BORRAR ROL DEL USER EN LOCAL STORAGE

export function clearAdmin() {
  return localStorage.removeItem(ROLE);
}

//RECUPERAR EL ROL GUARDADO EN EL LOCAL STORAGE

export function getIsAdmin() {
  return localStorage.getItem(ROLE);
}

//COMPROBAR ROL
export function checkAdmin() {
  let role = false;
  let admin = getIsAdmin();
  if (admin === "admin") {
    role = true;
  } else {
    role = false;
  }
  return role;
}

// Esta función no la utilizo, la tengo en barbecho porque estaba tratando
// de sacar el nombre del usuario activo en el menú de navegación.
export function getUserActive() {
  return localStorage.getItem(USER);
}

export function showAdminButton() {
  const role = localStorage.getItem("rol");
  if (role === "admin") {
    return true;
  }
  return false;
}

export function showUserButton() {
  const role = localStorage.getItem("rol");
  if (role === "escritor") {
    return true;
  }
  return false;
}
