import React, { Component } from "react";
import UserLocation from "../userLocation/UserLocation";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  subscribeToDriver,
  sendUserLocationToServer,
  changeCountPassengers,
  userSendMessage
} from "../../actions/socket";
import { getDrivers } from "../../actions/socketActions";

import { Link } from "react-router-dom";

import {
  Card,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  CardTitle
} from "reactstrap";

import "../../css/animate.min.css";
import "../../css/bootstrap.min.css";
import "../../css/font-awesome.min.css";
import "../../css/icofont.css";
import "../../css/magnific-popup.css";
import "../../css/owl.carousel.css";
import "../../css/responsive.css";
import "../../css/slick.css";
import "../../css/slicknav.min.css";
import "../../css/style.css";
import "../../css/switcher-style.css";

import "../../App.css";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        lat: 51.505,
        lng: -0.09
      },
      counter: 0,
      isMarkerShown: true,
      haveUsersLocation: false,
      zoom: 2,
      driver: [],
      selectedMarker: false,
      userMessage: "",
      estimated: null,
      route: ""
    };

    this.onChange = this.onChange.bind(this);

    subscribeToDriver((err, driver) =>
      this.setState({
        driver
      })
    );
  }

  //Allow
  componentDidMount() {
    this.props.getDrivers();
    const { auth } = this.props;

    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          haveUsersLocation: true,
          zoom: 13,
          isMarkerShown: true,
          estimated: null,
          route: null
        });
      },
      () => {
        console.log("Please allow location");
        fetch("https://ipapi.co/json")
          .then(res => res.json())
          .then(location => {
            this.setState({
              location: {
                lat: location.latitude,
                lng: location.longitude
              },
              haveUsersLocation: true,
              zoom: 13,
              isMarkerShown: true,
              estimated: null,
              route: null
            });
          });
      },
      { enableHighAccuracy: true, timeout: Infinity, maximumAge: 0 }
    );
    this.watchID = navigator.geolocation.watchPosition(position => {
      const userLocation = {
        user: auth.user.id,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        status: auth.user.status,
        name: auth.user.name
      };

      sendUserLocationToServer(userLocation);

      this.setState({
        location: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        },
        haveUsersLocation: true,
        zoom: 13,
        isMarkerShown: true
      });
    });
  }

  // Increment
  increment() {
    const { auth } = this.props;
    if (this.state.counter === 10) {
      this.setState({
        counter: 10
      });
    } else {
      this.setState(prevState => ({
        counter: prevState.counter + 1
      }));

      let seat = {
        user: auth.user.id,
        seat: this.state.counter + 1
      };

      changeCountPassengers(seat);
    }
  }

  // Decrement
  decrement() {
    const { auth } = this.props;
    if (this.state.counter === 0) {
      this.setState({
        counter: 0
      });
    } else {
      this.setState(prevState => ({
        counter: prevState.counter - 1
      }));

      let seat = {
        user: auth.user.id,
        seat: this.state.counter - 1
      };

      changeCountPassengers(seat);
    }
  }

  handleClick = (marker, event) => {
    // console.log({ marker })
    this.setState({ selectedMarker: marker });

    const directionsService = new window.google.maps.DirectionsService();
    let newLat = parseFloat(marker.latitude);
    let newLong = parseFloat(marker.longitude);
    const origin = {
      lat: this.state.location.lat,
      lng: this.state.location.lng
    };
    const destination = { lat: newLat, lng: newLong };

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          const time = result.routes[0];
          const legs = time.legs[0].duration.text;
          this.setState({
            estimated: legs
          });
        } else {
          console.log(`error fetching directions ${result}`);
        }
      }
    );
  };

  formSubmitted = event => {
    const { auth } = this.props;
    event.preventDefault();
    let userMessage = {
      user: auth.user.id,
      message: this.state.userMessage
    };

    userSendMessage(userMessage);
  };

  valueChanged = event => {
    const { name, value } = event.target;
    this.setState(prevState => ({
      userMessage: {
        ...prevState.userMessage,
        [name]: value
      }
    }));
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ route: e.target.value });
  }

  render() {
    const { auth } = this.props;
    const { driver } = this.state;
    const location = [this.state.location.lat, this.state.location.lng];
    const options = [
      { label: "Semua Jurusan", value: "" },
      { label: "Paal 2 - Politeknik", value: "Paal 2 - Politeknik" },
      { label: "Paal 2 - 45", value: "Paal 2 - 45" },
      { label: "Paal 2 - Airmadidi ", value: "Paal 2 - Airmadidi" },
      { label: "Paal 2 - Karombasan", value: "Paal 2 - Karombasan" }
    ];

    const selectOptions = options.map(option => (
      <option key={option.label} value={option.value}>
        {option.label}
      </option>
    ));

    return (
      <section className="blog-detail" id="blog">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="blog-details">
                <div class="card">
                  <div class="card-header text-center">Map Informations</div>
                  <div className="map">
                    <UserLocation
                      latitude={this.state.location.lat}
                      longitude={this.state.location.lng}
                      markers={driver}
                      onClick={this.handleClick}
                      estimated={this.state.estimated}
                      selectedMarker={this.state.selectedMarker}
                    />
                  </div>
                </div>
                <div className="post-author">
                  <Link to="#">
                    <i className="icofont-user-alt-7" />
                    Alva Petra Stevanus Mende
                  </Link>
                  <Link to="#">
                    <i className="icofont-calendar" /> 25 December 2019
                  </Link>
                  <Link to="#">
                    <i className="icofont-street-view" />
                    {this.state.location.lat}, {this.state.location.lng}
                  </Link>
                </div>
                <p>
                  Users can view information in <i>real-time</i>. Information
                  about the location of public transport, public transport
                  routes and their prices, the number of passengers on public
                  transportation, the time for public transport to the user's
                  location.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="sidebar">
                <h4>Share Your Information</h4>
              </div>
              <Card body className="message-form">
                <CardTitle>
                  Welcome To Intelligent Information System for General
                  Transportation In Manado City. Thanks for stopping by!
                </CardTitle>
                <Form onSubmit={this.onSubmit}>
                  <FormGroup>
                    <Label for="message">Search</Label>{" "}
                    <i className="icofont-search" />
                    <br />
                    <select
                      name="route"
                      value={this.state.route}
                      onChange={this.onChange}
                    >
                      {selectOptions}
                    </select>
                    {this.state.route}
                    <div className="btn-group btn-block">
                      <button
                        type="button"
                        className="btn btn-primary dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Route
                      </button>
                      <div class="dropdown-menu">
                        <Link className="dropdown-item" to="#">
                          Pall 2 - Politeknik
                        </Link>
                        <Link className="dropdown-item" to="#">
                          Pall 2 - Lapangan
                        </Link>
                        <Link className="dropdown-item" to="#">
                          Pall 2 - Airmadidi
                        </Link>
                        <Link className="dropdown-item" to="#">
                          Pall 2 - Pasar 45
                        </Link>
                        <Link className="dropdown-item" to="#">
                          Pasar 45 - Malalayang
                        </Link>
                        <Link className="dropdown-item" to="#">
                          Pasar 45 - Perkamil
                        </Link>
                      </div>
                    </div>
                  </FormGroup>

                  <FormGroup>
                    <Label for="message">Passengers</Label>
                    <div className="input-counter input-group">
                      <div className="input-group-prepend">
                        <button
                          type="button"
                          className="btn btn-primary"
                          id="minus"
                          onClick={this.decrement.bind(this)}
                        >
                          <i className="fa fa-minus" />
                        </button>
                      </div>
                      <input
                        type="text"
                        className="form-control counter text-center"
                        id="counter"
                        value={this.state.counter}
                      />
                      <input type="hidden" id="user" value={auth.user.id} />
                      <div className="input-group-append">
                        <button
                          type="button"
                          className="btn btn-primary btn-add btn-block"
                          id="plus"
                          onClick={this.increment.bind(this)}
                        >
                          <i className="fa fa-plus" />
                        </button>
                      </div>
                    </div>
                  </FormGroup>
                  <br />
                  <FormGroup>
                    <Label for="message">Message</Label>
                    <Input
                      onChange={this.valueChanged}
                      type="textarea"
                      name="message"
                      id="message"
                      placeholder="Enter a message"
                    />
                  </FormGroup>
                  <Button
                    type="submit"
                    color="primary"
                    disabled={!this.state.haveUsersLocation}
                  >
                    Send Message
                  </Button>
                </Form>
              </Card>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

User.propTypes = {
  getDrivers: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  socket: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  socket: state.socket
});

export default connect(
  mapStateToProps,
  { getDrivers }
)(User);
