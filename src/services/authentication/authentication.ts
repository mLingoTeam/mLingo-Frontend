import Newsletter from './classes/newsletter';
import Collection from './classes/collection';
import Set from './classes/set';
import User from './classes/user';
import Session from './classes/session';


const apiUrl = "http://localhost:5000";  //process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL;

//const host = 'http://localhost:5000';
//const newsletter_host = "https://mlingo.azurewebsites.net";


const newsletter = new Newsletter(apiUrl);
const collection = new Collection(apiUrl);
const set = new Set(apiUrl);
const user = new User(apiUrl);
const session = new Session(apiUrl);


export const authentication_service = {
  newsletter,
  collection,
  user,
  set,
  session
};