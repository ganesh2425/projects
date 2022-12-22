import { toast } from 'react-toastify';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchForgotPwdFailure,
    fetchForgotPwdSuccess
} from "../actions/forgotPwdActions";
import {forgotPwdTypes} from '../constants/actionTypes';
import {getForgotPwdDetails} from "../services/loginApi";

function* fetchForgotPwdSaga({payload}: any): any {
    try {
        const response = yield call(getForgotPwdDetails, payload);       
        console.log(response);         
        if (response.data) {      
            yield put(
                fetchForgotPwdSuccess(
                    response.data
                )
            );
                }
    } catch (e:any) {
        // toast.error("Please Contact Administrator !!!!!!");
        yield put(
            fetchForgotPwdFailure({
                error: 'Unauthorized',
                message:e.message
            })
        );
    }
}

function* forgotPwdSaga() {
    yield all([takeLatest(forgotPwdTypes.FETCH_FORGOTPWD_REQUEST, fetchForgotPwdSaga)]);
}

export default forgotPwdSaga;