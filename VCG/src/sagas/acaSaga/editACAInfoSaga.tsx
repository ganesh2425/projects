import { toast } from 'react-toastify';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchEditACAInfoFailure,
    fetchEditACAInfoSuccess
} from "../../actions/acaActions/editACAInfoActions";
import {editACAInfoTypes} from '../../constants/actionTypes';
import {getEditACAInfoDetails} from "../../services/acaApi";

function* fetchEditACAInfoSaga({payload}: any): any {
    try {
        const response = yield call(getEditACAInfoDetails, payload);
        console.log(response);
                   
            yield put(
                fetchEditACAInfoSuccess(
                    response.data
                )
            );
         
       
    } catch (e:any) {
        // toast.error("Please Contact Administrator !!!!!!");
        let message = "";
        e === "Network Error" ? (message = e) : (message = e.message);
        yield put(
            fetchEditACAInfoFailure({
            error: message,
            message:e.message
          })
        );
    }
}

function* editACAInfoSaga() {
    yield all([takeLatest(editACAInfoTypes.FETCH_EDITACAINFO_REQUEST, fetchEditACAInfoSaga)]);
}

export default editACAInfoSaga;