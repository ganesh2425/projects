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
    fetchGetUserProfileFailure,
    fetchGetUserProfileSuccess
} from "../../actions/userProfile/getUserProfileActions";
import {getUserProfileTypes} from '../../constants/actionTypes';
import {getUserProfileDetails} from "../../services/userProfileApi";

function* fetchGetUserProfileSaga({payload}: any): any {
    try {
        const response: any = yield call(getUserProfileDetails, payload);
        yield put(
          fetchGetUserProfileSuccess({
            userProfile: response.data,
          })
        );
      } catch (e: any) {
        // toast.error("Please Contact Administrator !!!!!!");
        let message = "";
        e === "Network Error" ? (message = e) : (message = e.message);
        yield put(
          fetchGetUserProfileFailure({
            error: message,
            message:e.message
          })
        );
      }
}

function* GetUserProfileSaga(): Generator<AllEffect<ForkEffect<never>>, void, unknown> {
    yield all([takeLatest(getUserProfileTypes.FETCH_GETUSERPROFILE_REQUEST, fetchGetUserProfileSaga)]);
}

export default GetUserProfileSaga;