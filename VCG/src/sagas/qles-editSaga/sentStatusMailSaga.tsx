import { toast } from 'react-toastify';
import { all, call, put, takeLatest, ForkEffect, AllEffect } from 'redux-saga/effects';
import {
    fetchSentStatusMailFailure,
    fetchSentStatusMailSuccess
} from "../../actions/qle-editActions/sentStatusMailAction";
import {sentStatusMailTypes} from '../../constants/actionTypes';
import {getSentStatusMailDetails} from "../../services/sentStatusEmailApi";

function* fetchSentStatusMailSaga({payload}: any): any {
    try { console.log("saga");console.log(payload);
        const response = yield call(getSentStatusMailDetails, payload);
        if (response.data) {                 
            yield put(
                fetchSentStatusMailSuccess(
                    response.data
                )
            );
          } else {
            throw response;
          }
       
    }catch (e:any) {
        // toast.error("Please Contact Administrator !!!!!!");
        let message = "";
        e === "Network Error" ? (message = e) : (message = e.message);
        yield put(
            fetchSentStatusMailFailure({
                error: message,
                message:e.message
            })
        );
    }
}

function* sentStatusMailSaga(): Generator<AllEffect<ForkEffect<never>>, void, unknown> {
    yield all([takeLatest(sentStatusMailTypes.FETCH_SENTSTATUSMAIL_REQUEST, fetchSentStatusMailSaga)]);
}

export default sentStatusMailSaga;