import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { Container, Content } from "native-base";

export default class Inbox extends Component {
  constructor() {
    super();
    this.state = {
      arr: [
        {
          img: require("../../assets/images/p.png"),
          name: "James Atique",
          msg: "Good Morning! Lorem Ipsum is simply dummy text",
          time: "11:00"
        },
        {
          img: require("../../assets/images/p1.jpeg"),
          name: "Fahad Nazir",
          msg: "Good Morning! Lorem Ipsum is simply dummy text",
          time: "11:00"
        },
        {
          img: require("../../assets/images/p.png"),
          name: "Ali Farooq",
          msg: "Good Morning! Lorem Ipsum is simply dummy text",
          time: "11:00"
        },
        {
          img: require("../../assets/images/p4t.png"),
          name: "Karwan Topi",
          msg: "Good Morning! Lorem Ipsum is simply dummy text",
          time: "11:00"
        },
        {
          img: require("../../assets/images/p4t.png"),
          name: "Atique Ahmed",
          msg: "Good Morning! Lorem Ipsum is simply dummy text",
          time: "11:00"
        },
        {
          img: require("../../assets/images/p4t.png"),
          name: "Asher Baig",
          msg: "Good Morning! Lorem Ipsum is simply dummy text",
          time: "11:00"
        },
        {
          img: require("../../assets/images/p.png"),
          name: "Hammad Azeem",
          msg: "Good Morning! Lorem Ipsum is simply dummy text",
          time: "11:00"
        },
        {
          img: require("../../assets/images/p4t.png"),
          name: "Ali Saeed",
          msg: "Good Morning! Lorem Ipsum is simply dummy text",
          time: "11:00"
        },
        {
          img: require("../../assets/images/p.png"),
          name: "Asher",
          msg: "Good Morning! Lorem Ipsum is simply dummy text",
          time: "11:00"
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
                    <Text style={{ fontSize: 15 }}>
                      {data.msg}
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
