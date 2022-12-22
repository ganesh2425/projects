import { toast } from 'react-toastify';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchEmployerACAFailure,
    fetchEmployerACASuccess
} from "../../actions/acaActions/employerACAActions";
import {employerACATypes} from '../../constants/actionTypes';
import {getACAEmployerId} from "../../services/acaApi";

function* fetchEmployerACASaga({payload}: any): any {
    try {
        const response = yield call(getACAEmployerId, payload);
        console.log(response);
                   
            yield put(
                fetchEmployerACASuccess(
                    response.data
                )
            );
         
       
    } catch (e:any) {
        // toast.error("Please Contact Administrator !!!!!!");
        yield put(
            fetchEmployerACAFailure({
                error: 'Unauthorized',
                message:e.message
            })
        );
    }
}

function* EmpACASaga() {
    yield all([takeLatest(employerACATypes.FETCH_EMPLOYERACA_REQUEST, fetchEmployerACASaga)]);
}

export default EmpACASaga;