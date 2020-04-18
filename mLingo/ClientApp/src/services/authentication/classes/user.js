import handleRaw from '../handleRaw';

function register({username, email, password}) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password })
    };

    return fetch(`${this.host}/api/account/register`, requestOptions)
      .then(result => result.json())
}



function logout() {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("Token");
    localStorage.clear();
}

function login({username, password}) {

  console.log(JSON.stringify({ userId: username, password }))
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: username, password })
    };


    return fetch(`${this.host}/api/account/login`, requestOptions)
      .then(result => handleRaw(result) )

  }


export default class User {

    constructor(host){
        this.host = host;

        this.register = register;
        this.login = login;
        this.logout = logout;
    }
}