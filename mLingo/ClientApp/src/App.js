import React, { Component } from "react";
import { Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

import PrivateRoute from "./services/PrivateRoute";


import Temporary_Register from './schema/pages/Temporary_Register'

import Landpage from "./schema/pages/Landpage";
import Landpage_Login from "./schema/pages/Landpage_Login";
//import Landpage_Register from "./schema/pages/Landpage_Register";

import User_Head from "./schema/pages/User_Head";
import User_Create_Collection from "./schema/pages/User_Create_Collection";
import User_Collections from './schema/pages/User_Collections';

import Collection_Screen from "./schema/pages/Collection_Screen";
import Collection_Search from "./schema/pages/Collection_Search";

import './styles/css/Main.css';

export const history = createBrowserHistory();

export default class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Route exact path="/" component={Landpage} />
          <Route exact path="/login" component={Landpage_Login} />
          <Route exact path="/register" component={Temporary_Register} />

          <Route exact path="/collection" component={Collection_Screen} />
          <Route exact path="/search" component={Collection_Search} />

          <PrivateRoute exact path="/head" component={User_Head} />
          <PrivateRoute exact path="/create" component={User_Create_Collection} />
          <PrivateRoute exact path="/collections" component={User_Collections} />
        </div>
      </Router>
    );
  }
}
