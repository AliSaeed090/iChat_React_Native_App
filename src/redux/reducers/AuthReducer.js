import * as ActionsTypes from "../actions/types";

const initialState = {
  // user: false,
  // isLoading: false,
  // progress: "",
  cellNumber: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ActionsTypes.CHECKING:
    case ActionsTypes.SignUp:
      console.log("MY ACTION WORKED", action.payload);
      return {
        ...state
      };
    default:
      return state;
  }
}
