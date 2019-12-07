import React, { Component } from "react";
import MainPage from "./components/MainPage";

import { Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import PrivateRoute from "./components/PrivateRoute";
import UserPanel from "./components/UserPanel";

export const history = createBrowserHistory();

export default class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Route exact path="/" component={MainPage} />
          <PrivateRoute exact path="/login" component={UserPanel} />
        </div>
      </Router>
    );
  }
}
