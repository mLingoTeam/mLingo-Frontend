import { Token } from '../../../config/types/types_user';
import { Host } from '../../../config/types/services/types_common';
import { CollectionID } from '../../../config/types/services/types_collection';
import { SessionID, CardReview } from '../../../config/types/services/types_session';

export default class Session {
  host: Host;

  constructor(host: Host) {
    this.host = host;
  }

  create(collectionId: CollectionID, token: Token) {

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
    };

    return fetch(`${this.host}/api/session/create?collectionId=${collectionId}`, requestOptions)
      .then(result => result.json())
      .catch(err => console.log(err))
  }

  submit(sessionId: SessionID, reviews: CardReview, token: Token) {


    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify({ sessionId, reviews })
    };

    return fetch(`${this.host}/api/session/submit`, requestOptions)
      .then(result => result.json())
      .catch(err => console.log(err))
  }


}