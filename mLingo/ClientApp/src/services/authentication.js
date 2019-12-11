import { handleResponse } from "../helpers/handleResponse";

export const authenticationService = {
  register,
  //login,
  logout
};

function register(username, email, password) {
  console.log(JSON.stringify({ username, email, password }));

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
  //.then(handleResponse)
  /*.then(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("currentUser", JSON.stringify(user));
      currentUserSubject.next(user);
    });*/
}

function login(username, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: { username, password }
  };

  return fetch(``, requestOptions)
    .then(handleResponse)
    .then(data => data.json())
    .then(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("currentUser", JSON.stringify(user));
      //currentUserSubject.next(user);

      return user;
    });
}

function logout() {
  localStorage.removeItem("currentUser");
}
