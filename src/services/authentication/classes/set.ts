import { Token } from '../../../config/types/types_user';
import { SearchedName, RequestType, Host } from '../../../config/types/services/types_common';
import { SetID } from '../../../config/types/services/types_set';
import { CollectionID } from '../../../config/types/services/types_collection';

export default class Set {
  host: Host;

  constructor(host: Host) {
    this.host = host;
  }

  find(requestType: RequestType, searchedName: SearchedName) {

    let requestCategory = "usersets";
    requestType === 'name' ? requestCategory = 'find' : requestType === 'id' ? requestCategory = 'find' : requestCategory = "usersets";

    const requestOptions = {
      method: "GET",
      headers: { "Content-requestType": "application/json" }
    };

    return fetch(`${this.host}/api/sets/${requestCategory}?${requestType}=${searchedName}`, requestOptions)
      .then(result => result.json())
  }

  create(name: string, description: string = "No description", collectionIds: CollectionID[], Token: Token) {

    const requestOptions = {
      method: "POST",
      headers: { "Content-requestType": "application/json", "Authorization": `Bearer ${Token}` },
      body: JSON.stringify({ name, description, collectionIds })
    };

    return fetch(`${this.host}/api/sets/create`, requestOptions)
      .then(result => result.json())
      .catch(err => console.log(err))
  }

  remove(id: SetID, token: Token) {

    const requestOptions = {
      method: "DELETE",
      headers: { "Content-requestType": "application/json", "Authorization": `Bearer ${token}` }
    }

    return fetch(`${this.host}/api/sets/delete?id=${id}`, requestOptions)
      .then(result => result.json())
      .catch(err => console.log(err))
  }

  update(id: SetID, token: Token, collections: Token[], name: string, description: string) {

    const requestOptions = {
      method: "PUT",
      headers: { "Content-requestType": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify({ Name: name, Cards: collections, Description: description, BaseLanguage: null, SecondLanguage: null })
    }

    return fetch(`${this.host}/api/sets/update?id=${id}`, requestOptions)
      .then(result => result.json())
      .catch(err => console.log(err))
  }


}