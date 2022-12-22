import { EmpNewYearPlanActions, EmpNewYearPlanState} from "../../interfaces/types";
import {empNewYearPlanTypes} from "../../constants/actionTypes";
import {RootState} from "../index";
import { string } from "yup";

const initialState:EmpNewYearPlanState = {
    pending: false,
    error: null,
    data: {},
    newYearChangesOneEmployerOffer: 0,
    newYearChangeOneEmployeePay: "",
    newYearChaneOneOften: 0,
    newYearChangeOneEffectiveDate: "",
    newYearChangesTwoEmployerOffer: 0,
    newYearChangeTwoEmployeePay: "",
    newYearChaneTwoOften: 0,
    newYearChangeTwoEffectiveDate: ""
};

export default (state = initialState, action: EmpNewYearPlanActions) => {
    switch (action.type) {
        case empNewYearPlanTypes.FETCH_EMPNEWYEARPLAN_REQUEST:
            return {
                ...state,
                pending: true
            };
        case empNewYearPlanTypes.FETCH_EMPNEWYEARPLAN_SUCCESS:
            return {
                ...state,
                pending: false,
                ...action.payload,
                data:action.payload,
                error: null
            };
        case empNewYearPlanTypes.FETCH_EMPNEWYEARPLAN_FAILURE:
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
export const newYearPlanDetails = (state: RootState) => state.newYearPlan.data;