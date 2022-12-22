import { viewFileActions, viewFileState} from "../interfaces/types";
import {viewFileTypes} from "../constants/actionTypes";
import {RootState} from "./index";

const initialState: viewFileState = {
    pending: false,
    error: null,
    eventId: 0,
    fileName: "",
    Name:'',
};

export default (state = initialState, action: viewFileActions) => {
    switch (action.type) {
        case viewFileTypes.FETCH_VIEWFILE_REQUEST:
            return {
                ...state,
                pending: true
            };
        case viewFileTypes.FETCH_VIEWFILE_SUCCESS:
            return {
                ...state,
                pending: false,
                ...action.payload,
                data: action.payload,
                error: null,
            };
        case viewFileTypes.FETCH_VIEWFILE_FAILURE:
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
export const viewFileDetails = (state: RootState) => state.viewFile;