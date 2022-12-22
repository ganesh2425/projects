import { all, call, put, takeLatest, ForkEffect, AllEffect } from 'redux-saga/effects';
import {
    fetchPlanFailure,
    fetchPlanSuccess
} from "../actions/planActions";
import {planTypes} from '../constants/actionTypes';
import {getPlansByEmployerId} from "../services/step2Api";

function* fetchPlanSaga({payload}: any): any {
    try {
        const response = yield call(getPlansByEmployerId, payload);
        if (response.data) {                 
            yield put(
                fetchPlanSuccess(
                    response.data
                )
            );
          } else {
            throw response;
          }
       
    } catch (e) {
        yield put(
            fetchPlanFailure({
                error: 'Unauthorized'
            })
        );
    }
}

function* planSaga(): Generator<AllEffect<ForkEffect<never>>, void, unknown> {
    yield all([takeLatest(planTypes.FETCH_PLAN_REQUEST, fetchPlanSaga)]);
}

export default planSaga;