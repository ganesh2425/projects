import './App.css';
import Roles from './Components/Roles';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './Components/Login';
import ForgotPwd from './Components/Login/ForgotPassword';
import AddRoles from './Components/Roles/AddRoles';
//import AddRoleContainer from './containers/AddRoleContainer';
//import Roles from './Components/TestRole';
import User from './Components/user';
import AddUser from './Components/user/addUser';
import Employers from './Components/Employers';
//import Employer_QLE_Steps from './Components/Employer_QLE_Steps';
import AddEmployer from './Components/Employers/AddEmployers';
import Dashboard from './Components/Dashboard';
import QLE_Edit_Email from './Components/QLE_EmailTemplates/email-edit';
import QLE_EmailTemplate from './Components/QLE_EmailTemplates/index'
import ACA_EmailTemplate from './Components/ACA_EmailTemplates';
import ACA_Edit_Email from './Components/ACA_EmailTemplates/email-edit';
import QleFaqs from './Components/QLE-FAQ/index';
import AddQleFaq from './Components/QLE-FAQ/addFaq/';	
import QLE from'./Components/QLE';
import React, { useEffect, useState } from "react";
import StorageService from "./services/Storage.service";
import { checkTokenExpiration } from "./utilities/checkTokenExpiry";
import { useNavigate } from "react-router-dom";
import QLE_Edit_Message from './Components/QLE_EmailTemplates/message-edit';
import ACA_Edit_Message from './Components/ACA_EmailTemplates/message-edit';
import Applications from "./Components/ACA_Application";
import Application_edit from './Components/ACA_Edit_Application';
import Edit_QLE_Info from './Components/QLE-edit-steps';
import QLE_edit from './Components/QLE-edit/index';
import QLE_Edit_Steps from './Components/QLE-edit-steps';
import QLE_Answers from './Components/QLE-edit-steps/answers';
import Communications from './Components/QLE-edit-steps/communications';
import QLE_Notes from './Components/QLE-edit-steps/notes';
import SendStatusEmail from './Components/QLE-edit-steps/sendStatusEmail';
import QLE_Files from './Components/QLE-edit-steps/files';
import QLE_Activity from'./Components/QLE-edit-steps/activity';
import User_profile from './Components/User-profile';
import Add_Employer_ACA_HealthPlan from './Components/Employers/Add_Employer_ACA_Steps/steps/healthPlan';
import Add_Employer_ACA_NewYearChanges from './Components/Employers/Add_Employer_ACA_Steps/steps/newYearChanges';
import Reports from './Components/Reports';
import Add_Employer_ACA_Eligiblity from './Components/Employers/Add_Employer_ACA_Steps/steps/eligibility';

const App = () => {
  //const navigate = useNavigate();

  //const isLoggedIn  = StorageService.getCookies("accessToken");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authenticated = StorageService.getCookies("accessToken");
    if (authenticated) {
      if (authenticated && checkTokenExpiration()) {
        setIsAuthenticated(true);
        //alert("token has not expired")
        //window.location.assign("/");
        // if (history.location.pathname === "/login") {
        //   history.push("/dashboard");
        // }
      } else {
        setIsAuthenticated(false);
        StorageService.clearCookies();
        //window.location.assign("/login");
        //navigate(`/`);
      }
    }
  }, []);

  return (
   <Router>
     <Routes>
       <Route path="/login" element={<Login />} />
       <Route path="/forgotPassword" element={<ForgotPwd/>}/>
       <Route path="/roles" element={<Roles />} />
       {/* <Route path="/roles" element={isLoggedIn ? <Roles /> : <Login />} /> */}
       <Route path="/add-role/:roleId" element={<AddRoles />} />
	    <Route path="/users" element={<User/>} />
       <Route path="/add-user/:userId" element={<AddUser />} />
       <Route path="/employers" element={<Employers/>}/>
       {/* <Route path="/add-role/:roleId" element={<AddRoleContainer />} /> */}
       {/* <Route path="/testrole" element={<Roles />} /> */}
       {/* <Route path="/steps" element={<Employer_QLE_Steps />} /> */}
       {/* <Route path="/addEmployer" element={<AddEmployer />} /> */}
       <Route path="/addEmployer/:employerId" element={<AddEmployer/>}/>
       <Route path="/dashboard" element={<Dashboard/>} />
       {/* <Route path="/" element={isAuthenticated ? <Dashboard /> : <Login />} /> */}
           <Route path="/" element={<Login />} />
       <Route path="/qle-email" element={<QLE_EmailTemplate/>} />
       <Route path="/qle-email-edit/:templateId" element={<QLE_Edit_Email/>} />
       <Route path="/aca-email" element={<ACA_EmailTemplate/>}/>
       <Route path="/aca-email-edit/:acaTemplateId" element={<ACA_Edit_Email/>}/>
       <Route path="/qle-edit-message/:templateId" element={<QLE_Edit_Message/>}/>
       <Route path="/aca-edit-message/:acaTemplateId" element={<ACA_Edit_Message/>}/>
       <Route path="/qleFaqs" element={<QleFaqs/>}/>
       <Route path="/qleFaqs/:type" element={<QleFaqs/>}/>
       <Route path="/addQleFaq/:id/:type" element={<AddQleFaq/>}/>	
       <Route path="/addQleFaq/:type" element={<AddQleFaq/>}/>	
       <Route path="/addQleFaq" element={<AddQleFaq/>}/>
	   <Route path="/qle" element={<QLE/>} />	   
       <Route path="/qle/:qleStatusId/:qleEmpId" element={<QLE/>} />
       <Route path="/aca-applications" element={<Applications/>} />
       <Route path="/aca-applications/:acaStatusId/:acaEmpId" element={<Applications/>} />
       <Route path="/edit-aca-applications/:eventId" element={<Application_edit/>}/>
       <Route path="/qle-editinfo/:id" element={<Edit_QLE_Info/>}/>
       <Route path="/answers/:id" element={<QLE_Answers/>}/>
       <Route path="/communications/:id" element={<Communications/>}/>
       <Route path="/notes/:id" element={<QLE_Notes/>}/>
       <Route path="/sentStatusEmail/:id" element={<SendStatusEmail/>}/>
       <Route path="/qle-edit/:id" element={<QLE_edit/>}/>
       <Route path="/files/:id" element={<QLE_Files/>}/>
       <Route path="/activity/:id" element={<QLE_Activity/>}/>
       <Route path="/user-profile" element={<User_profile />} />
       <Route path="/healthplan/:id" element={<Add_Employer_ACA_HealthPlan/>}/>
       <Route path="/newyearplan/:id" element={<Add_Employer_ACA_NewYearChanges/>}/>
       <Route path="/eligibility/:id" element={<Add_Employer_ACA_Eligiblity/>}/>
       <Route path="/report/:type" element={<Reports/>}/>

     </Routes>
   </Router>
  );
}

export default App;
