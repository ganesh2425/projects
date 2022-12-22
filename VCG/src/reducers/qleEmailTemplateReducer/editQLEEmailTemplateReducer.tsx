import { EditQLEEmailTemplateActions, EditQLEEmailTemplateState} from "../../interfaces/types";
import {editQLEEmailTemplateTypes} from "../../constants/actionTypes";
import {RootState} from "../index";

const initialState: EditQLEEmailTemplateState = {
    pending: false,
    error: null,
    id:0,
    name:"",
    subject:"",
    content:"",
    templateType:"",
    type:"",
    data:{}
};

export default (state = initialState, action: EditQLEEmailTemplateActions) => {

    switch (action.type) {
        case editQLEEmailTemplateTypes.FETCH_EDITQLEEMAILTEMPLATE_REQUEST:
            return {
                ...state,
                pending: true
            };
        case editQLEEmailTemplateTypes.FETCH_EDITQLEEMAILTEMPLATE_SUCCESS:
            return {
                ...state,
                pending: false,
                ...action.payload,
                error: null
            };
        case editQLEEmailTemplateTypes.FETCH_EDITQLEEMAILTEMPLATE_FAILURE:
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
export const getEditQLEEmailTemplateDetails = (state: RootState) => state.editQLEEmailTemplate;