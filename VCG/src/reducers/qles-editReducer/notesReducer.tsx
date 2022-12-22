import { NotesActions, NotesState} from "../../interfaces/types";
import {notesTypes} from "../../constants/actionTypes";
import {RootState} from "../index";
import { string } from "yup";
import { CompressOutlined } from "@mui/icons-material";


const initialState: NotesState = {
    pending: false,
    error: null,
    response: null,
    length: 0,
    data:[],
};

export default (state = initialState, action: NotesActions) =>{ 
 
    switch (action.type) {
        case notesTypes.FETCH_NOTES_REQUEST:
            return {
                ...state,
                pending: true
            };
        case notesTypes.FETCH_NOTES_SUCCESS:
            return {
                ...state,
                pending: false,
                data: action.payload,
                error: null
            };
        case notesTypes.FETCH_NOTES_FAILURE:
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
export const getNotesDetails = (state: RootState) => state.getNotes.data;