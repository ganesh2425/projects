import { all, fork } from "redux-saga/effects";
import loginSaga from "./authSaga";
import otpSaga from "./otpSaga";
import homeSaga from "./homeSaga";
import FaqSaga from "./faqSaga";
import employerSaga from "./employerSaga";
import statesSaga from "./statesSaga";
import addACASaga from "./addACASaga";
import privacySaga from "./privacySaga";
import resendOTPSaga from "./resendOTPSaga";
import employerBySlugSaga from "./slugSaga";

export default function* startForman(): Generator<never> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  yield all([
    fork(loginSaga),
    fork(otpSaga),
    fork(homeSaga),
    fork(FaqSaga),
    fork(employerSaga),
    fork(statesSaga),
    fork(addACASaga),
    fork(privacySaga),
    fork(resendOTPSaga),
    fork(employerBySlugSaga)
  ]);
}
