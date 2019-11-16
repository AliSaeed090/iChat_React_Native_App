import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { Container, Content } from "native-base";
import Feather from "react-native-vector-icons/Feather";

export default class Inbox extends Component {
  constructor() {
    super();
    this.state = {
      arr: [
        {
          img: require("../../assets/images/p.png"),
          name: "James Atique",
          time: "November 28 11:00"
        },
        {
          img: require("../../assets/images/p1.jpeg"),
          name: "Fahad Nazir",
          time: "November 28 11:00"
        },
        {
          img: require("../../assets/images/p.png"),
          name: "Ali Farooq",
          msg: "Good Morning! Lorem Ipsum is simply dummy text",
          time: "November 28 11:00"
        },
        {
          img: require("../../assets/images/p4t.png"),
          name: "Karwan Topi",
          time: "November 28 11:00"
        },
        {
          img: require("../../assets/images/p4t.png"),
          name: "Atique Ahmed",
          time: "November 28 11:00"
        },
        {
          img: require("../../assets/images/p4t.png"),
          name: "Asher Baig",
          time: "November 28 11:00"
        },
        {
          img: require("../../assets/images/p.png"),
          name: "Hammad Azeem",
          time: "November 28 11:00"
        },
        {
          img: require("../../assets/images/p4t.png"),
          name: "Ali Saeed",
          time: "November 28 11:00"
        },
        {
          img: require("../../assets/images/p.png"),
          name: "Asher",
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
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("SignUp")}
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
                      width: "85%",
                      //   alignSelf: "center",
                      alignItems: "center"
                    }}
                  >
                    <View>
                      <Image
                        style={{ width: 60, height: 60, resizeMode: "contain" }}
                        source={data.img}
                      />
                    </View>
                    <View style={{ width: "85%", marginLeft: 10 }}>
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
                        width: "20%",
                        // borderWidth: 1,
                        height: 40,
                        justifyContent: "center"
                      }}
                    >
                      <Feather name="phone-call" size={22} color="#154a63" />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </Content>
      </Container>
    );
  }
}
