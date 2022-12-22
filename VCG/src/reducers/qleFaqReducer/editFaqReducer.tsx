import { EditFaqActions, EditFaqState} from "../../interfaces/qleFaqType";
import {editFaqTypes} from "../../constants/actionTypes";
import {RootState} from "../index";

const initialState: EditFaqState = {
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

export default (state = initialState, action: EditFaqActions) => {
    switch (action.type) {
        case editFaqTypes.FETCH_EDITFAQ_REQUEST:
            return {
                ...state,
                pending: true
            };
        case editFaqTypes.FETCH_EDITFAQ_SUCCESS:
            return {
                ...state,
                pending: false,
                ...action.payload,
                error: null
            };
        case editFaqTypes.FETCH_EDITFAQ_FAILURE:
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
export const getEditFaqDetails = (state: RootState) => state.editFaq;