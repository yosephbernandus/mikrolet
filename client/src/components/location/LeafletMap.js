import React, { Component } from "react";
import { Map, TileLayer } from "react-leaflet";
import Routing from "./Routing";

class LeafletMap extends Component {
  state = {
    lat: 57.74,
    lng: 11.94,
    zoom: 13,
    isMapInit: true
  };

  saveMap = map => {
    this.map = map;
    this.setState({
      isMapInit: true
    });
  };

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <div>
        <div className="map">
          <Map className="map" center={position} zoom={this.state.zoom}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {this.state.isMapInit && <Routing map={this.refs.map} />}
          </Map>
        </div>
      </div>
    );
  }
}

export default LeafletMap;
