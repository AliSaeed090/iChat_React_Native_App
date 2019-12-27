import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import io from "socket.io-client";
import server from "../components/server";

const socket = io(server);
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

const configuration = { iceServers: [{ url: "stun:stun.l.google.com:19302" }] };
const pc = new RTCPeerConnection(configuration);
const remote_pc = new RTCPeerConnection(configuration);

let isFront = true;

export default class WebRtc extends Component {
  constructor() {
    super();
    this.state = {
      localStreamURL: null,
      remoteStreamURL: null
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
          pc.addStream(stream);
          pc.createOffer().then(sdp => {
            pc.setLocalDescription(sdp).then(() => {
              socket.emit("offer", pc.localDescription);
            });
          });

          console.log("stream", stream);

          this.setState({ localStreamURL: stream });
        })
        .catch(error => {
          // Log error
        });
    });
  };

  componentDidMount() {
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
              minHeight: 0,
              minFrameRate: 0
            },
            facingMode: isFront ? "user" : "environment",
            optional: videoSourceId ? [{ sourceId: videoSourceId }] : []
          }
        })
        .then(stream => {
          pc.addStream(stream);
          pc.createOffer().then(sdp => {
            pc.setLocalDescription(sdp).then(() => {
              socket.emit("offer", pc.localDescription);
            });
          });

          console.log("stream", stream);

          this.setState({ localStreamURL: stream });
        })
        .catch(error => {
          // Log error
        });
    });

    socket.on("offer", message => {
      console.log("offer", message);
      remote_pc.setRemoteDescription(message).then(() => {
        remote_pc.createAnswer().then(sdp => {
          remote_pc.setLocalDescription(sdp).then(() => {
            socket.emit("Answer", remote_pc.localDescription);
          });
        });
      });
      remote_pc.onaddstream = event => {
        console.log("remote_pc.onaddstreamEvent", event.stream);
        this.setState({ remoteStreamURL: event.stream });
      };
    });
    socket.on("Answer", message => {
      pc.setRemoteDescription(message);
    });

    pc.onicecandidate = event => {
      // send event.candidate to peer

      if (event.icecandidate) {
        socket.emit("candidate", candidate);
      }
      console.log("onicecandidate", event);
    };

    socket.on("candidate", candidate => {
      const c = new RTCIceCandidate(candidate);
      pc.addIceCandidate(c);
    });
  }

  // remote_pc.setRemoteDescription(new RTCSessionDescription(offer), ...) {
  //   remote_pc.createAnswer()
  // }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={{
            // marginTop: 20,
            width: 100,
            height: 50,
            backgroundColor: "gray",
            position: "absolute",
            bottom: 10,
            left: 70,
            zIndex: 100
          }}
          onPress={() => this.call()}
        >
          <View
          // style={{
          //   // marginTop: 20,
          //   width: "30%",
          //   height: "10%",
          //   backgroundColor: "gray",
          //   alignItems: "center",
          //   justifyContent: "center",
          //   position: "absolute",
          //   bottom: 100,
          //   left: 50,
          //   zIndex: 100
          // }}
          >
            <Text> Start Call</Text>
          </View>
        </TouchableOpacity>
        {this.state.remoteStreamURL ? (
          <View style={{ flex: 1 }}>
            <View style={styles.localStream}>
              {this.state.localStreamURL && (
                <RTCView
                  streamURL={this.state.localStreamURL.toURL()}
                  style={styles.rtcView}
                />
              )}
            </View>
            <View style={styles.videoWidget}>
              {this.state.remoteStreamURL && (
                <RTCView
                  streamURL={this.state.remoteStreamURL.toURL()}
                  style={styles.rtcView}
                />
              )}
            </View>
          </View>
        ) : (
          this.state.localStreamURL && (
            <RTCView
              streamURL={this.state.localStreamURL.toURL()}
              style={styles.rtcView}
            />
          )
        )}

        {/* <View style={styles.videoWidget}>
          {this.state.localStreamURL && (
            <RTCView
              streamURL={this.state.localStreamURL.toURL()}
              style={styles.rtcView}
            />
          )}
        </View> */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  videoWidget: {
    position: "relative",
    flex: 1,
    backgroundColor: "#fff"
    // width: "100%",
  },
  rtcView: {
    flex: 1,
    // width: "100%",
    backgroundColor: "black",
    position: "relative"
  },
  localStream: {
    position: "absolute",
    height: "20%",
    width: "30%",
    top: 5,
    left: 5,
    zIndex: 100,
    backgroundColor: "black"
  }
});