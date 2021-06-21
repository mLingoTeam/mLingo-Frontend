import React, { Component } from "react";
import { Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

import PrivateRoute from "./services/PrivateRoute";

import Landpage from "./schema/pages/landpage_/Landpage";
import Landpage_Login from "./schema/pages/landpage_/Landpage_Login";
import Landpage_Register from "./schema/pages/landpage_/Landpage_Register";

import User_Head from "./schema/pages/user_/User_Head";
import User_Create_Collection from "./schema/pages/user_/User_Create_Collection";
import User_Collections from './schema/pages/user_/User_Collections';
import User_Collection_Learn from './schema/pages/user_/User_Collection_Learn';
import User_Collection_Session from './schema/pages/user_/User_Collection_Session';

import Collection_Screen from "./schema/pages/user_/Collection_Screen";
import Set_Screen from "./schema/pages/user_/Set_Screen";
import Collection_Search from "./schema/pages/user_/Collection_Search";
import "./styles/Main.scss";

export const history = createBrowserHistory();

export default class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Route exact path="/" component={Landpage} />
          <Route exact path="/login" component={Landpage_Login} />
          <Route exact path="/register" component={Landpage_Register} />

          <Route exact path="/collection" component={Collection_Screen} />
          <Route exact path="/search" component={Collection_Search} />

          <PrivateRoute exact path="/head" component={User_Head} />
          <PrivateRoute exact path="/create" component={User_Create_Collection} />
          <PrivateRoute exact path="/collections" component={User_Collections} />
          <PrivateRoute exact path="/learn" component={User_Collection_Learn} />
          <PrivateRoute exact path="/session" component={User_Collection_Session} />

          <PrivateRoute exact path="/studyset" component={Set_Screen} />
        </div>
      </Router>
    );
  }
}
