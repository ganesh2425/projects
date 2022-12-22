import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchEventStatusFailure,
    fetchEventStatusSuccess
} from "../../actions/qleActions/getEventStatusActions"
import {eventStatusTypes} from '../../constants/actionTypes';
import {getEventStatusDetails} from "../../services/qleApi";

function* fetchEventStatusSaga({payload}: any): any{
    try {
        const response = yield call(getEventStatusDetails, payload);
            yield put(
                fetchEventStatusSuccess(
                    response.data
                )
            );
         
       
    } catch (e:any) {
        // toast.error("Please Contact Administrator !!!!!!");
        let message = "";
        e === "Network Error" ? (message = e) : (message = e.message);
        yield put(
            fetchEventStatusFailure({
                error: message,
                message:e.message
            })
        );
    }
}

function* eventStatusSaga() {
    yield all([takeLatest(eventStatusTypes.FETCH_EVENT_STATUS_REQUEST, fetchEventStatusSaga)]);
}

export default eventStatusSaga;
