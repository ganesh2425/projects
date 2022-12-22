import { EditQLEMessageTemplateActions, EditQLEMessageTemplateState} from "../../interfaces/types";
import {editQLEMessageTemplateTypes} from "../../constants/actionTypes";
import {RootState} from "../index";

const initialState: EditQLEMessageTemplateState = {
    pending: false,
    error: null,
    id:0,
    name:"",
    content:"",
    templateType:"",
    type:"",
    subject:"",
    data:{}
};

export default (state = initialState, action: EditQLEMessageTemplateActions) => {

    switch (action.type) {
        case editQLEMessageTemplateTypes.FETCH_EDITQLEMESSAGETEMPLATE_REQUEST:
            return {
                ...state,
                pending: true
            };
        case editQLEMessageTemplateTypes.FETCH_EDITQLEMESSAGETEMPLATE_SUCCESS:
            return {
                ...state,
                pending: false,
                ...action.payload,
                error: null
            };
        case editQLEMessageTemplateTypes.FETCH_EDITQLEMESSAGETEMPLATE_FAILURE:
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
export const getEditQLEMessageTemplateDetails = (state: RootState) => state.editQLEMessageTemplate;