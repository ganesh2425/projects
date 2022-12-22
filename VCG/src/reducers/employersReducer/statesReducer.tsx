import { STATESActions, STATESState} from "../../interfaces/types";
import {statesTypes} from "../../constants/actionTypes";
import {RootState} from "../index";
import { string } from "yup";

const initialState: STATESState = {
    pending: false,
    error: null,
    response: null,
    
   
};

export default (state = initialState, action: STATESActions) => {
    switch (action.type) {
        case statesTypes.FETCH_STATES_REQUEST:
            return {
                ...state,
                pending: true
            };
        case statesTypes.FETCH_STATES_SUCCESS:
            return {
                ...state,
                pending: false,
                response: action.payload,
                error: null
            };
        case statesTypes.FETCH_STATES_FAILURE:
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
export const getSTATESEnteredDetails = (state: RootState) => state.states;