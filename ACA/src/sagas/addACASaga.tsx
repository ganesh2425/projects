import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchAddACAFailure,
    fetchAddACASuccess
} from "../actions/addACAActions";
import {addACATypes} from '../constants/actionTypes';
import {getAddACADetails} from "../services/addACAApi";

function* fetchAddACASaga({payload}: any): any {

    try {
        const response = yield call(getAddACADetails, payload);
        console.log(response);
       
        if (response.data) {
            yield put(fetchAddACASuccess(response.data));
          } else {
            throw response;
          }
         
       
    } catch (e:any) {
        yield put(
            fetchAddACAFailure({
                error: 'Unauthorized',
            })
        );
    }
}

function* addACASaga() {
    yield all([takeLatest(addACATypes.FETCH_ACA_REQUEST, fetchAddACASaga)]);
}

export default addACASaga;