import { PRIVACYPOLICYActions, PRIVACYPOLICYState} from "../interfaces/types";
import {PrivacypolicyTypes} from "../constants/actionTypes";
import {RootState} from "./index";
import { string } from "yup";

const initialState: PRIVACYPOLICYState = {
    pending: false,
    error: null,
    privacyPolicy : "",
    
   
};

export default (state = initialState, action: PRIVACYPOLICYActions) => {
    switch (action.type) {
        case PrivacypolicyTypes.FETCH_PRIVACYPOLICY_REQUEST:
            return {
                ...state,
                pending: true
            };
        case PrivacypolicyTypes.FETCH_PRIVACYPOLICY_SUCCESS:
            return {
                ...state,
                pending: false,
                ...action.payload,
                error: null
            };
        case PrivacypolicyTypes.FETCH_PRIVACYPOLICY_FAILURE:
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
export const getPRIVACYPOLICYEnteredDetails = (state: RootState) => state.Privacypolicy.privacyPolicy;