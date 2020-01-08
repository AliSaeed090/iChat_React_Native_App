import * as ActionsTypes from "./types";
import { StackActions, NavigationActions } from "react-navigation";
import firebase from "react-native-firebase";
import io from "socket.io-client";
import server from "../../components/server";

const socket = io(server);

import AsyncStorage from "@react-native-community/async-storage";

export const SMSCodeFirebase = (Number, navigation) => async dispatch => {
  firebase
    .auth()
    .signInWithPhoneNumber(Number)
    .then(confirmResult => {
      dispatch({
        type: ActionsTypes.SET_CONFIRM_RESULT,
        payload: confirmResult
      });

      navigation.navigate("ConfirmationCode");
    })
    .catch(error => {});
};
export const VerifyCodeFirebase = (
  code,
  confirmResult,
  navigation
) => async dispatch => {
  confirmResult
    .confirm(code)
    .then(user => {
      dispatch({
        type: ActionsTypes.VERIFICATION_DONE,
        payload: ("VERIFICATION DONE", user)
      });

      socket.emit("userConected", user._user.phoneNumber);

      socket.on("mess", (obj, receiver) => {
        dispatch({
          type: ActionsTypes.MESSAGE_RECEIVE,
          payload: obj
        });
      });
      socket.on("postRecevied", post => {
        dispatch({
          type: ActionsTypes.POST_RECEIVED,
          payload: post
        });
      });
      AsyncStorage.setItem(
        "user",
        JSON.stringify({ ...user, user })
      ).then(asyncResponse => {});
      navigation.dispatch(
        StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({
              routeName: "ImageSave"
            })
          ]
        })
      );
    })
    .catch(error => {
      dispatch({
        type: ActionsTypes.VERIFICATION_EEEOR,
        payload: error
      });
    });
};

export const ListenMessage = obj => async dispatch => {
  dispatch({
    type: ActionsTypes.MESSAGE_RECEIVE,
    payload: obj
  });
};

export const sendMessage = giftedChatMessages => async dispatch => {
  socket.emit("message", giftedChatMessages);
};

export const uploadProfilePic = (userdata, imageResponse) => async dispatch => {
  let storage = firebase.storage();
  storage
    .ref("/images")
    .putFile(imageResponse.path)
    .on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      async snapshot => {
        if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
          dispatch({
            type: ActionsTypes.PROOFILE_PICTUTURE_UPLOADED,
            payload: snapshot.downloadURL
          });
          // alert("uploaded");
        }
      },
      error => {}
    );
};
export const uploadImage = imageResponse => async dispatch => {
  let storage = firebase.storage();
  storage
    .ref("/photoes")
    .putFile(imageResponse.path)
    .on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      async snapshot => {
        if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
          dispatch({
            type: ActionsTypes.IMAGE_PICTUTURE_UPLOADED,
            payload: snapshot.downloadURL
          });
        }
      },
      error => {}
    );
};

export const setUserName = userName => async dispatch => {
  dispatch({
    type: ActionsTypes.SET_USER_NAME,
    payload: userName
  });
};

export const sendPost = post => async dispatch => {
  socket.emit("post", post);
};
export const setNull = () => async dispatch => {
  dispatch({
    type: ActionsTypes.NULL
  });
};

export const checkAsync = navigation => async dispatch => {
  AsyncStorage.getItem("user")
    .then(user => {
      var user = JSON.parse(user);
      if (user) {
        navigation.dispatch(
          StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: "Drawer" })]
          })
        );
      }
    })

    .catch(error => {
      alert("Some Problem Occured", error);
    });
};
