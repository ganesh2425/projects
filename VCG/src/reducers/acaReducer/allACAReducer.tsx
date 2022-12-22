import { AllACAActions, AllACAState } from "../../interfaces/types";
import { allACATypes } from "../../constants/actionTypes";
import { RootState } from "..";

const initialState: AllACAState = {
  pending: false,
  error: null,
  data: [],
  aca: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action: AllACAActions) => {
  switch (action.type) {
    case allACATypes.FETCH_ALLACA_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case allACATypes.FETCH_ALLACA_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.payload.aca,
        aca: action.payload.aca,
        error: null,
      };
    case allACATypes.FETCH_ALLACA_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export const getAllACADetails = (state: RootState) => state.allACA;
