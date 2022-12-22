import { Button, Grid, MenuItem, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Stack from "@mui/material/Stack";
import { makeStyles } from "@mui/styles";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetACAEventRequest } from "../../../actions/acaActions/getACAEventActions";
import { getACAEventDetails } from "../../../reducers/acaReducer/getACAEventReducer";
import { getEligibilityDetails } from "../../../reducers/acaReducer/eligibilityReducer";
import { useFormik } from "formik";
import { Eligibility } from "../../../interfaces/types";
import { fetchEligibilityRequest } from "../../../actions/acaActions/eligibilityActions";
import { toast } from "react-toastify";
import { DesktopDatePicker } from "@mui/lab";
import * as yup from "yup";
import moment from "moment";

const useStyles = makeStyles({
  root: {
    "& .css-1che66z-MuiTypography-root": { fontSize: "0.875rem" },
  },
});

const ACA_Application_Eligibility = () => {
  const paymentPlan = [
    { value: "0", label: "Weekly" },
    { value: "1", label: "Every Two Weeks" },
    { value: "2", label: "Twice a Month" },
    { value: "3", label: "Once a Month" },
    { value: "4", label: "Quarterly" },
    { value: "5", label: "Yearly" },
  ];

  const classses = useStyles();
  const params = useParams();
  const [eventId, setEventId] = React.useState(0);
  const dispatch = useDispatch();
  const [empState, empSetState] = useState("");
  const [checked, setChecked] = React.useState(false);
  const [isNo, setIsNo] = React.useState<boolean>(false);
  const [eligible, setEligible] = React.useState(false);

  const handleNameChange = (event: any) => {
    if (event.target.value == 0) {
      formik.values.employeeElgbleOrNext3MonthsDate = "";
      formik.values.isEmployeeElgbleOrNext3Months = false;
      setChecked(false);
      setIsNo(true);
      setEligible(false);
    } else if (event.target.value == 1) {
      formik.values.isEmployeeElgbleOrNext3Months = true;
      setChecked(true);
      setIsNo(false);
      setEligible(true);
    }
  };
  const getACAEventId = () => {
    let id: any = params.eventId;
    dispatch(fetchGetACAEventRequest({ id }));
  };

  const validationSchema = yup.object({
    employeePremium: yup
      .number()
      .required("Employee Premium is required")
      .positive("Must be more than 0")
      .integer("Must be more than 0"),

    premiumFrequency: yup.string().required("Please select the option"),
  });

  const [initialValues, setInitialValues] = useState<Eligibility>({
    employeePremium: "",
    premiumFrequency: 0,
    isEmployeeElgbleOrNext3Months: true,
    employeeElgbleOrNext3MonthsDate: "",
    id: 0,
  });

  const getACAEventRes: any = useSelector(getACAEventDetails);
  useEffect(() => {
    empSetState(getACAEventRes["state"]);
    let id: any = params.eventId;
    if (parseInt(id) > 0) {
      if (getACAEventRes && getACAEventRes.healthPlan !== null) {
        if (
          getACAEventRes.healthPlan["isEmployeeElgbleOrNext3Months"] &&
          getACAEventRes.healthPlan["isEmployeeElgbleOrNext3Months"] == 1
        ) {
          setEligible(true);
        } else if (
          getACAEventRes.healthPlan["isEmployeeElgbleOrNext3Months"] &&
          getACAEventRes.healthPlan["isEmployeeElgbleOrNext3Months"] == 0
        ) {
          setEligible(false);
        }
        setInitialValues({
          employeePremium: getACAEventRes.healthPlan["employeePremium"],
          premiumFrequency: getACAEventRes.healthPlan["premiumFrequency"],
          isEmployeeElgbleOrNext3Months:
            getACAEventRes.healthPlan["isEmployeeElgbleOrNext3Months"],
          employeeElgbleOrNext3MonthsDate: getACAEventRes.healthPlan[
            "isEmployeeElgbleOrNext3Months"
          ]
            ? getACAEventRes.healthPlan["employeeElgbleOrNext3MonthsDate"]
            : "",
          id: getACAEventId["id"],
        });
      } else {
      }
    }
  }, [getACAEventRes]);

  const eligibilityRes: any = useSelector(getEligibilityDetails);

  useEffect(() => {
    if (eligibilityRes && eligibilityRes.isSuccess === true) {
      toast.success(`ACA Eligibility Edited Successfully`);
      getACAEventId();
      eligibilityRes.isSuccess = false;
    }
  }, [eligibilityRes]);

  const [isSubmitted, setSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values: Eligibility) => {
      let id: any = params.eventId;
      setSubmitted(true);
      values.employeeElgbleOrNext3MonthsDate =
        values.isEmployeeElgbleOrNext3Months
          ? moment(new Date(values.employeeElgbleOrNext3MonthsDate)).format(
              "MM/DD/YYYY"
            )
          : "";
      const tempHealth: any = {
        employeePremium: values.employeePremium,
        premiumFrequency: values.premiumFrequency,
        isEmployeeElgbleOrNext3Months: values.isEmployeeElgbleOrNext3Months,
        employeeElgbleOrNext3MonthsDate: values.employeeElgbleOrNext3MonthsDate,
        id: id,
      };

      dispatch(fetchEligibilityRequest(tempHealth));
    },
  });

  const newDate = new Date();
  const currentDate = moment(new Date()).format("YYYY-MM-DD");
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Grid container>
          <Grid item xs={12}>
            <Typography className="health-plan-header">Eligibility</Typography>
          </Grid>

          <Grid
            item
            xs={12}
            sx={{ padding: "20px", border: "1px solid rgba(0, 0, 0, 0.125)" }}
          >
            {(empState === "MINNESOTA" ||
              empState === "MAINE" ||
              empState === "VERMONT") && (
              <Grid>
                <Typography className="health-label-styling ">
                  Is the employee currently eligible for coverage offered by
                  this employer, or will the employee be eligible in the next 3
                  months?
                </Typography>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group-label"
                    name="isEmployeeElgbleOrNext3Months"
                    typeof="isEmployeeElgbleOrNext3Months"
                    // value={formik.values.isEmployeeElgbleOrNext3Months}
                    // onChange={formik.handleChange}
                  >
                    <Grid>
                      <FormControlLabel
                        value="1"
                        control={
                          <Radio
                            checked={
                              formik.values.isEmployeeElgbleOrNext3Months
                            }
                          />
                        }
                        label="Yes"
                        onChange={handleNameChange}
                      />
                      <FormControlLabel
                        value="0"
                        control={
                          <Radio
                            checked={
                              !formik.values.isEmployeeElgbleOrNext3Months
                            }
                          />
                        }
                        label="No"
                        onChange={handleNameChange}
                      />
                      {eligible && (
                        <Grid
                          item
                          xs={4}
                          width="46rem"
                          // sx={{ padding: "20px", width: "61rem" }}
                        >
                          <label className="label-styling">
                            If yes, what date?
                          </label>
                          <TextField
                            id="outlined-basic"
                            // label="Event date"
                            inputProps={{ max: currentDate }}
                            variant="outlined"
                            type="date"
                            name="employeeElgbleOrNext3MonthsDate"
                            fullWidth
                            value={
                              formik.values.employeeElgbleOrNext3MonthsDate
                                ? moment(
                                    formik.values
                                      .employeeElgbleOrNext3MonthsDate
                                  ).format("YYYY-MM-DD")
                                : ""
                            }
                            onChange={formik.handleChange}
                            required={
                              formik.values.isEmployeeElgbleOrNext3Months
                            }
                          />
                        </Grid>
                      )}
                    </Grid>
                  </RadioGroup>
                </FormControl>
              </Grid>
            )}

            <Typography className="health-label-styling " mt={2}>
              Employee's Premium
            </Typography>
            <Grid>
              <Grid item xs={4} mt={2}>
                <TextField
                  InputProps={{
                    style: { borderRadius: 0 },
                  }}
                  id="outlined-select-currency"
                  select
                  label="How often?"
                  value={formik.values.premiumFrequency}
                  placeholder="please enter value"
                  onChange={formik.handleChange}
                  name="premiumFrequency"
                  fullWidth
                  error={
                    formik.touched.premiumFrequency &&
                    Boolean(formik.errors.premiumFrequency)
                  }
                  helperText={
                    formik.touched.premiumFrequency &&
                    formik.errors.premiumFrequency
                  }
                  sx={{ color: "black" }}
                >
                  <MenuItem value="">
                  <div>Please Select</div>
                  </MenuItem>
                  {paymentPlan.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Typography className="health-label-styling " mt={2}>
                Premium Frequency
              </Typography>
              <Grid item xs={4} mt={3}>
                <TextField
                  InputProps={{
                    style: { borderRadius: 0 },
                  }}
                  id="outlined-select-currency"
                  label="Enter Employer Premium value"
                  value={formik.values.employeePremium}
                  onChange={formik.handleChange}
                  name="employeePremium"
                  fullWidth
                  error={
                    formik.touched.employeePremium &&
                    Boolean(formik.errors.employeePremium)
                  }
                  helperText={
                    formik.touched.employeePremium &&
                    formik.errors.employeePremium
                  }
                  sx={{ color: "black" }}
                ></TextField>
              </Grid>
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

export default ACA_Application_Eligibility;
