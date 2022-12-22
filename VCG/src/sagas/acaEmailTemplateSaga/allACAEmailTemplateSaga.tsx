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
  fetchAllACAEmailTemplateFailure,
  fetchAllACAEmailTemplateSuccess
} from "../../actions/acaEmailTemplateActions/allACAEmailTemplateActions";
import {allACAEmailTemplateTypes} from '../../constants/actionTypes';
import {getAllACAEmailTemplateDetails} from "../../services/acaEmailTemplateApi";

function* fetchAllACAEmailTemplateSaga({payload}: any): any {

  try {
      const response: any = yield call(getAllACAEmailTemplateDetails, payload)
      yield put(
        fetchAllACAEmailTemplateSuccess({
          acaEmailTemplate: response.data,
        })
      );
    } catch (e:any) {
      // toast.error("Please Contact Administrator !!!!!!");
      yield put(
          fetchAllACAEmailTemplateFailure({
              error: 'Unauthorized',
              message:e.message
          })
      );
  }
}

function* allACAEmailTemplateSaga(): Generator<AllEffect<ForkEffect<never>>, void, unknown> {
  yield all([takeLatest(allACAEmailTemplateTypes.FETCH_ALLACAEMAILTEMPLATE_REQUEST, fetchAllACAEmailTemplateSaga)]);
}

export default allACAEmailTemplateSaga;