import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { Container, Content } from "native-base";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default class Inbox extends Component {
  constructor() {
    super();
    this.state = {
      arr: [
        {
          img: require("../../assets/images/p.png"),
          name: "James Atique",
          time: "November 28 11:00"
        }
      ]
    };
  }
  render() {
    return (
      <Container>
        <Content>
          {this.state.arr.map((data, index) => {
            return (
              <View
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
                    width: "85%",
                    alignSelf: "center",
                    justifyContent: "center"
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      width: "100%",

                      alignItems: "center"
                    }}
                  >
                    <View>
                      <Image
                        style={{ width: 60, height: 60, resizeMode: "contain" }}
                        source={data.img}
                      />
                    </View>
                    <View style={{ width: "100%", marginLeft: 10 }}>
                      <Text
                        style={{
                          fontSize: 17,
                          fontWeight: "bold",
                          color: "black"
                        }}
                      >
                        {data.name}
                      </Text>
                      <Text style={{ fontSize: 15 }}>{data.time}</Text>
                    </View>
                    <View
                      style={{
                        // width: "30%",
                        // borderWidth: 1,
                        flexDirection: "row",
                        height: 40,
                        justifyContent: "center",
                        position: "absolute",
                        top: 20,
                        right: 0
                      }}
                    >
                      <TouchableOpacity
                        onPress={() =>
                          this.props.screenProps.stack.navigate("WebrtcAudio")
                        }
                      >
                        <Feather name="phone-call" size={22} color="#154a63" />
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() =>
                          this.props.screenProps.stack.navigate("WebRtc")
                        }
                      >
                        <MaterialIcons
                          name="video-call"
                          size={30}
                          color="#154a63"
                          style={{ marginLeft: 30 }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </Content>
      </Container>
    );
  }
}
