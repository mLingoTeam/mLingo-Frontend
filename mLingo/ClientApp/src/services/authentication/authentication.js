import Newsletter from './classes/newsletter';
import Collection from './classes/collection';
import User from './classes/user';


const host = 'http://localhost:5000';
const newsletter_host = "https://mlingo.azurewebsites.net";


const newsletter = new Newsletter( newsletter_host );
const collection = new Collection( host );
const user = new User( host );


export const authentication_service = {
  newsletter,
  collection,
  user
};