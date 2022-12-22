import { GetACADownloadActions, GetACADownloadState} from "../../interfaces/types";
import {getACADownloadTypes} from "../../constants/actionTypes";
import {RootState} from "../index";

const initialState: GetACADownloadState = {
    pending: false,
    error: null, 
};

export default (state = initialState, action: GetACADownloadActions) => {
    

    switch (action.type) {
        case getACADownloadTypes.FETCH_GET_ACA_DOWNLOAD_REQUEST:
            return {
                ...state,
                pending: true
            };
        case getACADownloadTypes.FETCH_GET_ACA_DOWNLOAD_SUCCESS:
            return {
                ...state,
                pending: false,
                ...action.payload,
                data: action.payload,
                error: null,
            };
        case getACADownloadTypes.FETCH_GET_ACA_DOWNLOAD_FAILURE:
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
export const getACADownloadDetails = (state: RootState) => state.getACADownload;