import { toast } from 'react-toastify';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { fetchSLAReportFailure, fetchSLAReportSuccess } from '../../actions/reportActions/getSLAReportActions';
import {sLAReportTypes} from '../../constants/actionTypes';
import {getSLAReportDetails} from "../../services/sLAReportApi";

function* fetchSLAReportSaga({payload}: any): any {
    try {
        const response = yield call(getSLAReportDetails, payload);
            yield put(
                fetchSLAReportSuccess(
                    response.data
                )
            );
         
       
    } catch (e) {
        // toast.error("Please Contact Administrator !!!!!!");
        yield put(
            fetchSLAReportFailure({
                error: 'Unauthorized'
            })
        );
    }
}

function* getSLAReportSaga() {
    yield all([takeLatest(sLAReportTypes.FETCH_SLA_REPORT_REQUEST, fetchSLAReportSaga)]);
}

export default getSLAReportSaga;