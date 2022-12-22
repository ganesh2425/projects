import {agingReportDownloadTypes} from "../../constants/actionTypes";
import {RootState} from "../index";
import { AgingReportDownloadActions, AgingReportState } from "../../interfaces/agingReportDownloadType";

const initialState: AgingReportState = {
    pending: false,
    error: null,
    employer:'',
    employee:'',
    date:'',
    data:'',
};

export default (state = initialState, action: AgingReportDownloadActions) => {
    switch (action.type) {
        case agingReportDownloadTypes.FETCH_AGING_REPORT_DOWNLOAD_REQUEST:
            return {
                ...state,
                pending: true
            };
        case agingReportDownloadTypes.FETCH_AGING_REPORT_DOWNLOAD_SUCCESS:
            return {
                ...state,
                pending: false,
                ...action.payload,
                data:action.payload,
                error: null
            };
        case agingReportDownloadTypes.FETCH_AGING_REPORT_DOWNLOAD_FAILURE:
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
export const getAgingReportDownload = (state: RootState) => state.getAgingReportDownload;