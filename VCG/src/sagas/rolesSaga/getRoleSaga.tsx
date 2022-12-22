import { toast } from 'react-toastify';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchGetRoleFailure,
    fetchGetRoleSuccess
} from "../../actions/rolesActions/getRoleActions";
import {getRoleTypes} from '../../constants/actionTypes';
import {getRoleById} from "../../services/roleApi";

function* fetchGetRoleSaga({payload}: any): any {
    try {
        const response = yield call(getRoleById, payload);
        console.log(response);
                   
            yield put(
                fetchGetRoleSuccess(
                    response.data
                )
            );
         
       
    } catch (e:any) {
        // toast.error("Please Contact Administrator !!!!!!");
        yield put(
            fetchGetRoleFailure({
                error: 'Unauthorized',
                message:e.message
            })
        );
    }
}

function* getRoleSaga() {
    yield all([takeLatest(getRoleTypes.FETCH_GETROLE_REQUEST, fetchGetRoleSaga)]);
}

export default getRoleSaga;