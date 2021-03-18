function create({collectionId, Token}) {

    console.log(Token)
    console.log(typeof(Token))

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${Token}` },
    };

    return fetch(`${this.host}/api/session/create?collectionId=${collectionId}`, requestOptions)
      .then(result => result.json())
      .catch(err => console.log(err))
  }



export default class Session {
    constructor(host){
        this.host = host;

        this.create = create;
    }
}