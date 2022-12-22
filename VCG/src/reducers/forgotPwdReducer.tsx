import { ForgotPwdActions, ForgotPwdState} from "../interfaces/types";
import {forgotPwdTypes} from "../constants/actionTypes";
import {RootState} from "./index";

const initialState: ForgotPwdState = {
    pending: false,
    error: null,
    data:'',
};

export default (state = initialState, action: ForgotPwdActions) => {
    
    switch (action.type) {
        case forgotPwdTypes.FETCH_FORGOTPWD_REQUEST:
            return {
                ...state,
                pending: true
            };
        case forgotPwdTypes.FETCH_FORGOTPWD_SUCCESS:
            return {
                ...state,
                pending: false,
                data:action.payload,
                error: null
            };
        case forgotPwdTypes.FETCH_FORGOTPWD_FAILURE:
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
export const getForgotPwdDetails = (state: RootState) => state.forgotPwd;