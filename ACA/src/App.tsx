import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Components/Homepage";
import FAQs from "./Components/FAQs";
import ContactUs from "./Components/ContactUs";
import Login from "./Components/Login";
import OTPVerficationForm from "./Components/OTPVerificationForm";
import StartMyACA from "./Components/StartMyACA";
import ACA_Form_Thankyou from "./Components/Form_Thankyou";
import PrivacyPolicy from "./Components/Privacypolicy";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:employer" element={<Homepage />} />
        <Route path="/:employer/faq" element={<FAQs />} />
        <Route path="/:employer/contact-us" element={<ContactUs />} />
        <Route path="/:employer/login" element={<Login />} />
        <Route path="/:employer/verify-otp" element={<OTPVerficationForm />} />
        <Route path="/:employer/startAca" element={<StartMyACA />} />
        <Route path="/:employer/thankyou" element={<ACA_Form_Thankyou />} />
        <Route path="/:employer/privacy-policy" element={<PrivacyPolicy/>} />
      </Routes>
    </Router>
  );
}

export default App;
