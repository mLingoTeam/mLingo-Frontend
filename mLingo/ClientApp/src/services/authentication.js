import { BehaviorSubject } from "rxjs";

import { handleResponse } from "../helpers/handleResponse";

const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("currentUser"))
);

export const authenticationService = {
  register,
  //login,
  logout,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  }
};

function register(username, email, password) {
  console.log(JSON.stringify({ username, email, password }));

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password })
  };

  fetch(`http://localhost:5000/api/account/register`, requestOptions).then(
    user => {
      localStorage.setItem("currentUser", JSON.stringify(user));
      console.log(user);
      return user;
    }
  );
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
  // remove user from local storage to log user out
  localStorage.removeItem("currentUser");
  currentUserSubject.next(null);
}
