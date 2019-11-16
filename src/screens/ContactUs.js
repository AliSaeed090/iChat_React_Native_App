import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Thumbnail,
  TouchableOpacity
} from "native-base";
import GlobalHeader from "../components/GlobalHeader";
export default class TermAndCond extends Component {
  render() {
    return (
      <Container style={styles.Container}>
        <GlobalHeader
          backgroundColor={"#f1f1f1"}
          left={true} //
          backArrow={true} //for menu drawer icon
          // menu={true}
          headingText="Terms & Conditions"
          headingWhite={false}
          // twoWords={true}
          //  rightCross={true}
          // rightCompareArrow={true}
          //rightSearch={true}
          // rightMenuDots={true}
          threeWords={true}
          navigation={this.props.navigation}
        />
        <Content>
          <View style={{ width: "90%", alignSelf: "center", marginTop: 10 }}>
            <Text style={styles.lormImspText}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s , when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry's standard
              dummy text ever since the 1500s , when an unknown printer took a
              galley of type and scrambled it to make a type specimen book. It
              has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
            </Text>
          </View>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "white"
  },
  lormImspText: {
    fontSize: 18,
    color: "#292929"
  }
});
