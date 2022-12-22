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
    fetchAllRolesFailure,
    fetchAllRolesSuccess
} from "../../actions/rolesActions/allRolesActions";
import {allRolesTypes} from '../../constants/actionTypes';
import {getAllRolesDetails} from "../../services/roleApi";

function* fetchAllRolesSaga({payload}: any): any {
    try {
        const response: any = yield call(getAllRolesDetails, payload);
        //console.log("hererererere" + JSON.parse(JSON.parse(response.data)));
        console.log(response);
        yield put(
          fetchAllRolesSuccess({
            roles: response.data,
          })
        );
      } catch (e: any) {
        // toast.error("Please Contact Administrator !!!!!!");
        let message = "";
        e === "Network Error" ? (message = e) : (message = e.message);
        yield put(
          fetchAllRolesFailure({
            error: message,
            message:e.message
          })
        );
      }
}

function* allRolesSaga(): Generator<AllEffect<ForkEffect<never>>, void, unknown> {
    yield all([takeLatest(allRolesTypes.FETCH_ALLROLES_REQUEST, fetchAllRolesSaga)]);
}

export default allRolesSaga;