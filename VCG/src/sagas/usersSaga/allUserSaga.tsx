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
    fetchUserFailure,
    fetchUSERSuccess
} from "../../actions/usersActions/allUserActions";
import {UserTypes} from '../../constants/actionTypes';
import {getUserDetails} from "../../services/UserApi";

function* fetchUserSaga({payload}: any): any {
    try {
        const response: any = yield call(getUserDetails);
        yield put(
            fetchUSERSuccess({
            users: response.data,
          })
        );
      } catch (e: any) {
        // toast.error("Please Contact Administrator !!!!!!");
        let message = "";
        e === "Network Error" ? (message = e) : (message = e.message);
        yield put(
            fetchUserFailure({
            error: message,
            message:e.message
          })
        );
      }
}

function* UserSaga(): Generator<AllEffect<ForkEffect<never>>, void, unknown> {
    yield all([takeLatest(UserTypes.FETCH_USER_REQUEST, fetchUserSaga)]);
}

export default UserSaga;