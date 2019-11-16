import React from "react";
import { Text, View, Image } from "react-native";
import {
  createAppContainer,
  createMaterialTopTabNavigator
} from "react-navigation";
// import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import Inbox from "./Inbox";
import NewsFeed from "./NewsFeed";
import CallHistory from "./CallHistory";
import Chat from "./Chat";

const TabNavigator = createMaterialTopTabNavigator(
  {
    Home: {
      screen: NewsFeed,

      navigationOptions: navigation => ({
        tabBarIcon: () => (
          <MaterialCommunityIcons
            style={{ alignSelf: "center" }}
            size={25}
            color="white"
            name="newspaper"
          />
          //<Image style={{width:30, height:30, resizeMode:'contain'}} source={require("../../assets/images/reader.png")} />
        )
      })
    },
    Settings: {
      screen: Inbox,

      navigationOptions: navigation => ({
        tabBarIcon: () => (
          <Entypo size={27} color="white" name="chat" style={{ width: 30 }} />

          //<Image style={{width:30, height:30, resizeMode:'contain'}} source={require("../../assets/images/reader.png")} />
        )
      })
    },
    Ilma: {
      screen: CallHistory,

      navigationOptions: () => ({
        tabBarIcon: () => (
          <FontAwesome5
            style={{ alignSelf: "center" }}
            size={25}
            color="white"
            name="phone-volume"
          />
          //<Image style={{width:30, height:30, resizeMode:'contain'}} source={require("../../assets/images/reader.png")} />
        )
      })
    }
  },
  {
    navigationOptions: {
      Chat: {
        screen: Chat
      },
      defaultNavigationOptions: {
        Chat: {
          screen: Chat
        }
      }
    },

    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      // tabBarLabel:false,
      // activeTintColor: "black",
      //activeTintColor: 'orange',
      // inactiveTintColor: 'blue',
      // inactiveBackgroundColor: '#EFEFEF',
      activeTintColor: "orange",
      inactiveTintColor: "red",

      style: {
        backgroundColor: "#154a63"
      },
      iconStyle: {
        activeTintColor: "orange",
        inactiveTintColor: "red"
      },
      tabStyle: {
        // backgroundColor: "red",
        // width: 100
      }
    }
  }
);

export default createAppContainer(TabNavigator, Chat);
