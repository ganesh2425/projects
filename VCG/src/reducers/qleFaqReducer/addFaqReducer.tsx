import { AddFaqActions, AddFaqState } from '../../interfaces/qleFaqType';
import {addFaqTypes} from "../../constants/actionTypes";
import {RootState} from "../index";

const initialState: AddFaqState = {
    pending: false,
    error: null,
    id: 0,
    number: 0,
    type : '',
    question: '',
    answer: '',
    employer:'',
    data:{}
};

export default (state = initialState, action: AddFaqActions) => {
    switch (action.type) {
        case addFaqTypes.FETCH_ADDFAQ_REQUEST:
            return {
                ...state,
                pending: true
            };
        case addFaqTypes.FETCH_ADDFAQ_SUCCESS:
            return {
                ...state,
                pending: false,
                ...action.payload,
                error: null
            };
        case addFaqTypes.FETCH_ADDFAQ_FAILURE:
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
export const getAddFaqDetails = (state: RootState) => state.addFaq;