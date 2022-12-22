import { all, call, put, takeLatest, ForkEffect, AllEffect } from 'redux-saga/effects';
import {
    fetchPrivacypolicyFailure,
    fetchPrivacypolicySuccess
} from "../actions/PrivacypolicyActions";
import {PrivacypolicyTypes} from '../constants/actionTypes';
import {getPRIVACYPOLICYDetails} from "../services/PrivacypolicyApi";

function* fetchPrivacypolicySaga({payload}: any): any {
    try {
        const response = yield call(getPRIVACYPOLICYDetails, payload);
        console.log(response);
        if (response.data) {                 
            yield put(
                fetchPrivacypolicySuccess(
                    response.data
                )
            );
          } else {
            throw response;
          }
       
    } catch (e) {
        yield put(
            fetchPrivacypolicyFailure({ 
                error: 'Unauthorized'
            })
        );
    }
}

function* PrivacypolicySaga(): Generator<AllEffect<ForkEffect<never>>, void, unknown> {
    yield all([takeLatest(PrivacypolicyTypes.FETCH_PRIVACYPOLICY_REQUEST, fetchPrivacypolicySaga)]);
}

export default PrivacypolicySaga;