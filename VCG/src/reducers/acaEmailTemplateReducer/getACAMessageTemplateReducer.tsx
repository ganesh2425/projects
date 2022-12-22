import { GetACAMessageTemplateActions, GetACAMessageTemplateState} from "../../interfaces/types";
import {getACAMessageTemplateTypes} from "../../constants/actionTypes";
import {RootState} from "../index";

const initialState: GetACAMessageTemplateState = {
    pending: false,
    error: null,
    id:0,
    templateType:"",
    content:"",
    type:"",
    name:"",
    subject:""
    
};

export default (state = initialState, action: GetACAMessageTemplateActions) => {
    

    switch (action.type) {
        case getACAMessageTemplateTypes.FETCH_GETACAMESSAGETEMPLATE_REQUEST:
            return {
                ...state,
                pending: true
            };
        case getACAMessageTemplateTypes.FETCH_GETACAMESSAGETEMPLATE_SUCCESS:
            return {
                ...state,
                pending: false,
                ...action.payload,
                data: action.payload,
                error: null,
            };
        case getACAMessageTemplateTypes.FETCH_GETACAMESSAGETEMPLATE_FAILURE:
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
export const getACAMessageTemplateDetails = (state: RootState) => state.getACAMessageTemplate;