import * as ActionsTypes from "../actions/types";

const initialState = {
  cellNumber: "",
  confirmResult: null,
  err: "",
  isErr: false,
  user: null,
  cellNo: null,
  message: null,
  profilePicture: null,
  userName: null,
  imageUrl: null,
  post: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ActionsTypes.CHECKING:
    case ActionsTypes.SignUp:
      return {
        ...state
      };
    case ActionsTypes.SET_CONFIRM_RESULT:
      return {
        ...state,
        confirmResult: action.payload
      };
    case ActionsTypes.VERIFICATION_DONE:
      return {
        ...state,
        cellNo: action.payload._user.phoneNumber
      };

    case ActionsTypes.VERIFICATION_EEEOR:
      return {
        ...state,
        isErr: true,
        err: action.payload
      };
    case ActionsTypes.PROOFILE_PICTUTURE_UPLOADED:
      return {
        ...state,

        profilePicture: action.payload
      };
    case ActionsTypes.SET_USER_NAME:
      return {
        ...state,

        userName: action.payload
      };
    case ActionsTypes.MESSAGE_RECEIVE:
      return {
        ...state,
        message: action.payload
      };
    case ActionsTypes.IMAGE_PICTUTURE_UPLOADED:
      return {
        ...state,
        imageUrl: action.payload
      };
    case ActionsTypes.POST_RECEIVED:
      return {
        ...state,
        post: action.payload
      };
    case ActionsTypes.NULL:
      return {
        ...state,
        post: null,
        imageUrl: null
      };

    default:
      return state;
  }
}
