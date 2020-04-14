function find({type, name}) {

    let rqtype;

    type === 'name' ? rqtype = 'find' : type === 'id' ? rqtype = 'find' : rqtype = "usercollections";

    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    };

    return fetch(`${this.host}/api/collections/${rqtype}?${type}=${name}`, requestOptions)
      .then(result => result.json())
  }

  function create({name, description, cards, Token}) {

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${Token}` },
      body: JSON.stringify({ name, description, cards })
    };

    return fetch(`${this.host}/api/collections/create`, requestOptions)
      .then(result => result.json())
      .catch(err => console.log(err))
  }

  function remove({id, token}) {

    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }
    }

    return fetch(`${this.host}/api/collections/delete?id=${id}`, requestOptions)
      .then(result => result.json())
      .catch(err => console.log(err))
  }

  function update({ id, token, cards, name }) {

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify({ Name: name, Cards: cards, BaseLanguage: null, SecondLanguage: null })
    }

    return fetch(`${this.host}/api/collections/update?id=${id}`, requestOptions)
      .then(result => result.json())
      .catch(err => console.log(err))
}



  export class Collection {

    constructor(host){
        this.host = host;

        this.create = create;
        this.update = update;
        this.find = find;
        this.remove = remove;
    }

  }