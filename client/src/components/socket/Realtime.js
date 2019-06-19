// import React, { Component } from "react";
// import { connect } from "react-redux";
// import {
//   getCurrentPot,
//   sendNameToServer,
//   sendPitchInToServer,
//   sendGetOneToServer
// } from "../../actions/socket";
// import { getAName } from "../../usernames";

// class Realtime extends Component {
//   componentDidMount() {
//     const { dispatch } = this.props;
//     const name = getAName();
//     // when our app mounts, it should always be updated of the pot's
//     // current value
//     getCurrentPot(dispatch);
//     //put this socket's username inside the server
//     dispatch({ type: "ASSIGNED_USERNAME", name });
//     sendNameToServer(name);
//   }

//   getOne = () => {
//     const { dispatch, name } = this.props;
//     dispatch({ type: "GET_ONE" });
//     sendGetOneToServer(name);
//   };

//   // event handler when the pitch in button is clicked
//   // sends the event to the server so every one
//   // connected will be updated
//   pitchIn = () => {
//     const { dispatch, name } = this.props;
//     dispatch({ type: "PITCH_IN" });
//     sendPitchInToServer(name);
//   };

//   render() {
//     const { pot, name, names, mode, whoDidIt } = this.props;
//     return (
//       <div className="container" style={{ justifyContent: "center" }}>
//         <div style={{ textAlign: "center" }}>
//           <h1>{pot}</h1>
//         </div>
//         <div style={{ textAlign: "right" }}>
//           <button onClick={this.pitchIn}> pitch in!</button>
//         </div>
//         <div style={{ textAlign: "left" }}>
//           <button onClick={this.getOne}> get one!</button>
//         </div>
//         <div style={{ textAlign: "center" }}>
//           <div
//             style={{
//               height: "500px",
//               textAlign: "center",
//               width: "300px",
//               border: "1px solid black",
//               display: "inline-block"
//             }}
//           >
//             Your assigned username is{" "}
//             <span style={{ color: "red" }}>{name}</span>
//             <div style={{ padding: "10px" }}>
//               Other members:
//               {names.length <= 1 ? (
//                 <div style={{ color: "red" }}>No other members yet</div>
//               ) : (
//                 names.map(member => (
//                   <div
//                     style={{ display: name === member && "none" }}
//                     key={member}
//                   >
//                     {member}
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// const mapStateToProps = state => ({
//   pot: state.pot,
//   name: state.name,
//   names: state.names,
//   mode: state.mode,
//   whoDidIt: state.whoDidIt
// });

// export default connect(mapStateToProps)(Realtime);

import React, { Component } from "react";
import { subscribeToTimer } from "../../actions/api";

class Realtime extends Component {
  constructor(props) {
    super(props);
    subscribeToTimer((err, timestamp) =>
      this.setState({
        timestamp
      })
    );
  }

  state = {
    timestamp: "no timestamp yet"
  };

  render() {
    return <div>This is the timer value: {this.state.timestamp}</div>;
  }
}

export default Realtime;
