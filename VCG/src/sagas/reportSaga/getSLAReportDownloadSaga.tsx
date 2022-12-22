import { toast } from 'react-toastify';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { fetchSLAReportDownloadFailure, fetchSLAReportDownloadSuccess } from '../../actions/reportActions/getSLAReportDownloadActions';
import {sLAReportDownloadTypes} from '../../constants/actionTypes';
import {getSLAReportDownloadDetails} from "../../services/sLAReportDownloadApi";

function* fetchSLAReportDownloadSaga({payload}: any): any {
    try {
        const response = yield call(getSLAReportDownloadDetails, payload);
            yield put(
                fetchSLAReportDownloadSuccess(
                    response.data
                )
            );
         
       
    } catch (e) {
        // toast.error("Please Contact Administrator !!!!!!");
        yield put(
            fetchSLAReportDownloadFailure({
                error: 'Unauthorized'
            })
        );
    }
}

function* getSLAReportDownloadSaga() {
    yield all([takeLatest(sLAReportDownloadTypes.FETCH_SLA_REPORT_DOWNLOAD_REQUEST, fetchSLAReportDownloadSaga)]);
}

export default getSLAReportDownloadSaga;