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
        icon={{
          url: iconUrl,
          size: { width: 30, height: 30 },
          scaledSize: { width: 30, height: 30 }
        }}
      />
    )}
  </GoogleMap>
));
// )(props => {
//   return (
//     <GoogleMap
//       defaultZoom={8}
//       defaultCenter={{ lat: props.latitude, lng: props.longitude }}
//     >
//       {props.markers.map(marker => {
//         const onClick = props.onClick.bind(this, marker);
//         return (
//           <Marker
//             key={marker.id}
//             onClick={onClick}
//             position={{ lat: marker.latitude, lng: marker.longitude }}
//           >
//             {props.selectedMarker === marker && (
//               <InfoWindow>
//                 <div>{marker.shelter}</div>
//               </InfoWindow>
//             )}
//           </Marker>
//         );
//       })}
//     </GoogleMap>
//   );
// });

export default MapComponent;
