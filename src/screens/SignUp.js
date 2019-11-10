import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground
} from "react-native";
import { Container, Content } from "native-base";
import GlobalHeader from "../components/GlobalHeader";
export default class SignUpScreen extends Component {
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
              <Text style={{ color: "white", fontSize: 25 }}>
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
                  marginTop: 20
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
                placeholder="Email"
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
                placeholder="Phone"
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
                placeholder="Password"
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
                placeholder="confirm Password"
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
                <Text style={{ fontSize: 20, color: "black" }}>Sign Up</Text>
              </TouchableOpacity>
              <View
                style={{
                  width: "100%",

                  alignItems: "center"
                }}
              >
                <Text style={{ color: "white", fontSize: 17, marginTop: 10 }}>
                  Already have an account?
                </Text>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("SignIn")}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 17,
                      marginTop: 10,
                      marginBottom: 20
                    }}
                  >
                    Sign In here
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Content>
        </ImageBackground>
      </Container>
    );
  }
}
