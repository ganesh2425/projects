import {dailyProductivityReportDownloadTypes} from "../../constants/actionTypes";
import {RootState} from "../index";
import { DailyProductivityReportDownloadActions, ReportState } from "../../interfaces/dailyProductivityReportDownloadType";

const initialState: ReportState = {
    pending: false,
    error: null,
    employer:'',
    employee:'',
    date:'',
    data:'',
};

export default (state = initialState, action: DailyProductivityReportDownloadActions) => {
    switch (action.type) {
        case dailyProductivityReportDownloadTypes.FETCH_DAILY_PROD_REPORT_DOWNLOAD_REQUEST:
            return {
                ...state,
                pending: true
            };
        case dailyProductivityReportDownloadTypes.FETCH_DAILY_PROD_REPORT_DOWNLOAD_SUCCESS:
            return {
                ...state,
                pending: false,
                ...action.payload,
                data:action.payload,
                error: null
            };
        case dailyProductivityReportDownloadTypes.FETCH_DAILY_PROD_REPORT_DOWNLOAD_FAILURE:
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
export const getDailyProductivityReportDownload = (state: RootState) => state.getDailyProductivityReportDownload;