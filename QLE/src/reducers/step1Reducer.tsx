import { STEP1Actions, STEP1State} from "../interfaces/types";
import {step1Types} from "../constants/actionTypes";
import {RootState} from "./index";
import { string } from "yup";

const initialState: STEP1State = {
    pending: false,
    error: null,
    data: "",
    
   
};

export default (state = initialState, action: STEP1Actions) => {

    switch (action.type) {
        case step1Types.FETCH_STEP1_REQUEST:
            return {
                ...state,
                pending: true
            };
        case step1Types.FETCH_STEP1_SUCCESS:
            return {
                ...state,
                pending: false,
                data:action.payload,
                error: null
            };
        case step1Types.FETCH_STEP1_FAILURE:
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
export const getSTEP1EnteredDetails = (state: RootState) => state.step1.data;