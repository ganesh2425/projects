import { combineReducers } from "redux";
import authReducer from "./authReducer";
import otpReducer from "./otpReducer";
import resendOTPReducer from "./resendOTPReducer";
import homeReducer from "./homeReducer";
import faqReducer from "./faqReducer";
import step1Reducer from "./step1Reducer";
import eventsReducer from "./eventsReducer";
import getStep1Reducer from "./getStep1Reducer";
import editStep1Reducer from "./editStep1Reducer";
import employerReducer from "./employerReducer";
import reLoginReducer from "./reLoginReducer/reLoginReducer";
import step2Reducer from "./step2Reducer";
import planReducer from "./planReducer";
import step3Reducer from "./step3Reducer";
import getstep3Reducer from "./getstep3Reducer";
import editStep3Reducer from "./editStep3Reducer";
import viewFileReducer from "./viewFileReducer";
import step2CancelReducer from "./step2CancelReducer";
import PrivacypolicyReducer from "./PrivacypolicyReducer";
import slugReducer from "./slugReducer";

// Combines all reducers to a single reducer function
const rootReducer = combineReducers({
    auth: authReducer,
    otp: otpReducer,
    resendOTP: resendOTPReducer,
    home: homeReducer,
    faq: faqReducer,
    step1:step1Reducer,
    events:eventsReducer,
    getStep1:getStep1Reducer,
    editStep1:editStep1Reducer,
    employer:employerReducer,
    reAuth:reLoginReducer,
    step2:step2Reducer,
    plan:planReducer,
    step3:step3Reducer,
    getStep3:getstep3Reducer,
    editStep3:editStep3Reducer,
    viewFile:viewFileReducer,
    step2Cancel:step2CancelReducer,
    Privacypolicy:PrivacypolicyReducer,
    employerBySlug:slugReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
