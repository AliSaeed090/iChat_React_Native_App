import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import io from "socket.io-client";
import Peer from "react-native-peerjs";

import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  mediaDevices,
  registerGlobals
} from "react-native-webrtc";
import { TouchableOpacity } from "react-native-gesture-handler";

// const socket = io("http://192.168.0.104:3000");

// const configuration = { iceServers: [{ url: "stun:stun.l.google.com:19302" }] };
// const pc = new RTCPeerConnection(configuration);
// const remote_pc = new RTCPeerConnection(configuration);

let isFront = true;

// pc.createOffer().then(desc => {
//   pc.setLocalDescription(desc).then(() => {
//     // Send pc.localDescription to peer
//   });
// });

// pc.onicecandidate = function(event) {
//   // send event.candidate to peer
// };

export default class WebRtc extends Component {
  constructor() {
    super();
    this.state = {
      localStreamURL: null,
      remoteStreamURL: null,
      remotePeerId: ""
    };
  }

  call = () => {
    mediaDevices.enumerateDevices().then(sourceInfos => {
      console.log("sourceInfos", sourceInfos);
      let videoSourceId;
      for (let i = 0; i < sourceInfos.length; i++) {
        const sourceInfo = sourceInfos[i];
        if (
          sourceInfo.kind == "videoinput" &&
          sourceInfo.facing == (isFront ? "front" : "environment")
        ) {
          videoSourceId = sourceInfo.deviceId;
        }
      }

      mediaDevices
        .getUserMedia({
          audio: true,
          video: {
            mandatory: {
              minWidth: 500, // Provide your own width, height and frame rate here
              minHeight: 300,
              minFrameRate: 30
            },
            facingMode: isFront ? "user" : "environment",
            optional: videoSourceId ? [{ sourceId: videoSourceId }] : []
          }
        })
        .then(stream => {
          const localPeer = new Peer();
          const call = localPeer.call(this.state.remotePeerId, stream);
          localPeer.on("open", localPeerId => {
            console.log("Local peer open with ID ", localPeerId);
          });
          call.on("stream", remoteStream => {
            // Show stream in some <video> element.
            this.setState({ remoteStream });
          });

          //   this.setState({ localStreamURL: stream });
        })
        .catch(error => {
          // Log error
          console.log("Calling Streem err", error);
        });
    });
  };
  receiveCall = () => {
    const remotePeer = new Peer();

    remotePeer.on("error", console.log);
    remotePeer.on("open", remotePeerId => {
      this.setState({ remotePeerId });
      console.log("Remote peer open with ID", remotePeerId);
    });

    remotePeer.on("call", call => {
      console.log("listened Call Event", call);
      call.on("stream", remoteStream => {
        // Show stream in some <video> element.
        console.log("remoteStream/remoteStream", remoteStream);
        this.setState({ remoteStreamURL: remoteStream });
      });
      mediaDevices
        .getUserMedia({
          audio: true,
          video: {
            mandatory: {
              minWidth: 500, // Provide your own width, height and frame rate here
              minHeight: 300,
              minFrameRate: 30
            },
            facingMode: isFront ? "user" : "environment"
            // optional: videoSourceId ? [{ sourceId: videoSourceId }] : []
          }
        })
        .then(
          stream => {
            call.answer(stream); // Answer the call with an A/V stream.
            call.on("stream", remoteStream => {
              // Show stream in some <video> element.
              console.log("remoteStream/remoteStream", remoteStream);
              this.setState({ remoteStreamURL: remoteStream });
            });
          },
          err => {
            console.error("Failed to get local stream", err);
          }
        );
    });
  };

  componentDidMount() {
    // socket.on("offer", message => {
    //   console.log("offer", message);
    //   remote_pc.setRemoteDescription(message).then(() => {
    //     remote_pc.createAnswer().then(sdp => {
    //       pc.setLocalDescription(sdp).then(() => {
    //         socket.emit("Answer", pc.localDescription);
    //       });
    //     });
    //   });
    //   remote_pc.onaddstream = event => {
    //     this.setState({ remoteStreamURL: event.stream });
    //   };
    // });
    // socket.on("Answer", message => {
    //   pc.setLocalDescription(message);
    // });
  }

  // remote_pc.setRemoteDescription(new RTCSessionDescription(offer), ...) {
  //   remote_pc.createAnswer()
  // }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => this.call()}
          style={{
            marginTop: 20,
            width: 100,
            height: 50,
            backgroundColor: "gray",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text> Start Call</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.receiveCall()}
          style={{
            marginTop: 20,
            width: 100,
            height: 50,
            backgroundColor: "gray",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text> Receive Call</Text>
        </TouchableOpacity>
        <View style={styles.videoWidget}>
          {this.state.remoteStreamURL && (
            <RTCView
              streamURL={this.state.remoteStreamURL.toURL()}
              style={styles.rtcView}
            />
          )}
        </View>
        {/* remoteStreamURL
        localStreamURL */}

        <View style={styles.videoWidget}>
          {this.state.localStreamURL && (
            <RTCView
              streamURL={this.state.localStreamURL.toURL()}
              style={styles.rtcView}
            />
          )}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  bottomView: {
    height: 20,
    flex: 1,
    bottom: 80,
    position: "absolute",
    alignItems: "center"
  },
  connect: {
    fontSize: 30
  },
  video: {
    flex: 1,
    flexDirection: "row",
    position: "relative",
    backgroundColor: "#eee",
    alignSelf: "stretch"
  },
  onlineCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#1e1",
    position: "absolute",
    top: 10,
    left: 10
  },
  offlineCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#333"
  },
  callerVideo: {
    flex: 0.5,
    backgroundColor: "#faa",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  calleeVideo: {
    flex: 0.5,
    backgroundColor: "#aaf",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  videoWidget: {
    position: "relative",
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
    borderWidth: 1,
    borderColor: "#eee"
  },
  rtcView: {
    flex: 1,
    width: "100%",
    backgroundColor: "#f00",
    position: "relative"
  }
});
