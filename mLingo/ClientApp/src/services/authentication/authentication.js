import Newsletter from './classes/newsletter';
import Collection from './classes/collection';
import User from './classes/user';


const apiUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL;
console.log(apiUrl);

//const host = 'http://localhost:5000';
//const newsletter_host = "https://mlingo.azurewebsites.net";


const newsletter = new Newsletter( apiUrl );
const collection = new Collection( apiUrl );
const user = new User( apiUrl );


export const authentication_service = {
  newsletter,
  collection,
  user
};