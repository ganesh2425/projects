import { toast } from "react-toastify";
import {all, call, put, takeLatest} from "redux-saga/effects";
import {
    fetchGetACAEventFailure,
    fetchGetACAEventSuccess
} from "../../actions/acaActions/getACAEventActions";
import { getACAEventTypes } from "../../constants/actionTypes";
import { getACAEventId } from "../../services/acaApi";

function* fetchGetACAEventSaga({payload}: any): any {
    try {
        const response = yield call(getACAEventId, payload);
        console.log(response);
                   
            yield put(
                fetchGetACAEventSuccess(
                    response.data
                )
            );
    } catch (e:any) {
        // toast.error("Please Contact Administrator !!!!!!");
        let message = "";
        e === "Network Error" ? (message = e) : (message = e.message);
        yield put(
            fetchGetACAEventFailure({
            error: message,
            message:e.message
          })
        );
    }
}
function* getACAEventSaga() {
    yield all([takeLatest(getACAEventTypes.FETCH_GETACAEVENT_REQUEST, fetchGetACAEventSaga)]);
}

export default getACAEventSaga;