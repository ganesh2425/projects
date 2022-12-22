import {dailyProductivityReportTypes} from "../../constants/actionTypes";
import {RootState} from "../index";
import { DailyProductivityReportActions, ReportState } from "../../interfaces/dailyProductivityReportType";

const initialState: ReportState = {
    pending: false,
    error: null,
    employer:'',
    employee:'',
    date:'',
    data:'',
};

export default (state = initialState, action: DailyProductivityReportActions) => {
    switch (action.type) {
        case dailyProductivityReportTypes.FETCH_DAILY_PROD_REPORT_REQUEST:
            return {
                ...state,
                pending: true
            };
        case dailyProductivityReportTypes.FETCH_DAILY_PROD_REPORT_SUCCESS:
            return {
                ...state,
                pending: false,
                ...action.payload,
                data:action.payload,
                error: null
            };
        case dailyProductivityReportTypes.FETCH_DAILY_PROD_REPORT_FAILURE:
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
export const getDailyProductivityReport = (state: RootState) => state.getDailyProductivityReport;