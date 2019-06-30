import React, { Component } from "react";
import PropTypes from "prop-types";
import DriverLocation from "./DriverLocation";

class SetDriverLocation extends Component {
  render() {
    const { socket } = this.props;

    return socket.map(location => (
      <DriverLocation key={location._id} location={location} />
    ));
  }
}

SetDriverLocation.propTypes = {
  driveLocation: PropTypes.array.isRequired
};

export default SetDriverLocation;
