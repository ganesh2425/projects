import { toast } from 'react-toastify';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { fetchQuantitiesReportDownloadFailure, fetchQuantitiesReportDownloadSuccess } from '../../actions/reportActions/getQuantitiesReportDownloadActions';
import { quantitiesReportDownloadTypes } from '../../constants/actionTypes';
import { getQuantitiesReportDownloadDetails } from '../../services/quantitiesReportDownloadApi';

function* fetchQuantitiesReportDownloadSaga({payload}: any): any {
    try {
        const response = yield call(getQuantitiesReportDownloadDetails, payload);
            yield put(
                fetchQuantitiesReportDownloadSuccess(
                    response.data
                )
            );
         
       
    } catch (e) {
        // toast.error("Please Contact Administrator !!!!!!");
        yield put(
            fetchQuantitiesReportDownloadFailure({
                error: 'Unauthorized'
            })
        );
    }
}

function* getQuantitiesReportDownloadSaga() {
    yield all([takeLatest(quantitiesReportDownloadTypes.FETCH_QUANTITIES_DOWNLOAD_REPORT_REQUEST, fetchQuantitiesReportDownloadSaga)]);
}

export default getQuantitiesReportDownloadSaga;