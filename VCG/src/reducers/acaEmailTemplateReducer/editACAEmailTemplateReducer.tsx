import { EditACAEmailTemplateActions, EditACAEmailTemplateState} from "../../interfaces/types";
import {editACAEmailTemplateTypes} from "../../constants/actionTypes";
import {RootState} from "../index";

const initialState: EditACAEmailTemplateState = {
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

export default (state = initialState, action: EditACAEmailTemplateActions) => {
    // {console.log(state,action)}
    switch (action.type) {
        case editACAEmailTemplateTypes.FETCH_EDITACAEMAILTEMPLATE_REQUEST:
            return {
                ...state,
                pending: true
            };
        case editACAEmailTemplateTypes.FETCH_EDITACAEMAILTEMPLATE_SUCCESS:
            return {
                ...state,
                pending: false,
                ...action.payload,
                error: null
            };
        case editACAEmailTemplateTypes.FETCH_EDITACAEMAILTEMPLATE_FAILURE:
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
export const getEditACAEmailTemplateDetails = (state: RootState) => state.editACAEmailTemplate;