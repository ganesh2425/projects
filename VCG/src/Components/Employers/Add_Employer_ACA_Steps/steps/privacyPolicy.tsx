import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Button, Typography } from "@mui/material";
import TextEditor from "../../../TextEditor";
import { useSelector, useDispatch } from "react-redux";
import { fetchUpdateEmpQLEStepsRequest } from "../../../../actions/employersActions/updateEmpQLEStepsActions";
import { getUpdateEmpQLESteps } from "../../../../reducers/employersReducer/updateEmpQLEStepsReducer";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { getEmployerDetails } from "../../../../reducers/employersReducer/getEmployerReducer";


const PrivacyPolicy = ({ employerId }: any): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [editorDataPrivacyPolicy, setEditorDataPrivacyPolicy] = React.useState("");
  const [isSubmitted, setSubmitted] = useState(false);
const getEmployerRes = useSelector(getEmployerDetails);

  useEffect(() => {
    if (employerId > 0) {
      if (getEmployerRes && parseInt(getEmployerRes["id"]) > 0) {
        let privacyPolicy = getEmployerRes["acaPrivacyPolicy"];
        setEditorDataPrivacyPolicy(privacyPolicy)
      }
    }
  }, [getEmployerRes]);


  const handleEditorDataPrivacyPolicy = (incomingData: any) => {
    setEditorDataPrivacyPolicy(incomingData);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    if (employerId > 0 && editorDataPrivacyPolicy.length > 0) {
      toast.success("Privacy Policy details updated successfully");
      const tempUpdateEmpACAStepsData: any = {
        "id": employerId,
        "acaPrivacyPolicy": editorDataPrivacyPolicy,
      };
      if (editorDataPrivacyPolicy)
        dispatch(fetchUpdateEmpQLEStepsRequest(tempUpdateEmpACAStepsData));
    }
  };

  let getUpdateEmpQLEStepsRes: any = useSelector(getUpdateEmpQLESteps);

  useEffect(() => {
    if (getUpdateEmpQLEStepsRes && getUpdateEmpQLEStepsRes["id"] > 0) {
      setEditorDataPrivacyPolicy(getUpdateEmpQLEStepsRes['acaPrivacyPolicy']);
    }
  }, [getUpdateEmpQLEStepsRes]);

  const handleCancel = (e: any) => {
    navigate("/employers")
  }

  return (
    <>
      <TextEditor
        data={getUpdateEmpQLEStepsRes['acaPrivacyPolicy'] ? getUpdateEmpQLEStepsRes['acaPrivacyPolicy'] : editorDataPrivacyPolicy ? editorDataPrivacyPolicy : " "} label={"Privacy Policy"} handleEditorData={handleEditorDataPrivacyPolicy}
      />
      <div
        className={
          !editorDataPrivacyPolicy && isSubmitted
            ? "error-span show"
            : "error-span"
        }
      >
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
