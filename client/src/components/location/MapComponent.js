import React, { Component } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import { compose, withProps } from "recompose";

const MapComponent = compose(
  withProps({
    googleMapURL:
      "//maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAweI_P52CiPHckWtKvOyhDMR3Sv-vcJzw&signed_in=true&libraries=places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultZoom={13}
    defaultCenter={{ lat: props.latitude, lng: props.longitude }}
  >
    {props.isMarkerShown && (
      <Marker
        position={{ lat: props.latitude, lng: props.longitude }}
        onClick={props.onMarkerClick}
      />
    )}
  </GoogleMap>
));

export default MapComponent;
