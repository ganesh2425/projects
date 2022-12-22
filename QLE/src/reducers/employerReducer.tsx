import { EmployerActions, EmployerState} from "../interfaces/types";
import {employerTypes} from "../constants/actionTypes";
import {RootState} from "./index";
import { string } from "yup";

const initialState: EmployerState = {
    pending: false,
    error: null,
    id: 0,
    name: "",
    qleEnabled: false,
    acaEnabled: false,
    acaEmployerWontOfferHealthcover: false,
    acaEmployerHealthcoverToEmployee: false,
    acaEmployeePremiumForPlan: 0.0,
    response: null,
};

export default (state = initialState, action: EmployerActions) => {
    switch (action.type) {
        case employerTypes.FETCH_EMPLOYER_REQUEST:
            return {
                ...state,
                pending: true
            };
        case employerTypes.FETCH_EMPLOYER_SUCCESS:
            return {
                ...state,
                pending: false,
                response: action.payload,
                error: null
            };
        case employerTypes.FETCH_EMPLOYER_FAILURE:
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
export const getEmployerDetails = (state: RootState) => state.employer;