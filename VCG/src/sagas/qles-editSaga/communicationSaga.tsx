import { toast } from 'react-toastify';
import { all, call, put, takeLatest, ForkEffect, AllEffect } from 'redux-saga/effects';
import {
    fetchCommunicationRequest,
    fetchCommunicationSuccess
} from "../../actions/qle-editActions/communicationsActions";
import {communicationTypes} from '../../constants/actionTypes';
import {getCommunicationDetails} from "../../services/communicationApi";

function* fetchCommunicationSaga({payload}: any): any {
    try { console.log("SAGA");console.log(payload);
        const response = yield call(getCommunicationDetails, payload);
        console.log(response);
        if (response.data) {                 
            yield put(
                fetchCommunicationSuccess(
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
            fetchCommunicationRequest({
                error: message,
                message:e.message
            })
        );
    }
}

function* CommunicationSaga(): Generator<AllEffect<ForkEffect<never>>, void, unknown> {
    yield all([takeLatest(communicationTypes.FETCH_COMMUNICATION_REQUEST, fetchCommunicationSaga)]);
}

export default CommunicationSaga;