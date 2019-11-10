import React from "react";
import StackNavigator from "./src/screens/StackNavigator";
// import SplashScreen from "./src/screens/SplashScreen";
// import { Provider } from "react-redux";
// import store from "./src/redux/store";
// import { NetInfo, Alert, BackHandler } from "react-native";

export default class App extends React.Component {
  render() {
    return <StackNavigator />;
  }
  // constructor(props) {
  //   super(props);

  //   this.state = { isLoading: true };
  // }

  // performTimeConsumingTask = async () => {
  //   return new Promise(resolve =>
  //     setTimeout(() => {
  //       resolve("result");
  //     }, 3000)
  //   );
  // };

  // async componentDidMount() {
  //   // Preload data from an external API
  //   // Preload data using AsyncStorage
  //   const data = await this.performTimeConsumingTask();

  //   if (data !== null) {
  //     this.setState({ isLoading: false });
  //   }

  // NetInfo.isConnected.fetch().then(isConnected => {
  //   if (!isConnected) this.showAlert();
  // });
  // NetInfo.addEventListener("connectionChange", connectionStatus => {
  //   if (connectionStatus.type == "UNKNOWN" || connectionStatus.type == "none")
  //     this.showAlert();
  // });

  //   NetInfo.isConnected.addEventListener(
  //     "connectionChange",
  //     async isNetworkConnected => {
  //       connected = isNetworkConnected;
  //       if (!connected) {
  //         this.showAlert();
  //       }
  //     }
  //   );
  // }

  // render() {
  //   if (this.state.isLoading) {
  //     return <SplashScreen />;
  //   }

  //   return (
  //     <Provider store={store}>
  //       <StackNavigator />
  //     </Provider>
  //   );
  // }

  //   showAlert() {
  //     Alert.alert(
  //       "No Internet",
  //       "Pesona requires stable internet connection.",
  //       [
  //         {
  //           text: "Cancel",
  //           onPress: () => {
  //             BackHandler.exitApp();
  //           }
  //         },
  //         {
  //           text: "Retry",
  //           onPress: () => {
  //             NetInfo.isConnected.fetch().then(isConnected => {
  //               if (!isConnected) this.showAlert();
  //             });
  //           }
  //         }
  //       ],
  //       { cancelable: false }
  //     );
  //   }
  // }
}
