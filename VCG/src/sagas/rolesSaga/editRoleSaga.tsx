import { toast } from 'react-toastify';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchEditRoleFailure,
    fetchEditRoleSuccess
} from "../../actions/rolesActions/editRoleActions";
import {editRoleTypes} from '../../constants/actionTypes';
import {getEditRoleDetails} from "../../services/roleApi";

function* fetchEditRoleSaga({payload}: any): any {
    try {
        const response = yield call(getEditRoleDetails, payload);
        console.log(response);
                   
            yield put(
                fetchEditRoleSuccess(
                    response.data
                )
            );
         
       
    } catch (e:any) {
        // toast.error("Please Contact Administrator !!!!!!");
        yield put(
            fetchEditRoleFailure({
                error: 'Unauthorized',
                message:e.message
            })
        );
    }
}

function* editRoleSaga() {
    yield all([takeLatest(editRoleTypes.FETCH_EDITROLE_REQUEST, fetchEditRoleSaga)]);
}

export default editRoleSaga;