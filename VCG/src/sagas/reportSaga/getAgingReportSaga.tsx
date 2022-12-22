import { toast } from 'react-toastify';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { fetchAgingReportFailure, fetchAgingReportSuccess } from '../../actions/reportActions/getAgingReportActions';
import {agingReportTypes} from '../../constants/actionTypes';
import {getAgingReportDetails} from "../../services/agingReportApi";

function* fetchAgingReportSaga({payload}: any): any {
    try {
        const response = yield call(getAgingReportDetails, payload);
            yield put(
                fetchAgingReportSuccess(
                    response.data
                )
            );
    } catch (e) {
        // toast.error("Please Contact Administrator !!!!!!");
        yield put(
            fetchAgingReportFailure({
                error: 'Unauthorized'
            })
        );
    }
}

function* getAgingReportSaga() {
    yield all([takeLatest(agingReportTypes.FETCH_AGING_REPORT_REQUEST, fetchAgingReportSaga)]);
}

export default getAgingReportSaga;