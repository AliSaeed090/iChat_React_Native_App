import * as ActionsTypes from "../actions/types";

const initialState = {
  // user: false,
  // isLoading: false,
  // progress: "",
  cellNumber: "",
  confirmResult: null,
  err: "",
  isErr: false,
  user: null,
  cellNo: null,
  message: null,
  profilePicture: null,
  userName: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ActionsTypes.CHECKING:
    case ActionsTypes.SignUp:
      console.log("MY ACTION WORKED", action.payload);
      return {
        ...state
      };
    case ActionsTypes.SET_CONFIRM_RESULT:
      console.log("SET_CONFIRM_RESULT ACTION WORKED", action.payload);
      // console.log("phoneNo.", action.payload.auth.user.phoneNumber);

      return {
        ...state,
        confirmResult: action.payload
      };
    case ActionsTypes.VERIFICATION_DONE:
      console.log(
        "VERIFICATION_DONE ACTION WORKED",
        action.payload._user.phoneNumber
      );
      // console.log("phoneNo.", this.state.cellNumber);
      return {
        ...state,
        cellNo: action.payload._user.phoneNumber
      };

    case ActionsTypes.VERIFICATION_EEEOR:
      console.log("VERIFICATION_EEEOR ACTION WORKED", action.payload);
      return {
        ...state,
        isErr: true,
        err: action.payload
      };
    case ActionsTypes.PROOFILE_PICTUTURE_UPLOADED:
      console.log("PROOFILE_PICTUTURE_UPLOADED WORKED", action.payload);
      return {
        ...state,

        profilePicture: action.payload
      };
    case ActionsTypes.SET_USER_NAME:
      console.log("SET_USER_NAME WORKED", action.payload);
      return {
        ...state,

        userName: action.payload
      };
    case ActionsTypes.MESSAGE_RECEIVE:
      // console.log("MESSAGE_RECEIVE ACTION WORKED", action.payload);
      return {
        ...state,
        message: action.payload
      };
    default:
      return state;
  }
}
