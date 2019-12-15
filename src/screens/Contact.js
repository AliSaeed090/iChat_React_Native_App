import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import GlobaHeader from "../components/GlobalHeader";
import { Container } from "native-base";
import GlobalHeader from "../components/GlobalHeader";
import TabNavigotor from "./TabNavigotor";
import { createAppContainer } from "react-navigation";
import {
  StackActions,
  NavigationActions,
  DrawerActions
} from "react-navigation";

const AppIndex = createAppContainer(TabNavigotor);
export default class Contact extends Component {
  func = () => {
    () => this.props.navigation.dispatch(DrawerActions.toggleDrawer());
  };
  render() {
    return (
      <Container>
        {/* <TouchableOpacity
          onPress={() =>
            this.props.navigation.dispatch(DrawerActions.toggleDrawer())
          }
          style={{ width: 100, height: 100, backgroundColor: "red" }}
        ></TouchableOpacity> */}
        <GlobalHeader
          Drawer={() =>
            this.props.navigation.dispatch(DrawerActions.toggleDrawer())
          }
          SearchIcon={true}
          Points="sss"
          leftArrow={true}
          elevation={1}
          backgroundColor={"#154a63"}
        />
        <TabNavigotor />
        {/* <AppIndex /> */}
      </Container>
    );
  }
}
