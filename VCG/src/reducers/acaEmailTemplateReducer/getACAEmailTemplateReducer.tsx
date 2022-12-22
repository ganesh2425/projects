import { GetACAEmailTemplateActions, GetACAEmailTemplateState} from "../../interfaces/types";
import {getACAEmailTemplateTypes} from "../../constants/actionTypes";
import {RootState} from "../index";

const initialState: GetACAEmailTemplateState = {
    pending: false,
    error: null,
    id:0,
    templateType:"",
    content:"",
    type:"",
    subject:"",
    name:"",
   
};

export default (state = initialState, action: GetACAEmailTemplateActions) => {
 

    switch (action.type) {
        case getACAEmailTemplateTypes.FETCH_GETACAEMAILTEMPLATE_REQUEST:
            return {
                ...state,
                pending: true
            };
        case getACAEmailTemplateTypes.FETCH_GETACAEMAILTEMPLATE_SUCCESS:
            return {
                ...state,
                pending: false,
                ...action.payload,
                data: action.payload,
                error: null,
            };
        case getACAEmailTemplateTypes.FETCH_GETACAEMAILTEMPLATE_FAILURE:
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
export const getACAEmailTemplateDetails = (state: RootState) => state.getACAEmailTemplate;