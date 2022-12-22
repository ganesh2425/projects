import { toast } from 'react-toastify';
import { all, call, put, takeLatest, ForkEffect, AllEffect } from 'redux-saga/effects';
import {
    fetchDashboardFailure,
    fetchDashboardSuccess
} from "../actions/dashboardActions";
import {dashboardTypes} from '../constants/actionTypes';
import {getDashboardDetails} from "../services/dashboardApi";

function* fetchDashboardSaga({payload}: any): any {
    try {
        const response = yield call(getDashboardDetails, payload);
        console.log(response);
        if (response.data) {                 
            yield put(
                fetchDashboardSuccess(
                    response.data
                )
            );
          } else {
            throw response;
          }
       
    } catch (e:any) {
        // toast.error("Please Contact Administrator !!!!!!");
        let message = "";
        e === "Network Error" ? (message = e) : (message = e.message);
        yield put(
          fetchDashboardFailure({
            error: message,
            message:e.message
          })
        );
    }
}

function* dashboardSaga(): Generator<AllEffect<ForkEffect<never>>, void, unknown> {
    yield all([takeLatest(dashboardTypes.FETCH_DASHBOARD_REQUEST, fetchDashboardSaga)]);
}

export default dashboardSaga;