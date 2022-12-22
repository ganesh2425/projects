import {
  UploadHolidayListActions,
  UploadHolidayListState,
} from "../../interfaces/types";
import { uploadHolidayListTypes } from "../../constants/actionTypes";
import { RootState } from "../index";

const initialState: UploadHolidayListState = {
  pending: false,
  error: null,
  formData: new FormData(),
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action: UploadHolidayListActions) => {
  switch (action.type) {
    case uploadHolidayListTypes.FETCH_UPLOAD_HOLIDAY_LIST_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case uploadHolidayListTypes.FETCH_UPLOAD_HOLIDAY_LIST_SUCCESS:
      return {
        ...state,
        pending: false,
        ...action.payload,
        data: action.payload,
        error: null,
      };
    case uploadHolidayListTypes.FETCH_UPLOAD_HOLIDAY_LIST_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getUploadHolidayDetails = (state: RootState) => state.uploadList;
