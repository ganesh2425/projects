import { DelFaqActions, DelFaqState} from "../../interfaces/qleFaqType";
import {delFaqTypes} from "../../constants/actionTypes";
import {RootState} from "../index";

const initialState: DelFaqState = {
    pending: false,
    error: null,
    data: ""
};

export default (state = initialState, action: DelFaqActions) => {
    switch (action.type) {
        case delFaqTypes.FETCH_DELFAQ_REQUEST:
            return {
                ...state,
                pending: true
            };
        case delFaqTypes.FETCH_DELFAQ_SUCCESS:
            return {
                ...state,
                pending: false,
                ...action.payload,
                data:action.payload,
                error: null
            };
        case delFaqTypes.FETCH_DELFAQ_FAILURE:
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
export const delFaqDetails = (state: RootState) => state.delFaq;