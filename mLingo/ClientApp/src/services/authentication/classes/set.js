function find({ type , name }) {

    let rqtype = "usersets";
    type === 'name' ? rqtype = 'find' : type === 'id' ? rqtype = 'find' : rqtype = "usersets";

    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    };

    console.log(`${this.host}/api/sets/${rqtype}?${type}=${name}`)

    return fetch(`${this.host}/api/sets/${rqtype}?${type}=${name}`, requestOptions)
      .then(result => result.json())
}

  function create({name, description = "No description", cards, Token}) {

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${Token}` },
      body: JSON.stringify({ name, description, cards })
    };

    return fetch(`${this.host}/api/sets/create`, requestOptions)
      .then(result => result.json())
      .catch(err => console.log(err))
  }

  function remove({id, token}) {

    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }
    }

    return fetch(`${this.host}/api/sets/delete?id=${id}`, requestOptions)
      .then(result => result.json())
      .catch(err => console.log(err))
  }

  function update({ id, token, cards, name, description }) {


    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify({ Name: name, Cards: cards, Description: description, BaseLanguage: null, SecondLanguage: null })
    }

    return fetch(`${this.host}/api/sets/update?id=${id}`, requestOptions)
      .then(result => result.json())
      .catch(err => console.log(err))
}



  export default class Set {

    constructor(host){
        this.host = host;

        this.create = create;
        this.update = update;
        this.find = find;
        this.remove = remove;
    }

  }