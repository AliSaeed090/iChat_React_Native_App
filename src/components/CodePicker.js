import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import GlobalHeader from "./GlobalHeader";
import PhoneInput from "react-native-phone-input";
import { placeholder } from "@babel/types";
import { Content } from "native-base";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as UserAction from "../redux/actions/UserAction";
import io from "socket.io-client";

const socket = io("http://192.168.0.103:3000");

class CodePicker extends Component {
  constructor() {
    super();

    this.state = {
      valid: "",
      type: "",
      value: ""
    };

    this.updateInfo = this.updateInfo.bind(this);
    // this.renderInfo = this.renderInfo.bind(this);
  }

  updateInfo() {
    this.setState({
      valid: this.phone.isValidNumber(),
      type: this.phone.getNumberType(),
      value: this.phone.getValue()
    });
  }
  onSubmit = () => {
    let data = {
      valid: this.state.valid,
      type: this.state.type,
      value: this.state.value
    };
    if (data.valid == false && data.type !== "MOBILE") {
      alert("Invalid Number Or Type Only Mobile Number");
    } else {
      this.props.UserAction.SMSCodeFirebase(data.value, this.props.navigation);
    }
  };
  componentWillMount() {
    // this.props.UserAction.checkAsync(this.props.navigation);
    socket.emit("userConected", this.props.cellNo);
  }

  // renderInfo() {
  //   if (this.state.value) {
  //     return (
  //       <View style={styles.info}>
  //         <Text>
  //           Is Valid:{" "}
  //           <Text style={{ fontWeight: "bold" }}>
  //             {this.state.valid.toString()}
  //           </Text>
  //         </Text>
  //         <Text>
  //           Type: <Text style={{ fontWeight: "bold" }}>{this.state.type}</Text>
  //         </Text>
  //         <Text>
  //           Value:{" "}
  //           <Text style={{ fontWeight: "bold" }}>{this.state.value}</Text>
  //         </Text>
  //       </View>
  //     );
  //   }
  // }

  render() {
    return (
      <View style={styles.container}>
        <Content>
          <GlobalHeader backgroundColor={"transparent"} />
          <View
            style={{
              backgroundColor: "#4b798c",
              width: "90%",
              alignSelf: "center",
              height: 400,
              borderRadius: 8
            }}
          >
            <View style={styles.ImageView}>
              <Image
                style={{ width: 60, height: 60, resizeMode: "contain" }}
                source={require("../../assets/images/logoreal.png")}
              />
            </View>
            <View style={styles.ImageView}>
              <Text
                style={{ color: "white", textAlign: "center", fontSize: 20 }}
              >
                Welcome To iChat
              </Text>
            </View>

            <View
              style={{
                width: "90%",
                alignSelf: "center",

                marginTop: 30,
                justifyContent: "center",
                paddingLeft: 15
              }}
            >
              <Text style={{ color: "white", textAlign: "center" }}>
                Please Select Your Country and Enter Your Phone Number
              </Text>
            </View>
            <View
              style={{
                width: "85%",
                alignSelf: "center",
                borderWidth: 1,
                borderColor: "#fff",
                marginTop: 30,
                height: 40,
                justifyContent: "center",
                borderRadius: 15,
                paddingLeft: 15
              }}
            >
              <PhoneInput
                ref={ref => {
                  this.phone = ref;
                  //;
                }}
                onChangePhoneNumber={() => this.updateInfo()}
                initialCountry={"pk"}
                allowZeroAfterCountryCode={false}
                textStyle={{ color: "white", fontSize: 18 }}
                placeholder="select your Country and enter you cell no."
              />
            </View>
            <TouchableOpacity
              onPress={() => this.onSubmit()}
              style={styles.button1}
            >
              <Text style={{ color: "white", fontSize: 17 }}>Next</Text>
            </TouchableOpacity>
          </View>

          {/* <TouchableOpacity onPress={this.updateInfo} style={styles.button}>
            <Text>Get Info</Text>
          </TouchableOpacity> */}

          {/* {this.renderInfo()} */}
        </Content>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b3b54"
  },
  info: {
    // width: 200,
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginTop: 20
  },
  button: {
    marginTop: 20,
    padding: 10
  },
  ImageView: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  },
  button1: {
    backgroundColor: "#75ccff",
    width: "90%",
    height: 45,
    borderRadius: 30,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80
  }
});
mapStateToProps = state => {
  return {
    email: state.AuthReducer.email,
    cellNo: state.AuthReducer.cellNo
  };
};
mapActionsToProps = dispatch => ({
  UserAction: bindActionCreators(UserAction, dispatch)
});

export default connect(mapStateToProps, mapActionsToProps)(CodePicker);
// module.exports = App;
