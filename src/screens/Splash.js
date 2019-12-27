import React, { Component } from "react";
import { StyleSheet, View, Animated } from "react-native";

export default class AfterSplash extends Component {
  constructor(props) {
    super(props);
    this.springValue = new Animated.Value(0);
  }
  componentWillMount() {
    this.spring();

    // this.props.UserAction.checkAsync(this.props.navigation);
  }
  spring() {
    Animated.spring(this.springValue, {
      toValue: 1,
      friction: 1
    }).start();
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Animated.Image
            style={{
              resizeMode: "contain",
              width: 80,
              height: 80,
              transform: [{ scale: this.springValue }]
            }}
            source={require("../../assets/images/logoreal.png")}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0b3b54"
  }
});
