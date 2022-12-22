/* eslint-disable import/no-anonymous-default-export */
import { PRIVACYActions, PRIVACYState } from "../interfaces/types";
import { privacyTypes } from "../constants/actionTypes";
import { RootState } from "./index";

const initialState: PRIVACYState ={
  pending: false,
  error: null,
  privacyPolicies:"",


}

export default (state = initialState, action: PRIVACYActions) =>{
  switch (action.type) {
    case privacyTypes.FETCH_PRIVACY_REQUEST:
      return {
        ...state,
        pending: true
      };
    case privacyTypes.FETCH_PRIVACY_SUCCESS:
      return {
        ...state,
        pending: false,
        ...action.payload,
        error: null
      };
    case privacyTypes.FETCH_PRIVACY_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload.error
      };
    default:
      return state;
  }
}

export const getPRIVACYPOLICYDetails = (state: RootState) => state.privacy;