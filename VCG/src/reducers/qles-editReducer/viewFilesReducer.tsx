import { FilesViewActions, FilesviewState} from "../../interfaces/types";
import {filesViewTypes} from "../../constants/actionTypes";
import {RootState} from "../index";
import { string } from "yup";
import { CompressOutlined } from "@mui/icons-material";

const initialState: FilesviewState = {
    pending: false,
    error: null,
    response: null,
    length: 0,
    eventId: "",
    fileName: "",
    data:{}
};

export default (state = initialState, action: FilesViewActions) =>{
    switch (action.type) {
        case filesViewTypes.FETCH_FILESVIEW_REQUEST:
            return {
                ...state,
                pending: true
            };
        case filesViewTypes.FETCH_FILESVIEW_SUCCESS:
            return {
                ...state,
                pending: false,
             data:action.payload,
                error: null
            };
        case filesViewTypes.FETCH_FILESVIEW_FAILURE:
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
export const getFilesViewDetails = (state: RootState) => state.viewFiles.data;