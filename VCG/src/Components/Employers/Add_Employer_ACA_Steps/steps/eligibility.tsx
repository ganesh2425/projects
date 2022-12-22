import { Button, Grid, MenuItem, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { fetchEmpEligibilityRequest } from "../../../../actions/employersActions/eligibilityAction";
import { IEligibilityForm } from "../../../../interfaces/acaEligibilityType";
import { eligibilityDetails } from '../../../../reducers/employersReducer/eligibilitysReducer';
import moment from "moment";
import { fetchGetEmployerRequest } from "../../../../actions/employersActions/getEmployerActions";
import * as yup from "yup";

import InputAdornment from "@mui/material/InputAdornment";

const paymentPlan = [
  { value: -1, label: "Please Select" },
  { value: 0, label: "Weekly" },
  { value: 1, label: "Every Two Weeks" },
  { value: 2, label: "Twice a Month" },
  { value: 3, label: "Once a Month" },
  { value: 4, label: "Quarterly" },
  { value: 5, label: "Yearly" },
];

const Add_Employer_ACA_EligibilityChanges = ({ employerId }: any): JSX.Element => {
  const [date, setDate] = React.useState(false);
  const params = useParams();
  const dispatch = useDispatch();
  const [isSubmitted, setSubmitted] = useState(false);
  const getEmployerById = () => {
    let id: any = params.employerId;
    dispatch(fetchGetEmployerRequest({ id }));
  };

  const [formData, setFormData] = React.useState({
    employeePremium: "",
    employeePremiumOften: -1,
    nextThreeMonths: "",
  });

  const validationSchema = yup.object({
    employeePremium: yup.string()
      .required("This field cannot be empty"),
    employeePremiumOften: yup.number()
      .test('employeePremiumOften', 'Please select the option',
        (val) => {
          if (val == -1) {
            return false;
          } else {
            return true;
          }
        }),
    nextThreeMonths: yup.string()
      .test('nextThreeMonths', 'This field cannot be empty"=',
        (val) => {
          if (date && (val == undefined || val.length == 0)) {
            return false;
          } else {
            return true;
          }
        })
  })

  const [initialValues, setIntialValues] = useState<IEligibilityForm>({
    employeePremium: "",
    employeePremiumOften: -1,
    nextThreeMonths: "",
  })

  let getEmployerRes: any = useSelector(eligibilityDetails);
  useEffect(() => {
    let id: any = params.employerId;
    if (parseInt(id) > 0) {
      if (getEmployerRes && parseInt(getEmployerRes['id']) > 0) {
        setIntialValues({
          employeePremium: getEmployerRes['employeePremium'],
          employeePremiumOften: getEmployerRes['employeePremiumOften'],
          nextThreeMonths: getEmployerRes['nextThreeMonths']
        });
        if (getEmployerRes['nextThreeMonths'] && getEmployerRes['nextThreeMonths'].length > 0) {
          setDate(true);
        }
      }
    } else {
      setIntialValues({
        employeePremium: "",
        employeePremiumOften: -1,
        nextThreeMonths: "",
      });
      setDate(true);
    }
  }, [getEmployerRes]);


  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (event: any) => {
    if (event.target.value == 1) {
      setDate(true);
    } else if (event.target.value == 0) {
      formik.values.nextThreeMonths = "";
      setDate(false);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values: IEligibilityForm) => {
      let id: any = params.eventId;
      setSubmitted(true);
      toast.success(`Eligibility Edited Successfully`);
      values.nextThreeMonths = values.nextThreeMonths
        ? moment(new Date(values.nextThreeMonths)).format(
          "MM/DD/YYYY") : "";

      const tempUpdateeligibility: any = {
        "id": employerId,
        "employeePremium": values.employeePremium,
        "employeePremiumOften": values.employeePremiumOften,
        "nextThreeMonths": values.nextThreeMonths,
      }
      dispatch(fetchEmpEligibilityRequest(tempUpdateeligibility))
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Grid container sx={{}} >
          <Grid item xs={12}>
            <Typography
              className="health-plan-header-styling"
            >
              Eligibility
            </Typography>
          </Grid>
          <Grid container className="health-item-styling">
            <Grid item xs={8} sx={{ paddingRight: "10px" }}>
              <Typography className="health-label-styling ">1.Employee's Premium?</Typography>
              <TextField

                id="outlined-basic"
                label="Employer Premium"
                variant="outlined"
                fullWidth
                type="number"
                value={formik.values.employeePremium}
                onChange={formik.handleChange}
                name="employeePremium"
                InputProps={{

                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                error={
                  formik.touched.employeePremium &&
                  Boolean(formik.errors.employeePremium)
                }
                helperText={
                  formik.touched.employeePremium && formik.errors.employeePremium
                }
              />
            </Grid>

          </Grid>
          <Grid container className="health-item-styling" >
            <Grid item xs={8} sx={{ paddingRight: "10px" }}>
              <Typography className="health-label-styling ">2.Premium Frequancy?</Typography>
              <TextField
                InputProps={{
                  style: { borderRadius: 0 },
                }}
                id="outlined-select-currency"
                select
                label="Premium Frequancy?"
                value={formik.values.employeePremiumOften}
                onChange={formik.handleChange}
                name="employeePremiumOften"
                fullWidth
                sx={{ color: "black" }}
                error={
                  formik.touched.employeePremiumOften &&
                  Boolean(formik.errors.employeePremiumOften)
                }
                helperText={
                  formik.touched.employeePremiumOften && formik.errors.employeePremiumOften
                }
              >
                {paymentPlan.map((option: any) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <Grid item xs={12} className="health-item-styling">
            <Typography className="health-label-styling "> 3.Is the employee eligible  or will they be in next three months ?</Typography>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="isEmpEligibleNext3Months"
                typeof="isEmployeeElgbleOrNext3Months"
              >
                <Grid container>
                  <Grid item xs={2.7}>
                    <FormControlLabel
                      value="1"
                      control={<Radio checked={date} />}
                      label="Yes"
                      name="nextThreeMonths"
                      onChange={handleDateChange}
                    />
                  </Grid>
                  {date &&
                    <Grid
                      item
                      xs={12}
                      sx={{ marginTop: "10px" }}
                    >
                      <Typography className="health-label-styling ">Date of change (mm-dd-yyyy)</Typography>
                      <TextField
                        InputProps={{
                          style: { borderRadius: 0 },
                        }}
                        id="outlined-basic"
                        variant="outlined"
                        fullWidth
                        onChange={formik.handleChange}
                        type="date"
                        name="nextThreeMonths"
                        value={formik.values.nextThreeMonths
                          ? moment(
                            formik.values.nextThreeMonths
                          ).format("YYYY-MM-DD")
                          : ""
                        }
                        error={
                          formik.touched.nextThreeMonths &&
                          Boolean(formik.errors.nextThreeMonths)
                        }
                        helperText={
                          formik.touched.nextThreeMonths && formik.errors.nextThreeMonths
                        }
                      />
                    </Grid>
                  }
                </Grid>
                <FormControlLabel
                  control={<Radio checked={!date} />}
                  onChange={handleDateChange}
                  value="0"
                  label="No" />
              </RadioGroup>
            </FormControl>
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
      </form>
    </>

  );
};

export default Add_Employer_ACA_EligibilityChanges;
