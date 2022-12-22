import { toast } from 'react-toastify';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchEditFaqFailure,
    fetchEditFaqSuccess
} from "../../actions/qleFaqActions/editFaqActions";
import {editFaqTypes} from '../../constants/actionTypes';
import {getEditFaqDetails} from "../../services/qleFaqApi";

function* fetchEditFaqSaga({payload}: any): any {
    try {
        const response = yield call(getEditFaqDetails, payload);
        console.log(response);
                   
            yield put(
                fetchEditFaqSuccess(
                    response.data
                )
            );
         
       
    } catch (e) {
        // toast.error("Please Contact Administrator !!!!!!");
        yield put(
            fetchEditFaqFailure({
                error: 'Unauthorized'
            })
        );
    }
}

function* editFaqSaga() {
    yield all([takeLatest(editFaqTypes.FETCH_EDITFAQ_REQUEST, fetchEditFaqSaga)]);
}

export default editFaqSaga;