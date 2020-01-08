import React, { Component } from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Contact from "./Contact";
import Inbox from "./Inbox";
import Drawer from "./Drawer";
import NewsFeed from "./NewsFeed";
import TabNavigotor from "./TabNavigotor";
import Home from "./Home";
import GlobalHeader from "../components/GlobalHeader";
import Chat from "./Chat";
import CallHistory from "./CallHistory";
import CodePicker from "../components/CodePicker";
import ConfirmationCode from "./ConfirmationCode";
import AfterSplash from "./Splash";
import WebRtc from "./WebRtc";
import ImageSave from "./ImageSave";
import SideMenu from "./SideMenu";
import WebrtcAudio from "./WebrtcAudio";

const AppNavigator = createStackNavigator(
  {
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
    },
    ConfirmationCode: {
      screen: ConfirmationCode,
      navigationOptions: () => ({
        header: null
      })
    },
    TabNavigotor: {
      screen: TabNavigotor,
      navigationOptions: () => ({
        header: null
      })
    },
    AfterSplash: {
      screen: AfterSplash,
      navigationOptions: () => ({
        header: null
      })
    },
    WebRtc: {
      screen: WebRtc,
      navigationOptions: () => ({
        header: null
      })
    },
    TabNavigator: {
      screen: TabNavigator,
      navigationOptions: () => ({
        header: null
      })
    },
    ImageSave: {
      screen: ImageSave,
      navigationOptions: () => ({
        header: null
      })
    },
    SideMenu: {
      screen: SideMenu,
      navigationOptions: () => ({
        header: null
      })
    },
    WebrtcAudio: {
      screen: WebrtcAudio,
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
