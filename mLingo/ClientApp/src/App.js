import React, { Component } from "react";
import MainPage from "./components/pages/MainPage";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";

import { Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import PrivateRoute from "./components/PrivateRoute";
import UserPanelHead from "./components/pages/UserPanelHead";
import UserPanelCreate from "./components/pages/UserPanelCreate";
import UserPanelCollection from "./components/pages/UserPanelCollection";
import SearchPage from './components/pages/SearchPage'

export const history = createBrowserHistory();

export default class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/search" component={SearchPage} />
          <PrivateRoute exact path="/head" component={UserPanelHead} />
          <PrivateRoute exact path="/create" component={UserPanelCreate} />
          <PrivateRoute exact path="/collection" component={UserPanelCollection} />
        </div>
      </Router>
    );
  }
}
