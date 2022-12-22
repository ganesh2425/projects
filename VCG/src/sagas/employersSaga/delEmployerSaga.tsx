import { toast } from 'react-toastify';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchDelEmployerFailure,
    fetchDelEmployerSuccess
} from "../../actions/employersActions/delEmployerActions";
import {delEmployerTypes} from '../../constants/actionTypes';
import {delEmployerDetails} from "../../services/employerApi";

function* fetchDelEmployerSaga({payload}: any): any {
    try {
        const response = yield call(delEmployerDetails, payload);
        console.log(response);
                   
            yield put(
                fetchDelEmployerSuccess(
                    response.data
                )
            );
         
       
    } catch (e:any) {
        // toast.error("Please Contact Administrator !!!!!!");
        yield put(
            fetchDelEmployerFailure({
                error: 'Unauthorized',
                message:e.message
            })
        );
    }
}

function* delEmployerSaga() {
    yield all([takeLatest(delEmployerTypes.FETCH_DELEMPLOYER_REQUEST, fetchDelEmployerSaga)]);
}

export default delEmployerSaga;