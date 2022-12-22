import { toast } from 'react-toastify';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { AnyObjectSchema } from 'yup';
import {
    fetchAddEmailFailure,
    fetchAddEmailSuccess
} from "../../actions/acaActions/ACA_AddEmailActions";
import {addEmailTypes} from '../../constants/actionTypes';
import {getAddEmailDetails} from "../../services/acaApi";

function* fetchAddEmailSaga({payload}: any): any {
    try {
        const response = yield call(getAddEmailDetails, payload);
        console.log(response);
                   
            yield put(
                fetchAddEmailSuccess(
                    response.data
                )
            );
         
       
    } catch (e:any) {
        // toast.error("Please Contact Administrator !!!!!!");
        let message = "";
        e === "Network Error" ? (message = e) : (message = e.message);
        yield put(
          fetchAddEmailFailure({
            error: message,
            message:e.message
          })
        );
    }
}

function* addEmailSaga() {
    yield all([takeLatest(addEmailTypes.FETCH_ADDEMAIL_REQUEST, fetchAddEmailSaga)]);
}

export default addEmailSaga;