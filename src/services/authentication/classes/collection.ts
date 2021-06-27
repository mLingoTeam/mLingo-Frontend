import { Host } from '../../../config/types/services/types_common';
import { Token } from '../../../config/types/types_user';
import { RequestType, SearchedName } from '../../../config/types/services/types_common';
import { CardType, CollectionID, CollectionType } from '../../../config/types/services/types_collection';

export default class Collection {
  host: Host;

  constructor(host: Host) {
    this.host = host;
  }

  find(type: RequestType, searchedName: SearchedName): Promise<CollectionType> {

    let rqtype = "usercollections";
    type === 'name' ? rqtype = 'find' : type === 'id' ? rqtype = 'find' : rqtype = "usercollections";

    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    };

    return fetch(`${this.host}/api/collections/${rqtype}?${type}=${searchedName}`, requestOptions)
      .then(result => result.json())
  }

  create(name: string, description = "No description", cards: CardType[], token: Token): Promise<CollectionType> {

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify({ name, description, cards })
    };

    return fetch(`${this.host}/api/collections/create`, requestOptions)
      .then(result => result.json())
      .catch(err => console.log(err))
  }

  remove(id: CollectionID, token: Token): Promise<CollectionType> {

    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }
    }

    return fetch(`${this.host}/api/collections/delete?id=${id}`, requestOptions)
      .then(result => result.json())
      .catch(err => console.log(err))
  }

  update(id: CollectionID, token: Token, cards: CardType[], name: string, description: string): Promise<CollectionType> {

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify({ Name: name, Cards: cards, Description: description, BaseLanguage: null, SecondLanguage: null })
    }

    return fetch(`${this.host}/api/collections/update?id=${id}`, requestOptions)
      .then(result => result.json())
      .catch(err => console.log(err))
  }


}