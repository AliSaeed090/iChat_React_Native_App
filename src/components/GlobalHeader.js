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
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

// import { DrawerActions } from "react-navigation-drawer";
// import { withNavigation, DrawerActions } from "react-navigation";
import {
  StackActions,
  NavigationActions,
  DrawerActions
} from "react-navigation";

// import DrawerNew from "../screens/DrawerNew";
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
            // justifyContent: "center",
            paddingLeft: 2,
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          {this.props.leftArrow == true ? (
            <TouchableOpacity onPress={this.props.Drawer}>
              <Icon name="menu" style={{ color: "white" }} />
            </TouchableOpacity>
          ) : this.props.leftArrow1 !== "" ? (
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Ionicons name="ios-arrow-round-back" color={"white"} size={40} />
            </TouchableOpacity>
          ) : null}

          {this.props.userImage == true ? (
            <Image
              style={{ width: 30, height: 30, borderRadius: 100 }}
              source={{ uri: this.props.imageURL }}
            />
          ) : (
            <FontAwesome
              name="user-circle"
              color={"white"}
              size={40}
              style={{ marginLeft: 20 }}
            />
          )}

          {this.props.leftHeading !== "" ? (
            <Text
              numberOfLines={1}
              style={{ color: "white", fontSize: 17, marginLeft: 15 }}
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
              style={{ flexDirection: "row", width: "30%", marginRight: 20 }}
            >
              <TouchableOpacity
                onPress={this.props.callFunc}
                style={{ width: 40, marginLeft: -40 }}
              >
                <Feather name="phone-call" size={25} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Inbox")}
                style={{ width: 30, marginLeft: 10 }}
              >
                <MaterialIcons name="video-call" size={25} color="white" />
              </TouchableOpacity>
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
