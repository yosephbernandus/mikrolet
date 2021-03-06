import React, { Component } from "react";
// import MapComponent from "../location/MapComponent";
// import SetDriverLocation from "../location/SetDriverLocation";

import L from "leaflet";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  subscribeToDriver,
  sendUserLocationToServer,
  changeCountPassengers
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
// import iconUrl from "../../user-placeholder.svg";
// import iconDriver from "../../car-placeholder.png";

var myIcon = L.icon({
  iconUrl: require("../../user-placeholder.svg"),
  iconSize: [35, 51], // Ikuran Icon
  iconAnchor: [29, 62], // Ukuran Popup ke Atas / ke bawah
  popupAnchor: [-10, -57] // Ukuran Popup ke kiri / Ke kanan
});

var driverIcon = L.icon({
  iconUrl: require("../../car-placeholder.png"),
  iconSize: [35, 51], // Ikuran Icon
  iconAnchor: [29, 62], // Ukuran Popup ke Atas / ke bawah
  popupAnchor: [-10, -57] // Ukuran Popup ke kiri / Ke kanan
});

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
      driver: []
    };

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
          isMarkerShown: true
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
              isMarkerShown: true
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
  };

  formSubmitted = event => {
    event.preventDefault();
    console.log(this.state.userMessage);
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

  render() {
    const { auth } = this.props;
    const { driver } = this.state;
    const location = [this.state.location.lat, this.state.location.lng];

    return (
      <section className="blog-detail" id="blog">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="blog-details">
                <div class="card">
                  <div class="card-header text-center">Map Informations</div>
                  <div className="map">
                    {/* <MapComponent
                      selectedMarker={this.state.selectedMarker}
                      markers={this.state.shelter}
                      onClick={this.handleClick}
                      isMarkerShown={this.state.isMarkerShown}
                      onMarkerClick={this.handleMsarkerClick}
                      latitude={this.state.location.lat}
                      longitude={this.state.location.lng}
                    /> */}
                    <Map
                      className="map"
                      center={location}
                      worldCopyJump={true}
                      zoom={this.state.zoom}
                    >
                      <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      {/* {this.state.haveUsersLocation ? ( */}
                      <Marker position={location} icon={myIcon}>
                        <Popup>
                          <div>
                            <p>
                              <h6 className="card-title">
                                <i
                                  className="icofont-user-alt-7 text-primary"
                                  color="blue"
                                />
                                <strong> {auth.user.name}</strong>
                              </h6>
                            </p>
                            <hr />
                            <p className="card-subtitle mb-2 text-muted">
                              <i className="icofont-clock-time" />{" "}
                              <span className="text-success">20 minutes</span>{" "}
                              to your location
                            </p>
                            <button
                              type="button"
                              className="btn btn-primary btn-sm btn-block"
                              disabled
                            >
                              Jumlah Penumpang{" "}
                              <span className="badge badge-light">
                                {this.state.counter}
                              </span>
                            </button>
                            <hr />
                            <p className="card-text">
                              <i className="icofont-ui-message text-primary" />{" "}
                              the card title and the card's content.
                            </p>
                          </div>
                        </Popup>
                      </Marker>
                      {/* {socket.driverLocation.map(location => (
                        <Marker
                          position={[location.latitude, location.longitude]}
                          icon={driverIcon}
                        >
                          <Popup>
                            <div>
                              <p>
                                <h6 className="card-title">
                                  <i
                                    className="icofont-user-alt-7 text-primary"
                                    color="blue"
                                  />
                                  <strong> {location.name}</strong>
                                </h6>
                              </p>
                              <hr />
                              <p className="card-subtitle mb-2 text-muted">
                                <i className="icofont-car" />{" "}
                                <span className="text-uppercase">
                                  {location.kodePlatNomor}
                                </span>{" "}
                                <br />
                                <i className="icofont-map-pins" />{" "}
                                {location.trayek} {"  "}{" "}
                                <span className="badge badge-secondary">
                                  Rp. 6.000,-
                                </span>{" "}
                                <br />
                                <i className="icofont-clock-time" />{" "}
                                <span className="text-success">20 minutes</span>{" "}
                                to your location
                              </p>
                              <button
                                type="button"
                                className="btn btn-primary btn-sm btn-block"
                                disabled
                              >
                                Jumlah Penumpang{" "}
                                <span className="badge badge-light">4</span>
                              </button>
                              <hr />
                              <p className="card-text">
                                <i className="icofont-ui-message text-primary" />{" "}
                                the card title and the card's content.
                              </p>
                            </div>
                          </Popup>
                        </Marker>
                      ))} */}
                      {/* <Marker position={driverLocation} icon={myIcon}>
                        <Popup>
                          A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                      </Marker> */}
                      {/* // ) : ( // "" // )} */}

                      {driver.map(location => (
                        <Marker
                          position={[location.latitude, location.longitude]}
                          icon={driverIcon}
                        >
                          <Popup>
                            <div>
                              <p>
                                <h6 className="card-title">
                                  <i
                                    className="icofont-user-alt-7 text-primary"
                                    color="blue"
                                  />
                                  <strong> {location.name}</strong>
                                </h6>
                              </p>
                              <hr />
                              <p className="card-subtitle mb-2 text-muted">
                                <i className="icofont-car" />{" "}
                                <span className="text-uppercase">
                                  {location.kodePlatNomor}
                                </span>{" "}
                                <br />
                                <i className="icofont-map-pins" />{" "}
                                {location.trayek} {"  "}{" "}
                                <span className="badge badge-secondary">
                                  Rp. 6.000,-
                                </span>{" "}
                                <br />
                                <i className="icofont-clock-time" />{" "}
                                <span className="text-success">20 minutes</span>{" "}
                                to your location
                              </p>
                              <button
                                type="button"
                                className="btn btn-primary btn-sm btn-block"
                                disabled
                              >
                                Jumlah Penumpang{" "}
                                <span className="badge badge-light">
                                  {location.seat}
                                </span>
                              </button>
                              <hr />
                              <p className="card-text">
                                <i className="icofont-ui-message text-primary" />{" "}
                                the card title and the card's content.
                              </p>
                            </div>
                          </Popup>
                        </Marker>
                      ))}
                    </Map>
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
                <Form onSubmit={this.formSubmitted}>
                  <FormGroup>
                    <Label for="message">Search</Label>{" "}
                    <i className="icofont-search" />
                    <br />
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
