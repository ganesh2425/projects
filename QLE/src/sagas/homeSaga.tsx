import { all, call, put, takeLatest, ForkEffect, AllEffect } from 'redux-saga/effects';
import {
    fetchHOMEFailure,
    fetchHOMESuccess
} from "../actions/homeActions";
import {homeTypes} from '../constants/actionTypes';
import {getHOMEDetails} from "../services/homeApi";

function* fetchHOMESaga({payload}: any): any {
    try {
        const response = yield call(getHOMEDetails, payload);
        console.log(response);
        if (response.data) {                 
            yield put(
                fetchHOMESuccess(
                    response.data
                )
            );
          } else {
            throw response;
          }
       
    } catch (e) {
        yield put(
            fetchHOMEFailure({
                error: 'Unauthorized'
            })
        );
    }
}

function* homeSaga(): Generator<AllEffect<ForkEffect<never>>, void, unknown> {
    yield all([takeLatest(homeTypes.FETCH_HOME_REQUEST, fetchHOMESaga)]);
}

export default homeSaga;