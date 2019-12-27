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
        <GlobalHeader
          Drawer={() =>
            this.props.navigation.dispatch(DrawerActions.toggleDrawer())
          }
          menu={true}
          backgroundColor={"#154a63"}
          navigation={this.props.navigation}
        />

        <TabNavigotor screenProps={{ stack: this.props.navigation }} />
        {/* <TabNavigotor /> */}
      </Container>
    );
  }
}
