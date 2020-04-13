import React, { Component } from "react";
import { Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

import PrivateRoute from "./services/PrivateRoute";


import RegisterPage from "./schema/pages/RegisterPage";
import TemporaryPage from './schema/pages/TemporaryPage'

import MainPage from "./schema/pages/MainPage";
import LoginPage from "./schema/pages/LoginPage";
import UserPanelHead from "./schema/pages/UserPanelHead";
import UserPanelCreate from "./schema/pages/UserPanelCreate";
import CollectionPage from "./schema/pages/CollectionPage";
import SearchPage from './schema/pages/SearchPage';
import UserCollections from './schema/pages/UserCollections'
import './styles/css/Main.css';

export const history = createBrowserHistory();

export default class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={TemporaryPage} />
          <Route exact path="/collection" component={CollectionPage} />
          <Route exact path="/search" component={SearchPage} />
          <PrivateRoute exact path="/head" component={UserPanelHead} />
          <PrivateRoute exact path="/create" component={UserPanelCreate} />
          <PrivateRoute exact path="/collections" component={UserCollections} />
        </div>
      </Router>
    );
  }
}
