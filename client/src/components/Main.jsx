import React from "react";
import { Route, Switch } from "react-router-dom";
import SignupPage from "./authorization/SignupPage";
import SigninPage from "./authorization/SigninPage";
import Home from "./Home";
import Admin from "./Admin/Admin";

import Gallery from "./Gallery/Gallery";
import IdChild from "./IdChild";

function Main() {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/registration">
          <SignupPage />
        </Route>
        <Route path="/login">
          <SigninPage />
        </Route>
        <Route path="/admin" exact>
          <Admin />
        </Route>
        <Route path="/notes/all" exact>
          <Gallery />
        </Route>
        <Route path="/child/:id">
          <IdChild />
        </Route>
      </Switch>
    </div>
  );
}

export default Main;
