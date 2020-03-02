import React, { Component } from "react";
import MainPage from "./components/pages/MainPage";

import { Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import PrivateRoute from "./components/PrivateRoute";
import UserPanelHead from "./components/pages/UserPanelHead";
import UserPanelCreate from "./components/pages/UserPanelCreate";

export const history = createBrowserHistory();

export default class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Route exact path="/" component={MainPage} />
          <PrivateRoute exact path="/login" component={UserPanelHead} />
          <PrivateRoute exact path="/create" component={UserPanelCreate} />
        </div>
      </Router>
    );
  }
}
