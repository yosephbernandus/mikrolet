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
      zoom: 2,
      shelters: [],
      selectedMarker: false
    };
  }

  componentDidMount() {
    fetch("https://api.harveyneeds.org/api/v1/shelters?limit=20")
      .then(r => r.json())
      .then(data => {
        this.setState({ shelters: data.shelters });
      });
  }

  handleClick = (marker, event) => {
    // console.log({ marker })
    this.setState({ selectedMarker: marker });
  };

  render() {
    const { dispatch } = this.props;
    const location = [this.state.location.lat, this.state.location.lng];
    dispatch({ type: "SEND_LOCATION", location });
    sendLocationToServer(location);

    return (
      <MapComponent
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
        selectedMarker={this.state.selectedMarker}
        markers={this.state.shelters}
        onClick={this.handleClick}
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
