import {quantitiesReportTypes} from "../../constants/actionTypes";
import {RootState} from "../index";
import { QuantitiesReportActions,QuantitiesReportState } from "../../interfaces/quantitiesReportType"; 

const initialState: QuantitiesReportState = {
    pending: false,
    error: null,
    data:'',
    id: 0,
    startDate: '',
    endDate: '',
    year: 0,
    timeline:'',
    searchType:'',
    contentType:'',
    response:'',
    body:''
};

export default (state = initialState, action: QuantitiesReportActions) => {
    switch (action.type) {
        case quantitiesReportTypes.FETCH_QUANTITIES_REPORT_REQUEST:
            return {
                ...state,
                pending: true
            };
        case quantitiesReportTypes.FETCH_QUANTITIES_REPORT_SUCCESS:
            return {
                ...state,
                pending: false,
                ...action.payload,
                data:action.payload,
                error: null
            };
        case quantitiesReportTypes.FETCH_QUANTITIES_REPORT_FAILURE:
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
export const getQuantitiesReport = (state: RootState) => state.getQuantitiesReport;