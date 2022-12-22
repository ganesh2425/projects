import { GetFaqActions, GetFaqState} from "../../interfaces/qleFaqType";
import {getFaqTypes} from "../../constants/actionTypes";
import {RootState} from "../index";

const initialState: GetFaqState = {
    pending: false,
    error: null,
    id: 0,
    number:0,
    type : '',
    question: '',
    answer: '',
    employer:'',
    data:{}
};

export default (state = initialState, action: GetFaqActions) => {
    switch (action.type) {
        case getFaqTypes.FETCH_GETFAQ_REQUEST:
            return {
                ...state,
                pending: true
            };
        case getFaqTypes.FETCH_GETFAQ_SUCCESS:
            return {
                ...state,
                pending: false,
                ...action.payload,
                data: action.payload,
                error: null,
            };
        case getFaqTypes.FETCH_GETFAQ_FAILURE:
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
export const getFaqById = (state: RootState) => state.getFaq;