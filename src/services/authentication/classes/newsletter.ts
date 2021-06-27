import { Host } from '../../../config/types/services/types_common';
import { Email } from '../../../config/types/types_user';

export default class Newsletter {
  host: Host;
  constructor(host: Host) {
    this.host = host;
  }

  subscribe(email: Email) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    }

    return fetch(`${this.host}/api/newsletter/signup`, requestOptions)
      .then(result => result)
      .catch(err => console.log(err))
  }
}


