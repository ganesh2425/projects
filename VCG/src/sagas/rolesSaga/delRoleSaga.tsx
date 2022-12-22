import { toast } from 'react-toastify';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchDelRoleFailure,
    fetchDelRoleSuccess
} from "../../actions/rolesActions/delRoleActions";
import {delRoleTypes} from '../../constants/actionTypes';
import {deleteRoleDetails} from "../../services/roleApi";

function* fetchDelRoleSaga({payload}: any): any {
    try {
        const response = yield call(deleteRoleDetails, payload);
        console.log(response);
                   
            yield put(
                fetchDelRoleSuccess(
                    response.data
                )
            );
         
       
    } catch (e:any) {
        // toast.error("Please Contact Administrator !!!!!!");
        yield put(
            fetchDelRoleFailure({
                error: 'Unauthorized',
                message:e.message
            })
        );
    }
}

function* delRoleSaga() {
    yield all([takeLatest(delRoleTypes.FETCH_DELROLE_REQUEST, fetchDelRoleSaga)]);
}

export default delRoleSaga;