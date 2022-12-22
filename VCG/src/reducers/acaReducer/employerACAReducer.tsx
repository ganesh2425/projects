import { EmployerACAState, EmployerACAActions } from "../../interfaces/types";
import { employerACATypes } from "../../constants/actionTypes";
import { RootState } from "..";

const initialState: EmployerACAState = {
    pending: false,
    error: null,
    employerId: "",
    length:0,
    employerName: "",
    employerIdentificationNumber: "",
    employerPhoneAndType: "",
    employerPrimaryContact: "",
    employerAddress: "",
    data: {}
}

export default (state = initialState, action: EmployerACAActions) => {
    switch (action.type) {
        case employerACATypes.FETCH_EMPLOYERACA_REQUEST:
            return {
                ...state,
                pending: true
            };
        case employerACATypes.FETCH_EMPLOYERACA_SUCCESS:
            return {
                ...state,
                pending: false,
                ...action.payload,
                data: action.payload,
                error: null,
            };
        case employerACATypes.FETCH_EMPLOYERACA_FAILURE:
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
export const getEmployerACADetails = (state: RootState) => state.getEmpACA;