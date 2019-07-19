import React, { Component } from "react";
import { render } from "react-dom";
import { withScriptjs } from "react-google-maps";
import Map from "./MapComponentTravel";

class MapTravel extends Component {
  render() {
    const MapLoader = withScriptjs(Map);
    return (
      <MapLoader
        googleMapURL="//maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAweI_P52CiPHckWtKvOyhDMR3Sv-vcJzw&signed_in=true&libraries=places"
        loadingElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}

export default MapTravel;
