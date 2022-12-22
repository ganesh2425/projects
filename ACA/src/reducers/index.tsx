import { combineReducers } from "redux";
import authReducer from "./authReducer";
import otpReducer from "./otpReducer";
import homeReducer from "./homeReducer";
import faqReducer from "./faqReducer";
import employerReducer from "./employerReducer";
import statesReducer from "./statesReducer";
import addACAReducer from "./addACAReducer";
import privacyReducer from "./privacyReducer";
import resendOTPReducer from "./resendOTPReducer";
import slugReducer from "./slugReducer";
// Combines all reducers to a single reducer function
const rootReducer = combineReducers({
  auth: authReducer,
  otp: otpReducer,
  home: homeReducer,
  faq: faqReducer,
  employer: employerReducer,
  states: statesReducer,
  addACA: addACAReducer,
  privacy: privacyReducer,
  resendOTP:resendOTPReducer,
  employerBySlug:slugReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
