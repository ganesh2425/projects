import { DelEmployerActions, DelEmployerState} from "../../interfaces/types";
import {delEmployerTypes} from "../../constants/actionTypes";
import {RootState} from "../index";

const initialState: DelEmployerState = {
    pending: false,
    error: null,
    data: ""
};

export default (state = initialState, action: DelEmployerActions) => {
    switch (action.type) {
        case delEmployerTypes.FETCH_DELEMPLOYER_REQUEST:
            return {
                ...state,
                pending: true
            };
        case delEmployerTypes.FETCH_DELEMPLOYER_SUCCESS:
            return {
                ...state,
                pending: false,
                ...action.payload,
                data:action.payload,
                error: null
            };
        case delEmployerTypes.FETCH_DELEMPLOYER_FAILURE:
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
export const delEmployerDetails = (state: RootState) => state.delEmployer;