import { toast } from 'react-toastify';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { fetchDailyProductivityReportDownloadFailure, fetchDailyProductivityReportDownloadSuccess } from '../../actions/reportActions/getDailyProductivityReportDownloadActions';
import { dailyProductivityReportDownloadTypes } from '../../constants/actionTypes';
import { getDailyProductivityReportDownloadDetails } from '../../services/dailyProductivityReportDownloadApi';

function* fetchDailyProductivityReportDownloadSaga({payload}: any): any {
    try {
        const response = yield call(getDailyProductivityReportDownloadDetails, payload);
            yield put(
                fetchDailyProductivityReportDownloadSuccess(
                    response.data
                )
            );
         
       
    } catch (e) {
        // toast.error("Please Contact Administrator !!!!!!");
        yield put(
            fetchDailyProductivityReportDownloadFailure({
                error: 'Unauthorized'
            })
        );
    }
}

function* getDailyProductivityReportDownloadSaga() {
    yield all([takeLatest(dailyProductivityReportDownloadTypes.FETCH_DAILY_PROD_REPORT_DOWNLOAD_REQUEST, fetchDailyProductivityReportDownloadSaga)]);
}

export default getDailyProductivityReportDownloadSaga;