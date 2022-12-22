import { AddNoteActions, AddNoteState } from "../../interfaces/types";
import { addNoteTypes } from "../../constants/actionTypes";
import { RootState } from "../index";

const initialState: AddNoteState = {
    pending: false,
    error: null,
    eventId: 0,
    note:"",
    data: {}
};

export default (state = initialState, action: AddNoteActions) => {

    switch (action.type) {

        case addNoteTypes.FETCH_ADDNOTE_REQUEST:

            return {
                ...state,
                pending: true
            };
        case addNoteTypes.FETCH_ADDNOTE_SUCCESS:
            return {
                ...state,
                pending: false,
                ...action.payload,
                error: null
            };
        case addNoteTypes.FETCH_ADDNOTE_FAILURE:
            return {
                ...state,
                pending: false,
                error: action.payload.error
            };
        default:
            return state;
    }
}

export const getAddNoteDetails = (state: RootState) => state.addNote;