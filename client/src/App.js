import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Abaut from "./components/layout/Abaut";
import RegisterDriver from "./components/auth/RegisterDriver";
import RegisterUser from "./components/auth/RegisterUser";
import LoginDriver from "./components/auth/LoginDriver";
import LoginUser from "./components/auth/LoginUser";
import User from "./components/layout/User";
import Driver from "./components/layout/Driver";
import GetLocation from "./components/location/GetLocation";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/" component={Abaut} />
            <div className="container">
              <Route exact path="/location" component={GetLocation} />
              <Route exact path="/logindriver" component={LoginDriver} />
              <Route exact path="/loginuser" component={LoginUser} />
              <Route exact path="/registerdriver" component={RegisterDriver} />
              <Route exact path="/registeruser" component={RegisterUser} />
              <Route exact path="/user" component={User} />
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