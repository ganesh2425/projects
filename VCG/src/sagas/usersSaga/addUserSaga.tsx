import { toast } from 'react-toastify';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchAddUserFailure,
    fetchAddUserSuccess
} from "../../actions/usersActions/addUserActions";
import {addUserTypes} from '../../constants/actionTypes';
import {getAddUserDetails} from "../../services/UserApi";

function* fetchAddUserSaga({payload}: any): any {
    try {
        const response = yield call(getAddUserDetails, payload);
        console.log(response);
                   
            yield put(
                fetchAddUserSuccess(
                    response.data
                )
            );
         
       
    } catch (e:any) {
        // toast.error("Please Contact Administrator !!!!!!");
        yield put(
            fetchAddUserFailure({
                error: 'Unauthorized',
                message:e.message
            })
        );
    }
}

function* addUserSaga() {
    yield all([takeLatest(addUserTypes.FETCH_ADDUSER_REQUEST, fetchAddUserSaga)]);
}

export default addUserSaga;