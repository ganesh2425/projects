import {sLAReportTypes} from "../../constants/actionTypes";
import {RootState} from "../index";
import { SLAReportActions, SLAReportState } from "../../interfaces/sLAReportType";

const initialState: SLAReportState = {
    pending: false,
    error: null,
    employer:'',
    employee:'',
    startDate:'',
    endDate:'',
    data:'',
};

export default (state = initialState, action: SLAReportActions) => {
    switch (action.type) {
        case sLAReportTypes.FETCH_SLA_REPORT_REQUEST:
            return {
                ...state,
                pending: true
            };
        case sLAReportTypes.FETCH_SLA_REPORT_SUCCESS:
            return {
                ...state,
                pending: false,
                ...action.payload,
                data:action.payload,
                error: null
            };
        case sLAReportTypes.FETCH_SLA_REPORT_FAILURE:
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
export const getSLAReport = (state: RootState) => state.getSLAReport;