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
    fetchAllPrivilegesFailure,
    fetchAllPrivilegesSuccess
} from "../../actions/rolesActions/allPrivilegesActions";
import {allPrivilegesTypes} from '../../constants/actionTypes';
import {getAllPrivileges} from "../../services/roleApi";

function* fetchAllPrivilegesSaga({payload}: any): any {
    try {
        const response: any = yield call(getAllPrivileges, payload);
        //console.log("hererererere" + JSON.parse(JSON.parse(response.data)));
        console.log(response);
        yield put(
          fetchAllPrivilegesSuccess({
            privileges: response.data,
          })
        );
      } catch (e: any) {
        // toast.error("Please Contact Administrator !!!!!!");
        let message = "";
        e === "Network Error" ? (message = e) : (message = e.message);
        yield put(
          fetchAllPrivilegesFailure({
            error: message,
            message:e.message
          })
        );
      }
}

function* allPrivilegesSaga(): Generator<AllEffect<ForkEffect<never>>, void, unknown> {
    yield all([takeLatest(allPrivilegesTypes.FETCH_ALLPRIVILEGES_REQUEST, fetchAllPrivilegesSaga)]);
}

export default allPrivilegesSaga;