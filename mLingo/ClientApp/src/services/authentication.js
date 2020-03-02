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

function requestCollection(type, name) {

  let rqtype;

  type === 'name' ? rqtype = 'find' : rqtype = "usercollections";

  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  };

  console.log(type);
  console.log(rqtype);

  return fetch(`http://localhost:5000/api/collections/${rqtype}?${type}=${name}`, requestOptions)
    .then(result => result.json())
}

function createCollection(name, cards) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, cards })
  };

  return fetch(`http://localhost:5000/api/account/create`, requestOptions)
    .then(result => result.json())
}
