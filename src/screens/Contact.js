import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import GlobaHeader from "../components/GlobalHeader";
import { Container } from "native-base";
import GlobalHeader from "../components/GlobalHeader";
import TabNavigotor from "./TabNavigotor";
import {
  StackActions,
  NavigationActions,
  DrawerActions
} from "react-navigation";
export default class Contact extends Component {
  func = () => {
    () => this.props.navigation.dispatch(DrawerActions.toggleDrawer());
  };
  render() {
    return (
      <Container>
        {/* <TouchableOpacity
          onPress={() =>
           
          }
          style={{ width: 100, height: 100, backgroundColor: "red" }}
        ></TouchableOpacity> */}
        <GlobalHeader
          Drawer={() =>
            this.props.navigation.dispatch(DrawerActions.toggleDrawer())
          }
          //         Points={true}
          //        Avator={true}
          //        leftHeading={"Exchange"}
          //       twoWords={1}
          SearchIcon={true}
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
          Points="sss"
          leftArrow={true}
          elevation={1}
          backgroundColor={"#154a63"}
        />
        <TabNavigotor />
      </Container>
    );
  }
}
