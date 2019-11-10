import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
export default class Reaward extends Component {
  render() {
    return (
      // ALL BUTTON this.props

      //buttonwidth={'90%'}
      //borderWidth={2}
      //borderColor={'brown'}
      //fontWeight={'bold'}
      //paddingVertical={29}  using instead of Height
      //backgroundColor={'red'}
      //borderRadius={30}
      //TextColor={'red'}
      //fontSize={20}
      //fontWeight={'bold'}
      //text={"abd"}
      //navigation={this.props.navigation}
      //navigateTo={"RegisterMember"}
      //marginBottom={30}
      //marginTop={30}
      //elevation={2}

      <TouchableOpacity
        style={{
          borderWidth: this.props.borderWidth,
          borderColor: this.props.borderColor,

          marginBottom: this.props.marginBottom
            ? this.props.marginBottom
            : null,

          marginTop: this.props.marginTop ? this.props.marginTop : null,

          elevation: this.props.elevation ? this.props.elevation : null,

          width: this.props.buttonwidth ? this.props.buttonwidth : "90%",
          alignItems: "center",
          paddingVertical: this.props.paddingVertical
            ? this.props.paddingVertical
            : 12,
          alignSelf: "center",
          backgroundColor: this.props.backgroundColor
            ? this.props.backgroundColor
            : "brown",
          borderRadius: this.props.borderRadius ? this.props.borderRadius : 40
        }}
        onPress={
          this.props.buttonFunc
            ? this.props.buttonFunc
            : () => this.props.navigation.navigate(this.props.navigateTo)
        }
      >
        <Text
          style={{
            color: this.props.TextColor ? this.props.TextColor : "white",
            fontSize: this.props.fontSize ? this.props.fontSize : 18,
            fontWeight: this.props.fontWeight
          }}
        >
          {this.props.text}
        </Text>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: "90%",
    alignSelf: "center"
  }
});
