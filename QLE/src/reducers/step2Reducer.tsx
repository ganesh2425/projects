import { STEP2Actions, STEP2State} from "../interfaces/types";
import {step2Types} from "../constants/actionTypes";
import {RootState} from "./index";
import { string } from "yup";

const initialState: STEP2State = {
    pending: false,
    error: null,
    data: "",
    
   
};

export default (state = initialState, action: STEP2Actions) => {

    switch (action.type) {
        case step2Types.FETCH_STEP2_REQUEST:
            return {
                ...state,
                pending: true
            };
        case step2Types.FETCH_STEP2_SUCCESS:
            return {
                ...state,
                pending: false,
                data:action.payload,
                error: null
            };
        case step2Types.FETCH_STEP2_FAILURE:
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
export const getSTEP2EnteredDetails = (state: RootState) => state.step2.data;