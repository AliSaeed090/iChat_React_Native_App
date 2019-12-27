import React from "react";
import { Text, View, Image } from "react-native";
import {
  createAppContainer,
  createMaterialTopTabNavigator
  // createBottomTabNavigator,
  // createBottomTabNavigator
} from "react-navigation";
// import { createBottomTabNavigator } from "react-navigation-tabs";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import Inbox from "./Inbox";
import NewsFeed from "./NewsFeed";
import CallHistory from "./CallHistory";
import Chat from "./Chat";

// createStackNavigator({
export default TabNavigator = createAppContainer(
  createMaterialTopTabNavigator(
    {
      Home: {
        screen: NewsFeed,

        navigationOptions: () => ({
          header: "hello",
          tabBarIcon: () => (
            <MaterialCommunityIcons
              style={{ alignSelf: "center" }}
              size={25}
              color="white"
              name="newspaper"
            />
          )
        })
      },

      Settings: {
        screen: Inbox,

        navigationOptions: () => ({
          tabBarIcon: () => (
            <Entypo size={27} color="white" name="chat" style={{ width: 30 }} />
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
          )
        })
      }
    },

    {
      tabBarOptions: {
        showIcon: true,
        showLabel: false,

        style: {
          backgroundColor: "#154a63"
        }
      }
    },
    {
      initialRouteName: "Inbox"
    }
  )
);

// createAppContainer(TabNavigator);
