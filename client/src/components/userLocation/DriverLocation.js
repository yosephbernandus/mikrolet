import React, { Component } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import { compose, withProps } from "recompose";
import iconUrl from "../../car-placeholder.svg";

const DriverLocation = compose(
  withProps({
    googleMapURL:
      "//maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAweI_P52CiPHckWtKvOyhDMR3Sv-vcJzw&signed_in=true&libraries=places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => {
  return (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={{ lat: props.latitude, lng: props.longitude }}
    >
      {props.markers.map(marker => {
        let newLat = parseFloat(marker.latitude);
        let newLong = parseFloat(marker.longitude);
        const onClick = props.onClick.bind(this, marker);
        return (
          <Marker
            key={marker._id}
            onClick={onClick}
            position={{ lat: newLat, lng: newLong }}
            icon={{
              url: iconUrl,
              size: { width: 30, height: 30 },
              scaledSize: { width: 30, height: 30 }
            }}
          >
            {props.selectedMarker === marker && (
              <InfoWindow>
                <div>{marker.name}</div>
              </InfoWindow>
            )}
          </Marker>
        );
      })}
    </GoogleMap>
  );
});

export default DriverLocation;
