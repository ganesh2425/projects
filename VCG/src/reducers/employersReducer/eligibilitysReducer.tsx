import { EmpEligibilityActions, EmpEligibilityState} from "../../interfaces/types";
import {empEligibilityTypes} from "../../constants/actionTypes";
import {RootState} from "../index";
import { string } from "yup";

const initialState: EmpEligibilityState = {
    pending: false,
    error: null,
    response: null,
    employeePremium: 0,
    employeePremiumOften: "",
    nextThreeMonths: "",
    payload: undefined,
    data:"",
    type: undefined
};

export default (state = initialState, action: EmpEligibilityState) => { 
    switch (action.type) {
        case empEligibilityTypes.FETCH_EMP_ELIGIBILITY_REQUEST:
            return {
                ...state,
                pending: true
            };
        case empEligibilityTypes.FETCH_EMP_ELIGIBILITY_SUCCESS:
            return {
                ...state,
                pending: false,
                ...action.payload,
                data:action.payload,
                error: null
            };
        case empEligibilityTypes.FETCH_EMP_ELIGIBILITY_FAILURE:
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
export const eligibilityDetails = (state: RootState) => state.eligibilitys.data;