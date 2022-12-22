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
    fetchAllRolesetFailure,
    fetchAllRolesetSuccess
} from "../../actions/usersActions/allRolesetActions";
import {allRolesetTypes} from '../../constants/actionTypes';
import {getAllRoleset} from "../../services/UserApi";

function* fetchAllRolesetSaga({payload}: any): any {
    try {
        const response: any = yield call(getAllRoleset, payload);
        //console.log("hererererere" + JSON.parse(JSON.parse(response.data)));
        console.log(response);
        yield put(
          fetchAllRolesetSuccess({
            roleSet: response.data,
          })
        );
      } catch (e: any) {
        // toast.error("Please Contact Administrator !!!!!!");
        let message = "";
        e === "Network Error" ? (message = e) : (message = e.message);
        yield put(
          fetchAllRolesetFailure({
            error: message,
            message:e.message
          })
        );
      }
}

function* allRolesetSaga(): Generator<AllEffect<ForkEffect<never>>, void, unknown> {
    yield all([takeLatest(allRolesetTypes.FETCH_ALLROLESET_REQUEST, fetchAllRolesetSaga)]);
}

export default allRolesetSaga;