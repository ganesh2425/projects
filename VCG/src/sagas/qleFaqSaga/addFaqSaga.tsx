import { toast } from 'react-toastify';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchAddFaqFailure,
    fetchAddFaqSuccess
} from "../../actions/qleFaqActions/addFaqActions";
import {addFaqTypes} from '../../constants/actionTypes';
import {getAddFaqDetails} from "../../services/qleFaqApi";

function* fetchAddFaqSaga({payload}: any): any {
    try {
        const response = yield call(getAddFaqDetails, payload);
        console.log(response);
                   
            yield put(
                fetchAddFaqSuccess(
                    response.data
                )
            );
         
       
    } catch (e) {
        // toast.error("Please Contact Administrator !!!!!!");
        yield put(
            fetchAddFaqFailure({
                error: 'Unauthorized'
            })
        );
    }
}

function* addFaqSaga() {
    yield all([takeLatest(addFaqTypes.FETCH_ADDFAQ_REQUEST, fetchAddFaqSaga)]);
}

export default addFaqSaga;