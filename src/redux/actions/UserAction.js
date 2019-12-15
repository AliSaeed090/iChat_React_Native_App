import * as ActionsTypes from "./types";
import { StackActions, NavigationActions } from "react-navigation";
import firebase from "react-native-firebase";
import io from "socket.io-client";

const socket = io("http://192.168.0.106:3000");

// import io from "socket.io-client";
// const socket = io("http://192.168.0.101:3000");
// import axios from "axios";
// import server from "../../constants/server";

// import AsyncStorage from "@react-native-community/async-storage";

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
      console.log("user._user.phoneNumber", user._user.phoneNumber);
      socket.emit("userConected", user._user.phoneNumber);
      navigation.dispatch(
        StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({
              routeName: "Drawer"
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

// export const SignUp = (navigation, userData) => async (dispatch) => {
//   console.log(userData);
//   //   dispatch({
//   //     type: ActionsTypes.START_LOADING,
//   //     payload: "Getting Room Details"
//   //   });

//   axios

//     .post(`${server}users/signup`, userData)

//     .then((res) => {
//       console.log("Api Res", res);
//       if (res.status === 200) {
//         alert(res.data.status);

//         dispatch({
//           type: ActionsTypes.SET_USERDATA,
//           payload: { ...res.data.data, password: userdata.password }
//         });

//         // dispatch({
//         //   // type: ActionsTypes.NOT_LOADING
//         // });
//       }
//     })

//     .catch((error) => {
//       console.log("ApiError", error);
//       // dispatch({
//       //   //  type: ActionsTypes.NOT_LOADING
//       // });

//       if (error.response.status === 400)
//         alert(error.response.data.data.message);
//       else if (error.response.status === 500) alert("User Already Exists");
//       else alert(error.response.data.data.message);
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

// export const checkAsync = (navigation) => async (dispatch) => {
//   dispatch({
//     type: ActionsTypes.START_LOADING,
//     payload: "Checking Auth State"
//   });
//   AsyncStorage.getItem("user").then((user) => {
//     var user = JSON.parse(user);
//     console.log(user);
//     axios
//       .post(`${server}users/login`, {
//         email: user.email,
//         password: user.password
//       })
//       .then((res) => {
//         if (res.data.code === 200) {
//           dispatch({
//             type: ActionsTypes.CHECK_ASYNC,
//             payload: user
//           });
//           navigation.dispatch(
//             StackActions.reset({
//               index: 0,
//               actions: [NavigationActions.navigate({ routeName: "Dashboard" })]
//             })
//           );
//           dispatch({
//             type: ActionsTypes.NOT_LOADING
//           });
//         }
//       })

//       .catch((error) => {
//         dispatch({
//           type: ActionsTypes.NOT_LOADING
//         });

//         if (error.response.status === 401) alert("Unauthorized User");
//         else alert("Some Problem Occured");
//       });
//   });
// };

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
