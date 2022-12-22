import { GetUploadImageActions, GetUploadImageState} from "../../interfaces/types";
import {getUploadImageTypes} from "../../constants/actionTypes";
import {RootState} from "../index";

const initialState: GetUploadImageState = {
    pending: false,
    error: null, 
};

export default (state = initialState, action: GetUploadImageActions) => {
    

    switch (action.type) {
        case getUploadImageTypes.FETCH_GET_UPLOADIMAGE_REQUEST:
            return {
                ...state,
                pending: true
            };
        case getUploadImageTypes.FETCH_GET_UPLOADIMAGE_SUCCESS:
            return {
                ...state,
                pending: false,
                ...action.payload,
                data: action.payload,
                error: null,
            };
        case getUploadImageTypes.FETCH_GET_UPLOADIMAGE_FAILURE:
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
export const getUploadImageDetails = (state: RootState) => state.getUploadImage;