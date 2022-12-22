import { FilesActions, FilesState} from "../../interfaces/types";
import {filesTypes} from "../../constants/actionTypes";
import {RootState} from "../index";
import { string } from "yup";
import { CompressOutlined } from "@mui/icons-material";

const initialState: FilesState = {
    pending: false,
    error: null,
    response: null,
    file:"",
    id:0,
    name:""
   
};

export default (state = initialState, action: FilesActions) =>{ 
    switch (action.type) {
        case filesTypes.FETCH_FILES_REQUEST:
            return {
                ...state,
                pending: true
            };
        case filesTypes.FETCH_FILES_SUCCESS:
            return {
                ...state,
                pending: false,
                data: action.payload,
                error: null
            };
        case filesTypes.FETCH_FILES_FAILURE:
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
export const getFILESEnteredDetails = (state: RootState) => state.files;