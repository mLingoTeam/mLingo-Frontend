import handleRaw from '../handleRaw';
import { CURRENT_LOGGED_USER, CURRENT_TOKEN } from "../../../config/constants/localStorageConstants";
import { Username, Password, Email } from '../../../config/types/omnipresent';
import { Host } from '../../../config/types/services/user';

export default class User {
  host: Host;

  constructor(host: Host) {
    this.host = host;
  }

  register(username: Username, email: Email, password: Password) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password })
    };

    return fetch(`${this.host}/api/account/register`, requestOptions)
      .then(result => result.json())
  }

  login(username: Username, password: Password) {

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: username, password })
    };


    return fetch(`${this.host}/api/account/login`, requestOptions)
      .then(result => handleRaw(result))

  }

  logout() {
    localStorage.removeItem(CURRENT_LOGGED_USER);
    localStorage.removeItem(CURRENT_TOKEN);
    localStorage.clear();
  }

}