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
        this.setState({
          messages: res
        });
      })
      .catch(err => {});
    this.setMssages(this.messages);
  };

  componentDidMount() {
    this.receiver = this.props.navigation.state.params.receiver;

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
    }));
  };

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));

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
        }
      };
      return gcm;
    });

    this.props.UserAction.sendMessage(giftedChatMessages[0]);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <NavigationEvents onWillBlur={() => this.saveLocalStorage()} />
        <GlobalHeader
          Drawer={() =>
            this.props.navigation.dispatch(DrawerActions.toggleDrawer())
          }
          searchIcon={true}
          leftArrow={true}
          elevation={1}
          backgroundColor={"#154a63"}
          leftHeading={"sss"}
          navigation={this.props.navigation}
        />

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
