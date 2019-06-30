import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import L from "leaflet";
import { Marker, Popup } from "react-leaflet";
import iconUrl from "../../car-placeholder.png";

var driverIcon = L.icon({
  iconUrl,
  iconSize: [35, 51], // Ikuran Icon
  iconAnchor: [29, 62], // Ukuran Popup ke Atas / ke bawah
  popupAnchor: [-10, -57] // Ukuran Popup ke kiri / Ke kanan
});

class DriverLocation extends Component {
  render() {
    const { location } = this.props;
    return (
      <Marker
        position={[location.latitude, location.longitude]}
        icon={driverIcon}
      >
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    );
  }
}

DriverLocation.propTypes = {
  location: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(DriverLocation);
