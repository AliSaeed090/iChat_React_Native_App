import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import { Container, Content } from "native-base";
import AntDesign from "react-native-vector-icons/AntDesign";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import io from "socket.io-client";

const socket = io("http://192.168.0.101:3000");

export default class NewsFeed extends Component {
  constructor() {
    super();
    this.state = {
      arr: [
        {
          name: "Hammad",
          img: require("../../assets/images/p.png")
        },
        {
          name: "Atique",
          img: require("../../assets/images/p1.jpeg")
        },
        {
          name: "Ali",
          img: require("../../assets/images/p7.jpeg")
        },
        {
          name: "Ali Faroq",
          img: require("../../assets/images/p6.jpg")
        },
        {
          name: "Hammad salman",
          img: require("../../assets/images/p7.jpeg")
        },
        {
          name: "Salma",
          img: require("../../assets/images/p3.jpeg")
        }
      ],
      arr1: [
        {
          name: "Hammad",
          img: require("../../assets/images/feed.jpg"),
          ProfileImg: require("../../assets/images/p.png"),
          city: "New York , USA"
        },
        {
          name: "Atique",
          ProfileImg: require("../../assets/images/p1.jpeg"),

          img: require("../../assets/images/feed2.jpg"),
          city: "Lahore , Pakistan"
        },
        {
          name: "Ali",
          ProfileImg: require("../../assets/images/p7.jpeg"),

          img: require("../../assets/images/feed3.jpeg"),
          city: "New York , USA"
        },
        {
          name: "Ali Faroq",
          ProfileImg: require("../../assets/images/p6.jpg"),

          img: require("../../assets/images/feed4.jpg"),
          city: "Lahore , Pakistan"
        },
        {
          name: "Hammad salman",
          ProfileImg: require("../../assets/images/p7.jpeg"),

          img: require("../../assets/images/feed5.png"),
          city: "London , UK"
        },
        {
          name: "Salma",
          ProfileImg: require("../../assets/images/p3.jpeg"),

          img: require("../../assets/images/feed6.jpg"),
          city: "New York , USA"
        }
      ]
    };
  }
  componentDidMount() {
    socket.emit("new-user", "12345678");
  }

  render() {
    return (
      <Container>
        <Content>
          <View style={{ width: "100%" }}>
            <View
              style={{
                width: "95%",
                //  height: 30,
                //  borderWidth: 1,
                alignSelf: "center"
              }}
            >
              <Text
                style={{ color: "black", fontWeight: "bold", fontSize: 20 }}
              >
                Stories
              </Text>
              <View
                style={{
                  flexDirection: "row"
                  // alignItems: "center",
                  // justifyContent: "center"
                }}
              >
                <Content
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  {this.state.arr.map((data, index) => {
                    return (
                      <View style={{ marginTop: 20 }} key={index}>
                        <View
                          style={{
                            height: 70,
                            width: 70,
                            borderRadius: 150,
                            //  borderWidth: 1,
                            alignSelf: "center",
                            alignItems: "center",
                            justifyContent: "center",
                            marginLeft: 10,
                            marginRight: 10
                          }}
                        >
                          <Image
                            style={{ height: 70, width: 70 }}
                            source={data.img}
                          />
                        </View>
                        <Text
                          style={{
                            color: "black",
                            textAlign: "center",
                            marginTop: 10,
                            fontSize: 15
                          }}
                        >
                          {data.name}
                        </Text>
                      </View>
                    );
                  })}
                </Content>
              </View>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              backgroundColor: "#e2e2e2",
              height: 2
            }}
          ></View>
          {this.state.arr1.map((data, index) => {
            return (
              <View
                key={index}
                style={{
                  width: "95%",
                  alignSelf: "center",
                  // borderWidth: 1,
                  // height: 200,
                  marginTop: 10
                }}
              >
                <View
                  style={{
                    width: "100%",
                    alignSelf: "center",
                    // borderWidth: 1,
                    //  height: 120,
                    flexDirection: "row"
                  }}
                >
                  <View
                    style={{
                      width: "85%",
                      alignSelf: "center",
                      //  borderWidth: 1,
                      //  height: 20,
                      flexDirection: "row"
                    }}
                  >
                    <Image
                      style={{ height: 70, width: 70 }}
                      source={data.ProfileImg}
                    />
                    <View style={{ marginTop: 10, marginLeft: 10 }}>
                      <Text
                        style={{
                          color: "black",
                          fontSize: 20
                        }}
                      >
                        {data.name}
                      </Text>
                      <Text
                        style={{
                          color: "gray",
                          fontSize: 15
                        }}
                      >
                        {data.city}
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={{
                      color: "gray",
                      fontSize: 15,
                      marginTop: 10
                    }}
                  >
                    12:00
                  </Text>
                </View>
                <View style={{ width: "95%", alignSelf: "center" }}>
                  <Text style={{ color: "black", fontSize: 15, marginTop: 5 }}>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting
                  </Text>
                </View>
                <View
                  style={{
                    width: "100%",
                    alignSelf: "center",
                    //  borderWidth: 1,
                    marginTop: 10
                  }}
                >
                  <Image
                    style={{
                      width: "100%",
                      //alignSelf: "center",
                      resizeMode: "contain",
                      height: 230,
                      borderRadius: 8
                    }}
                    source={data.img}
                  />
                </View>
                <View
                  style={{
                    marginTop: 10,
                    width: "100%",
                    alignSelf: "center",
                    //  borderWidth: 1,
                    //  height: 20,
                    flexDirection: "row",
                    marginBottom: 10,
                    alignItems: "center"
                  }}
                >
                  <AntDesign name="like2" size={29} color="red" />
                  <Text style={{ marginLeft: 5 }}>10</Text>

                  <EvilIcons
                    style={{ marginLeft: 20 }}
                    name="comment"
                    size={35}
                    color="red"
                  />
                  <Text style={{ marginLeft: 5 }}>10</Text>
                </View>
              </View>
            );
          })}
        </Content>
      </Container>
    );
  }
}
