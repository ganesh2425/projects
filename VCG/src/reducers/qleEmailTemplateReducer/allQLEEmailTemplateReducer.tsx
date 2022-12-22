import { AllQLEEmailTemplateActions, AllQLEEmailTemplateState} from "../../interfaces/types";
import {allQLEEmailTemplateTypes} from "../../constants/actionTypes";
import {RootState} from "../index";

const initialState: AllQLEEmailTemplateState = {
    pending: false,
    error: null,
    data:"",
    mailTemplates:[]
};

export default (state = initialState, action: AllQLEEmailTemplateActions) => {
    switch (action.type) {
        case allQLEEmailTemplateTypes.FETCH_ALLQLEEMAILTEMPLATE_REQUEST:
            return {
                ...state,
                pending: true
            };
        case allQLEEmailTemplateTypes.FETCH_ALLQLEEMAILTEMPLATE_SUCCESS:
            return {
                ...state,
                pending: false,
                data: action.payload.qleEmailTemplate,
                roles: action.payload.qleEmailTemplate,
                error: null
            };
        case allQLEEmailTemplateTypes.FETCH_ALLQLEEMAILTEMPLATE_FAILURE:
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
export const getAllQLEEmailTemplateDetails = (state: RootState) => state.allQLEEmailTemplate.data;