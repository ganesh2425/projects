import { all, fork } from "redux-saga/effects";
import loginSaga from "./authSaga";
import otpSaga from "./otpSaga";
import resendOTPSaga from "./resendOTPSaga";
import homeSaga from "./homeSaga";
import FaqSaga from "./faqSaga";
import faqReducer from "../reducers/faqReducer";
import step1Saga from "./step1Saga";
import eventsSaga from "./eventsSaga";
import getStep1Saga from "./getStep1Saga";
import editStep1Saga from "./editStep1Saga";
import employerSaga from "./employerSaga";
import reLoginSaga from "./reLoginSaga/reLoginSaga";
import step2Saga from "./step2Saga";
import planSaga from "./planSaga";
import step3Saga from "./step3Saga";
import getStep3Saga from "./getStep3Saga";
import editStep3Saga from "./editStep3Saga";
import viewFileSaga from "./viewFileSaga";
import step2CancelSaga from "./step2CancelSaga";
import PrivacypolicySaga from "./PrivacypolicySaga";
import employerBySlugSaga from "./slugSaga";

export default function* startForman(): Generator<never> {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        yield all([
                fork(loginSaga),
                fork(otpSaga),
                fork(resendOTPSaga),
                fork(homeSaga),
                fork(FaqSaga),
                fork(step1Saga),
                fork(eventsSaga),
                fork(getStep1Saga),
                fork(editStep1Saga),
                fork(employerSaga),
                fork(reLoginSaga),
                fork(step2Saga),
                fork(planSaga),
                fork(step3Saga),
                fork(getStep3Saga),
                fork(editStep3Saga),
                fork(viewFileSaga),
                fork(step2CancelSaga),
                fork(PrivacypolicySaga),
                fork(employerBySlugSaga)
        ]);
}
