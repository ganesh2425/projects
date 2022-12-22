/* eslint-disable import/no-anonymous-default-export */
import { NewYearPlanActions, NewYearPlanState } from "../../interfaces/types";
import { newYearPlanTypes } from "../../constants/actionTypes";
import { RootState } from "../index";

const initialState: NewYearPlanState = {
    pending: false,
    error: null,
    plan1EmployerOfferCoverage: 0,
    plan1EmployeeHavetoPay: 0,
    plan1HowOften: 0,
    plan1EffectiveDate: "",
    plan2EmployerOfferCoverage: 0,
    plan2EmployeeHavetoPay: 0,
    plan2HowOften: 0,
    plan2EffectiveDate: "",
}

export default (state = initialState, action: NewYearPlanActions) => {
    switch (action.type) {
        case newYearPlanTypes.FETCH_NEWYEARPLAN_REQUEST:
            return {
                ...state,
                pending: true
            };
        case newYearPlanTypes.FETCH_NEWYEARPLAN_SUCCESS:
            return {
                ...state,
                pending: false,
                ...action.payload,
                error: null
            };
        case newYearPlanTypes.FETCH_NEWYEARPLAN_FAILURE:
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
export const getNewYearPlan = (state: RootState) => state.acaNewYearPlan;