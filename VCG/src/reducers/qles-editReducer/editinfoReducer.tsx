import { editinfoActions, EditinfoState} from "../../interfaces/types";
import {editInfoTypes} from "../../constants/actionTypes";
import {RootState} from "../index";
import { ColorLensOutlined } from "@mui/icons-material";


const initialState: EditinfoState = {
    error: null,
    data: {},
    id: 0,
    firstName: '',
    middleName: '',
    lastName: '',
    SSN: '',
    event1: '',
    event2: '',
    email: "",
    number: '',
    dob: '',
    eventStatus: '',
    uniqueLink: '',
    eventTypeId:'',
    eventSubTypeId:'',
    pending: false
};

export default (state = initialState, action: editinfoActions) => {
    
  
    switch (action.type) {
        case editInfoTypes.FETCH_EDIT_REQUEST:
            return {
                ...state,
                pending: true
            };
        case editInfoTypes.FETCH_EDIT_SUCCESS:
            return {
                ...state,
                pending: false,
                data:action.payload,
                error: null
            };
        case editInfoTypes.FETCH_EDIT_FAILURE:
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
export const getEditDetails = (state: RootState) => state.editInfo.data;