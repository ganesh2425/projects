import { toast } from 'react-toastify';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchGetFaqFailure,
    fetchGetFaqSuccess
} from "../../actions/qleFaqActions/getFaqActions";
import {getFaqTypes} from '../../constants/actionTypes';
import {getFaqById} from "../../services/qleFaqApi";

function* fetchGetFaqSaga({payload}: any): any {
    try {
        const response = yield call(getFaqById, payload);
        console.log(response);
                   
            yield put(
                fetchGetFaqSuccess(
                    response.data
                )
            );
         
       
    } catch (e) {
        // toast.error("Please Contact Administrator !!!!!!");
        yield put(
            fetchGetFaqFailure({
                error: 'Unauthorized'
            })
        );
    }
}

function* getFaqSaga() {
    yield all([takeLatest(getFaqTypes.FETCH_GETFAQ_REQUEST, fetchGetFaqSaga)]);
}

export default getFaqSaga;