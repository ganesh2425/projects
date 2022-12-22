import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Homepage from './Components/Homepage';
import FAQs from './Components/FAQs';
import ContactUs from './Components/ContactUs';
import Login from './Components/Login';
import ResendLink from './Components/ResendLink';
import OTPVerficationForm from './Components/OTPVerificationForm';
import QLEForm from './Components/Form';
import RequestBenefitChanges from './Components/RequestBenefitChanges';
import ResendOTPVerficationForm from './Components/ResendOTPVerificationForm';
import QLE_Form_Thankyou from './Components/Form_Thankyou';
import { history } from "./config/history";
import PrivacyPolicy from './Components/Privacypolicy';
//import createHistory from 'config/history/createBrowserHistory';

function App() {
  return (
   <Router>
     <Routes>
       <Route path="/:employer" element={<Homepage />} />
       <Route path="/:employer/faq" element={<FAQs />} />
       {/* <Route path="/step1" element={<QLEForm />} /> */}
       {/* <Route path="/step1/:eventId" element={<QLEForm />} /> */}
       <Route path="/:employer/step1/:token" element={<QLEForm />} />
       {/* <Redirect exact from="/some-route/reload" to="/some-route" /> */}
       {/* <Route path="/form/:email?/:phone?" element={<QLEForm />} /> */}
       <Route path="/:employer/contact-us" element={<ContactUs />} />
       <Route path="/:employer/login" element={<Login />} />
       <Route path="/:employer/resend-link" element={<ResendLink />} />
       <Route path="/:employer/verify-otp" element={<OTPVerficationForm />} />
       <Route path="/:employer/relogin-otp" element={<ResendOTPVerficationForm />} />
       <Route path="/:employer/requestbenefit" element={<QLEForm />} />
       <Route path="/:employer/uploaddocument" element={<QLEForm />} />
       {/* <Route path="/form-thankyou" element={<QLE_Form_Thankyou/>} /> */}
       <Route path="/:employer/form-thankyou/:status" element={<QLE_Form_Thankyou/>} />
       <Route path="/:employer/step3/:token" element={<QLEForm />} />
       <Route path="/:employer/privacy-policy" element={<PrivacyPolicy />} />
     </Routes>
   </Router>
  );
}

export default App;
