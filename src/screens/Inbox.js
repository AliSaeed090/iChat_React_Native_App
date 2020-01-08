import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { Container, Content } from "native-base";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as UserAction from "../redux/actions/UserAction";
import io from "socket.io-client";
import Chat from "./Chat";
import AsyncStorage from "@react-native-community/async-storage";
import { NavigationEvents } from "react-navigation";

import server from "../components/server";

const socket = io(server);

class Inbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      props: "",

      onLine: [],

      arr: []
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.newMessage) {
      this.addChatRoom(nextProps.newMessage);
    }
  }

  addChatRoom = data => {
    let newChatRoom = this.state.arr;

    let success = newChatRoom.map((data, i) => data.name);
    var i = success.indexOf(data.user._id);

    if (success.includes(data.user._id)) {
      newChatRoom[i].msg.push(data);
      this.setState({ arr: newChatRoom });
    } else {
      let newData = {
        name: data.user._id,
        msg: [data],
        time: data.createdAt
      };
      newChatRoom.push(newData);
      this.setState({ arr: newChatRoom });
    }
  };

  componentDidMount() {
    socket.emit("getuser");
    socket.on("getuser", user => {
      if (user.includes(this.props.cellNo)) {
        user.splice(user.indexOf(this.props.cellNo), 1);
        this.setState({ onLine: user });
      } else {
        this.setState({ onLine: user });
      }
    });
    socket.on("user_connected", user => {
      if (user.includes(this.props.cellNo)) {
        user.splice(user.indexOf(this.props.cellNo), 1);
        this.setState({ onLine: user });
      } else {
        this.setState({ onLine: user });
      }
    });

    socket.on("mess", (obj, receiver) => {});
  }
  saveLocalStorage = () => {
    let chatRooms = [...this.state.arr];

    if (chatRooms.length) {
      let copyChatRooms = JSON.stringify(chatRooms);

      AsyncStorage.setItem(
        "chatRooms",
        copyChatRooms
      ).then(asyncResponse => {});
    }
  };

  getLocalStorage = () => {
    AsyncStorage.getItem("chatRooms").then(chatRooms => {
      var chatRooms = JSON.parse(chatRooms);
      if (chatRooms) {
        let newChatRooms = [...this.state.arr];

        this.setState({ arr: chatRooms });
      }
    });
  };

  render() {
    return (
      <Container>
        <NavigationEvents
          onWillFocus={() => this.getLocalStorage()}
          onDidFocus={() => this.saveLocalStorage()}
        />
        <View
          style={{
            width: "100%",
            height: 70,
            borderBottomWidth: 1,
            flexDirection: "row"
          }}
        >
          <Text style={{ marginTop: 10 }}>Online:</Text>
          <Content horizontal={true}>
            {this.state.onLine.map((user, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  style={{ marginTop: 10 }}
                  onPress={() =>
                    this.props.screenProps.stack.navigate("Chat", {
                      receiver: user
                    })
                  }
                >
                  <Text style={{ marginLeft: 10 }}>{user}</Text>
                </TouchableOpacity>
              );
            })}
          </Content>
        </View>
        <Content>
          {this.state.arr.map((data, index) => {
            let lastIndex = data.msg.length - 1;
            return (
              <TouchableOpacity
                onPress={() =>
                  this.props.screenProps.stack.navigate("Chat", {
                    receiver: data.name,
                    message: data.msg.reverse()
                  })
                }
                key={index}
                style={{
                  width: "100%",
                  height: 90,
                  justifyContent: "center",
                  alignItems: "center",
                  borderBottomWidth: 1,
                  borderColor: "#e2e2e2"
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    width: "90%",
                    alignSelf: "center",
                    alignItems: "center"
                  }}
                >
                  <View>
                    <View
                      style={{
                        width: 60,
                        height: 60,
                        backgroundColor: "red",
                        borderRadius: 100
                      }}
                    ></View>
                  </View>
                  <View style={{ width: "65%", marginLeft: 10 }}>
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: "bold",
                        color: "black"
                      }}
                    >
                      {data.name}
                    </Text>
                    <Text style={{ fontSize: 15 }}>
                      {data.msg[lastIndex].text}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 15,
                      position: "absolute",
                      top: 5,
                      right: 5
                    }}
                  >
                    {data.time}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </Content>
      </Container>
    );
  }
}

mapStateToProps = state => {
  return {
    confirmResult: state.AuthReducer.confirmResult,
    isErr: state.AuthReducer.isErr,
    err: state.AuthReducer.err,

    cellNo: state.AuthReducer.cellNo,
    newMessage: state.AuthReducer.message
  };
};
mapActionsToProps = dispatch => ({
  UserAction: bindActionCreators(UserAction, dispatch)
});

export default connect(mapStateToProps, mapActionsToProps)(Inbox);
