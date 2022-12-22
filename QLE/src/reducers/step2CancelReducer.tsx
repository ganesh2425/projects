import { STEP2CancelActions, STEP2CancelState} from "../interfaces/types";
import {step2CancelTypes} from "../constants/actionTypes";
import {RootState} from "./index";
import { string } from "yup";

const initialState: STEP2CancelState = {
    pending: false,
    error: null,
    isSuccess: false,
};

export default (state = initialState, action: STEP2CancelActions) => {

    switch (action.type) {
        case step2CancelTypes.FETCH_STEP2CANCEL_REQUEST:
            return {
                ...state,
                pending: true
            };
        case step2CancelTypes.FETCH_STEP2CANCEL_SUCCESS:
            return {
                ...state,
                pending: false,
                isSuccess:action.payload,
                error: null
            };
        case step2CancelTypes.FETCH_STEP2CANCEL_FAILURE:
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
export const getSTEP2CancelEnteredDetails = (state: RootState) => state.step2Cancel.isSuccess;