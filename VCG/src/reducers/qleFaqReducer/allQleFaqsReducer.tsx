import { AllQleFaqsActions, AllQleFaqsState} from "../../interfaces/qleFaqType";
import {allQleFaqsTypes} from "../../constants/actionTypes";
import {RootState} from "../index";


const initialState: AllQleFaqsState = {
    type : '',
    pending: false,
    error: null,
    data:[],
    faq:[]
};

export default (state = initialState, action: AllQleFaqsActions) => {
  
    switch (action.type) {
        case allQleFaqsTypes.FETCH_ALLQLEFAQS_REQUEST:
            return {
                ...state,
                pending: true
            };
        case allQleFaqsTypes.FETCH_ALLQLEFAQS_SUCCESS:
            return {
                ...state,
                pending: false,
                data: action.payload.faq,
                faq: action.payload.faq,
                error: null
            };
        case allQleFaqsTypes.FETCH_ALLQLEFAQS_FAILURE:
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
export const getAllQleFaqsDetails = (state: RootState) => state.allQleFaqs.data;