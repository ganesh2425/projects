import {
  GetHolidayListActions,
  GetHolidayListState,
} from "../../interfaces/types";
import { getHolidayListTypes } from "../../constants/actionTypes";
import { RootState } from "../index";

const initialState: GetHolidayListState = {
  pending: false,
  error: null,
  id: 0,
  qleEnabled: false,
  acaEnabled: false,
  acaEmployerWontOfferHealthcover: false,
  acaEmployerHealthcoverToEmployee: false,
  acaEmployeePremiumForPlan: 0,
  holidayList: [],
  errorMessages: [],
  data: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action: GetHolidayListActions) => {
  switch (action.type) {
    case getHolidayListTypes.FETCH_GET_HOLIDAY_LIST_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case getHolidayListTypes.FETCH_GET_HOLIDAY_LIST_SUCCESS:
      return {
        ...state,
        pending: false,
        ...action.payload,
        data: action.payload,
        error: null,
      };
    case getHolidayListTypes.FETCH_GET_HOLIDAY_LIST_FAILURE:
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
export const getHolidayListDetails = (state: RootState) => state.holidayList;
