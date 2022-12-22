import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import TextEditor from "../../TextEditor";
import { useSelector, useDispatch } from "react-redux";
import { fetchUpdateEmpQLEStepsRequest } from "../../../actions/employersActions/updateEmpQLEStepsActions";
import { getUpdateEmpQLESteps } from "../../../reducers/employersReducer/updateEmpQLEStepsReducer";
import { toast } from "react-toastify";
import { getEmployerDetails } from "../../../reducers/employersReducer/getEmployerReducer";
import { useNavigate } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";

// const Step2 = () => {
const Step2 = ({
  employerId
}: any): JSX.Element => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [editorDataWhatBenefit, setEditorDataWhatBenefit] = React.useState('');
  const [editorDataWhoBenefit, setEditorDataWhoBenefit] = React.useState('');
  const [editorDataDisclaimer2, setEditorDataDisclaimer2] = React.useState('');
  const [enrollOptMedFsa, setEnrollOptMedFsa] = React.useState('');
  const [enrollOptAllTierHsa, setEnrollOptAllTierHsa] = React.useState('');
  const [enrollOptEmpTierHsa, setEnrollOptEmpTierHsa] = React.useState('');
  const [enrollDependentFsa, setEnrollDependentFsa] = React.useState('');
  const [cancelOptMedFsa, setCancelOptMedFsa] = React.useState('');
  const [cancelOptAllTierHsa, setCancelOptAllTierHsa] = React.useState('');
  const [cancelOptEmpTierHsa, setCancelOptEmpTierHsa] = React.useState('');
  const [cancelDependentFsa, setCancelDependentFsa] = React.useState('');
  const [isSubmitted, setSubmitted] = useState(false);
  const getEmployerRes = useSelector(getEmployerDetails);
  let getUpdateEmpQLEStepsRes: any = useSelector(getUpdateEmpQLESteps);

  useEffect(() => {
    if (employerId > 0) {
      getUpdateEmpQLEStepsRes = null;
      if (getEmployerRes && parseInt(getEmployerRes['id']) > 0) {
        setEditorDataWhatBenefit(getEmployerRes['qleWhatBenefitChangesStep2']);
        setEditorDataWhoBenefit(getEmployerRes['qleWhoChangedBenefitStep2']);
        setEditorDataDisclaimer2(getEmployerRes['qleDisclaimerStep2']);
        setEnrollOptMedFsa(getEmployerRes['enrollOptMedFsa']);
        setEnrollOptAllTierHsa(getEmployerRes['enrollOptAllTierHsa']);
        setEnrollOptEmpTierHsa(getEmployerRes['enrollOptEmpTierHsa']);
        setEnrollDependentFsa(getEmployerRes['enrollDependentFsa']);
        setCancelOptMedFsa(getEmployerRes['cancelOptMedFsa']);
        setCancelOptAllTierHsa(getEmployerRes['cancelOptAllTierHsa']);
        setCancelOptEmpTierHsa(getEmployerRes['cancelOptEmpTierHsa']);
        setCancelDependentFsa(getEmployerRes['cancelDependentFsa']);
      }
    }
  }, [getEmployerRes]);

  const handleEditorDataWhatBenefit = (incomingData: any) => {
    setEditorDataWhatBenefit(incomingData);
  };

  const handleEditorDataWhoBenefit = (incomingData: any) => {
    setEditorDataWhoBenefit(incomingData);
  };

  const handleEditorDataDisclaimer2 = (incomingData: any) => {
    setEditorDataDisclaimer2(incomingData);
  };

  const handleSubmit = () => {
      setSubmitted(true); 
      if (employerId > 0 && editorDataWhatBenefit && editorDataWhoBenefit && editorDataDisclaimer2.length > 0) {
      const tempUpdateEmpQLEStepsData: any = {
        "id": employerId,
        "qleWhatBenefitChangesStep2": editorDataWhatBenefit,
        "qleWhoChangedBenefitStep2": editorDataWhoBenefit,
        "qleDisclaimerStep2": editorDataDisclaimer2,
        "enrollOptMedFsa": enrollOptMedFsa,
        "enrollOptAllTierHsa": enrollOptAllTierHsa,
        "enrollOptEmpTierHsa": enrollOptEmpTierHsa,
        "enrollDependentFsa": enrollDependentFsa,
        "cancelOptMedFsa": cancelOptMedFsa,
        "cancelOptAllTierHsa": cancelOptAllTierHsa,
        "cancelOptEmpTierHsa": cancelOptEmpTierHsa,
        "cancelDependentFsa": cancelDependentFsa,
        }
        //&& enrollOptMedFsa && enrollOptAllTierHsa && enrollOptEmpTierHsa
        // && enrollDependentFsa && cancelOptMedFsa && cancelOptAllTierHsa && cancelOptEmpTierHsa && cancelDependentFsa
     if (editorDataWhatBenefit && editorDataWhoBenefit && editorDataDisclaimer2 )
        dispatch(fetchUpdateEmpQLEStepsRequest(tempUpdateEmpQLEStepsData));
        toast.success("Step2 details updated successfully");
    }
  }

  useEffect(() => {
    if (getUpdateEmpQLEStepsRes) {
      setEditorDataWhatBenefit(getUpdateEmpQLEStepsRes['qleWhatBenefitChangesStep2']);
      setEditorDataWhoBenefit(getUpdateEmpQLEStepsRes['qleWhoChangedBenefitStep2']);
      setEditorDataDisclaimer2(getUpdateEmpQLEStepsRes['qleDisclaimerStep2']);
      setEnrollOptMedFsa(getUpdateEmpQLEStepsRes['enrollOptMedFsa']);
      setEnrollOptAllTierHsa(getUpdateEmpQLEStepsRes['enrollOptAllTierHsa']);
      setEnrollOptEmpTierHsa(getUpdateEmpQLEStepsRes['enrollOptEmpTierHsa']);
      setEnrollDependentFsa(getUpdateEmpQLEStepsRes['enrollDependentFsa']);
      setCancelOptMedFsa(getUpdateEmpQLEStepsRes['cancelOptMedFsa']);
      setCancelOptAllTierHsa(getUpdateEmpQLEStepsRes['cancelOptAllTierHsa']);
      setCancelOptEmpTierHsa(getUpdateEmpQLEStepsRes['cancelOptEmpTierHsa']);
      setCancelDependentFsa(getUpdateEmpQLEStepsRes['cancelDependentFsa']);
    }
  }, [getUpdateEmpQLEStepsRes]);

  const handleCancel = (e: any) => {
    navigate("/employers");
  };

  return (
    <>
      {/* <TextEditor data={getUpdateEmpQLEStepsRes['qleWhatBenefitChangesStep2'] ? getUpdateEmpQLEStepsRes['qleWhatBenefitChangesStep2'] : editorDataWhatBenefit ? editorDataWhatBenefit : " "} label={"What Benefit Changes"} handleEditorData={handleEditorDataWhatBenefit} />
      <div className={!editorDataWhatBenefit && isSubmitted ? "error-span show" : "error-span"}>
        {!editorDataWhatBenefit && isSubmitted ? "Please enter data" : ""}
      </div>

      <TextEditor data={getUpdateEmpQLEStepsRes['qleWhoChangedBenefitStep2'] ? getUpdateEmpQLEStepsRes['qleWhoChangedBenefitStep2'] : editorDataWhoBenefit ? editorDataWhoBenefit : " "} label={"Who Changed Benefit"} handleEditorData={handleEditorDataWhoBenefit} />
      <div className={!editorDataWhoBenefit && isSubmitted ? "error-span show" : "error-span"}>
        {!editorDataWhoBenefit && isSubmitted ? "Please enter data" : ""}
      </div> */}

      <TextEditor data={getUpdateEmpQLEStepsRes['qleDisclaimerStep2'] ? getUpdateEmpQLEStepsRes['qleDisclaimerStep2'] : editorDataDisclaimer2 ? editorDataDisclaimer2 : " "} label={"Disclaimer"} handleEditorData={handleEditorDataDisclaimer2} />
      <div className={!editorDataDisclaimer2 && isSubmitted ? "error-span show" : "error-span"}>
        {!editorDataDisclaimer2 && isSubmitted ? "Please enter data" : ""}
      </div>
      <br />
      <br />
     <Grid container spacing={4} >
      <Grid item xs={12} md={6}>
        <TextField
            label="Enroll in Health Care FSA Annual Contribution Amount"
            name="enrollOptMedFsa"
            type="number"
            id="enrollOptMedFsa"
            variant="outlined"
            InputProps={{
                inputProps: {
                    min: "0", max: "5000"
                },
             style: {height: 40, borderRadius: 0 },
             startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
            fullWidth
            value={enrollOptMedFsa}
            onChange={(e) => { setEnrollOptMedFsa(e.target.value) }}
            onBlur={(e) => {
                if (parseFloat(e.target.value) > 5000) setEnrollOptMedFsa('');
            }}
            placeholder="Maximum of $5,000"
        />
        </Grid>

        <Grid item xs={12} md={6}>
            <TextField
                label="Cancel in Health Care FSA Annual Contribution Amount"
                name="cancelOptMedFsa"
                type="number"
                id="cancelOptMedFsa"
                variant="outlined"
                InputProps={{
                    inputProps: {
                        min: "0", max: "5000"
                    },
                    style: { height: 40, borderRadius: 0 },
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                fullWidth
                value={cancelOptMedFsa}
                onChange={(e) => { setCancelOptMedFsa(e.target.value) }}
                onBlur={(e) => {
                    if (parseFloat(e.target.value) > 5000) setCancelOptMedFsa('');
                }}
                placeholder="Maximum of $5,000"
            />
        </Grid>

        <Grid item xs={12} md={6}>
            <TextField
                label="Enroll in HSA Annual Contribution Amount - Employee Only Coverage"
                name="enrollOptEmpTierHsa"
                type="number"
                id="enrollOptEmpTierHsa"
                variant="outlined"
                InputProps={{
                    inputProps: {
                        min: "0", max: "5000"
                    },
                    style: { height: 40, borderRadius: 0 },
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                fullWidth
                value={enrollOptEmpTierHsa}
                onChange={(e) => { setEnrollOptEmpTierHsa(e.target.value) }}
                onBlur={(e) => {
                    if (parseFloat(e.target.value) > 5000) setEnrollOptEmpTierHsa('');
                }}
                placeholder="Maximum of $5,000"
            />
        </Grid>

        <Grid item xs={12} md={6}>
            <TextField
                label="Cancel in HSA Annual Contribution Amount - Employee Only Coverage"
                name="cancelOptEmpTierHsa"
                type="number"
                id="cancelOptEmpTierHsa"
                variant="outlined"
                InputProps={{
                    inputProps: {
                        min: "0", max: "5000"
                    },
                    style: { height: 40, borderRadius: 0 },
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                fullWidth
                value={cancelOptEmpTierHsa}
                onChange={(e) => { setCancelOptEmpTierHsa(e.target.value) }}
                onBlur={(e) => {
                    if (parseFloat(e.target.value) > 5000) setCancelOptEmpTierHsa('');
                }}
                placeholder="Maximum of $5,000"
            />
        </Grid>

        <Grid item xs={12} md={6}>
            <TextField
                label="Enroll in HSA Annual Contribution Amount - All Coverage"
                name="enrollOptAllTierHsa"
                type="number"
                id="enrollOptAllTierHsa"
                variant="outlined"
                InputProps={{
                    inputProps: {
                        min: "0", max: "5000"
                    },
                    style: { height: 40, borderRadius: 0 },
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                fullWidth
                value={enrollOptAllTierHsa}
                onChange={(e) => { setEnrollOptAllTierHsa(e.target.value) }}
                onBlur={(e) => {
                    if (parseFloat(e.target.value) > 5000) setEnrollOptAllTierHsa('');
                }}
                placeholder="Maximum of $5,000"
            />
        </Grid>

        <Grid item xs={12} md={6}>
            <TextField
                label="Cancel in HSA Annual Contribution Amount - All Coverage"
                name="cancelOptAllTierHsa"
                type="number"
                id="cancelOptAllTierHsa"
                variant="outlined"
                InputProps={{
                    inputProps: {
                        min: "0", max: "5000"
                    },
                    style: { height: 40, borderRadius: 0 },
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                fullWidth
                value={cancelOptAllTierHsa}
                onChange={(e) => { setCancelOptAllTierHsa(e.target.value) }}
                onBlur={(e) => {
                    if (parseFloat(e.target.value) > 5000) setCancelOptAllTierHsa('');
                }}
                placeholder="Maximum of $5,000"
            />
        </Grid>

        <Grid item xs={12} md={6}>
            <TextField
                label="Enroll in Dependent Care FSA Annual Contribution Amount"
                name="enrollDependentFsa"
                type="number"
                id="enrollDependentFsa"
                variant="outlined"
                InputProps={{
                    inputProps: {
                        min: "0", max: "5000"
                    },
                    style: { height: 40, borderRadius: 0 },
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                fullWidth
                value={enrollDependentFsa}
                onChange={(e) => { setEnrollDependentFsa(e.target.value) }}
                onBlur={(e) => {
                    if (parseFloat(e.target.value) > 5000) setEnrollDependentFsa('');
                }}
                placeholder="Maximum of $5,000"
            />
        </Grid>

        <Grid item xs={12} md={6}>
            <TextField
                label="Cancel in Dependent Care FSA Annual Contribution Amount"
                name="cancelDependentFsa"
                type="number"
                id="cancelDependentFsa"
                variant="outlined"
                InputProps={{
                    inputProps: {
                        min: "0", max: "5000"
                    },
                    style: { height: 40, borderRadius: 0 },
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                fullWidth
                value={cancelDependentFsa}
                onChange={(e) => { setCancelDependentFsa(e.target.value) }}
                placeholder="Maximum of $5,000"
            />
        </Grid>
      </Grid>

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

export default Step2;




