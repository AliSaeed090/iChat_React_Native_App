import { GiftedChat } from "react-native-gifted-chat";
import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Container, Content } from "native-base";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as UserAction from "../redux/actions/UserAction";
import io from "socket.io-client";
import uuid4 from "uuid4";

// const socket = io("http://192.168.0.101:3100");
// import axios from "axios";
// const server = "http://localhost:3100";
const socket = io("http://192.168.0.106:3000");

class Chat extends Component {
  state = {
    messages: [],
    friends: [],
    receiver: ""
    // messages2: []
  };

  // getMsgFromServer = () => {
  //   axios
  //     .get("http://192.168.0.106:3100/messages")
  //     .then(response => {
  //       if (response.status == 200) {
  //         console.log("llll");
  //         this.setState({ messages: response.data });

  //         // let msg = this.state.messages;

  //         // msg = response.data;
  //         // this.state.messages = msg;
  //         // this.forceUpdate();
  //       }
  //       console.log("getReq", response);
  //     })
  //     .catch(function(error) {
  //       console.log("error", error);
  //     });
  // };

  componentDidMount() {
    socket.emit("userConected", this.props.cellNo);

    socket.on("user_connected", user => {
      let friends = [...this.state.friends];
      friends.push([user]);
      this.setState({ friends });
    });
    socket.on("mess", (obj, receiver) => {
      let messages = this.state.messages;
      // messages.push(obj);
      console.log("Messobj");
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, obj),
        receiver: receiver
      }));
    });

    // console.log("usrProps", this.props.cellNo);

    (this.receiver = this.props.navigation.state.params.receiver),
      console.log("this.receiver", this.receiver);

    if (this.receiver) {
      this.setReceiver(this.receiver);
    }

    // {this.props.navigation.state.params.Name}

    // let Phone = this.props.user;
    // console.log("Phone", Phone._user.phoneNumber);

    // Backend.loadMessages((message) => {
    //   this.setState((previousState) => {
    //     return {
    //       messages: GiftedChat.append(previousState.messages, message),
    //     };
    //   });
    // });

    // loadMessages(callback) {
    //   this.messagesRef = firebase.database().ref('messages');
    //   this.messagesRef.off();
    //   const onReceive = (data) => {
    //     const message = data.val();
    //     callback({
    //       _id: data.key,
    //       text: message.text,
    //       createdAt: new Date(message.createdAt),
    //       user: {
    //         _id: message.user._id,
    //         name: message.user.name,
    //       },
    //     });
    //   };
    //   this.messagesRef.limitToLast(20).on('child_added', onReceive);
    // }

    // this.setState({
    //   messages: [
    //     {
    //       _id: id,
    //       text: "Hello developer",
    //       createdAt: new Date(),
    //       user: {
    //         _id: 2,
    //         name: "ali",
    //         avatar: require("../../assets/images/p4t.png")
    //       }
    //     },
    //     {
    //       _id: id,
    //       text: "Hello developer2",
    //       createdAt: new Date(),
    //       user: {
    //         _id: 3,
    //         name: "React Native",
    //         avatar: "https://facebook.github.io/react/img/logo_og.png"
    //       }
    //     }
    //   ]
    // });

    // this.getMsgFromServer();
  }
  // message = this.socket.on("mess", obj => {
  //   return obj;
  // });

  // sendMessage(messages) {
  //   this.setState(previousState => ({
  //     messages: GiftedChat.append(previousState.messages, messages)
  //   }));
  //   for (let i = 0; i < messages.length; i++) {
  //     const id = uuid4();
  //     const Newobj = {
  //       id: id,
  //       text: messages[i].text,
  //       user: messages[i].user,
  //       createdAt: new Date()
  //     };
  //   }
  // }

  setReceiver = receiver => {
    this.setState({ receiver });
  };

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
    console.log("messages,", messages);
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
    socket.emit("message", giftedChatMessages[0]);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
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

          {/* {this.state.friends.map((user, ind) => {
            // console.log("user", user);
            return (
              <Content horizontal={true}>
                <View
                  style={{
                    width: "70%",
                    height: 40,
                    backgroundColor: "red",
                    borderWidth: 1
                  }}
                  key={ind}
                >
                  <TouchableOpacity
                    onPress={() => this.setState({ receiver: user })}
                  >
                    <Text>Online friends:{user}</Text>
                  </TouchableOpacity>
                </View>
              </Content>
            );
          })} */}
        </View>

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
    cellNo: state.AuthReducer.cellNo
  };
};
mapActionsToProps = dispatch => ({
  UserAction: bindActionCreators(UserAction, dispatch)
});

export default connect(mapStateToProps, mapActionsToProps)(Chat);
