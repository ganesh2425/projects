import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Button, Typography } from "@mui/material";
import TextEditor from "../../TextEditor";
import { useSelector, useDispatch } from "react-redux";
import { fetchUpdateEmpQLEStepsRequest } from "../../../actions/employersActions/updateEmpQLEStepsActions";
import { getUpdateEmpQLESteps } from "../../../reducers/employersReducer/updateEmpQLEStepsReducer";
import { toast } from "react-toastify";
import { getEmployerDetails } from "../../../reducers/employersReducer/getEmployerReducer";
import { useNavigate } from "react-router-dom";

// const Step1 = () => {
const Step1 = ({
  employerId
}: any): JSX.Element => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [editorDataContactCert, setEditorDataContactCert] = React.useState('');
  const [editorDataQLECert, setEditorDataQLECert] = React.useState('');
  const [editorDataDisclaimer, setEditorDataDisclaimer] = React.useState('');

  // const [editorDataContactCert, setEditorDataContactCert] = React.useState(`<div>
  //   <h2>Contact Certification Box:</h2>
  //   <p>By checking this box, I agree to be contacted via email and/or text message with reminders and updates about my QLE. Standard message & data rates may apply. I understand that, in order to change my preferred reminder method, I must contact VCG at 855.208.7036.</p>
  //   <hr/></div>`);

  // const [editorDataQLECert, setEditorDataQLECert] = React.useState(`<div>
  // <h3>QLE Certification Box:</h3>
  //   <p>Randstad requires you to provide documentation of your qualifying life event (status change), including the date of your status change. Intentionally providing false information may be considered grounds for termination or other legal action.</p>
  //   <p>Benefit plans must follow certain rules when administering status changes. Under the provisions of Randstad's plans, you're permitted to change your coverage during the year only if you experience certain life events, such as the loss or gain of other health coverage.</p>
  //   <p>By completing this page, you certify that:</p>
  //   <ul>
  //       <li>The information you're about to provide is true and correct, and</li>
  //       <li>You understand that any fraudulent statement, falsification, or material omission of information may subject you to discipline up to and including termination of employment.</li>
  //   </ul>
  //   <hr/>
  // </div>`);
  // const [editorDataDisclaimer, setEditorDataDisclaimer] = React.useState(`<div>
  // <h3>You will receive email messages from the following email address with updates on your QLE submission: support@qleservices.com.</h3>
  // <h3>If you do not receive an email upon submitting your QLE, please check your junk or spam folder.</h3>
  // </div>`);

  //   const [editorData, setEditorData] = React.useState(`<div>
  //   <h2>Contact Certification Box:</h2>

  //   <p>By checking this box, I agree to be contacted via email and/or text message with reminders and updates about my QLE. Standard message & data rates may apply. I understand that, in order to change my preferred reminder method, I must contact VCG at 855.208.7036.</p>

  //   <hr/>

  //   <h3>QLE Certification Box:</h3>
  //   <p>Randstad requires you to provide documentation of your qualifying life event (status change), including the date of your status change. Intentionally providing false information may be considered grounds for termination or other legal action.</p>

  //   <p>Benefit plans must follow certain rules when administering status changes. Under the provisions of Randstad's plans, you're permitted to change your coverage during the year only if you experience certain life events, such as the loss or gain of other health coverage.</p>

  //   <p>By completing this page, you certify that:</p>

  //   <ul>
  //       <li>The information you're about to provide is true and correct, and</li>
  //       <li>You understand that any fraudulent statement, falsification, or material omission of information may subject you to discipline up to and including termination of employment.</li>
  //   </ul>

  //   <hr/>

  //   <h3>You will receive email messages from the following email address with updates on your QLE submission: support@qleservices.com.</h3>

  //   <h3>If you do not receive an email upon submitting your QLE, please check your junk or spam folder.</h3>
  // </div>`);

  const [isSubmitted, setSubmitted] = useState(false);

  const getEmployerRes = useSelector(getEmployerDetails);
  let getUpdateEmpQLEStepsRes1: any = useSelector(getUpdateEmpQLESteps);

  let ff = 0;

  useEffect(() => {
    if (employerId > 0) {
      getUpdateEmpQLEStepsRes1 = null;
      if (getEmployerRes && parseInt(getEmployerRes['id']) > 0) {
        let contactCert = getEmployerRes['qleContactCertDescriptionStep1'];
        let qleCert = getEmployerRes['qleCertDescriptionStep1'];
        let disclaimer = getEmployerRes['qleDisclaimerStep1'];
        //if (contactCert)
          setEditorDataContactCert(contactCert);
        //if (qleCert)
          setEditorDataQLECert(qleCert);
        //if (disclaimer)
          setEditorDataDisclaimer(disclaimer);
      }
    }
  }, [getEmployerRes]);

  const handleEditorDataContactCert = (incomingData: any) => {
    setEditorDataContactCert(incomingData);
  };

  const handleEditorDataQLECert = (incomingData: any) => {
    setEditorDataQLECert(incomingData);
  };

  const handleEditorDataDisclaimer = (incomingData: any) => {
    setEditorDataDisclaimer(incomingData);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    if (employerId > 0 && editorDataContactCert && editorDataQLECert && editorDataDisclaimer.length > 0) {
     
      toast.success("Step1 details updated successfully");
      const tempUpdateEmpQLEStepsData: any = {
        "id": employerId,
        "qleContactCertDescriptionStep1": editorDataContactCert,
        "qleCertDescriptionStep1": editorDataQLECert,
        "qleDisclaimerStep1": editorDataDisclaimer,
      }
      if (editorDataContactCert && editorDataQLECert && editorDataDisclaimer)
        dispatch(fetchUpdateEmpQLEStepsRequest(tempUpdateEmpQLEStepsData));
    }
  }



  useEffect(() => {
    if (getUpdateEmpQLEStepsRes1 && getUpdateEmpQLEStepsRes1['id'] > 0) {
      //toast.success("Step1 details updated successfully");
      //getUpdateEmpQLEStepsRes1['id'] = 0;
      //setEditorData(getUpdateEmpQLEStepsRes['qleHomePageDescription']);
      //if (getUpdateEmpQLEStepsRes1['qleContactCertDescriptionStep1'])
        setEditorDataContactCert(getUpdateEmpQLEStepsRes1['qleContactCertDescriptionStep1']);
      //if (getUpdateEmpQLEStepsRes1['qleCertDescriptionStep1'])
        setEditorDataQLECert(getUpdateEmpQLEStepsRes1['qleCertDescriptionStep1']);
      //if (getUpdateEmpQLEStepsRes1['qleCertDescriptionStep1'])
        setEditorDataDisclaimer(getUpdateEmpQLEStepsRes1['qleDisclaimerStep1']);
    }
  }, [getUpdateEmpQLEStepsRes1]);

  const handleCancel = (e: any) => {
    navigate("/employers");
  };

  return (
    <>
      <TextEditor data={getUpdateEmpQLEStepsRes1['qleContactCertDescriptionStep1'] ? getUpdateEmpQLEStepsRes1['qleContactCertDescriptionStep1'] : editorDataContactCert ? editorDataContactCert : ""} label={"Contact Certification Box"} handleEditorData={handleEditorDataContactCert} />
      <div className={!editorDataContactCert && isSubmitted ? "error-span show" : "error-span"}>
        {!editorDataContactCert && isSubmitted ? "Please enter data" : ""}
      </div>
      <></>
      <TextEditor data={getUpdateEmpQLEStepsRes1['qleCertDescriptionStep1'] ? getUpdateEmpQLEStepsRes1['qleCertDescriptionStep1'] : editorDataQLECert ? editorDataQLECert : ""} label={"QLE Certification Box"} handleEditorData={handleEditorDataQLECert} />
      <div className={!editorDataQLECert && isSubmitted ? "error-span show" : "error-span"}>
        {!editorDataQLECert && isSubmitted ? "Please enter data" : ""}
      </div>
      <></>
      <TextEditor data={getUpdateEmpQLEStepsRes1['qleDisclaimerStep1'] ? getUpdateEmpQLEStepsRes1['qleDisclaimerStep1'] : editorDataDisclaimer ? editorDataDisclaimer : ""} label={"Dislaimer"} handleEditorData={handleEditorDataDisclaimer} />
      <div className={!editorDataDisclaimer && isSubmitted ? "error-span show" : "error-span"}>
        {!editorDataDisclaimer && isSubmitted ? "Please enter data" : ""}
      </div>

      <Grid
        item
        sx={{
          display: "flex",
          flexDirection: "row-reverse",
          marginTop: "10px",
          width: "100%",
        }}
      >
        <Button
          variant="contained"
          className="save-btn-role"
          sx={{ margin: "3px 5px" }}
          onClick={handleSubmit}
        >
          Save
        </Button>
        <Button
          variant="outlined"
          className="cancel-btn-role"
          sx={{ margin: "3px 5px" }}
          onClick={(e) => handleCancel(e)}
        >
          Cancel
        </Button>
      </Grid>
    </>
  );
};

export default Step1;
