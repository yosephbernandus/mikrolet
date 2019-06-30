import React, { Component } from "react";
import MapComponent from "./MapComponent";
import { sendLocationToServer } from "../../actions/socket";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        lat: 51.505,
        lng: -0.09
      },
      isMarkerShown: true,
      haveUsersLocation: false,
      zoom: 2
    };
  }

  componentDidMount() {
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

  render() {
    const { dispatch } = this.props;
    const location = [this.state.location.lat, this.state.location.lng];
    dispatch({ type: "SEND_LOCATION", location });
    sendLocationToServer(location);

    return (
      <MapComponent
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
        latitude={this.state.location.lat}
        longitude={this.state.location.lng}
      />
    );
  }
}

MapView.propTypes = {
  location: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  location: state.location
});

export default connect(mapStateToProps)(MapView);
