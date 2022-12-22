import { toast } from "react-toastify";
import {
    all,
    AllEffect,
    call,
    ForkEffect,
    put,
    takeLatest,
  } from "redux-saga/effects";
import {
    fetchActiveUserFailure,
    fetchActiveUSERSuccess
} from "../../actions/usersActions/allActiveUserActions";
import {ActiveUserTypes} from '../../constants/actionTypes';
import {getActiveUserDetails} from "../../services/UserApi";

function* fetchActiveUserSaga({payload}: any): any {
    try {
        const response: any = yield call(getActiveUserDetails);
        yield put(
            fetchActiveUSERSuccess({
            users: response.data,
          })
        );
      } catch (e: any) {
        // toast.error("Please Contact Administrator !!!!!!");
        let message = "";
        e === "Network Error" ? (message = e) : (message = e.message);
        yield put(
            fetchActiveUserFailure({
            error: message,
            message:e.message
          })
        );
      }
}

function* allActiveUserSaga(): Generator<AllEffect<ForkEffect<never>>, void, unknown> {
    yield all([takeLatest(ActiveUserTypes.FETCH_ACTIVE_USER_REQUEST, fetchActiveUserSaga)]);
}

export default allActiveUserSaga;