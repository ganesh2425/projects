import { toast } from 'react-toastify';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { fetchAgingReportDownloadFailure, fetchAgingReportDownloadSuccess } from '../../actions/reportActions/getAgingReportDownloadActions';
import {agingReportDownloadTypes} from '../../constants/actionTypes';
import {getAgingReportDownloadDetails} from "../../services/agingReportDownloadApi";

function* fetchAgingReportDownloadSaga({payload}: any): any {
    try {
        const response = yield call(getAgingReportDownloadDetails, payload);                   
            yield put(
                fetchAgingReportDownloadSuccess(
                    response.data
                )
            );
    } catch (e) {
        // toast.error("Please Contact Administrator !!!!!!");
        yield put(
            fetchAgingReportDownloadFailure({
                error: 'Unauthorized'
            })
        );
    }
}

function* getAgingReportDownloadSaga() {
    yield all([takeLatest(agingReportDownloadTypes.FETCH_AGING_REPORT_DOWNLOAD_REQUEST, fetchAgingReportDownloadSaga)]);
}

export default getAgingReportDownloadSaga;