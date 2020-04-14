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

function login({userid, password}) {

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userid, password })
    };


    return fetch(`${this.host}/api/account/login`, requestOptions)
      .then(result => result.json())

  }


export class User {

    constructor(host){
        this.host = host;

        this.register = register;
        this.login = login;
        this.logout = logout;
    }
}