import React, { Component } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  View,
  Platform
} from "react-native";

import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title
} from "native-base";
import Feather from "react-native-vector-icons/Feather";
import Octicons from "react-native-vector-icons/Octicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import { DrawerActions } from "react-navigation-drawer";
// import { withNavigation, DrawerActions } from "react-navigation";
import {
  StackActions,
  NavigationActions,
  DrawerActions
} from "react-navigation";

import DrawerNew from "../screens/DrawerNew";
export default class HeaderExample extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false
    };
  }

  render() {
    return (
      //         ALL PROPS
      //
      //   <GlobalHeader
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
      //       searchAndClock={true}
      //       HeadingText= " Payment "
      //        avatorArrow={true}
      //         Points2={true}
      //         lefHeading="Points"
      //         Points="sss"
      //         leftArrow={true}
      // elevation={1}
      //backgroundColor={"white"}
      //         />

      <Header
        style={{
          backgroundColor: this.props.backgroundColor
            ? this.props.backgroundColor
            : "white",
          elevation: this.props.elevation,
          borderBottomColor: "transparent"
        }}
      >
        <Left
          style={{
            flex: 1,
            height: "100%",
            justifyContent: "center",
            paddingLeft: 2
          }}
        >
          {this.props.leftArrow == true ? (
            <TouchableOpacity onPress={this.props.Drawer}>
              <Icon name="menu" style={{ color: "white" }} />
            </TouchableOpacity>
          ) : this.props.leftHeading !== "" ? (
            <Text
              numberOfLines={1}
              style={{ fontWeight: "bold", color: "black", fontSize: 20 }}
            >
              {this.props.leftHeading}
            </Text>
          ) : null}
        </Left>

        <Body
          style={
            this.props.twoWords === 1
              ? { flex: 3, alignItems: "center", justifyContent: "center" }
              : { flex: 1, alignItems: "center", justifyContent: "center" }
          }
        >
          {this.props.HeadingText !== "" ? (
            <Text style={{ color: "black", fontSize: 20, fontWeight: "bold" }}>
              {this.props.HeadingText}
            </Text>
          ) : null}
        </Body>
        <Right
          style={{
            borderWidth: 0,
            height: "100%",
            alignItems: "center",
            paddingRight: 5
          }}
        >
          {this.props.searchIcon == true ? (
            <View
              style={{
                width: "20%",
                borderWidth: 0,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Feather name="search" size={23} color="white" />
            </View>
          ) : null}
        </Right>

        {this.state.isOpen == true ? (
          <View
            style={{
              position: "absolute",
              // flex: 1,
              width: "50%",
              height: "50%",
              zIndex: 100
            }}
          >
            <DrawerNew />
          </View>
        ) : null}
      </Header>
    );
  }
}
const styles = StyleSheet.create({
  avatarImage: {
    width: 40,
    height: 40,

    borderRadius: 40,
    overflow: "hidden"
  }
});
