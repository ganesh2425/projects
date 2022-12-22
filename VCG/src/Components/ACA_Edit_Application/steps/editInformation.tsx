import { Button, Grid, MenuItem, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getACAEventDetails } from "../../../reducers/acaReducer/getACAEventReducer";
import * as yup from "yup";
import { PHONE, ZIPCODE } from "../../../constants/actionTypes";
import { IGetACAEvent } from "../../../interfaces/types";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { getEditACAInfoDetails } from "../../../reducers/acaReducer/editACAInfoReducer";
import { toast } from "react-toastify";
import { fetchEditACAInfoRequest } from "../../../actions/acaActions/editACAInfoActions";
import InputMask from "react-input-mask";

import moment from "moment";
import { getSTATESEnteredDetails } from "../../../reducers/employersReducer/statesReducer";
import { fetchSTATESRequest } from "../../../actions/employersActions/statesActions";
import { fetchGetACAEventRequest } from "../../../actions/acaActions/getACAEventActions";

const status = [
  { value: 0, label: "New" },
  { value: 1, label: "Information Required" },
  { value: 2, label: "Revisit" },
  { value: 3, label: "Completed" },
  { value: 4, label: "Cancelled" },
];
const ACA_Application_Edit_Information = ({ acaEventId }: any): JSX.Element => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "left",
    color: theme.palette.text.secondary,
    borderRadius: "0px",
    boxShadow: "none",
  }));

  const contactType = [
    { value: "Email", label: "Email" },
    { value: "Phone", label: "Phone" },
  ];
  const healthPlan = [
    { value: "Email", label: "Email" },
    { value: "FirstClassEmail", label: "FirstClassEmail" },
  ];

  const enrollment = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
  ];
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getACAEventRes = useSelector(getACAEventDetails);
  const getACAEventId = () => {
    let id: any = params.eventId;
    if (id > 0) {
      dispatch(fetchGetACAEventRequest({ id }));
    }
  };

  const editACARes: any = useSelector(getEditACAInfoDetails);
  useEffect(() => {
    if (
      editACARes &&
      editACARes.confirmationNumber &&
      editACARes.confirmationNumber !== null
    ) {
      toast.success(`ACA Edited Successfully`);
      getACAEventId();
      editACARes.confirmationNumber = null;
    }
  }, [editACARes]);

  const [initialValues, setInitialValues] = useState<IGetACAEvent>({
    acaEventId: 0,
    firstName: "",
    middleName: "",
    lastName: "",
    suffix: "",
    dob: "",
    ssn: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    email: "",
    phoneNo: "",
    dependent1: "",
    dependent2: "",
    dependent3: "",
    dependent4: "",
    preferredContactMethod: "",
    healthCoverageInfo: "",
    empOpenEnrollmentState: "",
    stateId: "",
    status: "",
    employerId: "",
    employerPhoneAndType: "",
    employerPrimaryContact: "",
    employerAddress: "",
    eventNotes: [],
    communicationRecords: [],
  });
  useEffect(() => {
    let acaEventId: any = params.eventId;
    if (parseInt(acaEventId) > 0) {
      setInitialValues({
        acaEventId: getACAEventRes["acaEventId"],
        firstName: getACAEventRes["firstName"],
        middleName: getACAEventRes["middleName"],
        lastName: getACAEventRes["lastName"],
        suffix: getACAEventRes["suffix"],
        dob: getACAEventRes["dob"],
        ssn: getACAEventRes["ssn"],
        address: getACAEventRes["address"],
        city: getACAEventRes["city"],
        state: getACAEventRes["state"],
        zip: getACAEventRes["zip"],
        email: getACAEventRes["email"],
        phoneNo: getACAEventRes["phoneNo"],
        dependent1: getACAEventRes["dependent1"],
        dependent2: getACAEventRes["dependent2"],
        dependent3: getACAEventRes["dependent3"],
        dependent4: getACAEventRes["dependent4"],
        preferredContactMethod: getACAEventRes["preferredContactMethod"],
        healthCoverageInfo: getACAEventRes["healthCoverageInfo"],
        empOpenEnrollmentState: getACAEventRes["empOpenEnrollmentState"],
        stateId: getACAEventRes["stateId"],
        status: getACAEventRes["status"],
        employerId: getACAEventRes["employerId"],
        employerPhoneAndType: getACAEventRes["employerPhoneAndType"],
        employerPrimaryContact: getACAEventRes["employerPrimaryContact"],
        employerAddress: getACAEventRes["employerAddress"],
        eventNotes: getACAEventRes["eventNotes"],
        communicationRecords: getACAEventRes["communicationRecords"],
      });
    } else {
      setInitialValues({
        acaEventId: 0,
        firstName: "",
        middleName: "",
        lastName: "",
        suffix: "",
        dob: "",
        ssn: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        email: "",
        phoneNo: "",
        dependent1: "",
        dependent2: "",
        dependent3: "",
        dependent4: "",
        preferredContactMethod: "",
        healthCoverageInfo: "",
        empOpenEnrollmentState: "",
        stateId: "",
        status: "",
        employerId: "",
        employerPhoneAndType: "",
        employerPrimaryContact: "",
        employerAddress: "",
        eventNotes: [],
        communicationRecords: [],
      });
    }
  }, [getACAEventRes]);

  const validationSchema = yup.object({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    ssn: yup
      .string()
      .min(9, " SSN must be 9 characters ")
      .required("SSN is required")
      .transform((value) => value.replace(/-|_/g, "")),
    address: yup.string().required("Street Address is required"),
    city: yup.string().required("City is required"),
    status: yup.string().required("Status is required"),
    stateId: yup.string().required("State is required"),
    zip: yup
      .string()
      .required("ZipCode is required")
      .matches(ZIPCODE, "Zip Code is not valid"),
    dob: yup.string().required("Date is required"),
    preferredContactMethod: yup
      .string()
      .required("Preferred Contact Method is required"),
    healthCoverageInfo: yup
      .string()
      .required("Health coverage information is required"),
      empOpenEnrollmentState:
         yup.string().test('empOpenEnrollmentState', 'This field cannot be empty',
        (val) => {
          if (question && (val == undefined || val.length == 0)) {
            return false;
          } else {
            return true;
          }
        })
  });

  const [isSubmitted, setSubmitted] = useState(false);
  const [state, setState] = useState();
  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values: IGetACAEvent) => {
      setSubmitted(true);

      values.dob = moment(new Date(values.dob)).format("MM/DD/YYYY");
      const tempACAForm: any = {
        firstName: values.firstName,
        middleName: values.middleName,
        lastName: values.lastName,
        suffix: values.suffix,
        dob: values.dob,
        ssn: values.ssn,
        address: values.address,
        city: values.city,
        state: values.state,
        zip: values.zip,
        email: values.email,
        phoneNo: values.phoneNo,
        dependent1: values.dependent1,
        dependent2: values.dependent2,
        dependent3: values.dependent3,
        dependent4: values.dependent4,
        preferredContactMethod: values.preferredContactMethod,
        healthCoverageInfo: values.healthCoverageInfo,
        empOpenEnrollmentState: values.empOpenEnrollmentState,
        stateId: values.stateId,
        status: values.status,
        id: values.acaEventId > 0 ? values.acaEventId : 0,
      };

      dispatch(fetchEditACAInfoRequest(tempACAForm));
    },
  });

  const newDate = new Date();
  const currentDate = moment(new Date()).format("YYYY-MM-DD");

  const statesRes: any = useSelector(getSTATESEnteredDetails);
  useEffect(() => {
    getStates();
  }, []);

  const getStates = () => {
    dispatch(fetchSTATESRequest({}));
  };
  const [states, setStates] = useState<any>([]);

  useEffect(() => {
    if (statesRes && statesRes.response) {
      setStates(statesRes.response);
    }
  }, [statesRes]);

  const [noStateAvailable, setNoStateAvailable] = useState(true);
  const [question, setQuestion] = useState(false);
  const [oneStates, setOneStates] = useState("");
  const data: any = getACAEventRes;
  const updateQues: any = data.missOpenEnrollmentStates;
  useEffect(() => {
    if (updateQues) {
      setOneStates(updateQues);
      const selectedEmp: any = updateQues.filter(
        (index) => index === data.stateCode
      );
      if (selectedEmp.length > 0) {
        setQuestion(true);
        setNoStateAvailable(false);
      }
    }
  }, []);

  const handleStateChange = (e: any) => {
    const id = e.target.id;
    const stateList: any = states.filter((index) =>
      index.stateCode.includes(updateQues)
    );

    if (stateList[0] != null && e.target.value === stateList[0].stateId) {
      setQuestion(true);
    } else {
      setQuestion(false);
    }
  };
  return (
    <React.Fragment>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              InputProps={{
                style: { borderRadius: 0 },
              }}
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              name="firstName"
              fullWidth
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              InputProps={{
                style: { borderRadius: 0 },
              }}
              id="outlined-basic"
              label="Middle Name"
              variant="outlined"
              fullWidth
              name="middleName"
              value={formik.values.middleName}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              InputProps={{
                style: { borderRadius: 0 },
              }}
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              fullWidth
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              InputProps={{
                style: { borderRadius: 0 },
              }}
              id="outlined-basic"
              label="Suffix"
              variant="outlined"
              fullWidth
              name="suffix"
              value={formik.values.suffix}
              onChange={formik.handleChange}
            />
          </Grid>

          <Grid item xs={2}>
            <InputMask
              mask="999-99-9999"
              type="number"
              placeholder="Enter SSN"
              name="ssn"
              value={formik.values.ssn}
              onChange={formik.handleChange}
            >
              {() => (
                <TextField
                  id="outlined-basic"
                  label="SSN"
                  variant="outlined"
                  name="ssn"
                  fullWidth
                  value={formik.values.ssn}
                  error={formik.touched.ssn && Boolean(formik.errors.ssn)}
                  helperText={formik.touched.ssn && formik.errors.ssn}
                />
              )}
            </InputMask>
          </Grid>

          <Grid item xs={2}>
            <TextField
              id="outlined-basic"
              // label="Date of Birth"
              inputProps={{ max: currentDate }}
              variant="outlined"
              type="date"
              name="dob"
              fullWidth
              value={
                formik.values.dob
                  ? moment(formik.values.dob).format("YYYY-MM-DD")
                  : ""
              }
              onChange={formik.handleChange}
              error={formik.touched.dob && Boolean(formik.errors.dob)}
              helperText={formik.touched.dob && formik.errors.dob}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              InputProps={{
                style: { borderRadius: 0 },
              }}
              id="outlined-basic"
              label="Address"
              variant="outlined"
              name="address"
              fullWidth
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              InputProps={{
                style: { borderRadius: 0 },
              }}
              id="outlined-basic"
              label="City"
              variant="outlined"
              name="city"
              fullWidth
              value={formik.values.city}
              onChange={formik.handleChange}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              InputProps={{
                style: { borderRadius: 0 },
              }}
              id="outlined-basic"
              label="Select State"
              variant="outlined"
              select
              name="stateId"
              fullWidth
              value={formik.values.stateId}
              onChange={(e) => {
                formik.handleChange(e);
                handleStateChange(e);
              }}
              error={formik.touched.stateId && Boolean(formik.errors.stateId)}
              helperText={formik.touched.stateId && formik.errors.stateId}
            >
              <MenuItem value="">
                {" "}
                <div>Please Select</div>{" "}
              </MenuItem>
              {states.map((option: any) => (
                <MenuItem key={option.stateId} value={option.stateId}>
                  {option.stateName}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={2}>
            <TextField
              InputProps={{
                style: { borderRadius: 0 },
              }}
              id="outlined-basic"
              label="Zip"
              variant="outlined"
              name="zip"
              fullWidth
              value={formik.values.zip}
              onChange={formik.handleChange}
              error={formik.touched.zip && Boolean(formik.errors.zip)}
              helperText={formik.touched.zip && formik.errors.zip}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              InputProps={{
                style: { borderRadius: 0 },
              }}
              id="outlined-basic"
              label="Email Address"
              variant="outlined"
              disabled
              fullWidth
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              InputProps={{
                style: { borderRadius: 0 },
              }}
              id="outlined-basic"
              label="Phone Number"
              disabled
              variant="outlined"
              fullWidth
              onChange={formik.handleChange}
              value={formik.values.phoneNo}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              InputProps={{
                style: { borderRadius: 0 },
              }}
              id="outlined-select-currency"
              select
              label="Contact Type"
              name="preferredContactMethod"
              value={formik.values.preferredContactMethod}
              onChange={formik.handleChange}
              error={
                formik.touched.preferredContactMethod &&
                Boolean(formik.errors.preferredContactMethod)
              }
              helperText={
                formik.touched.preferredContactMethod &&
                formik.errors.preferredContactMethod
              }
              fullWidth
            >
              <MenuItem value="">
                <div>Please Select</div>
              </MenuItem>
              {contactType.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              InputProps={{
                style: { borderRadius: 0 },
              }}
              id="outlined-select-currency"
              select
              label="How Employee would like to receive their form back"
              value={formik.values.healthCoverageInfo}
              onChange={formik.handleChange}
              name="healthCoverageInfo"
              error={
                formik.touched.healthCoverageInfo &&
                Boolean(formik.errors.healthCoverageInfo)
              }
              helperText={
                formik.touched.healthCoverageInfo &&
                formik.errors.healthCoverageInfo
              }
              fullWidth
            >
              <MenuItem value="">
                <div>Please Select</div>
              </MenuItem>
              {healthPlan.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={2}>
            <TextField
              InputProps={{
                style: { borderRadius: 0 },
              }}
              id="outlined-select-currency"
              select
              label="Status"
              value={formik.values.status}
              onChange={formik.handleChange}
              error={formik.touched.status && Boolean(formik.errors.status)}
              helperText={formik.touched.status && formik.errors.status}
              name="status"
              fullWidth
            >
              <MenuItem value="">
                <div>Please Select</div>
              </MenuItem>
              {status.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid container spacing={2} sx={{ margin: "20px 0px" }}>
            <Grid item xs={12}>
              <Typography
                sx={{ borderBottom: "1px solid  #d7d7d7" }}
                variant="h6"
              >
                Dependent Information
              </Typography>
            </Grid>

            <Grid item xs={3}>
              <TextField
                InputProps={{
                  style: { borderRadius: 0 },
                }}
                id="outlined-basic"
                label="Dependent1"
                variant="outlined"
                name="dependent1"
                fullWidth
                value={formik.values.dependent1}
                onChange={formik.handleChange}
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                InputProps={{
                  style: { borderRadius: 0 },
                }}
                id="outlined-basic"
                label="Dependent2"
                variant="outlined"
                name="dependent2"
                fullWidth
                value={formik.values.dependent2}
                onChange={formik.handleChange}
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                InputProps={{
                  style: { borderRadius: 0 },
                }}
                id="outlined-basic"
                label="Dependent3"
                variant="outlined"
                name="dependent3"
                fullWidth
                value={formik.values.dependent3}
                onChange={formik.handleChange}
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                InputProps={{
                  style: { borderRadius: 0 },
                }}
                id="outlined-basic"
                label="Dependent4"
                variant="outlined"
                name="dependent4"
                fullWidth
                value={formik.values.dependent4}
                onChange={formik.handleChange}
              />
            </Grid>
            {question && (
              <Grid item xs={7}>
                <span style={{ fontSize: "12px", color: "black" }}>
                  Did you miss your employer's Open Enrollment Period and do you
                  have to wait until the next OE Period?
                </span>
                <TextField
                  InputProps={{
                    style: { borderRadius: 0 },
                  }}
                  id="outlined-select-currency"
                  select
                  value={formik.values.empOpenEnrollmentState}
                  error={formik.touched.empOpenEnrollmentState && Boolean(formik.errors.empOpenEnrollmentState)}
                  helperText={formik.touched.empOpenEnrollmentState && formik.errors.empOpenEnrollmentState}
                  onChange={formik.handleChange}
                  name="empOpenEnrollmentState"
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
            )}
          </Grid>

          <Grid
            container
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
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
    </React.Fragment>
  );
};

export default ACA_Application_Edit_Information;
