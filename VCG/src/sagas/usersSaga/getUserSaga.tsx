import { toast } from 'react-toastify';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchGetUserFailure,
    fetchGetUserSuccess
} from "../../actions/usersActions/getUserActions";
import {getUserTypes} from '../../constants/actionTypes';
import {getUserById} from "../../services/UserApi";

function* fetchGetUserSaga({payload}: any): any {
    try {
        const response = yield call(getUserById, payload);
        console.log(response);
                   
            yield put(
                fetchGetUserSuccess(
                    response.data
                )
            );
         
       
    } catch (e:any) {
        // toast.error("Please Contact Administrator !!!!!!");
        yield put(
            fetchGetUserFailure({
                error: 'Unauthorized',
                message:e.message
            })
        );
    }
}

function* getUserSaga() {
    yield all([takeLatest(getUserTypes.FETCH_GETUSER_REQUEST, fetchGetUserSaga)]);
}

export default getUserSaga;