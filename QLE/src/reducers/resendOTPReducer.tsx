import { ResendOTPActions, ResendOTPState} from "../interfaces/types";
import {resendOTPTypes} from "../constants/actionTypes";
import {RootState} from "./index";

const initialState: ResendOTPState = {
    pending: false,
    error: null,
    isSuccess: false,
    // email: "",
    // phoneNo: "",
    // contactCertificationBox: "",
    // qleCertificationBox: "",
    // disclaimer:"",
};

export default (state = initialState, action: ResendOTPActions) => {
    switch (action.type) {
        case resendOTPTypes.FETCH_RESEND_OTP_REQUEST:
            return {
                ...state,
                pending: true
            };
        case resendOTPTypes.FETCH_RESEND_OTP_SUCCESS:
            return {
                ...state,
                pending: false,
                ...action.payload,
                error: null
            };
        case resendOTPTypes.FETCH_RESEND_OTP_FAILURE:
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
export const getResendOTPEnteredDetails = (state: RootState) => state.resendOTP;