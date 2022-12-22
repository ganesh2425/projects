import { AllReOrderedFaqsActions, AllFaqsByEmployerState} from "../../interfaces/qleFaqType";
import {allReOrderedFaqsTypes} from "../../constants/actionTypes";
import {RootState} from "../index";


const initialState: AllFaqsByEmployerState = {
    pending: false,
    error: null,
    data:[],
    faq:[]
};

export default (state = initialState, action: AllReOrderedFaqsActions) => {
  
    switch (action.type) {
        case allReOrderedFaqsTypes.FETCH_ALLREORDEREDFAQS_FAILURE:
            return {
                ...state,
                pending: true
            };
        case allReOrderedFaqsTypes.FETCH_ALLREORDEREDFAQS_SUCCESS:
            return {
                ...state,
                pending: false,
                data: action.payload.faq,
                faq: action.payload.faq,
                error: null
            };
        case allReOrderedFaqsTypes.FETCH_ALLREORDEREDFAQS_FAILURE:
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
export const getAllReOrderedFaqs = (state: RootState) => state.reOrderedFaqs.data;