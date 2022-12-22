import { EligibilityActions, EligibilityState } from "../../interfaces/types";
import { eligibilityTypes } from "../../constants/actionTypes";
import { RootState } from "../index";

const initialState: EligibilityState = {
    pending: false,
    error: null,
    employeePremium: "",
    premiumFrequency : 0,
    isEmployeeElgbleOrNext3Months : true,
    employeeElgbleOrNext3MonthsDate: "",
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action: EligibilityActions) => {
    switch (action.type) {
        case eligibilityTypes.FETCH_ELIGIBILITY_REQUEST:
            return {
                ...state,
                pending: true
            };
        case eligibilityTypes.FETCH_ELIGIBILITY_SUCCESS:
            return {
                ...state,
                pending: false,
                ...action.payload,
                error: null
            };
        case eligibilityTypes.FETCH_ELIGIBILITY_FAILURE:
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
export const getEligibilityDetails = (state: RootState) => state.eligibility;