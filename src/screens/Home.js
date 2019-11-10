import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import {
  StackActions,
  NavigationActions,
  DrawerActions
} from "react-navigation";

export default class Home extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "black" }}>
        <Text> Home </Text>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.dispatch(DrawerActions.toggleDrawer())
          }
          style={{ width: 100, height: 100, backgroundColor: "red" }}
        ></TouchableOpacity>
      </View>
    );
  }
}
