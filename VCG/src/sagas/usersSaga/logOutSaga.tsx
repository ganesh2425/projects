import { toast } from 'react-toastify';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchLogoutFailure,
    fetchLogoutSuccess
} from "../../actions/usersActions/logOutActions";
import {logOutTypes} from '../../constants/actionTypes';
import {getLogoutDetails} from "../../services/UserApi";

function* fetchLogoutSaga({payload}: any): any {
    try {
        const response = yield call(getLogoutDetails, payload);
        console.log(response);
                   
            yield put(
                fetchLogoutSuccess(
                    response.data
                )
            );
         
       
    } catch (e:any) {
        // toast.error("Please Contact Administrator !!!!!!");
        yield put(
            fetchLogoutFailure({
                error: 'Unauthorized',
                message:e.message
            })
        );
    }
}

function* logOutSaga() {
    yield all([takeLatest(logOutTypes.FETCH_LOGOUT_REQUEST, fetchLogoutSaga)]);
}

export default logOutSaga;