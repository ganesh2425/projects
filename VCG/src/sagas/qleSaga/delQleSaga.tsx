import { toast } from 'react-toastify';
import { all, call, put, takeLatest, ForkEffect, AllEffect } from 'redux-saga/effects';
import {
    fetchDelQleEventFailure,
    fetchDelQleEventSuccess
} from "../../actions/qleActions/delQleActions";
import {delQleEventTypes} from '../../constants/actionTypes';
import {getQledeleteDeatails} from "../../services/qleApi";

function* fetchDelQleEventSaga({payload}: any): any {
    try {
        const response = yield call(getQledeleteDeatails, payload);
        if (response.data) {                 
            yield put(
                fetchDelQleEventSuccess(
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
            fetchDelQleEventFailure({
                error: message,
                message:e.message
            })
        );
    }
}

function* filesDelQleEventSaga(): Generator<AllEffect<ForkEffect<never>>, void, unknown> {
    yield all([takeLatest(delQleEventTypes.FETCH_DELQLEEVENT_REQUEST, fetchDelQleEventSaga)]);
}

export default filesDelQleEventSaga;