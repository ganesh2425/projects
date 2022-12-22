
import { toast } from 'react-toastify';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { AnyObjectSchema } from 'yup';
import {
    fetchAddEmployerFailure,
    fetchAddEmployerSuccess
} from "../../actions/employersActions/addEmployerActions";
import {addEmployerTypes} from '../../constants/actionTypes';
import {getAddEmployerDetails} from "../../services/employerApi";

function* fetchAddEmployerSaga({payload}: any): any {
    try {
        const response = yield call(getAddEmployerDetails, payload);
        console.log(response);
                   
            yield put(
                fetchAddEmployerSuccess(
                    response.data
                )
            );
         
       
    } catch (e:any) {
        let message = "";
        // toast.error("Please Contact Administrator !!!!!!");
        e === "Network Error" ? (message = e) : (message = e.message);
        yield put(
          fetchAddEmployerFailure({
            error: message,
            message:e.message
          })
        );
    }
}

function* addEmployerSaga() {
    yield all([takeLatest(addEmployerTypes.FETCH_ADDEMPLOYER_REQUEST, fetchAddEmployerSaga)]);
}

export default addEmployerSaga;