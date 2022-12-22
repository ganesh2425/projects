import { toast } from 'react-toastify';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchEditUserFailure,
    fetchEditUserSuccess
} from "../../actions/usersActions/editUserActions";
import {editUserTypes} from '../../constants/actionTypes';
import {getEditUserDetails} from "../../services/UserApi";

function* fetchEditUserSaga({payload}: any): any {
    try {
        const response = yield call(getEditUserDetails, payload);
        console.log(response);
                   
            yield put(
                fetchEditUserSuccess(
                    response.data
                )
            );
         
       
    } catch (e:any) {
        // toast.error("Please Contact Administrator !!!!!!");
        yield put(
            fetchEditUserFailure({
                error: 'Unauthorized',
                message:e.message
            })
        );
    }
}

function* editUserSaga() {
    yield all([takeLatest(editUserTypes.FETCH_EDITUSER_REQUEST, fetchEditUserSaga)]);
}

export default editUserSaga;