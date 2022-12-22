import { OTPActions, OTPState} from "../interfaces/types";
import {otpTypes} from "../constants/actionTypes";
import {RootState} from "./index";

const initialState: OTPState = {
    pending: false,
    error: null,
    email: "",
    phoneNo: "",
    otp:"",
    // contactCertificationBox: "",
    // qleCertificationBox: "",
};

export default (state = initialState, action: OTPActions) => {
    switch (action.type) {
        case otpTypes.FETCH_OTP_REQUEST:
            return {
                ...state,
                pending: true
            };
        case otpTypes.FETCH_OTP_SUCCESS:
            return {
                ...state,
                pending: false,
                ...action.payload,
                error: null
            };
        case otpTypes.FETCH_OTP_FAILURE:
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
export const getOTPEnteredDetails = (state: RootState) => state.otp;