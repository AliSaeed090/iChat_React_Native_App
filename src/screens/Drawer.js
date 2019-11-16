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

const WIDTH = Dimensions.get("window").width;
const DrawerConfig = {
  drawerWidth: WIDTH * 0.8,
  drawerPosition: "left",
  drawerBackgroundColor: "black",
  overlayColor: "black",

  contentComponent: ({ navigation }) => {
    return <Menu navigation={navigation} />;
  }
};

export default createDrawerNavigator(
  {
    TermsService: {
      screen: Contact
    },
    Timing: {
      screen: GlobalHeader
    },

    TermAndCond: {
      screen: TermAndCond
    },
    ContactUs: {
      screen: ContactUs
    },
    PrivacyPolicy: {
      screen: PrivacyPolicy
    },
    FeedbackandRating: {
      screen: Contact
    },
    customerSupport: {
      screen: Contact
    },
    logout: {
      screen: Contact
    }
  },

  DrawerConfig
);

class Menu extends React.Component {
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
              height: 125
            }}
          >
            <Image
              style={{
                width: 50,
                height: 50,
                resizeMode: "contain",
                marginTop: 20,
                marginLeft: 10
              }}
              source={require("../../assets/images/p.png")}
            />
            <Text
              style={{
                fontSize: 25,
                color: "white",

                marginLeft: 10,
                marginTop: 15
              }}
            >
              Atique Ahmed
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
