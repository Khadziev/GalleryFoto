import React from "react";
import { Route, Switch } from "react-router-dom";
import SignUpForm from "../user/SignUpForm";
import SigninPage from "../user/LoginScreen";
import Home from "../../pages/Home/Home";
import UserProfile from "../../pages/UserProfile/UserProfile";
import DataId from "../../pages/Data/DataId";
import GalleryItemDetail from "../gallery/GalleryItemDetail";
import ErrorFallback from "../common/ErrorFallback";
import Gallery from '../../pages/GalleryPage/Gallery'

function Navigate() {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/registration">
          <SignUpForm />
        </Route>
        <Route path="/login">
           <SigninPage/>
        </Route>
        <Route path="/admin" exact>
          <UserProfile />
        </Route>
        <Route path="/notes/all" exact>
          <Gallery />
        </Route>
        <Route path="/data/:id">
          <DataId />
        </Route>
        <Route path="/gallery/:id">
          <GalleryItemDetail />
        </Route>
        <Route path="/other">
           <ErrorFallback/>
        </Route>
      </Switch>
    </div>
  );
}

export default Navigate;
