import { FAQActions, FAQState} from "../interfaces/types";
import {faqTypes} from "../constants/actionTypes";
import {RootState} from "./index";
import { string } from "yup";

const initialState: FAQState = {
    pending: false,
    error: null,
    data: "",
    
   
};

export default (state = initialState, action: FAQActions) => {
    switch (action.type) {
        case faqTypes.FETCH_FAQ_REQUEST:
            return {
                ...state,
                pending: true
            };
        case faqTypes.FETCH_FAQ_SUCCESS:
            return {
                ...state,
                pending: false,
                data:action.payload,
                error: null
            };
        case faqTypes.FETCH_FAQ_FAILURE:
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
export const getFAQEnteredDetails = (state: RootState) => state.faq.data;