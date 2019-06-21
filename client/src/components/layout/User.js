import React, { Component } from "react";

import { Link } from "react-router-dom";
import L from "leaflet";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import {
  Card,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  CardTitle
} from "reactstrap";
import iconUrl from "../../user-placeholder.png";

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

var myIcon = L.icon({
  iconUrl,
  iconSize: [35, 51],       // Ikuran Icon
  iconAnchor: [29, 62],     // Ukuran Popup ke Atas / ke bawah
  popupAnchor: [-10, -57]   // Ukuran Popup ke kiri / Ke kanan
});

class User extends Component {
  state = {
    location: {
      lat: 51.505,
      lng: -0.09
    },
    haveUsersLocation: false,
    zoom: 2,
    counter: 1,
    userMessage: {
      name: '',
      message: ''
    }
  };

  //Allow
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          haveUsersLocation: true,
          zoom: 17
        });
      },
      () => {
        console.log("uh oh... they didnt give us their location...");
        fetch("https://ipapi.co/json")
          .then(res => res.json())
          .then(location => {
            this.setState({
              location: {
                lat: location.latitude,
                lng: location.longitude
              },
              haveUsersLocation: true,
              zoom: 17
            });
          });
      }
    );
  }

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

  increment(){
    if(this.state.counter === 10){
        this.setState({
            counter:10
        });
      }else {
        this.setState(prevState => ({
            counter: prevState.counter + 1
        }));
      }
    }
  
  // Decrement
  decrement(){
    if(this.state.counter === 1){
      this.setState({
          counter:1
      });
    }else {
      this.setState(prevState => ({
          counter: prevState.counter - 1
      }));
    }
  }

  render() {
    const position = [this.state.location.lat, this.state.location.lng];
    return (
      <section className="blog-detail" id="blog">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="blog-details">
                <div className="card">
                  <div className="card-header text-center">Map Informations</div>
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
                      {this.state.haveUsersLocation ? (
                        <Marker
                          class="alert alert-success"
                          position={position}
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
                                  <strong> Alva Mende</strong>
                                </h6>
                              </p>
                              <hr />
                              <p className="card-subtitle mb-2 text-muted">
                                <i className="icofont-clock-time" />{" "}
                                <span className="text-success">20 minutes</span>{" "}
                                from your location <br />
                              </p>
                              <hr />
                              <p className="card-text">
                                <i className="icofont-ui-message text-primary" />{" "}
                                the card title and the card's content.
                              </p>
                            </div>
                          </Popup>
                        </Marker>
                      ) : (
                        ""
                      )}
                    </Map>
                  </div>
                </div>
                <div className="post-author">
                  <Link to="#">
                    <i className="icofont-user-alt-7" />
                    Alva Mende
                  </Link>
                  <Link to="#">
                    <i className="icofont-calendar" />
                    29 Maret 2019
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
                    <div className="btn-group btn-block">
                      <button
                        type="button"
                        className="btn btn-primary dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i className="icofont-search" /> Route
                      </button>
                      <div className="dropdown-menu">
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
                      </div>
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <Label for="message">Passengers</Label>
                    <div className="input-counter input-group">
                        <div className="input-group-prepend">
                            <button type="button" className="btn btn-primary" id="minus" onClick={this.decrement.bind(this)}>
                                <i className="fa fa-minus"></i>
                            </button>
                        </div>
                        <input type="text" className="form-control counter text-center" id="date" value={this.state.counter}/>
                        <div className="input-group-append">
                            <button type="button" className="btn btn-primary btn-add btn-block" id="plus" onClick={this.increment.bind(this)}>
                                <i className="fa fa-plus"></i>
                            </button>
                        </div>
                    </div>
                  </FormGroup>
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

export default User;
