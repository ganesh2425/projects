import { toast } from 'react-toastify';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchEmpEligibilityFailure,
    fetchEmpEligibilitySuccess
} from "../../actions/employersActions/eligibilityAction";
import {empEligibilityTypes} from '../../constants/actionTypes';
import {getHealthPlan} from "../../services/employerApi";

function* fetchEmpEligibilitySaga({payload}: any): any {console.log("sagaaaa");console.log(payload)
    try {
        const response = yield call(getHealthPlan, payload);
        console.log(response);
                   
            yield put(
                fetchEmpEligibilitySuccess(
                    response.data
                )
            );
         
       
    } catch (e:any) {
        // toast.error("Please Contact Administrator !!!!!!");
        let message = "";
        e === "Network Error" ? (message = e) : (message = e.message);
        yield put(
            fetchEmpEligibilityFailure({
            error: message,
            message:e.message
          })
        );
    }
}

function* healthPlanSaga() {
    yield all([takeLatest(empEligibilityTypes.FETCH_EMP_ELIGIBILITY_REQUEST, fetchEmpEligibilitySaga)]);
}

export default healthPlanSaga;