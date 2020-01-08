import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  ImageBackground,
  TextInput
} from "react-native";
import ImagePicker from "react-native-image-crop-picker";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as UserAction from "../redux/actions/UserAction";
import Entypo from "react-native-vector-icons/Entypo";

class ImageSave extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: null,
      profilepic: "",
      userName: ""
    };
  }
  componentWillReceiveProps(prps) {
    if (prps.profilePicture) {
      this.setState({ profilepic: prps.profilePicture });
    }
  }
  onSubmit = () => {
    if (this.state.userName == "") {
      alert("Please Enter You Name");
    } else {
      this.props.UserAction.setUserName(this.state.userName);
      this.props.navigation.navigate("Drawer");
    }
  };
  takeImageFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      compressImageQuality: 0.7
    })
      .then(image => {
        this.setState({
          visible: false,
          image: image,
          avatarSource: {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime
          }
        });
        this.SaveImageToFirebase();
      })

      .catch(err => {});
  };
  SaveImageToFirebase = () => {
    this.props.UserAction.uploadProfilePic("images", this.state.image);
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require("../../assets/images/drawer.png")}
          style={{ width: "100%", height: "100%" }}
        >
          <View
            style={{
              width: "80%",
              alignSelf: "center",
              // borderWidth: 0.5,
              borderColor: "white",
              height: 400,
              marginTop: 120,
              alignItems: "center",
              borderRadius: 10
              // backgroundColor: "#01afc4",
            }}
          >
            <TouchableOpacity
              onPress={() => this.takeImageFromLibrary()}
              style={{
                width: 150,
                height: 150,
                borderRadius: 100,
                borderWidth: 1,
                borderColor: "white",
                marginTop: -70,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              {this.state.profilepic ? (
                <Image
                  style={{ width: 145, height: 145, borderRadius: 100 }}
                  source={{ uri: this.state.profilepic }}
                />
              ) : (
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 20,
                      textAlign: "center"
                    }}
                  >
                    Upload You Picture
                  </Text>
                  <Entypo name="upload" color="white" size={27} />
                </View>
              )}
            </TouchableOpacity>

            <View
              style={{
                width: "100%",
                alignSelf: "center",
                borderWidth: 0.5,
                borderColor: "white",
                marginTop: 20,
                borderRadius: 10
              }}
            >
              <TextInput
                onChangeText={text => this.setState({ userName: text })}
                style={{ fontSize: 18, color: "white", paddingLeft: 20 }}
                placeholder={"Enter Your Name Please"}
              />
            </View>

            <TouchableOpacity
              onPress={() => this.onSubmit()}
              style={{
                width: "80%",
                alignSelf: "center",
                height: 50,
                // backgroundColor: "green",
                borderRadius: 15,
                marginTop: 160,
                borderWidth: 1,
                borderColor: "white",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text
                style={{ color: "white", fontSize: 25, fontWeight: "bold" }}
              >
                Next
              </Text>
            </TouchableOpacity>
          </View>
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
    profilePicture: state.AuthReducer.profilePicture
  };
};
mapActionsToProps = dispatch => ({
  UserAction: bindActionCreators(UserAction, dispatch)
});

export default connect(mapStateToProps, mapActionsToProps)(ImageSave);
