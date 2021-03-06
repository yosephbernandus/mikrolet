import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";
import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import RegisterUser from "./components/auth/RegisterUser";
import LoginUser from "./components/auth/LoginUser";
import RegisterDriver from "./components/auth/RegisterDriver";
import LoginDriver from "./components/auth/LoginDriver";
import GetLocation from "./components/location/GetLocation";
import Realtime from "./components/socket/Realtime";
import MapView from "./components/location/MapView";
import User from "./components/layout/User";
import Driver from "./components/layout/Driver";
import Dashboard from "./components/dashboard/Dashboard";
import MultipleMarkerGmaps from "./components/location/MultipleMarkerGmaps";
import PrivateRoute from "./components/common/PrivateRoute";
import DriverRoute from "./components/common/DriverRoute";
import LeafletMap from "./components/location/LeafletMap";
import MapTravel from "./components/location/MapTravel";

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

    store.dispatch(clearCurrentProfile());
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
            <Route exact path="/leafletmap" component={LeafletMap} />
            <Route exact path="/maptravel" component={MapTravel} />

            <div className="container">
              <Route exact path="/registeruser" component={RegisterUser} />
              <Route exact path="/loginuser" component={LoginUser} />
              <Route exact path="/registerdriver" component={RegisterDriver} />
              <Route exact path="/logindriver" component={LoginDriver} />
              <Route
                exact
                path="/multiplemarker"
                component={MultipleMarkerGmaps}
              />
              <Switch>
                <PrivateRoute exact path="/location" component={GetLocation} />
                <PrivateRoute exact path="/user" component={User} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <DriverRoute exact path="/driver" component={Driver} />
                <DriverRoute exact path="/realtime" component={Realtime} />
              </Switch>
              <Route exact path="/mapview" component={MapView} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
