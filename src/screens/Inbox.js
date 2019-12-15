import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { Container, Content } from "native-base";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as UserAction from "../redux/actions/UserAction";
import io from "socket.io-client";
import Chat from "./Chat";

// const navigation = this.props.navigation.navigate();
const socket = io("http://192.168.0.106:3000");

class Inbox extends Component {
  constructor() {
    super();
    this.state = {
      // navigation: this.props.navigation,
      props: "",
      // onLine: [1111111, 2222222, 33333, 444444],
      onLine: [],

      arr: [
        {
          img: require("../../assets/images/p.png"),
          name: "James Atique",
          msg: "Good Morning! Lorem Ipsum is simply dummy text",
          time: "11:00"
        }
        // {
        //   img: require("../../assets/images/p1.jpeg"),
        //   name: "Fahad Nazir",
        //   msg: "Good Morning! Lorem Ipsum is simply dummy text",
        //   time: "11:00"
        // },
        // {
        //   img: require("../../assets/images/p.png"),
        //   name: "Ali Farooq",
        //   msg: "Good Morning! Lorem Ipsum is simply dummy text",
        //   time: "11:00"
        // },
        // {
        //   img: require("../../assets/images/p4t.png"),
        //   name: "Karwan Topi",
        //   msg: "Good Morning! Lorem Ipsum is simply dummy text",
        //   time: "11:00"
        // },
        // {
        //   img: require("../../assets/images/p4t.png"),
        //   name: "Atique Ahmed",
        //   msg: "Good Morning! Lorem Ipsum is simply dummy text",
        //   time: "11:00"
        // },
        // {
        //   img: require("../../assets/images/p4t.png"),
        //   name: "Asher Baig",
        //   msg: "Good Morning! Lorem Ipsum is simply dummy text",
        //   time: "11:00"
        // },
        // {
        //   img: require("../../assets/images/p.png"),
        //   name: "Hammad Azeem",
        //   msg: "Good Morning! Lorem Ipsum is simply dummy text",
        //   time: "11:00"
        // },
        // {
        //   img: require("../../assets/images/p4t.png"),
        //   name: "Ali Saeed",
        //   msg: "Good Morning! Lorem Ipsum is simply dummy text",
        //   time: "11:00"
        // },
        // {
        //   img: require("../../assets/images/p.png"),
        //   name: "Asher",
        //   msg: "Good Morning! Lorem Ipsum is simply dummy text",
        //   time: "11:00"
        // }
      ]
    };
  }

  componentDidMount() {
    console.log("nextProps", this.state.props);

    socket.on("user_connected", user => {
      for (i = 0; i <= user.length; i++) {
        let onLine = [...this.state.onLine];
        if (user[i] === onLine[i]) {
          let value = this.props.cellNo;
          onLine = onLine.filter(item => item !== value);

          this.setState({ onLine });
        } else {
          onLine.push(user[i]);
          let value = this.props.cellNo;
          onLine = onLine.filter(item => item !== value);
          this.setState({ onLine });
        }
      }
      // let onLine = [...this.state.onLine];
      // onLine.push(user);
    });
  }

  render() {
    return (
      <Container>
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
                    this.props.navigation.navigate("Chat", { receiver: user })
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
            return (
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("Chat", {
                    receiver: this.state.onLine
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
                    <Image
                      style={{ width: 60, height: 60, resizeMode: "contain" }}
                      source={data.img}
                    />
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
                    <Text style={{ fontSize: 15 }}>{data.msg}</Text>
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
    cellNo: state.AuthReducer.cellNo
  };
};
mapActionsToProps = dispatch => ({
  UserAction: bindActionCreators(UserAction, dispatch)
});

export default connect(mapStateToProps, mapActionsToProps)(Inbox);
