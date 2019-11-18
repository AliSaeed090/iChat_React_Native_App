import React, { Component } from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
// import GlobalHeader from "../components/GlobalHeader";
import Contact from "./Contact";
import Inbox from "./Inbox";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Drawer from "./Drawer";
import NewsFeed from "./NewsFeed";
import Home from "./Home";
import GlobalHeader from "../components/GlobalHeader";
import Chat from "./Chat";
import CallHistory from "./CallHistory";
import CodePicker from "../components/CodePicker";

const AppNavigator = createStackNavigator(
  {
    SignUp: {
      screen: SignUp,
      navigationOptions: () => ({
        header: null
      })
    },
    SignIn: {
      screen: SignIn,
      navigationOptions: () => ({
        header: null
      })
    },
    Contact: {
      screen: Contact,
      navigationOptions: () => ({
        header: null
      })
    },
    Inbox: {
      screen: Inbox,
      navigationOptions: () => ({
        header: null
      })
    },
    Drawer: {
      screen: Drawer,
      navigationOptions: () => ({
        header: null
      })
    },
    NewsFeed: {
      screen: NewsFeed,
      navigationOptions: () => ({
        header: null
      })
    },
    Home: {
      screen: Home,
      navigationOptions: () => ({
        header: null
      })
    },
    GlobalHeader: {
      screen: GlobalHeader,
      navigationOptions: () => ({
        header: null
      })
    },
    Chat: {
      screen: Chat,
      navigationOptions: () => ({
        header: null
      })
    },
    CallHistory: {
      screen: CallHistory,
      navigationOptions: () => ({
        header: null
      })
    },
    CodePicker: {
      screen: CodePicker,
      navigationOptions: () => ({
        header: null
      })
    }
  },

  {
    initialRouteName: "CodePicker"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class StackNavigator extends Component {
  render() {
    return <AppContainer />;
  }
}
