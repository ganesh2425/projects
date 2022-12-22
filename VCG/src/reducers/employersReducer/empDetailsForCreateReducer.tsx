import { EmpDetailsForCreateActions, EmpDetailsForCreateState } from "../../interfaces/types";
import { empDetailsForCreateTypes } from "../../constants/actionTypes";
import { RootState } from "../index";

const initialState: EmpDetailsForCreateState = {
  pending: false,
  error: null,
  id: 0,
  qleEventTypes: [],
  qlePlan: [],
  qleEnabled: false,
  acaEnabled: false,
  acaEmployerWontOfferHealthcover: false,
  acaEmployerHealthcoverToEmployee: false,
  acaEmployeePremiumForPlan: 0.0,
};

export default (state = initialState, action: EmpDetailsForCreateActions) => {
  switch (action.type) {
    case empDetailsForCreateTypes.FETCH_EMPDETAILSFORCREATE_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case empDetailsForCreateTypes.FETCH_EMPDETAILSFORCREATE_SUCCESS:
      return {
        ...state,
        pending: false,
        ...action.payload,
        data: action.payload,
        error: null,
      };
    case empDetailsForCreateTypes.FETCH_EMPDETAILSFORCREATE_FAILURE:
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
export const getempDetailsForCreate = (state: RootState) => state.empDetailsForCreate;
