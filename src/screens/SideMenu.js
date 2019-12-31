import React from "react";
import { createDrawerNavigator } from "react-navigation";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground
} from "react-native";
import { StackActions, NavigationActions } from "react-navigation";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import Home from "./Home";
import Contact from "./Contact";
import TermAndCond from "./TermAndCond";
import GlobalHeader from "../components/GlobalHeader";
import ContactUs from "./ContactUs";
import PrivacyPolicy from "./PrivacyPolicy";
import TabNavigotor from "./TabNavigotor";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as UserAction from "../redux/actions/UserAction";

class SideMenu extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={{ width: "100%", height: "100%", resizeMode: "contain" }}
          source={require("../../assets/images/drawer.png")}
        >
          <View
            style={{
              width: "100%",
              borderBottomWidth: 1,
              borderColor: "#e2e2e2",
              height: 200,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View
              style={{
                width: 140,
                height: 140,
                borderRadius: 80,
                borderWidth: 1,
                justifyContent: "center",
                alignItems: "center",
                borderColor: "white",
                marginTop: 10
              }}
            >
              <Image
                style={{
                  width: 135,
                  height: 135,
                  borderRadius: 100,
                  //   resizeMode: "contain",
                  //   marginTop: 20,
                  // marginLeft: 10,
                  alignSelf: "center"
                }}
                source={{ uri: this.props.profilePicture }}
              />
            </View>
            <Text
              style={{
                fontSize: 25,
                color: "white",

                marginLeft: 10,
                marginTop: 15
              }}
            >
              {this.props.userName}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.imageView}
            onPress={() => this.props.navigation.navigate("TermAndCond")}
          >
            <FontAwesome
              name="phone"
              size={30}
              color="white"
              style={styles.image}
            />
            <Text style={styles.text}>Terms And Conditions</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.imageView}
            onPress={() => this.props.navigation.navigate("PrivacyPolicy")}
          >
            <FontAwesome
              name="phone"
              size={30}
              color="white"
              style={styles.image}
            />
            <Text
              style={{
                color: "white",
                marginLeft: 40,

                marginTop: 5,
                fontSize: 16
              }}
            >
              Privacy Policy
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.imageView}
            onPress={() => this.props.navigation.navigate("ContactUs")}
          >
            <FontAwesome
              name="phone"
              size={30}
              color="white"
              style={styles.image}
            />
            <Text
              style={{
                color: "white",

                marginLeft: 40,

                marginTop: 5,
                fontSize: 16
              }}
            >
              Contact Us
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.imageView}
            onPress={() => this.props.navigation.navigate("ContactUs")}
          >
            <Ionicons
              name="md-settings"
              size={30}
              color="white"
              style={styles.image}
            />
            <Text
              style={{
                color: "white",
                marginLeft: 40,

                marginTop: 5,
                fontSize: 16
              }}
            >
              Settings
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.imageView}
            onPress={() => this.props.navigation.navigate("Contact")}
          >
            <FontAwesome
              name="heart"
              size={30}
              color="white"
              style={styles.image}
            />
            <Text
              style={{
                marginLeft: 40,
                color: "white",

                marginTop: 5,
                fontSize: 16
              }}
            >
              Share with friend
            </Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
}
mapStateToProps = state => {
  return {
    confirmResult: state.AuthReducer.confirmResult,
    isErr: state.AuthReducer.isErr,
    err: state.AuthReducer.err,
    // cellNumber: state.AuthReducer.cellNumber,
    cellNo: state.AuthReducer.cellNo,
    newMessage: state.AuthReducer.message,
    profilePicture: state.AuthReducer.profilePicture,
    userName: state.AuthReducer.userName
  };
};
mapActionsToProps = dispatch => ({
  UserAction: bindActionCreators(UserAction, dispatch)
});

export default connect(mapStateToProps, mapActionsToProps)(SideMenu);

const styles = StyleSheet.create({
  container: {
    flex: 1
    //backgroundColor: "white"
    //marginTop: 40,
    // marginBottom: 40,
    // borderTopLeftRadius: 50,
    // borderBottomLeftRadius: 50,
    // paddingVertical: 60
  },
  imageView: {
    flexDirection: "row",
    height: 40,
    marginLeft: 20,
    marginTop: 25
  },
  text: {
    color: "white",

    marginLeft: 40,
    fontWeight: "100",
    marginTop: 5,
    fontSize: 16
  },
  image: { width: 30, height: 30 }
});
