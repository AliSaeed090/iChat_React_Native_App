import * as ActionsTypes from "../actions/types";

const initialState = {
  // user: false,
  // isLoading: false,
  // progress: "",
  cellNumber: "",
  confirmResult: null,
  err: "",
  isErr: false
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
      return {
        ...state,
        confirmResult: action.payload
      };
    case ActionsTypes.VERIFICATION_DONE:
      console.log("SET_CONFIRM_RESULT ACTION WORKED", action.payload);
      return {
        ...state
        // confirmResult: action.payload
      };

    case ActionsTypes.VERIFICATION_EEEOR:
      console.log("VERIFICATION_EEEOR ACTION WORKED", action.payload);
      return {
        ...state,
        isErr: true,
        err: action.payload
      };
    default:
      return state;
  }
}
