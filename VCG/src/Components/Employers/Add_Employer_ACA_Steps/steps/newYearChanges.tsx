import { Button, FormGroup, Grid, MenuItem, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { INewyearplanForm } from "../../../../interfaces/acaNewyearPlanType";
import { newYearPlanDetails } from "../../../../reducers/employersReducer/newYearPlanReducer";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { fetchEmpNewYearPlanRequest } from "../../../../actions/employersActions/newYearPlanActions";
import { fetchGetEmployerRequest } from "../../../../actions/employersActions/getEmployerActions";
import moment from "moment";
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

const Add_Employer_ACA_NewYearChanges = ({ employerId }: any): JSX.Element => {
  const [enrollEmp, setEnrollEmp] = React.useState(false);
  const [coverage, setCoverage] = React.useState(false);
  const [change, setChange] = React.useState(false);
  const [employer, setEmployer] = React.useState(false);
  const [offer, setOffer] = React.useState(false);
  const [isOption1Err, setOption1Err] = React.useState(false);
  const [isOption2Err, setOption2Err] = React.useState(false);
  const [question2, setQuestion2] = React.useState(false);
  const [question1, setQuestion1] = React.useState(false);
  const [noStateAvailable, setNoStateAvailable] = useState(true);
  const [newYearChangesOneEmployerOffer, setnewYearChangesOneEmployerOffer] = React.useState("");
  const [newYearChangeOneEmployeePay, setnewYearChangeOneEmployeePay] = React.useState("");
  const [newYearChangeOneEffectiveDate, setnewYearChangeOneEffectiveDate] = React.useState("");
  const [newYearChangesTwoEmployerOffer, setnewYearChangesTwoEmployerOffer] = React.useState("");
  const [newYearChangeTwoEmployeePay, setnewYearChangeTwoEmployeePay] = React.useState("");
  const [newYearChangeTwoEffectiveDate, setnewYearChangeTwoEffectiveDate] = React.useState("");
  const params = useParams();
  const dispatch = useDispatch();

  const getEmployerById = () => {
    let id: any = params.employerId;
    dispatch(fetchGetEmployerRequest({ id }));
  };
  const handleCoverageChange = (e: any) => {
    let valStatus = e.target.checked;
    if (e.target.checked == true) {
      setCoverage(true);
      setEnrollEmp(false);
      formik.setFieldValue("newYearChangesOneEmployerOffer", 1);
      setOption1Err(false);
    } else {
      setCoverage(false);
    }
  };

  const handleEnrollEmpChange = (e: any) => {
    let valStatus = e.target.checked;
    if (e.target.checked == true) {
      setEnrollEmp(true);
      setCoverage(false);
      formik.setFieldValue("newYearChangesOneEmployerOffer", 2);
      setOption1Err(false);
    } else {
      setEnrollEmp(false);
    }
  };

  const handleNoChange = (e: any) => {
    let valStatus = e.target.checked;
    if (e.target.checked == true) {
      setChange(true);
      setEmployer(false);
      setOption2Err(false);
      formik.setFieldValue("newYearChangesTwoEmployerOffer", 0);
    } else {
      setChange(false);
    }
  };
  const handleOfferChange = (e: any) => {
    let valStatus = e.target.checked;
    if (e.target.checked == true) {
      setOffer(true);
      setChange(false);
      setEmployer(false);
      setOption2Err(false);
      formik.setFieldValue("newYearChangesTwoEmployerOffer", 2);
    } else {
      setOffer(false);
      formik.setFieldValue("newYearChangesTwoEmployerOffer", 0);
    }
  };
  const handleEmployerChange = (e: any) => {
    let valStatus = e.target.checked;
    if (e.target.checked == true) {
      setEmployer(true);
      setOffer(false);
      setChange(false);
      setOption2Err(false);
      formik.setFieldValue("newYearChangesTwoEmployerOffer", 1);
    } else {
      setEmployer(false);
      formik.setFieldValue("newYearChangesTwoEmployerOffer", 0);
    }
  };

  const validationSchema = yup.object().shape({
    newYearChaneTwoOften: offer
      ? yup
        .number()
        .test('newYearChaneTwoOften', 'Please select the option',
          (val) => {
            if (val == -1) {
              return false;
            } else {
              return true;
            }
          })
      : yup.number(),

    newYearChaneOneOften: enrollEmp
      ? yup
        .number()
        .test('newYearChaneOneOften', 'Please select the option',
          (val) => {
            if (val == -1) {
              return false;
            } else {
              return true;
            }
          })
      : yup.number(),
    newYearChangeTwoEmployeePay: offer
      ? yup
        .number()
        .required("This filed Should not be empty")
      : yup.number(),
    newYearChangeTwoEffectiveDate: offer
      ? yup.string().required("This filed Should not be empty")
      : yup.string(),
    newYearChangeOneEmployeePay: enrollEmp
      ? yup
        .number()
        .required("This filed Should not be empty")
      : yup.number(),
    newYearChangeOneEffectiveDate: enrollEmp
      ? yup.string().required("This filed Should not be empty")
      : yup.string(),
  });
  const [isSubmitted, setSubmitted] = useState(false);

  const [initialValues, setIntialValues] = useState<INewyearplanForm>({

    newYearChangesOneEmployerOffer: 0,
    newYearChangeOneEmployeePay: "",
    newYearChaneOneOften: -1,
    newYearChangeOneEffectiveDate: "",

    newYearChangesTwoEmployerOffer: 0,
    newYearChangeTwoEmployeePay: "",
    newYearChaneTwoOften: -1,
    newYearChangeTwoEffectiveDate: "",
  })
  const getEmployerRes = useSelector(newYearPlanDetails);

  const newyearRes: any = useSelector(newYearPlanDetails)

  useEffect(() => {

    if (newyearRes && parseInt(newyearRes['id']) > 0) {

      setnewYearChangesOneEmployerOffer(newyearRes['newYearChangesOneEmployerOffer'])
      setnewYearChangeOneEmployeePay(newyearRes['newYearChangeOneEmployeePay'])
      setnewYearChangeOneEffectiveDate(newyearRes['newYearChangeOneEffectiveDate'])
      setnewYearChangesTwoEmployerOffer(newyearRes['newYearChangesTwoEmployerOffer'])
      setnewYearChangeTwoEmployeePay(newyearRes['newYearChangeTwoEmployeePay'])
      setnewYearChangeTwoEffectiveDate(newyearRes['newYearChangeTwoEffectiveDate'])

      setIntialValues({
        newYearChangesOneEmployerOffer: newyearRes['newYearChangesOneEmployerOffer'],
        newYearChangeOneEmployeePay: newyearRes['newYearChangeOneEmployeePay'],
        newYearChaneOneOften: newyearRes['newYearChaneOneOften'],
        newYearChangeOneEffectiveDate: newyearRes['newYearChangeOneEffectiveDate'],
        newYearChangesTwoEmployerOffer: newyearRes['newYearChangesTwoEmployerOffer'],
        newYearChangeTwoEmployeePay: newyearRes['newYearChangeTwoEmployeePay'],
        newYearChaneTwoOften: newyearRes['newYearChaneTwoOften'],
        newYearChangeTwoEffectiveDate: newyearRes['newYearChangeTwoEffectiveDate'],
      });
    }
  }, [newyearRes]);
  useEffect(() => {
    let id: any = params.employerId;
    if (parseInt(id)) {

      if (getEmployerRes && parseInt(getEmployerRes['id']) > 0) {
        setnewYearChangesOneEmployerOffer(getEmployerRes['newYearChangesOneEmployerOffer'])
        setnewYearChangeOneEmployeePay(getEmployerRes['newYearChangeOneEmployeePay'])
        setnewYearChangeOneEffectiveDate(getEmployerRes['newYearChangeOneEffectiveDate'])
        setnewYearChangesTwoEmployerOffer(getEmployerRes['newYearChangesTwoEmployerOffer'])
        setnewYearChangeTwoEmployeePay(getEmployerRes['newYearChangeTwoEmployeePay'])
        setnewYearChangeTwoEffectiveDate(getEmployerRes['newYearChangeTwoEffectiveDate'])
        if (
          getEmployerRes["newYearChangesOneEmployerOffer"] == 2
        ) {
          setCoverage(false);
          setEnrollEmp(true);
        } else if (
          getEmployerRes["newYearChangesOneEmployerOffer"] == 1
        ) {
          setCoverage(true);
          setEnrollEmp(false);
        }


        if (
          parseInt(getEmployerRes["newYearChangesTwoEmployerOffer"]) == 2
        ) {
          setChange(false);
          setOffer(true);
          setEmployer(false);
        } else if (
          parseInt(getEmployerRes["newYearChangesTwoEmployerOffer"]) == 1
        ) {
          setChange(false);
          setOffer(false);
          setEmployer(true);
        }
        else if (
          parseInt(getEmployerRes["newYearChangesTwoEmployerOffer"]) == 0
        ) {
          setChange(true);
          setEmployer(false);
          setOption2Err(false);
          formik.resetForm();
          formik.setFieldValue("newYearChangesTwoEmployerOffer", 0);
        }


        setIntialValues({
          newYearChangesOneEmployerOffer:
            getEmployerRes["newYearChangesOneEmployerOffer"],
          newYearChangeOneEmployeePay:
            getEmployerRes["newYearChangeOneEmployeePay"],
          newYearChaneOneOften: getEmployerRes["newYearChaneOneOften"],
          newYearChangeOneEffectiveDate: getEmployerRes["newYearChangeOneEffectiveDate"],
          newYearChangesTwoEmployerOffer:
            getEmployerRes["newYearChangesTwoEmployerOffer"],
          newYearChangeTwoEmployeePay:
            getEmployerRes["newYearChangeTwoEmployeePay"],
          newYearChaneTwoOften: getEmployerRes["newYearChaneTwoOften"],
          newYearChangeTwoEffectiveDate: getEmployerRes["newYearChangeTwoEffectiveDate"],

        });
      }
    } else {
      setIntialValues({
        newYearChangesOneEmployerOffer: 0,
        newYearChangeOneEmployeePay: "",
        newYearChaneOneOften: -1,
        newYearChangeOneEffectiveDate: "",

        newYearChangesTwoEmployerOffer: 0,
        newYearChangeTwoEmployeePay: "",
        newYearChaneTwoOften: -1,
        newYearChangeTwoEffectiveDate: "",

      });
    }
  }, [getEmployerRes]);
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values: INewyearplanForm) => {
      if (!coverage && !enrollEmp && !change && !employer && !offer) {
        setOption1Err(true);
        setOption2Err(true);
      } else if (!coverage && !enrollEmp) {
        setOption1Err(true);
      } else if (!change && !employer && !offer) {
        setOption2Err(true);
      } else {
        let id: any = employerId;
        setSubmitted(true);
        values.newYearChangeOneEffectiveDate = moment(
          new Date(values.newYearChangeOneEffectiveDate)
        ).format("MM/DD/YYYY");
        values.newYearChangeTwoEffectiveDate = moment(
          new Date(values.newYearChangeTwoEffectiveDate)
        ).format("MM/DD/YYYY");
        const tempNewYear: any = {
          id: employerId,
          newYearChangesOneEmployerOffer: values.newYearChangesOneEmployerOffer,
          newYearChangeOneEmployeePay: values.newYearChangeOneEmployeePay,
          newYearChaneOneOften: values.newYearChaneOneOften,
          newYearChangeOneEffectiveDate: values.newYearChangeOneEffectiveDate,
          newYearChangesTwoEmployerOffer: values.newYearChangesTwoEmployerOffer,
          newYearChangeTwoEmployeePay: values.newYearChangeTwoEmployeePay,
          newYearChaneTwoOften: values.newYearChaneTwoOften,
          newYearChangeTwoEffectiveDate: values.newYearChangeTwoEffectiveDate,

        };

        dispatch(fetchEmpNewYearPlanRequest(tempNewYear));
        toast.success(`NewYearPlan Updated Successfully`);
        setnewYearChangesOneEmployerOffer(values.newYearChangesOneEmployerOffer)
        setnewYearChangeOneEmployeePay(values.newYearChangeOneEmployeePay)
        setnewYearChangeOneEffectiveDate(values.newYearChangeOneEffectiveDate)
        setnewYearChangesTwoEmployerOffer(values.newYearChangesTwoEmployerOffer)
        setnewYearChangeTwoEmployeePay(values.newYearChangeTwoEmployeePay)
        setnewYearChangeTwoEffectiveDate(values.newYearChangeTwoEffectiveDate)
        setIntialValues({
          newYearChangesOneEmployerOffer: newyearRes['newYearChangesOneEmployerOffer'],
          newYearChangeOneEmployeePay: newyearRes['newYearChangeOneEmployeePay'],
          newYearChaneOneOften: newyearRes['newYearChaneOneOften'],
          newYearChangeOneEffectiveDate: newyearRes['newYearChangeOneEffectiveDate'],
          newYearChangesTwoEmployerOffer: newyearRes['newYearChangesTwoEmployerOffer'],
          newYearChangeTwoEmployeePay: newyearRes['newYearChangeTwoEmployeePay'],
          newYearChaneTwoOften: newyearRes['newYearChaneTwoOften'],
          newYearChangeTwoEffectiveDate: newyearRes['newYearChangeTwoEffectiveDate'],
        });

      }
    },
  });


  const newDate = new Date();
  const currentDate = moment(new Date()).format("YYYY-MM-DD");
  return (
    <>
      <form onSubmit={formik.handleSubmit}>

        <Grid container sx={{}}>
          <Grid item xs={12}>
            <Typography className="health-plan-header-styling">
              New Year Plan
            </Typography>
          </Grid>

          <Grid item xs={12} className="health-item-styling">

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
                    name="newYearChangesOneEmployerOffer"
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
                      name="newYearChangesOneEmployerOffer"
                      value="2"
                    />
                    <div style={{ color: "#d32f2f", fontSize: "0.75rem", marginLeft: "14px" }}>
                      {isOption1Err ? "Select the option" : ""}
                    </div>
                  </FormGroup>
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
                            InputProps={{

                              startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                            id="newYearChangeOneEmployeePay"
                            variant="outlined"
                            fullWidth
                            label="$ Please Enter Amount"
                            value={formik.values.newYearChangeOneEmployeePay}
                            onChange={formik.handleChange}
                            name="newYearChangeOneEmployeePay"
                            error={
                              formik.touched.newYearChangeOneEmployeePay &&
                              Boolean(formik.errors.newYearChangeOneEmployeePay)
                            }
                            helperText={
                              formik.touched.newYearChangeOneEmployeePay &&
                              formik.errors.newYearChangeOneEmployeePay
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
                            value={formik.values.newYearChaneOneOften}
                            onChange={formik.handleChange}
                            name="newYearChaneOneOften"
                            fullWidth
                            error={
                              formik.touched.newYearChaneOneOften &&
                              Boolean(formik.errors.newYearChaneOneOften)
                            }
                            helperText={
                              formik.touched.newYearChaneOneOften &&
                              formik.errors.newYearChaneOneOften
                            }
                            sx={{ color: "black" }}
                          >

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
                            name="newYearChangeOneEffectiveDate"
                            fullWidth
                            value={
                              formik.values.newYearChangeOneEffectiveDate
                                ? moment(
                                  formik.values.newYearChangeOneEffectiveDate
                                ).format("YYYY-MM-DD")
                                : ""
                            }
                            onChange={formik.handleChange}
                            error={
                              formik.touched.newYearChangeOneEffectiveDate &&
                              Boolean(formik.errors.newYearChangeOneEffectiveDate)
                            }
                            helperText={
                              formik.touched.newYearChangeOneEffectiveDate &&
                              formik.errors.newYearChangeOneEffectiveDate
                            }
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>


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
                    name="newYearChangesTwoEmployerOffer"
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
                    name="newYearChangesTwoEmployerOffer"
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
                      name="newYearChangesTwoEmployerOffer"
                      value="2"

                    />
                    <div style={{ color: "#d32f2f", fontSize: "0.75rem", marginLeft: "14px" }}>
                      {isOption2Err ? "Select the option" : ""}
                    </div>
                  </FormGroup>

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
                            InputProps={{

                              startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                            id="outlined-basic"
                            variant="outlined"
                            label="$ Please Enter Amount"
                            fullWidth
                            disabled={change ? true : false}
                            value={formik.values.newYearChangeTwoEmployeePay}
                            onChange={formik.handleChange}
                            name="newYearChangeTwoEmployeePay"
                            error={
                              formik.touched.newYearChangeTwoEmployeePay &&
                              Boolean(formik.errors.newYearChangeTwoEmployeePay)
                            }
                            helperText={
                              formik.touched.newYearChangeTwoEmployeePay &&
                              formik.errors.newYearChangeTwoEmployeePay
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
                            value={formik.values.newYearChaneTwoOften}
                            onChange={formik.handleChange}
                            name="newYearChaneTwoOften"
                            fullWidth
                            error={
                              formik.touched.newYearChaneTwoOften &&
                              Boolean(formik.errors.newYearChaneTwoOften)
                            }
                            helperText={
                              formik.touched.newYearChaneTwoOften &&
                              formik.errors.newYearChaneTwoOften
                            }
                          >

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
                            name="newYearChangeTwoEffectiveDate"
                            fullWidth
                            value={
                              formik.values.newYearChangeTwoEffectiveDate
                                ? moment(
                                  formik.values.newYearChangeTwoEffectiveDate
                                ).format("YYYY-MM-DD")
                                : ""
                            }
                            onChange={formik.handleChange}
                            error={
                              formik.touched.newYearChangeTwoEffectiveDate &&
                              Boolean(formik.errors.newYearChangeTwoEffectiveDate)
                            }
                            helperText={
                              formik.touched.newYearChangeTwoEffectiveDate &&
                              formik.errors.newYearChangeTwoEffectiveDate
                            }
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                  )}
                </Grid>
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

export default Add_Employer_ACA_NewYearChanges;
