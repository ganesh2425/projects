import { FilesDeleteActions, FilesDeleteState} from "../../interfaces/types";
import {filesDeleteTypes} from "../../constants/actionTypes";
import {RootState} from "../index";
import { string } from "yup";
import { CompressOutlined } from "@mui/icons-material";

const initialState: FilesDeleteState = {
    pending: false,
    error: null,
    response: null,
    length: 0,
    data: {},
    id: "",
    fileName: ""
};

export default (state = initialState, action: FilesDeleteActions) =>{
    switch (action.type) {
        case filesDeleteTypes.FETCH_DELETEFILES_REQUEST:
            return {
                ...state,
                pending: true
            };
        case filesDeleteTypes.FETCH_DELETEFILES_SUCCESS:
            return {
                ...state,
                pending: false,
                data: action.payload,
                error: null
            };
        case filesDeleteTypes.FETCH_DELETEFILESE_FAILURE:
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
export const getDelFilesDetails = (state: RootState) => state.deleteFiles.data;