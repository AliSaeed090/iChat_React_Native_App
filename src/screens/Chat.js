import { GiftedChat } from "react-native-gifted-chat";
import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Container, Content } from "native-base";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as UserAction from "../redux/actions/UserAction";
import io from "socket.io-client";
import uuid4 from "uuid4";
import Storage from "react-native-storage";
import AsyncStorage from "@react-native-community/async-storage";
import { NavigationEvents } from "react-navigation";
import GlobalHeader from "../components/GlobalHeader";

// const socket = io("http://192.168.0.101:3100");
// import axios from "axios";
// const server = "http://localhost:3100";
// const socket = io("http://192.168.0.106:3000");
const storage = new Storage({
  size: 1000,

  // Use AsyncStorage for RN apps, or window.localStorage for web apps.
  // If storageBackend is not set, data will be lost after reload.
  storageBackend: AsyncStorage, // for web: window.localStorage

  // expire time, default: 1 day (1000 * 3600 * 24 milliseconds).
  // can be null, which means never expire.
  defaultExpires: 1000 * 3600 * 24,

  // cache data in the memory. default is true.
  enableCache: true

  // if data was not found in storage or expired data was found,
  // the corresponding sync method will be invoked returning
  // the latest data.
});

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      friends: [],
      receiver: ""
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.newMessage) {
      this.setMssages(nextProps.newMessage);
    }
  }

  saveLocalStorage = () => {
    storage.save({
      key: this.props.cellNo + this.receiver,
      data: this.state.messages,
      expires: null
    });
  };

  getLocalData = () => {
    storage
      .load({
        key: this.props.cellNo + this.receiver
      })
      .then(res => {
        console.log("ret", res[0]);
        this.setState({
          messages: res
        });
      })
      .catch(err => {
        // any exception including data not found
        // goes to catch()
        console.warn(err.message);
      });
    this.setMssages(this.messages);
  };

  // componentWillMount() {
  //   this.getLocalData();
  // }

  componentDidMount() {
    // this.receiver = this.props.navigation.state.params.receiver;
    // this.messages = this.props.navigation.state.params.message;

    // storage.remove({
    //   key: this.props.cellNo + this.receiver
    // });
    // if (this.messages) {
    //   this.setMssages(this.messages);
    // }
    // this.getLocalData();

    if (this.receiver) {
      this.setReceiver(this.receiver);
    }
  }

  setReceiver = receiver => {
    this.setState({ receiver });
  };

  setMssages = message => {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, message)
      // receiver: this.state.receiver
    }));
    // this.saveLocalStorage();
  };

  onSend(messages = []) {
    console.log("messages/messages", messages);
    console.log("this.state.messages/this.state.messages", this.state.messages);

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
    // this.saveLocalStorage();
    const id = uuid4();

    let giftedChatMessages = messages.map(chatMessage => {
      let gcm = {
        _id: id,
        text: chatMessage.text,
        createdAt: chatMessage.createdAt,
        user: {
          _id: chatMessage.user._id,
          name: chatMessage.user.name,
          receiver: chatMessage.user.receiver
          // avatar: chatMessage.user.avatar,
          // receiver:
        }
      };
      return gcm;
    });

    this.props.UserAction.sendMessage(giftedChatMessages[0]);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <NavigationEvents
          // onWillFocus={() => this.saveLocalStorage()}
          // onDidFocus={() => this.saveLocalStorage()}
          onWillBlur={() => this.saveLocalStorage()}
          // onDidBlur={() => this.saveLocalStorage()}
        />
        <GlobalHeader
          Drawer={() =>
            this.props.navigation.dispatch(DrawerActions.toggleDrawer())
          }
          searchIcon={true}
          // Points="sss"
          leftArrow1={true}
          elevation={1}
          backgroundColor={"#154a63"}
          leftHeading={"sss"}
          navigation={this.props.navigation}
          // videoCallFunc={() => this.props.navigation.nvigate("WebRtc")}
        />

        {/* <View
          style={{
            width: "100%",
            height: 50,
            flexDirection: "row",
            borderWidth: 1,
            position: "absolute",
            top: 0,
            zIndex: 1
          }}
        >
          <Text>receiver:{this.state.receiver}</Text>
        </View> */}
        {/* {this.state.messages.length > this.state.messages.length
          ? console.log("worked")
          : // ? this.saveLocalStorage()

            null} */}

        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          renderUsernameOnMessage={true}
          user={{
            _id: this.props.cellNo,
            name: "Client",
            receiver: this.state.receiver
          }}
        />
      </View>
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

export default connect(mapStateToProps, mapActionsToProps)(Chat);
