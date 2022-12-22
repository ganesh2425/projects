import { toast } from 'react-toastify';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchDelACAEventFailure,
    fetchDelACAEventSuccess
} from "../../actions/acaActions/delACAEventActions";
import {delACAEventTypes} from '../../constants/actionTypes';
import {deleteACAInfoDetails} from "../../services/acaApi";

function* fetchDelACAEventSaga({payload}: any): any {
    try {
        const response = yield call(deleteACAInfoDetails, payload);
        console.log(response);
                   
            yield put(
                fetchDelACAEventSuccess(
                    response.data
                )
            );
         
       
    } catch (e:any) {
        // toast.error("Please Contact Administrator !!!!!!");
        yield put(
            fetchDelACAEventFailure({
                error: 'Unauthorized',
                message:e.message
            })
        );
    }
}

function* delACAEventSaga() {
    yield all([takeLatest(delACAEventTypes.FETCH_DELACAEVENT_REQUEST, fetchDelACAEventSaga)]);
}

export default delACAEventSaga;