import { toast } from 'react-toastify';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchEditEmployerFailure,
    fetchEditEmployerSuccess
} from "../../actions/employersActions/editEmployerActions";
import {editEmployerTypes} from '../../constants/actionTypes';
import {getEditEmployerDetails} from "../../services/employerApi";

function* fetchEditEmployerSaga({payload}: any): any {
    try {
        const response = yield call(getEditEmployerDetails, payload);
        console.log(response);
                   
            yield put(
                fetchEditEmployerSuccess(
                    response.data
                )
            );
         
       
    } catch (e:any) {
        // toast.error("Please Contact Administrator !!!!!!");
        let message = "";
        e === "Network Error" ? (message = e) : (message = e.message);
        yield put(
          fetchEditEmployerFailure({
            error: message,
            message:e.message
          })
        );
    }
}

function* editEmployerSaga() {
    yield all([takeLatest(editEmployerTypes.FETCH_EDITEMPLOYER_REQUEST, fetchEditEmployerSaga)]);
}

export default editEmployerSaga;