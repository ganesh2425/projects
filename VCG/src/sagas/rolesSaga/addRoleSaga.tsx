import { toast } from 'react-toastify';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchAddRoleFailure,
    fetchAddRoleSuccess
} from "../../actions/rolesActions/addRoleActions";
import {addRoleTypes} from '../../constants/actionTypes';
import {getAddRoleDetails} from "../../services/roleApi";

function* fetchAddRoleSaga({payload}: any): any {
    try {
        const response = yield call(getAddRoleDetails, payload);
        console.log(response);
                   
            yield put(
                fetchAddRoleSuccess(
                    response.data
                )
            );
         
       
    } catch (e:any) {
        // if(e.response.status !== 500){
        //     toast.error("Please Contact Administrator !!!!!!");
        // }
        yield put(
            fetchAddRoleFailure({
                error: 'Unauthorized',
                message:e.message
            })
        );
    }
}

function* addRoleSaga() {
    yield all([takeLatest(addRoleTypes.FETCH_ADDROLE_REQUEST, fetchAddRoleSaga)]);
}

export default addRoleSaga;