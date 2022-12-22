import { AllFaqsByEmpActions, AllFaqsByEmployerState, AllQleFaqsActions, AllQleFaqsState} from "../../interfaces/qleFaqType";
import {allFaqsByEmployerTypes, allQleFaqsTypes} from "../../constants/actionTypes";
import {RootState} from "../index";


const initialState: AllFaqsByEmployerState = {
    pending: false,
    error: null,
    data:[],
    faq:[]
};

export default (state = initialState, action: AllFaqsByEmpActions) => {
  
    switch (action.type) {
        case allFaqsByEmployerTypes.FETCH_ALLFAQSBYEMP_REQUEST:
            return {
                ...state,
                pending: true
            };
        case allFaqsByEmployerTypes.FETCH_ALLFAQSBYEMP_SUCCESS:
            return {
                ...state,
                pending: false,
                data: action.payload.faq,
                faq: action.payload.faq,
                error: null
            };
        case allFaqsByEmployerTypes.FETCH_ALLFAQSBYEMP_FAILURE:
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
export const getAllFaqsByEmpDetails = (state: RootState) => state.allFaqsByEmployer.data;