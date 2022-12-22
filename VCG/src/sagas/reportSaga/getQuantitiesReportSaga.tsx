import { toast } from 'react-toastify';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { fetchQuantitiesReportFailure, fetchQuantitiesReportSuccess } from '../../actions/reportActions/getQuantitiesReportActions';
import { quantitiesReportTypes} from '../../constants/actionTypes';
import { getQuantitiesReportDetails } from '../../services/quantitiesReportApi';

function* fetchQuantitiesReportSaga({payload}: any): any {
    try {
        const response = yield call(getQuantitiesReportDetails, payload);
            yield put(
                fetchQuantitiesReportSuccess(
                    response.data
                )
            );
         
       
    } catch (e) {
        // toast.error("Please Contact Administrator !!!!!!");
        yield put(
            fetchQuantitiesReportFailure({
                error: 'Unauthorized'
            })
        );
    }
}

function* getQuantitiesReportSaga() {
    yield all([takeLatest(quantitiesReportTypes.FETCH_QUANTITIES_REPORT_REQUEST, fetchQuantitiesReportSaga)]);
}

export default getQuantitiesReportSaga;