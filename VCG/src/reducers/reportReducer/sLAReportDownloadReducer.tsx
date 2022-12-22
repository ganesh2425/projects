import {sLAReportDownloadTypes} from "../../constants/actionTypes";
import {RootState} from "../index";
import { SLAReportDownloadActions, SLAReportState } from "../../interfaces/sLAReportDownloadType";

const initialState: SLAReportState = {
    pending: false,
    error: null,
    employer:'',
    employee:'',
    startDate:'',
    endDate:'',
    data:'',
};

export default (state = initialState, action: SLAReportDownloadActions) => {
    switch (action.type) {
        case sLAReportDownloadTypes.FETCH_SLA_REPORT_DOWNLOAD_REQUEST:
            return {
                ...state,
                pending: true
            };
        case sLAReportDownloadTypes.FETCH_SLA_REPORT_DOWNLOAD_SUCCESS:
            return {
                ...state,
                pending: false,
                ...action.payload,
                data:action.payload,
                error: null
            };
        case sLAReportDownloadTypes.FETCH_SLA_REPORT_DOWNLOAD_FAILURE:
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
export const getSLAReportDownload = (state: RootState) => state.getSLAReportDownload;