import { AllQlesActions, AllQlesState } from '../../interfaces/types';
import {allqlesTypes} from "../../constants/actionTypes";
import {RootState} from "../index";

const initialState: AllQlesState = {
    pending: false,
    error: null,
    length: 0,
    data: [],
};

export default (state = initialState, action: AllQlesActions) => {
    switch (action.type) {
        case allqlesTypes.FETCH_ALLQLES_REQUEST:
            return {
                ...state,
                pending: true
            };
        case allqlesTypes.FETCH_ALLQLES_SUCCESS:
            return {
                ...state,
                pending: false,
                data: action.payload,
                error: null
            };
        case allqlesTypes.FETCH_ALLQLES_FAILURE:
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
export const getAllQlesDetails = (state: RootState) => state.allQle;