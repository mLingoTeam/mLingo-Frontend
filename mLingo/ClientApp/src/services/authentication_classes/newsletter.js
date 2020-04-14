function subscribe({email}){
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    }

    return fetch(`${this.host}/api/newsletter/signup`, requestOptions)
    .then( result => result)
    .catch( err => console.log(err))
  }




export class Newsletter {
    constructor(host){
        this.host = host;

        this.subscribe = subscribe;
    }
}


