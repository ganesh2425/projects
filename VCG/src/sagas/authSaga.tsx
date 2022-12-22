import { toast } from 'react-toastify';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchLoginFailure,
    fetchLoginSuccess
} from "../actions/authActions";
import {loginTypes} from '../constants/actionTypes';
import {getAuthDetails} from "../services/loginApi";
import StorageService from "../services/Storage.service";

function* fetchLoginSaga({payload}: any): any {
    try {
        const response = yield call(getAuthDetails, payload);
        console.log(response);
        StorageService.setCookies("newToken", response.data.accessToken);
        if (response.data.accessToken) {                 
            yield put(
                fetchLoginSuccess(
                    response.data
                )
            );
          } else {
            throw response;
          }
       
    } catch (e:any) {
        // toast.error("Please Contact Administrator !!!!!!");
        yield put(
            fetchLoginFailure({
                error: 'Unauthorized',
                message:e.message
            })
        );
    }
}

function* loginSaga() {
    yield all([takeLatest(loginTypes.FETCH_LOGIN_REQUEST, fetchLoginSaga)]);
}

export default loginSaga;