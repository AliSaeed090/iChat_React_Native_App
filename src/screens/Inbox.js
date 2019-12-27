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
      // navigation: this.props.navigation,
      props: "",
      // onLine: [1111111, 2222222, 33333, 444444],
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
    console.log("data.user._id", data.user._id);
    let success = newChatRoom.map((data, i) => data.name);
    var i = success.indexOf(data.user._id);
    console.log("index", i);
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

    console.log("this.state.arr", this.state.arr);
  };

  componentDidMount() {
    // AsyncStorage.clear();
    console.log("DidMountnextProps", this.props.newMessage);
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

    socket.on("mess", (obj, receiver) => {
      console.log("Messobjaaaaa", obj);
    });
  }
  saveLocalStorage = () => {
    let chatRooms = [...this.state.arr];

    if (chatRooms.length) {
      let copyChatRooms = JSON.stringify(chatRooms);

      AsyncStorage.setItem("chatRooms", copyChatRooms).then(asyncResponse => {
        console.log("asyncResponse", asyncResponse);
      });
    }
  };

  getLocalStorage = () => {
    AsyncStorage.getItem("chatRooms").then(chatRooms => {
      // console.log("chatRooms/chatRoomschatRooms", chatRooms);
      var chatRooms = JSON.parse(chatRooms);
      if (chatRooms) {
        let newChatRooms = [...this.state.arr];
        // newChatRooms.push(chatRooms);
        // console.log("local storage", chatRooms);

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
          // onWillBlur={() => this.saveLocalStorage()}
          // onDidBlur={() => this.saveLocalStorage()}
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
                // onPress={() =>
                //   this.props.navigation.navigate("Chat", {
                //     receiver: data.name,
                //     message: data.msg.reverse()
                //   })
                // }
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
                    {/* <Image
                      style={{ width: 60, height: 60, resizeMode: "contain" }}
                      source={data.img}
                    /> */}
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
    // cellNumber: state.AuthReducer.cellNumber,
    cellNo: state.AuthReducer.cellNo,
    newMessage: state.AuthReducer.message
  };
};
mapActionsToProps = dispatch => ({
  UserAction: bindActionCreators(UserAction, dispatch)
});

export default connect(mapStateToProps, mapActionsToProps)(Inbox);
