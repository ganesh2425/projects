import { AnyMxRecord } from 'dns';
import { toast } from 'react-toastify';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchDelUserFailure,
    fetchDelUserSuccess
} from "../../actions/usersActions/delUserActions";
import {delUserTypes} from '../../constants/actionTypes';
import {deleteUserDetails} from "../../services/UserApi";

function* fetchDelUserSaga({payload}: any): any {
    try {
        const response = yield call(deleteUserDetails, payload);
        console.log(response);
                   
            yield put(
                fetchDelUserSuccess(
                    response.data
                )
            );
         
       
    } catch (e:any) {
        // toast.error("Please Contact Administrator !!!!!!");
        yield put(
            fetchDelUserFailure({
                error: 'Unauthorized',
                message:e.message
            })
        );
    }
}

function* delUserSaga() {
    yield all([takeLatest(delUserTypes.FETCH_DELUSER_REQUEST, fetchDelUserSaga)]);
}

export default delUserSaga;