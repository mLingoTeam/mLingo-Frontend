import Newsletter from './authentication_classes/newsletter'
import Collection from './authentication_classes/collection'
import User from './authentication_classes/user'

export const authenticationService = {
  newsletter,
  collection,
  user,
  setIntoLocalStorage
};


function setIntoLocalStorage({ name = "null", value = "null" }) {
  localStorage.setItem(`${name}`, value);
}



const host = 'http://localhost:5000';
const newsletter_host = "https://mlingo.azurewebsites.net";


const newsletter = new Newsletter( newsletter_host )
const collection = new Collection( host )
const user = new User( host )





