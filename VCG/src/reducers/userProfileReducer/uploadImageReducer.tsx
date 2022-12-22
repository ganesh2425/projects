import { UploadImageActions, UploadImageState} from "../../interfaces/types";
import {uploadImageTypes} from "../../constants/actionTypes";
import {RootState} from "../index";
import { string } from "yup";
import { CompressOutlined } from "@mui/icons-material";

const initialState: UploadImageState = {
    pending: false,
    error: null,
    formData: new FormData(),

};

export default (state = initialState, action: UploadImageActions) =>{ 
    switch (action.type) {
        case uploadImageTypes.FETCH_UPLOADIMAGE_REQUEST:
            return {
                ...state,
                pending: true
            };
        case uploadImageTypes.FETCH_UPLOADIMAGE_SUCCESS:
            return {
                ...state,
                pending: false,
                data: action.payload,
                error: null
            };
        case uploadImageTypes.FETCH_UPLOADIMAGE_FAILURE:
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
export const getUploadImageEnteredDetails = (state: RootState) => state.uploadImage;