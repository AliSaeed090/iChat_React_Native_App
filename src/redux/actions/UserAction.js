import * as ActionsTypes from "./types";
import { StackActions, NavigationActions } from "react-navigation";
import firebase from "react-native-firebase";
import io from "socket.io-client";
import server from "../../components/server";

const socket = io(server);

// import io from "socket.io-client";
// const socket = io("http://192.168.0.101:3000");
// import axios from "axios";
// import server from "../../constants/server";

import AsyncStorage from "@react-native-community/async-storage";

export const SMSCodeFirebase = (Number, navigation) => async dispatch => {
  console.log(Number);
  firebase
    .auth()
    .signInWithPhoneNumber(Number)
    .then(confirmResult => {
      dispatch({
        type: ActionsTypes.SET_CONFIRM_RESULT,
        payload: confirmResult
      });
      console.log(confirmResult);
      navigation.navigate("ConfirmationCode");
    })
    .catch(error => {
      console.log(error);
    });
};
export const VerifyCodeFirebase = (
  code,
  confirmResult,
  navigation
) => async dispatch => {
  console.log(code);
  confirmResult
    .confirm(code)
    .then(user => {
      dispatch({
        type: ActionsTypes.VERIFICATION_DONE,
        payload: ("VERIFICATION DONE", user)
      });

      socket.emit("userConected", user._user.phoneNumber);

      socket.on("mess", (obj, receiver) => {
        // messages.push(obj);
        // console.log("MessobjAction", obj, receiver);
        dispatch({
          type: ActionsTypes.MESSAGE_RECEIVE,
          payload: obj
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
      console.log("VERIFICATION Error", error);
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
  // dispatch({
  //   type: ActionsTypes.MESSAGE_RECEIVE,
  //   payload: obj
  // });
};
// file:///storage/emulated/0/Pictures/bb640a92-4ee3-4775-8ad4-3b2485f4b659.jpg

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
          console.log(snapshot.downloadURL);
        }
      },
      error => {
        console.error(error);
      }
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
          alert("uploaded");
          console.log(snapshot.downloadURL);
        }
      },
      error => {
        console.error(error);
      }
    );
};

export const setUserName = userName => async dispatch => {
  dispatch({
    type: ActionsTypes.SET_USER_NAME,
    payload: userName
  });
};
//     });
// };

// export const signIn = (navigation, userdata) => async (dispatch) => {
//   dispatch({
//     type: ActionsTypes.START_LOADING,
//     payload: "Loging you In"
//   });
//   axios
//     .post(`${server}users/login`, userdata)
//     .then((res) => {
//       console.log(res);
//       if (res.data.code === 200) {
//         dispatch({
//           type: ActionsTypes.SET_USERDATA,
//           payload: { ...res.data.data, password: userdata.password }
//         });
//         AsyncStorage.setItem(
//           "user",
//           JSON.stringify({ ...res.data.data, password: userdata.password })
//         ).then((asyncResponse) => {
//           dispatch({
//             type: ActionsTypes.NOT_LOADING
//           });
//           navigation.dispatch(
//             StackActions.reset({
//               index: 0,
//               actions: [
//                 NavigationActions.navigate({
//                   routeName: "Dashboard"
//                 })
//               ]
//             })
//           );
//         });
//       }
//     })

//     .catch((error) => {
//       console.log("sdas", error);
//       dispatch({
//         type: ActionsTypes.NOT_LOADING
//       });

//       if (error.response.status === 401) alert("Unauthorized User");
//       else alert("Some Problem Occured");
//     });
// };

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
      //  else {
      //   navigation.dispatch(
      //     StackActions.reset({
      //       index: 0,
      //       actions: [NavigationActions.navigate({ routeName: "CodePicker" })]
      //     })
      //   );
      // }
    })

    .catch(error => {
      alert("Some Problem Occured", error);
    });
};
// export const getNews = (navigation, userdata) => async (dispatch) => {
//   dispatch({
//     type: ActionsTypes.START_LOADING,
//     payload: "Getting Details"
//   });

//   // axios.all([
//   //   axios.get(`${server}news`),
//   //   axios.get(`https://api.github.com/users/phantomjs`)
//   // ])
//   // .then(responseArr => {
//   //   //this will be executed only when all requests are complete
//   //   console.log('Date created: ', responseArr[0].data.created_at);
//   //   console.log('Date created: ', responseArr[1].data.created_at);
//   // });

//   // axios
//   // .post(`${server}users/login`, userdata)
//   // .then(res => {

//   axios
//     .get(`${server}news`)
//     .then((res) => {
//       console.log(res);
//       // if (res.status === 200) {
//       //   dispatch({
//       //     type: ActionsTypes.SET_ROOM_DATA,
//       //     payload: res.data.data
//       //   });
//       dispatch({
//         type: ActionsTypes.NOT_LOADING
//       });
//       // }
//     })

//     .catch((error) => {
//       console.log(error);
//       dispatch({
//         type: ActionsTypes.NOT_LOADING
//       });

//       alert("Some Problem Occured");
//     });
// };
