/* eslint-disable import/no-anonymous-default-export */
import {
  EmployerACAEditActions,
  EmployerACAEditState,
} from "../../interfaces/types";
import { employerACAEditTypes } from "../../constants/actionTypes";
import { RootState } from "../index";

const initialState: EmployerACAEditState = {
  pending: false,
  error: null,
  employerId: 0,
  employerSignature: "",
};

export default (state = initialState, action: EmployerACAEditActions) => {
  switch (action.type) {
    case employerACAEditTypes.FETCH_EMPLOYERACAEDIT_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case employerACAEditTypes.FETCH_EMPLOYERACAEDIT_SUCCESS:
      return {
        ...state,
        pending: false,
        ...action.payload,
        error: null,
      };
    case employerACAEditTypes.FETCH_EMPLOYERACAEDIT_FAILURE:
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
export const getEmployerACAEdit = (state: RootState) => state.empACAEdit;
