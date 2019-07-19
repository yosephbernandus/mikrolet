/*global google*/
import React, { Component } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  DirectionsRenderer
} from "react-google-maps";
class MapComponentTravel extends Component {
  state = {
    directions: null,
    estimated: null,
    kilometer: null
  };

  componentDidMount() {
    const directionsService = new google.maps.DirectionsService();

    const origin = { lat: 1.46415, lng: 124.964304 };
    const destination = { lat: 1.472714, lng: 124.831691 };
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          const time = result.routes[0];
          const legs = time.legs[0].duration.text;
          const km = time.legs[0].distance.text;
          this.setState({
            directions: result,
            estimated: legs,
            kilometer: km
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }

  render() {
    const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap
        defaultCenter={{ lat: 40.756795, lng: -73.954298 }}
        defaultZoom={13}
      >
        <DirectionsRenderer directions={this.state.directions} />
      </GoogleMap>
    ));

    return (
      <div>
        <GoogleMapExample
          containerElement={<div style={{ height: `500px`, width: "500px" }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
        {this.state.estimated}
        {this.state.kilometer}
      </div>
    );
  }
}

export default MapComponentTravel;
