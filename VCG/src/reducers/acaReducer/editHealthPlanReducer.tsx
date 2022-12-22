import {
  EditHealthPlanActions,
  EditHealthPlanState,
} from "../../interfaces/types";
import { editHealthPlanTypes } from "../../constants/actionTypes";
import { RootState } from "../index";

const initialState: EditHealthPlanState = {
  pending: false,
  error: null,
  healthPlanId: 0,
  mecMcCoverage: true,
  dependentEligiblity: 0,
  employerSignature: "",
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action: EditHealthPlanActions) => {
  switch (action.type) {
    case editHealthPlanTypes.FETCH_EDITHEALTHPLAN_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case editHealthPlanTypes.FETCH_EDITHEALTHPLAN_SUCCESS:
      return {
        ...state,
        pending: false,
        ...action.payload,
        error: null,
      };
    case editHealthPlanTypes.FETCH_EDITHEALTHPLAN_FAILURE:
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
export const getEditHealthPlanDetails = (state: RootState) =>
  state.editHealthPlan;
