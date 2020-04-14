import React, { Component } from "react";
import { Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

import PrivateRoute from "./services/PrivateRoute";


//import Register from "./schema/pages/Register";
import Temporary_Register from './schema/pages/Temporary_Register'

import Landpage from "./schema/pages/Landpage";
import Login from "./schema/pages/Login";
import User_Head from "./schema/pages/User_Head";
import User_Create_Collection from "./schema/pages/User_Create_Collection";
import Show_Collection from "./schema/pages/Show_Collection";
import User_Collections from './schema/pages/User_Collections'
import Search_Collection from "./schema/pages/Search_Collection";

import './styles/css/Main.css';

export const history = createBrowserHistory();

export default class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Route exact path="/" component={Landpage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Temporary_Register} />
          <Route exact path="/collection" component={Show_Collection} />
          <Route exact path="/search" component={Search_Collection} />
          <PrivateRoute exact path="/head" component={User_Head} />
          <PrivateRoute exact path="/create" component={User_Create_Collection} />
          <PrivateRoute exact path="/collections" component={User_Collections} />
        </div>
      </Router>
    );
  }
}
