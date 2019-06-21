import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Abaut from "./components/layout/About";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import RegisterUser from "./components/auth/RegisterUser";
import LoginUser from "./components/auth/LoginUser";
import User from "./components/layout/User";
import RegisterDriver from "./components/auth/RegisterDriver";
import LoginDriver from "./components/auth/LoginDriver";
import Driver from "./components/layout/Driver";
import GetLocation from "./components/location/GetLocation";
import Realtime from "./components/socket/Realtime";
import MapView from "./components/location/MapView";

import "./App.css";
import configureSocket from "./actions/socket";

// Setup Const Socket
export const socket = configureSocket(store.dispatch);

if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // logout user
    store.dispatch(logoutUser());
    //TODO: clear current profile
    // Redirect to login
    window.location.href = "/";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/" component={Abaut} />
            <Route exact path="/realtime" component={Realtime} />
            <Route exact path="/mapview" component={MapView} />
            <div className="container">
              <Route exact path="/location" component={GetLocation} />
              <Route exact path="/registeruser" component={RegisterUser} />
              <Route exact path="/loginuser" component={LoginUser} />
              <Route exact path="/user" component={User} />
              <Route exact path="/registerdriver" component={RegisterDriver} />
              <Route exact path="/logindriver" component={LoginDriver} />
              <Route exact path="/driver" component={Driver} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
