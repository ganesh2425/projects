/* eslint-disable import/no-anonymous-default-export */
import { DelACAEventActions, DelACAEventState } from "../../interfaces/types";
import { delACAEventTypes } from "../../constants/actionTypes";
import { RootState } from "../index";

const initialState: DelACAEventState = {
  pending: false,
  error: null,
  data: "",
};

export default (state = initialState, action: DelACAEventActions) => {
  switch (action.type) {
    case delACAEventTypes.FETCH_DELACAEVENT_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case delACAEventTypes.FETCH_DELACAEVENT_SUCCESS:
      return {
        ...state,
        pending: false,
        ...action.payload,
        data: action.payload,
        error: null,
      };
    case delACAEventTypes.FETCH_DELACAEVENT_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const delACAEventDetails = (state: RootState) => state.delACAEvent;
