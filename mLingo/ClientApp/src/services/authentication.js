import Newsletter from './authentication_classes/newsletter'


export const authenticationService = {
  register,
  login,
  logout,
  setIntoLocalStorage,
  requestCollection,
  createCollection,
  removeCollection,
  updateCollection,

  newsletter
};




const host = 'http://localhost:5000';
const newsletter_host = "https://mlingo.azurewebsites.net";


const newsletter = new Newsletter( newsletter_host )

function register(username, email, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password })
  };

  return fetch(`${host}/api/account/register`, requestOptions)
    .then(result => result.json())
}

function login(userid, password) {

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userid, password })
  };


  return fetch(`${host}/api/account/login`, requestOptions)
    .then(result => result.json())

}

function logout() {
  localStorage.removeItem("currentUser");
  localStorage.removeItem("Token");
  localStorage.clear();
}

function setIntoLocalStorage({ name = "null", value = "null" }) {
  localStorage.setItem(`${name}`, value);
}

