export const authenticationService = {
  register,
  login,
  logout,
  setIntoLocalStorage,
  requestCollection
};

function register(username, email, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password })
  };

  return fetch(`http://localhost:5000/api/account/register`, requestOptions)
    .then(result => result.json())
}

function login(userid, password) {

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userid, password })
  };


  return fetch(`http://localhost:5000/api/account/login`, requestOptions)
    .then(result => result.json())

}

function logout() {
  localStorage.removeItem("currentUser");
}

function setIntoLocalStorage({ name = "null", value = "null" }) {
  localStorage.setItem(`${name}`, value);
}

function requestCollection(username) {

  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  };

  return fetch(`http://localhost:5000/api/collections/usercollections?username=${username}`, requestOptions)
    .then(result => { console.log(result); return result })
    .then(result => result.json())
}
