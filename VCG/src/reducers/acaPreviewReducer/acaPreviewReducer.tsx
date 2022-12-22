import { GetACAPreviewActions, GetACAPreviewState} from "../../interfaces/types";
import {getACAPreviewTypes} from "../../constants/actionTypes";
import {RootState} from "../index";

const initialState: GetACAPreviewState = {
    pending: false,
    error: null,
};

export default (state = initialState, action: GetACAPreviewActions) => {
    
    switch (action.type) {
        case getACAPreviewTypes.FETCH_GET_ACA_PREVIEW_REQUEST:
            return {
                ...state,
                pending: true
            };
        case getACAPreviewTypes.FETCH_GET_ACA_PREVIEW_SUCCESS:
            return {
                ...state,
                pending: false,
                ...action.payload,
                data: action.payload,
                error: null,
            };
        case getACAPreviewTypes.FETCH_GET_ACA_PREVIEW_FAILURE:
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
export const getACAPreviewDetails = (state: RootState) => state.getACAPreview;