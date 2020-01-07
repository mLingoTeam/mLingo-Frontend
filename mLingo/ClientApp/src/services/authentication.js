export const authenticationService = {
  register,
  login,
  logout
};

function register(username, email, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password })
  };

  fetch(`http://localhost:5000/api/account/register`, requestOptions)
    .then(result => result.json())
    .then(user => {
      localStorage.setItem("currentUser", user.Response.Username);
      return user;
    });

  return false;
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
