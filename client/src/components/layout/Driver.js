import React, { Component } from "react";

import L from "leaflet";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  sendDriverLocationToServer,
  changeSeat,
  subscribeToUser,
  driverSendMessage
} from "../../actions/socket";
import { getUsers } from "../../actions/socketActions";

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

import "../../App.css";

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

class Driver extends Component {
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
      driverMessage: "",
      user: []
    };

    subscribeToUser((err, user) =>
      this.setState({
        user
      })
    );
  }

  //Allow
  componentDidMount() {
    this.props.getUsers();
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
      const driverLocation = {
        user: auth.user.id,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        status: auth.user.status,
        name: auth.user.name,
        kodePlatNomor: auth.user.kodePlatNomor,
        trayek: auth.user.trayek
      };

      sendDriverLocationToServer(driverLocation);
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

      changeSeat(seat);
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

      changeSeat(seat);
    }
  }

  formSubmitted = event => {
    const { auth } = this.props;
    event.preventDefault();
    let driverMessage = {
      user: auth.user.id,
      message: this.state.driverMessage
    };
    driverSendMessage(driverMessage);
  };

  valueChanged = event => {
    const { name, value } = event.target;

    this.setState(prevState => ({
      driverMessage: {
        ...prevState.driverMessage,
        [name]: value
      }
    }));
  };

  render() {
    const { auth } = this.props;
    const { user } = this.state;
    const position = [this.state.location.lat, this.state.location.lng];

    return (
      <section className="blog-detail" id="blog">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="blog-details">
                <div className="card">
                  <div className="card-header text-center">
                    Map Informations
                  </div>
                  <div className="map">
                    <Map
                      className="map"
                      worldCopyJump={true}
                      center={position}
                      zoom={this.state.zoom}
                    >
                      <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      {/* {this.state.haveUsersLocation ? ( */}
                      <Marker
                        className="alert alert-success"
                        position={position}
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
                                <strong> {auth.user.name}</strong>
                              </h6>
                            </p>
                            <hr />
                            <p className="card-subtitle mb-2 text-muted">
                              <i className="icofont-car" />{" "}
                              <span className="text-uppercase">
                                {auth.user.kodePlatNomor}
                              </span>{" "}
                              <br />
                              <i className="icofont-map-pins" />{" "}
                              {auth.user.trayek} {"  "}{" "}
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
                      {user.map(location => (
                        <Marker
                          position={[location.latitude, location.longitude]}
                          icon={myIcon}
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
                      {/* ) : (
                        ""
                      )} */}
                    </Map>
                  </div>
                </div>
                <div className="post-author">
                  <Link to="#">
                    <i className="icofont-user-alt-7" />
                    {auth.user.name}
                  </Link>
                  <Link to="#">
                    <i className="icofont-calendar" /> 25-12-2019
                  </Link>
                  <Link to="#">
                    <i className="icofont-location-pin" />
                    {this.state.location.lat}, {this.state.location.lng}
                  </Link>
                </div>
                <p>
                  Drivers can see information in <i>real-time</i>. Information
                  about the location of the passenger, the number of passengers
                  at that location, the time of the transit of public
                  transportation to the location of the passenger is located.
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

Driver.propTypes = {
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
  { getUsers }
)(Driver);
