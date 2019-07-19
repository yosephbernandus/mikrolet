// import { MapLayer } from "react-leaflet";
// import L from "leaflet";
// import "leaflet-routing-machine";
// import "leaflet-control-geocoder";
// import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
// import { withLeaflet } from "react-leaflet";

// class Routing extends MapLayer {
//   createLeafletElement() {
//     const { map } = this.props;
//     const waypoints = [L.latLng(27.67, 85.316), L.latLng(27.68, 85.321)];
//     const icon = L.icon({
//       iconUrl:
//         "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png",
//       iconSize: [40, 40]
//     });
//     let leafletElement = L.Routing.control({
//       waypoints,
//       plan: L.Routing.plan(waypoints, {
//         createMarker: function(i, wp) {
//           return L.marker(wp.latLng, {
//             draggable: true,
//             icon
//           });
//         },
//         routeWhileDragging: true
//       })
//     }).addTo(map.leafletElement);
//     return leafletElement.getPlan();
//   }
// }
// export default withLeaflet(Routing);

import { MapLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import { withLeaflet } from "react-leaflet";

class Routing extends MapLayer {
  createLeafletElement() {
    const { map } = this.props;
    let leafletElement = L.Routing.control({
      waypoints: [L.latLng(27.67, 85.316), L.latLng(27.68, 85.321)]
    }).addTo(map.leafletElement);
    return leafletElement.getPlan();
  }
}
export default withLeaflet(Routing);
