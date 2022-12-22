import { GetQLEEmailTemplateActions, GetQLEEmailTemplateState} from "../../interfaces/types";
import {getQLEEmailTemplateTypes} from "../../constants/actionTypes";
import {RootState} from "../index";

const initialState: GetQLEEmailTemplateState = {
    pending: false,
    error: null,
    id:0,
    templateType:"",
    content:"",
    type:"",
    name:"",
    subject:""

};

export default (state = initialState, action: GetQLEEmailTemplateActions) => {
 

    switch (action.type) {
        case getQLEEmailTemplateTypes.FETCH_GETQLEEMAILTEMPLATE_REQUEST:
            return {
                ...state,
                pending: true
            };
        case getQLEEmailTemplateTypes.FETCH_GETQLEEMAILTEMPLATE_SUCCESS:
            return {
                ...state,
                pending: false,
                ...action.payload,
                data: action.payload,
                error: null,
            };
        case getQLEEmailTemplateTypes.FETCH_GETQLEEMAILTEMPLATE_FAILURE:
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
export const getQLEEmailTemplateDetails = (state: RootState) => state.getQLEEmailTemplate;