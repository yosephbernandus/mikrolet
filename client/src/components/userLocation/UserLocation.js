import React, { Component } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import { compose, withProps } from "recompose";
import iconUrl from "../../user-placeholder.svg";
import driverUrl from "../../car-placeholder.svg";

const UserLocation = compose(
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
      <Marker
        position={{ lat: props.latitude, lng: props.longitude }}
        icon={{
          url: iconUrl,
          size: { width: 30, height: 30 },
          scaledSize: { width: 30, height: 30 }
        }}
      />

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
              url: driverUrl,
              size: { width: 30, height: 30 },
              scaledSize: { width: 30, height: 30 }
            }}
          >
            {props.selectedMarker === marker && (
              <InfoWindow>
                <div>
                  <p>
                    <h6 className="card-title">
                      <i
                        className="icofont-user-alt-7 text-primary"
                        color="blue"
                      />
                      <strong> {marker.name}</strong>
                    </h6>
                  </p>
                  <hr />
                  <p className="card-subtitle mb-2 text-muted">
                    <i className="icofont-car" />{" "}
                    <span className="text-uppercase">
                      {marker.kodePlatNomor}
                    </span>{" "}
                    <br />
                    <i className="icofont-map-pins" /> {marker.trayek} {"  "}{" "}
                    <span className="badge badge-secondary">Rp. 6.000,-</span>{" "}
                    <br />
                    <i className="icofont-clock-time" />{" "}
                    <span className="text-success">{props.estimated}</span> to
                    your location
                  </p>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm btn-block"
                    disabled
                  >
                    Jumlah Penumpang{" "}
                    <span className="badge badge-light">{marker.seat}</span>
                  </button>
                  <hr />
                  <p className="card-text">
                    <i className="icofont-ui-message text-primary" /> the card
                    title and the card's content.
                  </p>
                </div>
              </InfoWindow>
            )}
          </Marker>
        );
      })}
    </GoogleMap>
  );
});

export default UserLocation;
