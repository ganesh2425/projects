import { toast } from "react-toastify";
import {
  all,
  AllEffect,
  call,
  ForkEffect,
  put,
  takeLatest,
} from "redux-saga/effects";
import {
  fetchAllQLEEmailTemplateFailure,
  fetchAllQLEEmailTemplateSuccess
} from "../../actions/qleEmailTemplateActions/allQLEEmailTemplateActions";
import {allQLEEmailTemplateTypes} from '../../constants/actionTypes';
import {getAllQLEEmailTemplateDetails} from "../../services/qleEmailTemplateApi";

function* fetchAllQLEEmailTemplateSaga({payload}: any): any {
  try {
      const response: any = yield call(getAllQLEEmailTemplateDetails, payload);
      yield put(
        fetchAllQLEEmailTemplateSuccess({
          qleEmailTemplate: response.data,
        })
      );
    } catch (e:any) {
      // toast.error("Please Contact Administrator !!!!!!");
      yield put(
          fetchAllQLEEmailTemplateFailure({
              error: 'Unauthorized',
              message:e.message
          })
      );
  }
}

function* allQLEEmailTemplateSaga(): Generator<AllEffect<ForkEffect<never>>, void, unknown> {
  yield all([takeLatest(allQLEEmailTemplateTypes.FETCH_ALLQLEEMAILTEMPLATE_REQUEST, fetchAllQLEEmailTemplateSaga)]);
}

export default allQLEEmailTemplateSaga;