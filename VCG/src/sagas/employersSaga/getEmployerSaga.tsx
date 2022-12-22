import { toast } from 'react-toastify';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchGetEmployerFailure,
    fetchGetEmployerSuccess
} from "../../actions/employersActions/getEmployerActions";
import {getEmployerTypes} from '../../constants/actionTypes';
import {getEmployerById} from "../../services/employerApi";

function* fetchGetEmployerSaga({payload}: any): any {
    try {
        const response = yield call(getEmployerById, payload);
        console.log(response);
                   
            yield put(
                fetchGetEmployerSuccess(
                    response.data
                )
            );
         
       
    } catch (e:any) {
        // toast.error("Please Contact Administrator !!!!!!");
        let message = "";
        e === "Network Error" ? (message = e) : (message = e.message);
        yield put(
          fetchGetEmployerFailure({
            error: message,
            message:e.message
          })
        );
    }
}

function* getEmployerSaga() {
    yield all([takeLatest(getEmployerTypes.FETCH_GETEMPLOYER_REQUEST, fetchGetEmployerSaga)]);
}

export default getEmployerSaga;