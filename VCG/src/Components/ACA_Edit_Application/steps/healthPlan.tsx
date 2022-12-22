import { Button, Grid, MenuItem, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import "../style.css";
import { fetchGetACAEventRequest } from "../../../actions/acaActions/getACAEventActions";
import { getACAEventDetails } from "../../../reducers/acaReducer/getACAEventReducer";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getHealthPlanDetails } from "../../../reducers/acaReducer/acaHealthPlanReducer";
import { fetchHealthPlanRequest } from "../../../actions/acaActions/healthPlanActions";
import {
  EditHealthPlan,
  HealthPlan,
  IHealthPlan,
} from "../../../interfaces/types";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { getEditHealthPlanDetails } from "../../../reducers/acaReducer/editHealthPlanReducer";
import { fetchEditHealthPlanRequest } from "../../../actions/acaActions/editHealthPlanActions";

const ACA_Application_HealthPlan = ({ acaEventId }: any): JSX.Element => {
  const enrollment = [
    { value: true, label: "Yes" },
    { value: false, label: "No" },
  ];
  const [checked, setChecked] = React.useState(false);
  const [isOptionErr, setOptionErr] = React.useState(false);
  const [spouse, setSpouse] = React.useState<boolean>(false);
  const [children, setChildren] = React.useState<boolean>(false);
  const [parent, setParent] = React.useState<boolean>(false);
  const [isNo, setIsNo] = React.useState<boolean>(false);

  const handleRadioChange = (event: any) => {
    if (event.target.value == 0) {
      setChecked(false);
      setSpouse(false);
      setChildren(false);
      setParent(false);
      setIsNo(true);
	  setOptionErr(false);
    } else if (event.target.value == 1) {
      setChecked(true);
      setIsNo(false);
      setParent(true);
      setOptionErr(true);
    }
  };

  const handleCheckBoxMsg = (event: any) => {
    if ((event.target.value == 2 && !spouse && children) || (event.target.value == 1 && spouse && !children)  ) {
	  setOptionErr(true);
    } else  {
      setOptionErr(false);
    }
  };

  const params = useParams();

  const dispatch = useDispatch();

  const getACAEventId = () => {
    let id: any = params.eventId;

    dispatch(fetchGetACAEventRequest({ id }));
  };
  const getACAEventRes: any = useSelector(getACAEventDetails);
  useEffect(() => {
    empSetState(getACAEventRes["stateId"]);
    let id: any = params.eventId;
    if (parseInt(id) > 0) {
      if (getACAEventRes && getACAEventRes.healthPlan != null) {
        if (getACAEventRes.healthPlan.dependentEligiblity === 0) {
          setChecked(false);
          formik.values.dependentEligiblity = 0;
          setSpouse(false);
          setChildren(false);
          setIsNo(true);
        } else {
          setChecked(true);
          setIsNo(false);
          formik.values.dependentEligiblity = 1;
          if (getACAEventRes.healthPlan.dependentEligiblity === 1) {
            setSpouse(true);
          } else if (getACAEventRes.healthPlan.dependentEligiblity === 2) {
            setChildren(true);
          } else if (getACAEventRes.healthPlan.dependentEligiblity === 3) {
            setSpouse(true);
            setChildren(true);
          }
        }

        setInitialValues({
          healthPlanId: getACAEventRes.healthPlan["healthPlanId"],
          mecMcCoverage: getACAEventRes.healthPlan["mecMcCoverage"],
          dependentEligiblity: getACAEventRes.healthPlan["dependentEligiblity"],
          employerSignature: getACAEventRes.healthPlan["employerSignature"],
          id: getACAEventId["id"],
        });
      } else {
      }
    } else {
      setInitialValues({
        healthPlanId: 0,
        mecMcCoverage: true,
        dependentEligiblity: 0,
        employerSignature: "",
        id: id,
      });
    }
  }, [getACAEventRes]);

  const addHealthRes: any = useSelector(getHealthPlanDetails);

  useEffect(() => {
    if (addHealthRes && addHealthRes.isSuccess === true) {
      toast.success(`ACA HealthPlan Added Successfully`);
      addHealthRes.isSuccess = false;
      setTimeout(() => {}, 1500);
    }
  }, [addHealthRes]);

  let editHealthRes: any = useSelector(getEditHealthPlanDetails);
  useEffect(() => {
    if (editHealthRes && editHealthRes.isSuccess === true) {
      toast.success(`ACA HealthPlan Edited Successfully`);
      getACAEventId();
      editHealthRes.isSuccess = false;
      setTimeout(() => {}, 1500);
    }
  }, [editHealthRes]);
  const [healthPlan, setHealthPlan] = useState(false);
  const [question, setQuestion] = useState("");
  const data: any = getACAEventRes;
  const updateQues: any = data.whoDoesTheHealthPlanCoverStates;
  const [empState, empSetState] = useState("");
  useEffect(() => {
    setQuestion(updateQues);
    const selectedState: any = updateQues.filter(
      (index) => index === data.stateCode
    );
    if (selectedState.length > 0) {
      setHealthPlan(true);
    }
  }, [getACAEventRes]);
  const validationSchema = yup.object({
    mecMcCoverage: yup.string().required("MEC Mc Coverage is required"),
    employerSignature:
      empState === "14"
        ? yup.string().required("Employer Signature is required")
        : yup.string(),
  });

  const [initialValues, setInitialValues] = useState<IHealthPlan>({
    healthPlanId: getACAEventRes.healthPlan && getACAEventRes.healthPlan.healthPlanId,
    mecMcCoverage: true,
    dependentEligiblity: 0,
    employerSignature: "",
    id: 0,
  });

  const [isSubmitted, setSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values: IHealthPlan) => {
      if (healthPlan && checked && !spouse && !children) {
         setOptionErr(true);
      } else {
        let id: any = params.eventId;
        let dValue: number = 0;
        setSubmitted(true);
        if (parent) {
          if (spouse && children) {
            dValue = 3;
          } else if (spouse) {
            dValue = 1;
          } else if (children) {
            dValue = 2;
          } 
        } else {
          dValue = 0;
        }

      const tempHealth: HealthPlan = {
        mecMcCoverage: values.mecMcCoverage,
        dependentEligiblity: dValue,
        id: id,
      };

      const tempEditHealth: EditHealthPlan = {
        healthPlanId: values.healthPlanId,
        mecMcCoverage: values.mecMcCoverage,
        dependentEligiblity: dValue,
        employerSignature: values.employerSignature,
        id: id,
      };

      if (values.id > 0) {
        dispatch(fetchHealthPlanRequest(tempHealth));
      }

      dispatch(fetchEditHealthPlanRequest(tempEditHealth));
     }
    },
  });
  const [myValue, setMyValue] = useState(null);

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Grid container>
          <Grid item xs={12}>
            <Typography className="health-plan-header-styling">
              Health Plan
            </Typography>
          </Grid>

          <Grid item xs={12} className="health-item-styling">
            {healthPlan && (
              <Grid>
                <Typography className="health-label-styling ">
                  Who does the health plan cover?
                </Typography>
                <Grid item xs={12} sx={{ display: "flex" }}>
                  <Grid item xs={12}>
                    <FormControl>
                      <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="dependentEligiblity"
                        typeof="dependentEligiblity"
                        value={formik.values.dependentEligiblity}
                        onChange={formik.handleChange}
                      >
                        <Grid container>
                          <Grid item xs={2.7}>
                            <FormControlLabel
                              value="1"
                              control={<Radio checked={checked} />}
                              label="Yes"
                              onChange={handleRadioChange}
                            />
                          </Grid>

                          <Grid item xs={3} sx={{ display: "flex" }}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  style={{
                                    transform: "scale(0.7)",
                                  }}
                                  checked={spouse}
                                  disabled={isNo}
                                  onChange={(e) => {
                                    setSpouse(!spouse);
                                    handleCheckBoxMsg(e);
                                  }}
                                  inputProps={{ "aria-label": "controlled" }}
                                  value="1"
                                />
                              }
                              label="Spouse"
                            />

                            <FormControlLabel
                              control={
                                <Checkbox
                                  style={{
                                    transform: "scale(0.7)",
                                  }}
                                  checked={children}
                                  disabled={isNo}
                                  onChange={(e) => {
                                    setChildren(!children);
                                    handleCheckBoxMsg(e);
                                  }}
                                  inputProps={{ "aria-label": "controlled" }}
                                  value="2"
                                />
                              }
                              label="Children"
                            />
                            {(Error: any) => {
                              Error.dependentEligiblity && (
                                <p>{Error.dependentEligiblity}</p>
                              );
                            }}
                          </Grid>
                        </Grid>
                        <div style={{color: "#d32f2f", fontSize: "0.75rem", marginLeft: "14px"}}>
                          {isOptionErr ? "Select the option" : ""}
                        </div>
                        <FormControlLabel
                          value="0"
                          control={<Radio />}
                          label="No"
                          onChange={handleRadioChange}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            )}
            <Grid item xs={12} mt={2}>
              <Typography className="health-label-styling ">
                Does the employer offer MEC M/N Coverage Health Plan?
              </Typography>
            </Grid>
            <Grid item xs={12} className="">
              <Grid item xs={4} mt={2}>
                <TextField
                  InputProps={{
                    style: { borderRadius: 0 },
                  }}
                  id="outlined-select-currency"
                  select
                  label="MEC MC Coverage"
                  value={formik.values.mecMcCoverage}
                  onChange={formik.handleChange}
                  name="mecMcCoverage"
                  error={
                    formik.touched.mecMcCoverage &&
                    Boolean(formik.errors.mecMcCoverage)
                  }
                  helperText={
                    formik.touched.mecMcCoverage && formik.errors.mecMcCoverage
                  }
                  fullWidth
                >
                  <MenuItem value="">
                  <div>Please Select</div>
                  </MenuItem>
                  {enrollment.map((option: any) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              {empState === "14" && (
                <Grid>
                  <Grid item xs={6} mt={2}>
                    <Typography className="health-label-styling ">
                      Employer Signature
                    </Typography>
                  </Grid>
                  <Grid item xs={4} mt={2}>
                    <TextField
                      InputProps={{
                        style: { borderRadius: 0 },
                      }}
                      id="employerSignature"
                      label="Employer Signature"
                      name="employerSignature"
                      value={formik.values.employerSignature}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.employerSignature &&
                        Boolean(formik.errors.employerSignature)
                      }
                      helperText={
                        formik.touched.employerSignature &&
                        formik.errors.employerSignature
                      }
                      fullWidth
                    />
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>

          <Grid
            container
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              margin: "10px 0px",
            }}
          >
            <Button
              variant="contained"
              className="save-btn-role"
              sx={{ margin: "3px 5px" }}
              type="submit"
            >
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default ACA_Application_HealthPlan;
