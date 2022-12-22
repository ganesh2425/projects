import { toast } from 'react-toastify';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchDelFaqFailure,
    fetchDelFaqSuccess
} from "../../actions/qleFaqActions/delFaqActions";
import {delFaqTypes} from '../../constants/actionTypes';
import {delFaqDetails} from "../../services/qleFaqApi";

function* fetchDelFaqSaga({payload}: any): any {
    try {
        const response = yield call(delFaqDetails, payload);
        console.log(response);
                   
            yield put(
                fetchDelFaqSuccess(
                    response.data
                )
            );
         
       
    } catch (e) {
        // toast.error("Please Contact Administrator !!!!!!");
        yield put(
            fetchDelFaqFailure({
                error: 'Unauthorized'
            })
        );
    }
}

function* delFaqSaga() {
    yield all([takeLatest(delFaqTypes.FETCH_DELFAQ_REQUEST, fetchDelFaqSaga)]);
}

export default delFaqSaga;