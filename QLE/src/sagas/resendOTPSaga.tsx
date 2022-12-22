import { all, call, put, takeLatest, ForkEffect, AllEffect } from 'redux-saga/effects';
import {
    fetchResendOTPFailure,
    fetchResendOTPSuccess
} from "../actions/resendOTPActions";
import {resendOTPTypes} from '../constants/actionTypes';
import {getResendOTPDetails} from "../services/otpApi";

function* fetchResendOTPSaga({payload}: any): any {
    try {
        const response = yield call(getResendOTPDetails, payload);
        console.log(response);
        if (response.data) {                 
            yield put(
                fetchResendOTPSuccess(
                    response.data
                )
            );
          } else {
            throw response;
          }
       
    } catch (e) {
        yield put(
            fetchResendOTPFailure({
                error: 'Unauthorized'
            })
        );
    }
}

function* resendOTPSaga(): Generator<AllEffect<ForkEffect<never>>, void, unknown> {
    yield all([takeLatest(resendOTPTypes.FETCH_RESEND_OTP_REQUEST, fetchResendOTPSaga)]);
}

export default resendOTPSaga;