import { EditACAMessageTemplateActions, EditACAMessageTemplateState} from "../../interfaces/types";
import {editACAMessageTemplateTypes} from "../../constants/actionTypes";
import {RootState} from "../index";

const initialState: EditACAMessageTemplateState = {
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

export default (state = initialState, action: EditACAMessageTemplateActions) => {
    
    switch (action.type) {
        case editACAMessageTemplateTypes.FETCH_EDITACAMESSAGETEMPLATE_REQUEST:
            return {
                ...state,
                pending: true
            };
        case editACAMessageTemplateTypes.FETCH_EDITACAMESSAGETEMPLATE_SUCCESS:
            return {
                ...state,
                pending: false,
                ...action.payload,
                error: null
            };
        case editACAMessageTemplateTypes.FETCH_EDITACAMESSAGETEMPLATE_FAILURE:
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
export const getEditACAMessageTemplateDetails = (state: RootState) => state.editACAMessageTemplate