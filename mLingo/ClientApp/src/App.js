import React, { Component } from "react";
import { Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

import PrivateRoute from "./services/PrivateRoute";


import MainPage from "./schema/pages/MainPage";
import LoginPage from "./schema/pages/LoginPage";
import RegisterPage from "./schema/pages/RegisterPage";
import UserPanelHead from "./schema/pages/UserPanelHead";
import UserPanelCreate from "./schema/pages/UserPanelCreate";
import UserPanelCollection from "./schema/pages/UserPanelCollection";
import SearchPage from './schema/pages/SearchPage';
import './components/styles/css/Main.css';

export const history = createBrowserHistory();

export default class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/collection" component={UserPanelCollection} />
          <Route exact path="/search" component={SearchPage} />
          <PrivateRoute exact path="/head" component={UserPanelHead} />
          <PrivateRoute exact path="/create" component={UserPanelCreate} />
          <Route exact path="/collection" component={UserPanelCollection} />
        </div>
      </Router>
    );
  }
}
