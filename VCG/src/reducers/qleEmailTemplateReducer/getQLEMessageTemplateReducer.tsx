import { GetQLEMessageTemplateActions, GetQLEMessageTemplateState} from "../../interfaces/types";
import {getQLEMessageTemplateTypes} from "../../constants/actionTypes";
import {RootState} from "../index";

const initialState: GetQLEMessageTemplateState = {
    pending: false,
    error: null,
    id:0,
    templateType:"",
    content:"",
    type:"",
    name:"",
    subject:""

};

export default (state = initialState, action: GetQLEMessageTemplateActions) => {
    switch (action.type) {
        case getQLEMessageTemplateTypes.FETCH_GETQLEMESSAGETEMPLATE_REQUEST:
            return {
                ...state,
                pending: true
            };
        case getQLEMessageTemplateTypes.FETCH_GETQLEMESSAGETEMPLATE_SUCCESS:
            return {
                ...state,
                pending: false,
                ...action.payload,
                data: action.payload,
                error: null,
            };
        case getQLEMessageTemplateTypes.FETCH_GETQLEMESSAGETEMPLATE_FAILURE:
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
export const getQLEMessageTemplateDetails = (state: RootState) => state.getQLEMessageTemplate;