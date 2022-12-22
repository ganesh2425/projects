/* eslint-disable import/no-anonymous-default-export */
import { HOMEActions, HOMEState } from "../interfaces/types";
import { homeTypes } from "../constants/actionTypes";
import { RootState } from "./index";
import { string } from "yup";

const initialState: HOMEState = {
  pending: false,
  error: null,
  homePageDescription: "",
};

export default (state = initialState, action: HOMEActions) => {
  switch (action.type) {
    case homeTypes.FETCH_HOME_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case homeTypes.FETCH_HOME_SUCCESS:
      return {
        ...state,
        pending: false,
        ...action.payload,
        error: null,
      };
    case homeTypes.FETCH_HOME_FAILURE:
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
export const getHOMEEnteredDetails = (state: RootState) =>
  state.home.homePageDescription;
