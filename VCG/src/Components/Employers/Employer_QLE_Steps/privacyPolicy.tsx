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

// const PrivacyPolicy = () => {
const PrivacyPolicy = ({
  employerId
}: any): JSX.Element => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [editorDataPrivacyPolicy, setEditorDataPrivacyPolicy] = React.useState('');

  //   const [editorData, setEditorData] = React.useState(`<div>
  //   <p>Protecting your privacy is important to us.  While visiting <b>Hosted URL</b>, VCG Administration Services only collects personally identifiable information if you provide it to us.  If provided, your information is transferred, encrypted and saved via secure channels for use in processing your employer health coverage information request.  VCG Administration Services will never sell or distribute your personal information for marketing or any other purpose.</p>

  //   <p>To request information about VCG Administration Services' privacy policy, contact <a href="mailto:support@qleservices.com">support@qleservices.com</a>.</p>
  // </div>`);

  const [isSubmitted, setSubmitted] = useState(false);

  const getEmployerRes = useSelector(getEmployerDetails);

  useEffect(() => {
    if (employerId > 0) {
      if (getEmployerRes && parseInt(getEmployerRes['id']) > 0) {
        let privacyPolicy = getEmployerRes['qlePrivacyPolicy'];
        //privacyPolicy ? setEditorDataPrivacyPolicy(privacyPolicy) : setEditorDataPrivacyPolicy("");
        setEditorDataPrivacyPolicy(privacyPolicy)
      }
    }
  }, [getEmployerRes]);

  const handleEditorDataPrivacyPolicy = (incomingData: any) => {
    setEditorDataPrivacyPolicy(incomingData);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    if (employerId > 0 && editorDataPrivacyPolicy.length > 0 ) {
    
      toast.success("Privacy Policy details updated successfully");
      const tempUpdateEmpQLEStepsData: any = {
        "id": employerId,
        "qlePrivacyPolicy": editorDataPrivacyPolicy,
      }
      if (editorDataPrivacyPolicy)
        dispatch(fetchUpdateEmpQLEStepsRequest(tempUpdateEmpQLEStepsData));
    }
  }

  let getUpdateEmpQLEStepsRes: any = useSelector(getUpdateEmpQLESteps);

  useEffect(() => {
    if (getUpdateEmpQLEStepsRes && getUpdateEmpQLEStepsRes['id'] > 0) {
      //toast.success("Privacy Policy details updated successfully");
      //getUpdateEmpQLEStepsRes.id = 0;
      // setTimeout(() => {
      //   navigate("/employers");
      // }, 1500);
      setEditorDataPrivacyPolicy(getUpdateEmpQLEStepsRes['qlePrivacyPolicy']);
    }
  }, [getUpdateEmpQLEStepsRes]);

  const handleCancel = (e: any) => {
    navigate("/employers");
  };

  return (
    <>
      <TextEditor data={getUpdateEmpQLEStepsRes['qlePrivacyPolicy'] ? getUpdateEmpQLEStepsRes['qlePrivacyPolicy'] : editorDataPrivacyPolicy ? editorDataPrivacyPolicy : " "} label={"Privacy Policy"} handleEditorData={handleEditorDataPrivacyPolicy} />
      <div className={!editorDataPrivacyPolicy && isSubmitted ? "error-span show" : "error-span"}>
        {!editorDataPrivacyPolicy && isSubmitted ? "Please enter data" : ""}
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

export default PrivacyPolicy;
