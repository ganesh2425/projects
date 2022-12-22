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

// const Step3 = () => {
const Step3 = ({
  employerId
}: any): JSX.Element => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [editorDataDocCovered, setEditorDataDocCovered] = React.useState('');
  const [editorDataImpNote, setEditorDataImpNote] = React.useState('');

  //   const [editorData, setEditorData] = React.useState(`<div>
  //   <p>Thanks for initiating your QLE and telling us about the changes you want to make to your benefits. Now we need some supporting documentation for our records. Remember, to be eligible to make changes to your benefits related to your qualifying life event, you must submit your documentation within 60 days of the event. Your documentation must provide proof of the qualifying event, including the date of the event.</p>

  //   <hr/>

  //   <h3>Your documentation must show each individual who was covered under the plans being terminated, each plan (medical, dental, vision) the individual was enrolled in, and when coverage will end.</h3>

  //   <p>When you have your documentation ready, use the button below to upload it. You may upload multiple documents. If we don't receive supporting documentation within 60 days of your event date, we will automatically close this qualifying life event submission.</p>

  //   <hr/>

  //   <p><b>IMPORTANT NOTE:</b> If you are adding a spouse/domestic partner and/or dependent children to your benefit plans, you are also required to submit appropriate dependent verification documentation through a separate website. To submit documentation, visit staffing.benefitsnow.com and click on the link for Dependent Verification Information. If you do not submit the appropriate dependent verification documentation in a timely manner, your spouse, domestic partner and/or dependent children may be removed from Randstad coverage.</p>
  // </div>`);

  const [isSubmitted, setSubmitted] = useState(false);

  const getEmployerRes = useSelector(getEmployerDetails);

  useEffect(() => {
    if (employerId > 0) {
      if (getEmployerRes && parseInt(getEmployerRes['id']) > 0) {
        let docCovered = getEmployerRes['qleDocumentCoveredStep3'];
        let impNote = getEmployerRes['qleImportantNoteStep3'];
        docCovered ? setEditorDataDocCovered(docCovered) : setEditorDataDocCovered("");
        impNote ? setEditorDataImpNote(impNote) : setEditorDataImpNote("");
      }
    }
  }, [getEmployerRes]);

  const handleEditorDataDocCovered = (incomingData: any) => {
    setEditorDataDocCovered(incomingData);
  };

  const handleEditorDataImpNote = (incomingData: any) => {
    setEditorDataImpNote(incomingData);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    if (employerId > 0 && editorDataDocCovered && editorDataImpNote.length > 0 ) {
     
      toast.success("Step3 details updated successfully");
      const tempUpdateEmpQLEStepsData: any = {
        "id": employerId,
        "qleDocumentCoveredStep3": editorDataDocCovered,
        "qleImportantNoteStep3": editorDataImpNote,
      }
      if (editorDataDocCovered && editorDataImpNote)
        dispatch(fetchUpdateEmpQLEStepsRequest(tempUpdateEmpQLEStepsData));
    }
  }

  let getUpdateEmpQLEStepsRes: any = useSelector(getUpdateEmpQLESteps);

  useEffect(() => {
    if (getUpdateEmpQLEStepsRes && getUpdateEmpQLEStepsRes['id'] > 0) {
      //toast.success("Step3 details updated successfully");
      //getUpdateEmpQLEStepsRes.id = 0;
      // setTimeout(() => {
      //   navigate("/employers");
      // }, 1500);
      setEditorDataDocCovered(getUpdateEmpQLEStepsRes['qleDocumentCoveredStep3'])
      setEditorDataImpNote(getUpdateEmpQLEStepsRes['qleImportantNoteStep3'])
    }
  }, [getUpdateEmpQLEStepsRes]);

  const handleCancel = (e: any) => {
    navigate("/employers");
  };

  return (
    <>
      <TextEditor data={getUpdateEmpQLEStepsRes['qleDocumentCoveredStep3'] ? getUpdateEmpQLEStepsRes['qleDocumentCoveredStep3'] : editorDataDocCovered ? editorDataDocCovered : " "} label={"Document Covered"} handleEditorData={handleEditorDataDocCovered} />
      <div className={!editorDataDocCovered && isSubmitted ? "error-span show" : "error-span"}>
        {!editorDataDocCovered && isSubmitted ? "Please enter data" : ""}
      </div>

      <TextEditor data={getUpdateEmpQLEStepsRes['qleImportantNoteStep3'] ? getUpdateEmpQLEStepsRes['qleImportantNoteStep3'] : editorDataImpNote ? editorDataImpNote : " "} label={"Important Note"} handleEditorData={handleEditorDataImpNote} />
      <div className={!editorDataImpNote && isSubmitted ? "error-span show" : "error-span"}>
        {!editorDataImpNote && isSubmitted ? "Please enter data" : ""}
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

export default Step3;
