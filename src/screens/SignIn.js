import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image
} from "react-native";
import { Container, Content } from "native-base";
import GlobalHeader from "../components/GlobalHeader";
export default class SignIn extends Component {
  render() {
    return (
      <Container style={{ backgroundColor: "#1f2532" }}>
        <ImageBackground
          //resizeMode="contain"
          style={{ width: "100%", height: "100%" }}
          source={require("../../assets/images/background2.png")}
        >
          <GlobalHeader
            //         Points={true}
            //        Avator={true}
            //        leftHeading={"Exchange"}
            //       twoWords={1}
            //       SearchIcon={true}
            //       Pencil={true}
            //       AvatorSetting={true}
            //       bunch={true}
            //       HeartAndSetting={true}
            //       RightAvatorAccount={true}
            //   searchAndClock={true}
            //       HeadingText= " Payment "
            //        avatorArrow={true}
            //         Points2={true}
            //         lefHeading="Points"
            // Points="sss"
            //  leftArrow={true}
            // elevation={1}
            backgroundColor={"transparent"}
          />
          <Content>
            <View
              style={{
                width: "100%",

                // borderWidth: 1,
                alignItems: "center"
              }}
            >
              <Image
                style={{
                  width: 70,
                  height: 100,
                  resizeMode: "contain",
                  //borderWidth: 1,
                  borderColor: "red"
                  // tintColor: "purple",
                  // opacity: 0.5
                }}
                source={require("../../assets/images/logoreal.png")}
              />
              <Text style={{ color: "white", fontSize: 25, marginTop: 30 }}>
                Welcome To iChat
              </Text>
            </View>
            <View style={{ width: "90%", alignSelf: "center" }}>
              <TextInput
                style={{
                  height: 50,
                  width: "95%",
                  borderWidth: 1,
                  alignSelf: "center",
                  borderColor: "#fff",
                  borderRadius: 4,
                  paddingLeft: 20,
                  color: "white",
                  marginTop: 30
                }}
                placeholder="First Name"
                placeholderTextColor="gray"
              />
              <TextInput
                style={{
                  height: 50,
                  width: "95%",
                  borderWidth: 1,
                  alignSelf: "center",
                  borderColor: "#fff",
                  borderRadius: 4,
                  paddingLeft: 20,
                  color: "white",
                  marginTop: 20
                }}
                placeholder="Last Name"
                placeholderTextColor="gray"
              />

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Drawer")}
                style={{
                  width: "95%",
                  height: 50,
                  borderRadius: 4,
                  backgroundColor: "white",
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                  marginTop: 40,
                  borderWidth: 1,
                  borderColor: "#ff3366"
                }}
              >
                <Text style={{ fontSize: 20, color: "black" }}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </Content>
        </ImageBackground>
      </Container>
    );
  }
}
