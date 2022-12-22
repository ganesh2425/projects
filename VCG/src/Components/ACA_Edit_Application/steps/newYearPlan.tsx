import {
  Button,
  Grid,
  InputAdornment,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetACAEventRequest } from "../../../actions/acaActions/getACAEventActions";
import { getACAEventDetails } from "../../../reducers/acaReducer/getACAEventReducer";
import { FormGroup } from "@material-ui/core";
import { NewYearPlan } from "../../../interfaces/types";
import { useFormik } from "formik";
import { fetchNewYearPlanRequest } from "../../../actions/acaActions/newYearPlanActions";
import { getNewYearPlan } from "../../../reducers/acaReducer/acaNewYearPlanReducer";
import * as yup from "yup";
import { toast } from "react-toastify";
import moment from "moment";

const paymentPlan = [
  { value: "0", label: "Weekly" },
  { value: "1", label: "Every Two Weeks" },
  { value: "2", label: "Twice a Month" },
  { value: "3", label: "Once a Month" },
  { value: "4", label: "Quarterly" },
  { value: "5", label: "Yearly" },
];

const ACA_Application_NewYearPlan = ({ acaEventId }: any): JSX.Element => {
  const [enrollEmp, setEnrollEmp] = React.useState(false);
  const [coverage, setCoverage] = React.useState(false);
  const [change, setChange] = React.useState(false);
  const [employer, setEmployer] = React.useState(false);
  const [offer, setOffer] = React.useState(false);
  const [isOptionErr, setOptionErr] = React.useState(false);

  const handleCoverageChange = (e: any) => {
    if (e.target.checked === true) {
      setCoverage(true);
      setEnrollEmp(false);
      setOptionErr(false)
      formik.resetForm();
      formik.setFieldValue("plan1EmployerOfferCoverage", 1);
    } else {
      setCoverage(false);
      formik.setFieldValue("plan1EmployerOfferCoverage", 0);
      setOptionErr(true)
    }
  };

  const handleEnrollEmpChange = (e: any) => {
    if (e.target.checked === true) {
      setEnrollEmp(true);
      setCoverage(false);
      setOptionErr(false)
      formik.setFieldValue("plan1EmployerOfferCoverage", 2);
    } else {
      setEnrollEmp(false);
      setOptionErr(true)
      formik.setFieldValue("plan1EmployerOfferCoverage", 0);
    }
  };

  const handleNoChange = (e: any) => {
    if (e.target.checked === true) {
      setChange(true);
      setOffer(false);
      setEmployer(false);
      setOptionErr(false)
      formik.resetForm();
      formik.setFieldValue("plan2EmployerOfferCoverage", 0);
    } else {
      setChange(false);
      setOptionErr(true)
      formik.setFieldValue("plan2EmployerOfferCoverage", 1);
    }
  };
  
  const handleOfferChange = (e: any) => {
    if (e.target.checked === true) {
      setOffer(true);
      setChange(false);
      setEmployer(false);
      setOptionErr(false)
      formik.setFieldValue("plan2EmployerOfferCoverage", 2);
    } else {
      setOffer(false);
      setOptionErr(true)
      formik.setFieldValue("plan2EmployerOfferCoverage", 0);
    }
  };
  
  const handleEmployerChange = (e: any) => {
    if (e.target.checked === true) {
      setEmployer(true);
      setOffer(false);
      setChange(false);
      formik.resetForm();
      setOptionErr(false)
      formik.setFieldValue("plan2EmployerOfferCoverage", 1);
    } else {
      setEmployer(false);
      setOptionErr(true)
      formik.setFieldValue("plan2EmployerOfferCoverage", 0);
    }
  };

  const [noStateAvailable, setNoStateAvailable] = useState(true);
  const params = useParams();

  const dispatch = useDispatch();
  // useEffect(() => {
  //   getACAEventId();
  // }, []);

  const getACAEventId = () => {
    let id: any = params.eventId;
    if (id > 0) {
      dispatch(fetchGetACAEventRequest({ id }));
    }
  };
  
  const validationSchema = yup.object().shape({
    plan2EmployeeHavetoPay: offer
      ? yup
          .number()
          .typeError("Amount must be a number")
          .required("This field should not be empty")
          .positive("Must be more than 0")
          .integer("Must be more than 0")
      : yup.number(),
    plan2EffectiveDate: offer
      ? yup.string().required("This field should not be empty")
      : yup.string(),
    plan2HowOften: offer
      ? yup.string().required("This field should not be empty")
      : yup.string(),
    plan1EmployeeHavetoPay: enrollEmp
      ? yup
          .number()
          .typeError("Amount must be a number")
          .required("This field should not be empty")
          .positive("Must be more than 0")
          .integer("Must be more than 0")
      : yup.number(),
    plan1EffectiveDate: enrollEmp
      ? yup.string().required("This field should not be empty")
      : yup.string(),
    plan1HowOften: enrollEmp
      ? yup.string().required("This filed should not be empty")
      : yup.string(),
  });

  const newYearRes: any = useSelector(getNewYearPlan);

  useEffect(() => {
    if (newYearRes && newYearRes.isSuccess === true) {
      toast.success(`New Year Plan Details Edited Successfully`);
      getACAEventId();
      newYearRes.isSuccess = false;
    }
  }, [newYearRes]);

  const getACAEventRes: any = useSelector(getACAEventDetails);
  const [initialValues, setInitialValues] = useState<NewYearPlan>({
    plan1EmployerOfferCoverage: 0,
    plan1EmployeeHavetoPay: 0,
    plan1HowOften: 0,
    plan1EffectiveDate: "",
    plan2EmployerOfferCoverage: 0,
    plan2EmployeeHavetoPay: 0,
    plan2HowOften: 0,
    plan2EffectiveDate: "",
    id: 0,
  });

  useEffect(() => {
    let id: any = params.eventId;
    if (parseInt(id)) {
      if (getACAEventRes && getACAEventRes.healthPlan != null) {
        if (
          getACAEventRes.healthPlan["plan1EmployerOfferCoverage"] &&
          getACAEventRes.healthPlan["plan1EmployerOfferCoverage"] === 2
        ) {
          setCoverage(false);
          setEnrollEmp(true);
        } else if (
          getACAEventRes.healthPlan["plan1EmployerOfferCoverage"] &&
          getACAEventRes.healthPlan["plan1EmployerOfferCoverage"] === 1
        ) {
          setCoverage(true);
          setEnrollEmp(false);
        }

        if (
          getACAEventRes.healthPlan["plan2EmployerOfferCoverage"] &&
          getACAEventRes.healthPlan["plan2EmployerOfferCoverage"] === 2
        ) {
          setChange(false);
          setOffer(true);
          setEmployer(false);
        } else if (
          getACAEventRes.healthPlan["plan2EmployerOfferCoverage"] &&
          getACAEventRes.healthPlan["plan2EmployerOfferCoverage"] === 1
        ) {
          setChange(false);
          setOffer(false);
          setEmployer(true);
        } else if (
          getACAEventRes.healthPlan["plan2EmployerOfferCoverage"] === 0
        ) {
          setChange(true);
          setOffer(false);
          setEmployer(false);
        }

        setInitialValues({
          plan1EmployerOfferCoverage:
            getACAEventRes.healthPlan["plan1EmployerOfferCoverage"],
          plan1EmployeeHavetoPay:
            getACAEventRes.healthPlan["plan1EmployeeHavetoPay"],
          plan1HowOften: getACAEventRes.healthPlan["plan1HowOften"],
          plan1EffectiveDate: getACAEventRes.healthPlan["plan1EffectiveDate"],
          plan2EmployerOfferCoverage:
            getACAEventRes.healthPlan["plan2EmployerOfferCoverage"],
          plan2EmployeeHavetoPay:
            getACAEventRes.healthPlan["plan2EmployeeHavetoPay"],
          plan2HowOften: getACAEventRes.healthPlan["plan2HowOften"],
          plan2EffectiveDate: getACAEventRes.healthPlan["plan2EffectiveDate"],
          id: getACAEventId["id"],
        });
      }
    } else {
      setInitialValues({
        plan1EmployerOfferCoverage: 0,
        plan1EmployeeHavetoPay: 0,
        plan1HowOften: 0,
        plan1EffectiveDate: "",
        plan2EmployerOfferCoverage: 0,
        plan2EmployeeHavetoPay: 0,
        plan2HowOften: 0,
        plan2EffectiveDate: "",
        id: id,
      });
    }
  }, [getACAEventRes]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values: NewYearPlan) => {
      let id: any = params.eventId;
      if (question1 && (enrollEmp || coverage)) {
        const tempNewYear: any = {
          plan1EmployerOfferCoverage: values.plan1EmployerOfferCoverage,
          plan1EmployeeHavetoPay: values.plan1EmployeeHavetoPay,
          plan1HowOften: values.plan1HowOften,
          plan1EffectiveDate: moment(
             new Date(values.plan1EffectiveDate)
             ).format("MM/DD/YYYY"),
          id: id,
         };
         dispatch(fetchNewYearPlanRequest(tempNewYear));
        } else if (question2 && (employer || offer)) {
          const temp1:any = {
            plan2EmployerOfferCoverage: values.plan2EmployerOfferCoverage,
            plan2EmployeeHavetoPay: values.plan2EmployeeHavetoPay,
            plan2HowOften: values.plan2HowOften,
            plan2EffectiveDate: moment(
               new Date(values.plan2EffectiveDate)
               ).format("MM/DD/YYYY"),
            id: id,
          }
          dispatch(fetchNewYearPlanRequest(temp1));
        } else {
            setOptionErr(true);
        }
    },
  });

  const [question1, setQuestion1] = useState(false);
  const data: any = getACAEventRes;
  const updateQues1: any = data.newYearChangesOneStates;
  useEffect(() => {
    const selectedEmp: any = updateQues1.filter(
      (index) => index === data.stateCode
    );
    if (selectedEmp.length > 0) {
      setQuestion1(true);
      setNoStateAvailable(false);
    }
  }, [getACAEventRes]);

  const [question2, setQuestion2] = useState(false);
  const updateQues2: any = data.newYearChangesTwoStates;
  useEffect(() => {
    const selected: any = updateQues2.filter(
      (index) => index === data.stateCode
    );
    if (selected.length > 0) {
      setQuestion2(true);
      setNoStateAvailable(false);
    }
  }, [getACAEventRes]);

  const currentDate = moment(new Date()).format("YYYY-MM-DD");
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        {!noStateAvailable && (
          <Grid container sx={{}}>
            <Grid item xs={12}>
              <Typography className="health-plan-header-styling">
                New Year Plan
              </Typography>
            </Grid>

            <Grid item xs={12} className="health-item-styling">
              {question1 && (
                <Grid>
                  <Typography className="health-label-styling ">
                    What change will employer make for new plan year (if known)?
                  </Typography>
                  <Grid item xs={12} sx={{ display: "flex" }}>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Employer will not offer coverage"
                        onChange={handleCoverageChange}
                        checked={coverage}
                        name="plan1EmployerOfferCoverage"
                        value="1"
                      />
                    </FormGroup>
                  </Grid>

                  <Grid item xs={12} sx={{ display: "flex" }}>
                    <Grid item xs={12}>
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox />}
                          label="Employer will start offering coverage"
                          onChange={handleEnrollEmpChange}
                          checked={enrollEmp}
                          name="plan1EmployerOfferCoverage"
                          value="2"
                        />
                      </FormGroup>
                      <div style={{color: "#d32f2f", fontSize: "0.75rem", marginLeft: "14px"}}>
                          {isOptionErr ? "Select the option" : ""}
                        </div>
                    </Grid>

                    <Grid item xs={12} md={10}>
                      {enrollEmp && (
                        <Grid container xs={12} spacing={2}>
                          <Grid item xs={12} sx={{ display: "flex" }}>
                            <FormControl fullWidth>
                              <Typography className="label-styling ">
                                a. How much would the employee have to pay?
                              </Typography>
                              <TextField
                               type="number"
                               InputProps={{
                                inputProps: {
                                    min: "0", max: "5000"
                                },
                                style: { height: 40, borderRadius: 0 },
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                                id="plan1EmployeeHavetoPay"
                                variant="outlined"
                                fullWidth
                                value={formik.values.plan1EmployeeHavetoPay}
                                onChange={formik.handleChange}
                                name="plan1EmployeeHavetoPay"
                                error={
                                  formik.touched.plan1EmployeeHavetoPay &&
                                  Boolean(formik.errors.plan1EmployeeHavetoPay)
                                }
                                helperText={
                                  formik.touched.plan1EmployeeHavetoPay &&
                                  formik.errors.plan1EmployeeHavetoPay
                                }
                              />
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                              <Typography className="label-styling ">
                                b. How often?
                              </Typography>
                              <TextField
                                InputProps={{
                                  style: { borderRadius: 0 },
                                }}
                                id="outlined-select-currency"
                                select
                                label="How often?"
                                value={formik.values.plan1HowOften}
                                onChange={formik.handleChange}
                                name="plan1HowOften"
                                fullWidth
                                error={
                                  formik.touched.plan1HowOften &&
                                  Boolean(formik.errors.plan1HowOften)
                                }
                                helperText={
                                  formik.touched.plan1HowOften &&
                                  formik.errors.plan1HowOften
                                }
                                sx={{ color: "black" }}
                              >
                                <MenuItem value="">
                                <div>Please Select</div>
                                </MenuItem>
                                {paymentPlan.map((option: any) => (
                                  <MenuItem
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                              <Typography className="label-styling ">
                                c. Effective date of Change?
                              </Typography>

                              <TextField
                                id="outlined-basic"
                                inputProps={{ max: currentDate }}
                                variant="outlined"
                                type="date"
                                name="plan1EffectiveDate"
                                fullWidth
                                value={
                                  formik.values.plan1EffectiveDate
                                    ? moment(
                                        formik.values.plan1EffectiveDate
                                      ).format("YYYY-MM-DD")
                                    : ""
                                }
                                onChange={formik.handleChange}
                                error={
                                  formik.touched.plan1EffectiveDate &&
                                  Boolean(formik.errors.plan1EffectiveDate)
                                }
                                helperText={
                                  formik.touched.plan1EffectiveDate &&
                                  formik.errors.plan1EffectiveDate
                                }
                              />
                            </FormControl>
                          </Grid>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              )}
              {question2 && (
                <Grid>
                  <Typography className="health-label-styling ">
                    What change will employer make for new plan year (if known)?
                  </Typography>
                  <Grid item xs={12} sx={{ display: "flex" }}>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox />}
                        label="No Change"
                        checked={change}
                        onChange={handleNoChange}
                        name="plan2EmployerOfferCoverage"
                        value="0"
                      />
                    </FormGroup>
                  </Grid>
                  <Grid item xs={12} sx={{ display: "flex" }}>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Employer will not offer coverage"
                        checked={employer}
                        onChange={handleEmployerChange}
                        name="plan2EmployerOfferCoverage"
                        value="1"
                      />
                    </FormGroup>
                  </Grid>
                  <Grid item xs={12} sx={{ display: "flex" }}>
                    <Grid item xs={12}>
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox />}
                          label="Employer will start offering coverage"
                          onChange={handleOfferChange}
                          checked={offer}
                          name="plan2EmployerOfferCoverage"
                          value="2"
                        />
                      </FormGroup>
                      <div style={{color: "#d32f2f", fontSize: "0.75rem", marginLeft: "14px"}}>
                          {isOptionErr ? "Select the option" : ""}
                        </div>
                    </Grid>

                    <Grid item xs={12} md={10}>
                      {(offer || change) && (
                        <Grid container xs={12} spacing={2}>
                          <Grid item xs={12}>
                            <FormControl fullWidth>
                              <Typography className="label-styling ">
                                a. How much would the employee have to pay?
                              </Typography>
                              <TextField
                               type="number"
                               InputProps={{
                                inputProps: {
                                    min: "0", max: "5000"
                                },
                                style: { height: 40, borderRadius: 0 },
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                               }}
                                id="outlined-basic"
                                variant="outlined"
                                fullWidth
                                disabled={change ? true : false}
                                value={formik.values.plan2EmployeeHavetoPay}
                                onChange={formik.handleChange}
                                name="plan2EmployeeHavetoPay"
                                error={
                                  formik.touched.plan2EmployeeHavetoPay &&
                                  Boolean(formik.errors.plan2EmployeeHavetoPay)
                                }
                                helperText={
                                  formik.touched.plan2EmployeeHavetoPay &&
                                  formik.errors.plan2EmployeeHavetoPay
                                }
                              />
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                              <Typography className="label-styling ">
                                b. How often?
                              </Typography>
                              <TextField
                                InputProps={{
                                  style: { borderRadius: 0 },
                                }}
                                id="outlined-select-currency"
                                select
                                label="How often?"
                                disabled={change ? true : false}
                                value={formik.values.plan2HowOften}
                                onChange={formik.handleChange}
                                name="plan2HowOften"
                                fullWidth
                                error={
                                  formik.touched.plan2HowOften &&
                                  Boolean(formik.errors.plan2HowOften)
                                }
                                helperText={
                                  formik.touched.plan2HowOften &&
                                  formik.errors.plan2HowOften
                                }
                              >
                                <MenuItem value="">
                                <div>Please Select</div>
                                </MenuItem>
                                {paymentPlan.map((option: any) => (
                                  <MenuItem
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                              <Typography className="label-styling ">
                                c. Effective date of Change?
                              </Typography>
                              <TextField
                                id="outlined-basic"
                                inputProps={{ max: currentDate }}
                                variant="outlined"
                                type="date"
                                disabled={change ? true : false}
                                name="plan2EffectiveDate"
                                fullWidth
                                value={
                                  formik.values.plan2EffectiveDate
                                    ? moment(
                                        formik.values.plan2EffectiveDate
                                      ).format("YYYY-MM-DD")
                                    : ""
                                }
                                onChange={formik.handleChange}
                                error={
                                  formik.touched.plan2EffectiveDate &&
                                  Boolean(formik.errors.plan2EffectiveDate)
                                }
                                helperText={
                                  formik.touched.plan2EffectiveDate &&
                                  formik.errors.plan2EffectiveDate
                                }
                              />
                            </FormControl>
                          </Grid>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              )}
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
        )}

        {noStateAvailable
          ? "New Year Plan Changes not applicable for current state"
          : ""}
      </form>
    </>
  );
};

export default ACA_Application_NewYearPlan;
