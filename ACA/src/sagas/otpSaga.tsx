import { all, call, put, takeLatest, ForkEffect, AllEffect } from 'redux-saga/effects';
import {
    fetchOTPFailure,
    fetchOTPSuccess
} from "../actions/otpActions";
import {otpTypes} from '../constants/actionTypes';
import {getOTPDetails} from "../services/otpApi";

function* fetchOTPSaga({payload}: any): any {
    try {
        const response = yield call(getOTPDetails, payload);
        console.log(response);
        if (response.data) {                 
            yield put(
                fetchOTPSuccess(
                    response.data
                )
            );
          } else {
            throw response;
          }
       
    } catch (e) {
        yield put(
            fetchOTPFailure({
                error: 'Unauthorized'
            })
        );
    }
}

function* otpSaga(): Generator<AllEffect<ForkEffect<never>>, void, unknown> {
    yield all([takeLatest(otpTypes.FETCH_OTP_REQUEST, fetchOTPSaga)]);
}

export default otpSaga;