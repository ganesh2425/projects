import {agingReportTypes} from "../../constants/actionTypes";
import {RootState} from "../index";
import { AgingReportActions, AgingReportState } from "../../interfaces/agingReportType";

const initialState: AgingReportState = {
    pending: false,
    error: null,
    employer:'',
    employee:'',
    date:'',
    data:'',
};

export default (state = initialState, action: AgingReportActions) => {
    switch (action.type) {
        case agingReportTypes.FETCH_AGING_REPORT_REQUEST:
            return {
                ...state,
                pending: true
            };
        case agingReportTypes.FETCH_AGING_REPORT_SUCCESS:
            return {
                ...state,
                pending: false,
                ...action.payload,
                data:action.payload,
                error: null
            };
        case agingReportTypes.FETCH_AGING_REPORT_FAILURE:
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
export const getAgingReport = (state: RootState) => state.getAgingReport;