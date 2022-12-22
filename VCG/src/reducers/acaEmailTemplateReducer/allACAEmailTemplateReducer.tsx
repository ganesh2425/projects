import { AllACAEmailTemplateActions, AllACAEmailTemplateState} from "../../interfaces/types";
import {allACAEmailTemplateTypes} from "../../constants/actionTypes";
import {RootState} from "../index";

const initialState: AllACAEmailTemplateState = {
    pending: false,
    error: null,
    data:"",
    emailTemplate:[]
};

export default (state = initialState, action: AllACAEmailTemplateActions) => {
    switch (action.type) {
        case allACAEmailTemplateTypes.FETCH_ALLACAEMAILTEMPLATE_REQUEST:
            return {
                ...state,
                pending: true
            };
        case allACAEmailTemplateTypes.FETCH_ALLACAEMAILTEMPLATE_SUCCESS:
            return {
                ...state,
                pending: false,
                data: action.payload.acaEmailTemplate,
                roles: action.payload.acaEmailTemplate,
                error: null
            };
        case allACAEmailTemplateTypes.FETCH_ALLACAEMAILTEMPLATE_FAILURE:
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
export const getAllACAEmailTemplateDetails = (state: RootState) => state.allACAEmailTemplate.data;