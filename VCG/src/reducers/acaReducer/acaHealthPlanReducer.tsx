import { HealthPlanActions, HealthPlanState } from "../../interfaces/types";
import { healthPlanTypes } from "../../constants/actionTypes";
import { RootState } from "../index";

const initialState: HealthPlanState = {
    pending: false,
    error: null,
    mecMcCoverage : true,
    dependentEligiblity : 0,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action: HealthPlanActions) => {
    switch (action.type) {
        case healthPlanTypes.FETCH_HEALTHPLAN_REQUEST:
            return {
                ...state,
                pending: true
            };
        case healthPlanTypes.FETCH_HEALTHPLAN_SUCCESS:
            return {
                ...state,
                pending: false,
                ...action.payload,
                error: null
            };
        case healthPlanTypes.FETCH_HEALTHPLAN_FAILURE:
            return {
                ...state,
                pending: false,
                error: action.payload.error
            };
        default:
            return state;
    }
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getHealthPlanDetails = (state: RootState) => state.acaHealthPlan;