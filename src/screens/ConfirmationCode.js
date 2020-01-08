import React, { Component, createRef } from "react";
import CodeInput from "react-native-confirmation-code-field";
import GlobalHeader from "../components/GlobalHeader";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as UserAction from "../redux/actions/UserAction";

import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Image
} from "react-native";

class ConfirmationCode extends Component {
  handlerOnFulfill = code => {
    this.props.UserAction.VerifyCodeFirebase(
      code,
      this.props.confirmResult,
      this.props.navigation
    );
    // this.clearCode();
  };

  field = createRef();

  clearCode() {
    const { current } = this.field;

    if (current) {
      current.clear();
    }
  }

  pasteCode() {
    const { current } = this.field;

    if (current) {
      current.handlerOnTextChange(value);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.isErr == true ? alert(this.props.err) : null}
        <GlobalHeader backgroundColor={"transparent"} />
        <View style={styles.ImageView}>
          <Image
            style={{ width: 80, height: 80, resizeMode: "contain" }}
            source={require("../../assets/images/logoreal.png")}
          />
        </View>
        <View
          style={{
            width: "100%",
            alignSelf: "center",
            alignItems: "center",
            marginTop: 20,
            justifyContent: "center"
          }}
        >
          <Text style={{ color: "white", fontSize: 18, textAlign: "center" }}>
            A verficatin code hase been sent to your Mobile throug SMS, Please
            enter here
          </Text>
        </View>
        <View style={{ marginTop: 30 }}>
          <CodeInput
            ref={this.field}
            onFulfill={this.handlerOnFulfill}
            codeLength={6}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b3b54"
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
    confirmResult: state.AuthReducer.confirmResult,
    isErr: state.AuthReducer.isErr,
    err: state.AuthReducer.err
  };
};
mapActionsToProps = dispatch => ({
  UserAction: bindActionCreators(UserAction, dispatch)
});

export default connect(mapStateToProps, mapActionsToProps)(ConfirmationCode);
