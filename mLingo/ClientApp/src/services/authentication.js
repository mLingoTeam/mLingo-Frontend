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

function requestCollection() {

  let data = null;

  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  };

  fetch(`http://localhost:5000/api/collections/usercollections?username=example1`, requestOptions)

    .then(result => { console.log(result); result.json() })
    .then(user => {
      data = user;
      console.log(user);
      return user;
    });
  return data;
}
