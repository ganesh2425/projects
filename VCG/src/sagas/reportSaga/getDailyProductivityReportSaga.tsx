import { toast } from 'react-toastify';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { fetchDailyProductivityReportFailure, fetchDailyProductivityReportSuccess } from '../../actions/reportActions/getDailyProductivityReportActions';
import {editFaqTypes, dailyProductivityReportTypes} from '../../constants/actionTypes';
import {getDailyProductivityReportDetails} from "../../services/dailyProductivityReportApi";

function* fetchDailyProductivityReportSaga({payload}: any): any {
    try {
        const response = yield call(getDailyProductivityReportDetails, payload);
            yield put(
                fetchDailyProductivityReportSuccess(
                    response.data
                )
            );
         
       
    } catch (e) {
        // toast.error("Please Contact Administrator !!!!!!");
        yield put(
            fetchDailyProductivityReportFailure({
                error: 'Unauthorized'
            })
        );
    }
}

function* getDailyProductivityReportSaga() {
    yield all([takeLatest(dailyProductivityReportTypes.FETCH_DAILY_PROD_REPORT_REQUEST, fetchDailyProductivityReportSaga)]);
}

export default getDailyProductivityReportSaga;