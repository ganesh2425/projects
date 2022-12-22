import { Button, Grid, MenuItem, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import "../style.css";
import { getEmployerDetails } from "../../../../reducers/employersReducer/getEmployerReducer";
import { useDispatch, useSelector } from "react-redux";
import { IHealthplanForm } from "../../../../interfaces/acaHealthplanType";
import { healthplanDetails } from '../../../../reducers/employersReducer/healthPlanReducer';
import { useParams } from "react-router-dom";
import { ALPHABETS, ZIPCODE } from "../../../../constants/actionTypes";
import { Form, Formik, FormikProps } from "formik";
import { toast } from "react-toastify";
import * as yup from "yup";
import { fetchEmpHealthPlanRequest } from "../../../../actions/employersActions/healthPlanActions";
import { fetchGetEmployerRequest } from "../../../../actions/employersActions/getEmployerActions";
const paymentPlan = [
  { value: 0, label: "Weekly" },
  { value: 1, label: "Every Two Weeks" },
  { value: 2, label: "Twice a Month" },
  { value: 3, label: "Once a Month" },
  { value: 4, label: "Quarterly" },
  { value: 5, label: "Yearly" },
];

const Add_Employer_ACA_HealthPlan = ({ employerId }: any): JSX.Element => {
  const [formData, setFormData] = React.useState({
    mec: true,
    healthPlanCover: 0,
    employerSignature: ''
  });
  const params = useParams();
  const dispatch = useDispatch();
  const [spouseChecked, setSpouseChecked] = React.useState(false);
  const [dependentsChecked, setDependentsChecked] = React.useState(false);
  const getEmployerRes: any = useSelector(getEmployerDetails);
  const [isSubmitted, setSubmitted] = useState(false);
  const healthRes: any = useSelector(healthplanDetails);
  const [option1, setOption1] = React.useState(false);
  const [option2, setOption2] = React.useState(false);
  const [healthplan, setHealthplan] = React.useState("");
  const [checked, setChecked] = React.useState(false);
  const [no, setNo] = React.useState(false);
  const [isOptionErr, setOptionErr] = React.useState(false);
  const [employerSignature, setEmployerSignature] = React.useState("");
  const getEmployerById = () => {
    let id: any = params.employerId;
    dispatch(fetchGetEmployerRequest({ id }));
  };
  const [initialValues, setIntialValues] = useState<IHealthplanForm>({
    mec: false,
    healthPlanCover: 0,
    employerSignature: ''
  });
  const validationSchema = yup.object({
    employerSignature: yup.string()
      .required("EmployerSignature  is required ")
      .matches(ALPHABETS, "Only Alphabets are allowed"),
  });

  useEffect(() => {
    if (healthRes && parseInt(healthRes['id']) > 0) {
      setEmployerSignature(healthRes['employerSignature']);
      setNo(healthRes['mec'],)
      setHealthplan(healthRes['healthPlanCover']);

      setIntialValues({
        mec: healthRes['mec'],
        healthPlanCover: healthRes['healthPlanCover'],
        employerSignature: healthRes['employerSignature']
      });

      if (healthRes['healthPlanCover'] == "1") {
        setChecked(true);
        setSpouseChecked(true);
        setOption1(true);
      } else if (healthRes['healthPlanCover'] == "2") {
        setChecked(true);
        setSpouseChecked(true);
        setOption2(true);
      } else if (healthRes['healthPlanCover'] == "3") {
        setChecked(true);
        setSpouseChecked(true);
        setOption1(true);
        setOption2(true);
      } else {
        setChecked(false);
        setSpouseChecked(false);
        setOption1(false);
        setOption2(false);
      }
    } else {
      setIntialValues({
        mec: false,
        healthPlanCover: 0,
        employerSignature: ''
      });
    }
  }, [healthRes]);

  const handleDependentChange = (event: any) => {
    setDependentsChecked(true);
  };

  const handleMecChange1 = (event: any) => {
    if (event.target.value == 1) {
      setNo(true);
    } else {
      setNo(false);
    }
  }

  const handleMecChange2 = (event: any) => {
    setNo(false);
  }

  const handleRadioChange = (event: any) => {
    if (event.target.value == 0) {
      setOption1(false);
      setOption2(false);
      setSpouseChecked(false);
      setChecked(false);
    } else if (event.target.value == 1) {
      setChecked(true);
	  if (!option1 && !option2) {
		setOptionErr(true);
	  }
    }
  };

  const handleNoChange = (event: any) => {
    if (event.target.value == 0) {
      setChecked(false);
      setSpouseChecked(false);
      setOption1(false);
      setOption2(false);
      setHealthplan("0");
      setOptionErr(false);
    }
  }

  const handleSpouseChange = (event: any) => {
    if (event.target.checked == true) {
      setSpouseChecked(true);
    } else {
      setSpouseChecked(false);
    }
  };

  const handleOption1Change = (event: any) => {
    if (event.target.checked == true) {
      if (healthplan && healthplan == "2") {
        setHealthplan("3");
      } else {
        setHealthplan("1");
      }
      setOption1(true);
      setOptionErr(false);
    } else {
	  if (option1 && !option2) {
	    setOptionErr(true);
	  }
      if (option2) {
        setHealthplan("2");
      } else {
        setHealthplan("0");
      }
      setOption1(false);
    }
  };

  const handleOption2Change = (event: any) => {
    if (event.target.checked == true) {
      if (healthplan && healthplan == "1") {
        setHealthplan("3");
      } else {
        setHealthplan("2");
      }
      setOption2(true);
      setOptionErr(false);
    } else {
	  if (!option1 && option2) {
	    setOptionErr(true);
	  }
      if (option1) {
        setHealthplan("1");
      } else {
        setHealthplan("0");
      }
      setOption2(false);
    }
  };

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values: IHealthplanForm) => {
          if (employerId > 0) {
            if (!checked || (option1 || option2)) {
              setSubmitted(true);
              toast.success(`HealthPlan Updated Successfully`);
              values.healthPlanCover = healthplan;
              values.mec = no;
              const tempUpdatehealthplan: any = {
                "id": employerId,
                "mec": values.mec,
                "healthPlanCover": values.healthPlanCover,
                "employerSignature": values.employerSignature,
              }
              if (employerId > 0) {
                dispatch(fetchEmpHealthPlanRequest(tempUpdatehealthplan))
                setEmployerSignature(values.employerSignature);
                setIntialValues({
                  mec: values.mec,
                  healthPlanCover: values.healthPlanCover,
                  employerSignature: values.employerSignature
                });
              }
            } else {
              setOptionErr(true);
            }
          }
        }}
        validationSchema={validationSchema}
        enableReinitialize
      >
        {(props: FormikProps<IHealthplanForm>) => {
          const {
            values,
            touched,
            errors,
            handleBlur,
            handleChange,
            isValid,
            dirty,
          } = props;
          return (
            <Form >
              <Grid container sx={{}}>
                <Grid item xs={12}>
                  <Typography className="health-plan-header-styling">
                    Eligiblity
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography className="health-ques-styling">
                    Does the Employer Offer MEC M/V Coverage ?
                  </Typography>
                </Grid>

                <Grid item xs={12} className="health-item-styling">
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      onChange={handleChange}
                      value="1"
                      name="mec"
                    >
                      <Grid container>
                        <Grid item xs={2.7}>
                          <FormControlLabel
                            value="1"
                            control={<Radio checked={no} />}
                            label="Yes"
                            onChange={handleMecChange1}

                          />
                        </Grid>

                      </Grid>

                      <FormControlLabel
                        control={<Radio checked={!no} />}
                        label="No"
                        value="0"
                        onChange={handleMecChange1}
                      />
                    </RadioGroup>
                  </FormControl>

                </Grid>
                <Grid item xs={12}>
                  <Typography className="health-ques-styling">
                    Who Does the  health plan cover?
                  </Typography>
                </Grid>

                <Grid item xs={12} className="health-item-styling">
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="healthPlanCover"
                      value={values.healthPlanCover}
                      onChange={handleSpouseChange}
                    >
                      <Grid container>
                        <Grid item xs={2.7}>
                          <FormControlLabel
                            value="1"
                            control={<Radio checked={checked} />}
                            label="Yes"
                            onChange={handleRadioChange}
                          />
                          {spouseChecked &&
                            <><Grid item xs={12} sx={{ display: "flex" }}>
                              <Checkbox
                                checked={option1}
                                disabled={!checked}
                                onChange={handleOption1Change}
                                inputProps={{ "aria-label": "controlled" }} />
                              <Typography sx={{ margin: "10px 0px 0px 0px" }}>
                                Spouse
                              </Typography>
                            </Grid>

                              <Grid item xs={12} sx={{ display: "flex" }}>
                                <Checkbox
                                  checked={option2}
                                  disabled={!checked}
                                  onChange={handleOption2Change}
                                  inputProps={{ "aria-label": "controlled" }} />
                                <Typography sx={{ margin: "10px 0px 0px 0px" }}>
                                  Dependents
                                </Typography>
                              </Grid>
                            </>
                          }
                        </Grid>
                      </Grid>
                      <div style={{ color: "#d32f2f", fontSize: "0.75rem", marginLeft: "14px" }}>
                        {isOptionErr ? "Select the option" : ""}
                      </div>

                      <FormControlLabel
                        value="0"
                        onChange={handleNoChange}
                        control={<Radio checked={!checked} />}
                        label="No" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Typography className="health-ques-styling">
                    Employer Signature
                  </Typography>
                </Grid>  <Grid container className="health-item-styling">
                  <Grid item xs={6} sx={{ paddingRight: "10px" }}>
                    <TextField
                      InputProps={{
                        style: { borderRadius: 0 },
                      }}
                      id="outlined-basic"
                      label="Employer Signature"
                      variant="outlined"
                      name="employerSignature"
                      fullWidth
                      value={values.employerSignature}
                      onChange={handleChange}
                      error={
                        touched.employerSignature &&
                        Boolean(errors.employerSignature)
                      }
                      helperText={
                        touched.employerSignature && errors.employerSignature
                      }
                    />
                  </Grid>
                </Grid>
                <Grid
                  item
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
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )
        }
       }
      </Formik>
    </>
  );
};

export default Add_Employer_ACA_HealthPlan;
