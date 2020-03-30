export const authenticationService = {
  register,
  login,
  logout,
  setIntoLocalStorage,
  requestCollection,
  createCollection,
  removeCollection
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
  localStorage.removeItem("Token");
}

function setIntoLocalStorage({ name = "null", value = "null" }) {
  localStorage.setItem(`${name}`, value);
}

function requestCollection(type, name) {

  let rqtype;

  type === 'name' ? rqtype = 'find' : type === 'id' ? rqtype = 'find' : rqtype = "usercollections";

  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  };

  return fetch(`http://localhost:5000/api/collections/${rqtype}?${type}=${name}`, requestOptions)
    .then(result => result.json())
}

function createCollection(name, cards, OwnerId, Token) {

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${Token}` },
    body: JSON.stringify({ Name: name, OwnerId: OwnerId, Cards: cards })
  };

  return fetch(`http://localhost:5000/api/collections/create`, requestOptions)
    .then(result => result.json())
    .catch(err => console.log(err))
}

function removeCollection(id, token) {

  console.log(`http://localhost:5000/api/collections/delete?id=${id}`)

  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }
  }

  return fetch(`http://localhost:5000/api/collections/delete?id=${id}`, requestOptions)
    .then(result => result.json())
    .catch(err => console.log(err))
}
