import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Typography,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
  Tooltip,
  IconButton,
} from "@mui/material";
import Header from "../Header";
import Box from "@mui/material/Grid";
import Card from "@mui/material/Grid";
import { CardContent } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Footer from "../Footer";
import * as yup from "yup";
import { ZIPCODE } from "../../constants/actionTypes";
import { IAddAcaForm } from "../../interfaces/startMyAca";
import { Form, Formik, FormikProps } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOTPEnteredDetails } from "../../reducers/otpReducer";
import { getSTATESEnteredDetails } from "../../reducers/statesReducer";
import { fetchSTATESRequest } from "../../actions/statesActions";
import { getAddACADetails } from "../../reducers/addACAReducer";
import { fetchAddACARequest } from "../../actions/addACAActions";
import { toast } from "react-toastify";
import InputMask from "react-input-mask";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./style.css";
import DatePicker from 'react-date-picker';
import moment from "moment";
import { getEmployerDetails } from "../../reducers/employerReducer";
import { fetchEmployerRequest } from "../../actions/employerActions";
import StorageService from "../../services/Storage.service";

const StartMyAca = ({ employerId }: any): JSX.Element => {
  let url = window.location.href
  const params = useParams();
  const navigate = useNavigate();
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "left",
    color: theme.palette.text.secondary,
    borderRadius: "0px",
    boxShadow: "none",
  }));

  const dispatch = useDispatch();
  let otpRes = useSelector(getOTPEnteredDetails);

  useEffect(() => {
    otpRes.isSuccess = null;
  }, []);

  const addACARes = useSelector(getAddACADetails);
  const [events, setEvents] = useState([]);
  useEffect(() => {
    if (addACARes && addACARes.response) {
      setEvents(addACARes.response);
    }
  }, [addACARes]);
  const preferredContactMethod = [
    { value: "Email", label: "Email" },
    { value: "Phone", label: "Phone" },
  ];

  const healthCoverageInfo = [
    { value: "Email", label: "Email" },
    { value: "FirstClassEMail", label: "First Class Mail" },
  ];

  const enrollment = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
  ];

  const statesRes: any = useSelector(getSTATESEnteredDetails);

  useEffect(() => {
    getStates();
  }, []);

  const getStates = () => {
    dispatch(fetchSTATESRequest({}));
  };

  const [states, setStates] = useState([]);
  useEffect(() => {
    if (statesRes && statesRes.response) {
      setStates(statesRes.response);
    }
  }, [statesRes]);

  const [isSubmitted, setSubmitted] = useState(false);
  const [isDateErr,setDateErr] = useState(false);

  
  const handleDateChange = (date:any)  => {
	if (date != null) {
	  setDateErr(false);
	} else {
	  setDateErr(true);
	}
	setDatePickerValue(date);
  }
  const employerRes: any = useSelector(getEmployerDetails);
  const stateQuestion: any = employerRes.response;
  var openEnroll: any =
    stateQuestion && stateQuestion.acaMissOpenEnrollWaitTillNextOEStatesIds;

  useEffect(() => {
    getEmployer();
  }, []);
 
  const [stateId, setStateId] = useState(0)

  const getEmployer = () => {
    let employerTest = url.toString();
    console.log(employerTest);
    let employer = "https://www.randstad.com";
    let indexW = employer.indexOf("w");
    let subStr1 = employer.substring(indexW + 4);
    let indexDot = subStr1.indexOf(".");
    let employerName = subStr1.substring(0, indexDot);
    dispatch(fetchEmployerRequest({ employerName }));
  };
  
  const validationSchema = yup.object().shape({
    firstName: yup.string().required("* First Name is required"),
    lastName: yup.string().required("* Last Name is required"),
    ssn: yup
      .string()
      .min(9, "* SSN must be 9 characters")
      .required("* SSN is required")
	  .transform((value) => value.replace(/-|_/g, "")),
    address: yup.string().required("* Street Address is required"),
    city: yup.string().required("* City is required"),
    stateId: yup.string().required("* State is required"),
    zip: yup
      .string()
      .required("* ZipCode is required")
      .matches(ZIPCODE, "* Zip Code is not valid"),
    preferredContactMethod: yup
      .string()
      .required("* Preferred Contact Method is required"),
    healthCoverageInfo: yup
      .string()
      .required("* Health coverage information is required"),
    empOpenEnrollmentState:
      stateId == openEnroll
        ? yup.string().required("* Employer's Open Enrollment is required")
        : yup.string(),
  });

  const handleStateChange = (e: any) => {
    setStateId(e.target.value);
  };

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, reset, formState } = useForm(formOptions);
  const [user] = useState();
  useEffect(() => {
    reset(user);
  }, [user]);

  const [initialValues, setInitialValues] = useState<IAddAcaForm>({
    firstName: "",
    middleName: "",
    lastName: "",
    suffix: "",
    dob: "",
    ssn: "",
    address: "",
    city: "",
    stateId: "",
    zip: "",
    email: otpRes.email ? otpRes.email : "",
    phoneNo: otpRes.phoneNo ? otpRes.phoneNo : "",
    dependent1: "",
    dependent2: "",
    dependent3: "",
    dependent4: "",
    preferredContactMethod: "",
    healthCoverageInfo: "",
    empOpenEnrollmentState: "",
    otp:otpRes.otp ? otpRes.otp : "",
  });
  useEffect(() => {
    let id: any = params.employerId;
    if (parseInt(id) > 0) {
      setInitialValues({
        firstName: addACARes["firstName"],
        middleName: addACARes["middleName"],
        lastName: addACARes["lastName"],
        suffix: addACARes["suffix"],
        dob:  moment(addACARes['dob']).format("YYYY-MM-DD"),
        ssn: addACARes["ssn"],
        address: addACARes["address"],
        city: addACARes["city"],
        stateId: addACARes["stateId"],
        zip: addACARes["zip"],
        email: otpRes.email ? otpRes.email : "",
        phoneNo: otpRes.phoneNo ? otpRes.phoneNo : "",
        dependent1: addACARes["dependent1"],
        dependent2: addACARes["dependent2"],
        dependent3: addACARes["dependent3"],
        dependent4: addACARes["dependent4"],
        preferredContactMethod: addACARes["preferredContactMethod"],
        healthCoverageInfo: addACARes["healthCoverageInfo"],
        empOpenEnrollmentState: addACARes["empOpenEnrollmentState"],
        otp: otpRes.otp ? otpRes.otp : "",
      });
      setDatePickerValue(moment(new Date(addACARes['dob']), "MM-DD-YYYY").toDate());
    } else {
      setInitialValues({
        firstName: "",
        middleName: "",
        lastName: "",
        suffix: "",
        dob: "",
        ssn: "",
        address: "",
        city: "",
        stateId: "",
        zip: "",
        email: otpRes.email ? otpRes.email : "",
        phoneNo: otpRes.phoneNo ? otpRes.phoneNo : "",
        dependent1: "",
        dependent2: "",
        dependent3: "",
        dependent4: "",
        preferredContactMethod: "",
        healthCoverageInfo: "",
        empOpenEnrollmentState: "",
        otp: otpRes.otp ? otpRes.otp : "",
      });
      setDatePickerValue(null)
    }
  }, [addACARes]);

  const [datePickerValue, setDatePickerValue] = useState<Date | null>(new Date());
  const [error, setError] = useState(false);
  const [empOpenEnrollmentState] = useState(false)
  var today = new Date();

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values: IAddAcaForm) => {
          if(datePickerValue  && datePickerValue != null ){
            setSubmitted(true);
            toast.success("Saved Employee Info successfully");
            navigate(`/`+StorageService.getCookies("employerName")+"/thankyou");
            const tempACAForm: any = {
              firstName: values.firstName,
              middleName: values.middleName,
              lastName: values.lastName,
              suffix: values.suffix,
              dob:  moment(datePickerValue).format("MM/DD/YYYY"),
              ssn: values.ssn,
              address: values.address,
              city: values.city,
              stateId: values.stateId,
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
              otp: values.otp,
            };
            dispatch(fetchAddACARequest(tempACAForm));
          } else {
		    setDateErr(true);
		  }
        }}
        validationSchema={validationSchema}
        enableReinitialize
      >
         
        {(props: FormikProps<IAddAcaForm>) => {
          const { values, touched, errors, handleChange } = props;
          return (
            <>
              <Header />
              <div className="content-form">
                <Form>
                  <Box sx={{ flexGrow: 1 }} style={{ padding: "15px 15px" }}>
                    <Grid container sx={{}}>
                      <Grid item xs={12} md={12}>
                        <Card>
                          <Typography
                            gutterBottom
                            className="card-header"
                            variant="h5"
                            component="div"
                          >
                            Employee Information
                          </Typography>
                          <CardContent style={{ backgroundColor: "white" }}>
                            <Grid container>
                              <Grid item xs={3}>
                                <Item>
                                  <TextField
                                    InputProps={{
                                      style: { borderRadius: 0 },
                                    }}
                                    id="outlined-basic"
                                    label="(*)First Name"
                                    variant="outlined"
                                    autoFocus
                                    {...register("firstName")}
                                    fullWidth
                                    value={values.firstName}
                                    onChange={handleChange}
                                    error={
                                      touched.firstName &&
                                      Boolean(errors.firstName)
                                    }
                                    helperText={
                                      touched.firstName && errors.firstName
                                    }
                                  />
                                </Item>
                              </Grid>
                              <Grid item xs={3}>
                                <Item>
                                  <TextField
                                    InputProps={{
                                      style: { borderRadius: 0 },
                                    }}
                                    id="outlined-basic"
                                    label="Middle Name"
                                    variant="outlined"
                                    name="middleName"
                                    fullWidth
                                    onChange={handleChange}
                                    value={values.middleName}
                                  />
                                </Item>
                              </Grid>
                              <Grid item xs={3}>
                                <Item>
                                  <TextField
                                    InputProps={{
                                      style: { borderRadius: 0 },
                                    }}
                                    id="outlined-basic"
                                    label="(*)Last Name"
                                    variant="outlined"
                                    {...register("lastName")}
                                    fullWidth
                                    value={values.lastName}
                                    onChange={handleChange}
                                    error={
                                      touched.lastName &&
                                      Boolean(errors.lastName)
                                    }
                                    helperText={
                                      touched.lastName && errors.lastName
                                    }
                                  />
                                </Item>
                              </Grid>
                              <Grid item xs={3}>
                                <Item>
                                  <TextField
                                    InputProps={{
                                      style: { borderRadius: 0 },
                                    }}
                                    id="outlined-basic"
                                    label="Suffix"
                                    variant="outlined"
                                    name="suffix"
                                    fullWidth
                                    onChange={handleChange}
                                    value={values.suffix}
                                  />
                                </Item>
                              </Grid>
                              <Grid  item
                                xs={12}
                                mt={1.5}
                                md={3}
                                sx={{ position: "relative", marginTop: "10px"}}>
                                       <Item>
                           Date of Birth (*)
                                     
                          <DatePicker
                            onChange={(date:any) => handleDateChange(date)}
                            format="MM-dd-yyyy"
                            name="dob"
                            value={datePickerValue}
                            maxDate={today}
                          />
                          <div className={!isSubmitted ? "error-span cert" : "error-span"}>
                            {isDateErr ? "* Date Of Birth is required" : ""}
                          </div>
                         
                          </Item>
                        </Grid>
                              <Grid item xs={3} sx={{ marginTop: "30px" }}>
                                <Item>
                                  <InputMask
                                    mask="999-99-9999"
                                    type="number"
                                    placeholder="Enter SSN"
                                    {...register("ssn")}
                                    value={values.ssn}
                                    disabled={false}
                                    onChange={handleChange}
                                  >
                                    {() => (
                                      <TextField
                                        InputProps={{
                                          style: { borderRadius: 0 },
                                        }}
                                        id="outlined-basic"
                                        label="(*)SSN"
                                        variant="outlined"
                                        name="ssn"
                                        fullWidth
                                        value={values.ssn}
                                        error={
                                          touched.ssn && Boolean(errors.ssn)
                                        }
                                        helperText={touched.ssn && errors.ssn}
                                      />
                                    )}
                                  </InputMask>
                                </Item>
                              </Grid>
                              <Grid item xs={6} sx={{ marginTop: "30px" }}>
                                <Item>
                                  <TextField
                                    InputProps={{
                                      style: { borderRadius: 0 },
                                    }}
                                    id="outlined-basic"
                                    label="(*)Street Address"
                                    variant="outlined"
                                    {...register("address")}
                                    fullWidth
                                    value={values.address}
                                    onChange={handleChange}
                                    error={
                                      touched.address && Boolean(errors.address)
                                    }
                                    helperText={
                                      touched.address && errors.address
                                    }
                                  />
                                </Item>
                              </Grid>
                              <Grid item xs={3} sx={{ marginTop: "10px" }}>
                                <Item>
                                  <TextField
                                    InputProps={{
                                      style: { borderRadius: 0 },
                                    }}
                                    id="outlined-basic"
                                    label="(*)City"
                                    variant="outlined"
                                    {...register("city")}
                                    fullWidth
                                    value={values.city}
                                    onChange={handleChange}
                                    error={touched.city && Boolean(errors.city)}
                                    helperText={touched.city && errors.city}
                                  />
                                </Item>
                              </Grid>
                              <Grid item xs={3} sx={{ marginTop: "10px" }}>
                                <Item>
                                  <TextField
                                    InputProps={{
                                      style: { borderRadius: 0 },
                                    }}
                                    id="outlined-basic"
                                    select
                                    label="(*)Select State"
                                    variant="outlined"
                                    name="stateId"
                                    fullWidth
                                    sx={{ color: "black" }}
                                    value={values.stateId}
                                    onChange={(e) => {
                                      handleChange(e);
                                      handleStateChange(e);
                                    }}
                                    error={
                                      touched.stateId && Boolean(errors.stateId)
                                    }
                                    helperText={
                                      touched.stateId && errors.stateId
                                    }
                                  >
                                    <MenuItem value="">Please Select </MenuItem>
                                    {states.map((option: any) => (
                                      <MenuItem
                                        key={option.stateId}
                                        value={option.stateId}
                                      >
                                        {option.stateName}
                                      </MenuItem>
                                    ))}
                                  </TextField>
                                </Item>
                              </Grid>
                              <Grid item xs={3} sx={{ marginTop: "10px" }}>
                                <Item>
                                  <TextField
                                    InputProps={{
                                      style: { borderRadius: 0 },
                                    }}
                                    id="outlined-basic"
                                    label="(*)ZIP/Postal Code"
                                    variant="outlined"
                                    {...register("zip")}
                                    fullWidth
                                    value={values.zip}
                                    onChange={handleChange}
                                    error={touched.zip && Boolean(errors.zip)}
                                    helperText={touched.zip && errors.zip}
                                  />
                                </Item>
                              </Grid>
                              <Grid item xs={3} sx={{ marginTop: "10px" }}>
                                <Item>
                                  <TextField
                                    InputProps={{
                                      style: { borderRadius: 0 },
                                    }}
                                    id="outlined-basic"
                                    label="Phone Number"
                                    variant="outlined"
                                    name="phoneNo"
                                    disabled
                                    className="disable-styling"
                                    fullWidth
                                    value={values.phoneNo}
                                    onChange={handleChange}
                                  />
                                </Item>
                              </Grid>
                              <Grid item xs={3} sx={{ marginTop: "10px" }}>
                                <Item>
                                  <TextField
                                    InputProps={{
                                      style: { borderRadius: 0 },
                                    }}
                                    id="outlined-basic"
                                    label="Email"
                                    variant="outlined"
                                    name="email"
                                    disabled
                                    className="disable-styling"
                                    fullWidth
                                    value={values.email}
                                    onChange={handleChange}
                                  />
                                </Item>
                              </Grid>
                              <Grid item xs={3} sx={{ marginTop: "10px" }}>
                                <Item>
                                  <TextField
                                    InputProps={{
                                      style: { borderRadius: 0 },
                                    }}
                                    id="outlined-basic"
                                    select
                                    label="(*)Preferred Contact Method"
                                    variant="outlined"
                                    name="preferredContactMethod"
                                    fullWidth
                                    sx={{ color: "black" }}
                                    value={values.preferredContactMethod}
                                    onChange={handleChange}
                                    error={
                                      touched.preferredContactMethod &&
                                      Boolean(errors.preferredContactMethod)
                                    }
                                    helperText={
                                      touched.preferredContactMethod &&
                                      errors.preferredContactMethod
                                    }
                                  >
                                    <MenuItem value="">Please Select </MenuItem>
                                    {preferredContactMethod.map((option) => (
                                      <MenuItem
                                        key={option.value}
                                        value={option.value}
                                      >
                                        {option.label}
                                      </MenuItem>
                                    ))}
                                  </TextField>
                                </Item>
                              </Grid>
                              <Grid item xs={6} sx={{ marginTop: "10px" }}>
                                <Item>
                                  <TextField
                                    InputProps={{
                                      style: { borderRadius: 0 },
                                    }}
                                    id="outlined-basic"
                                    select
                                    label="(*)How would you like to receive your employer's health coverage information back?"
                                    variant="outlined"
                                    name="healthCoverageInfo"
                                    fullWidth
                                    sx={{ color: "black" }}
                                    value={values.healthCoverageInfo}
                                    onChange={handleChange}
                                    error={
                                      touched.healthCoverageInfo &&
                                      Boolean(errors.healthCoverageInfo)
                                    }
                                    helperText={
                                      touched.healthCoverageInfo &&
                                      errors.healthCoverageInfo
                                    }
                                  >
                                    <MenuItem value="">Please Select </MenuItem>
                                    {healthCoverageInfo.map((option) => (
                                      <MenuItem
                                        key={option.value}
                                        value={option.value}
                                      >
                                        {option.label}
                                      </MenuItem>
                                    ))}
                                  </TextField>
                                </Item>
                              </Grid>
                              <Grid item xs={3} sx={{ marginTop: "10px" }}>
                                <Item>
                                  <TextField
                                    InputProps={{
                                      style: { borderRadius: 0 },
                                    }}
                                    id="outlined-basic"
                                    label="Dependent1 (if applicable)"
                                    variant="outlined"
                                    name="dependent1"
                                    value={values.dependent1}
                                    fullWidth
                                    onChange={handleChange}
                                  />
                                </Item>
                              </Grid>
                              <Grid item xs={3} sx={{ marginTop: "10px" }}>
                                <Item>
                                  <TextField
                                    InputProps={{
                                      style: { borderRadius: 0 },
                                    }}
                                    id="outlined-basic"
                                    label="Dependent2 (if applicable)"
                                    variant="outlined"
                                    name="dependent2"
                                    value={values.dependent2}
                                    fullWidth
                                    onChange={handleChange}
                                  />
                                </Item>
                              </Grid>
                              <Grid item xs={3} sx={{ marginTop: "10px" }}>
                                <Item>
                                  <TextField
                                    InputProps={{
                                      style: { borderRadius: 0 },
                                    }}
                                    id="outlined-basic"
                                    label="Dependent3 (if applicable)"
                                    variant="outlined"
                                    name="dependent3"
                                    value={values.dependent3}
                                    fullWidth
                                    onChange={handleChange}
                                  />
                                </Item>
                              </Grid>
                              <Grid item xs={3} sx={{ marginTop: "10px" }}>
                                <Item>
                                  <TextField
                                    InputProps={{
                                      style: { borderRadius: 0 },
                                    }}
                                    id="outlined-basic"
                                    label="Dependent4 (if applicable)"
                                    variant="outlined"
                                    name="dependent4"
                                    value={values.dependent4}
                                    onChange={handleChange}
                                    fullWidth
                                  />
                                </Item>
                              </Grid>

                              <br />
                              <Grid item xs={9} mt={3}>
                                <FormControl
                                  sx={{
                                    width: "100%",
                                    display:
                                      Number(values.stateId) == openEnroll
                                        ? ""
                                        : "none",
                                  }}
                                >
                                  <TextField
                                    InputProps={{
                                      style: { borderRadius: 0 },
                                    }}
                                    id="outlined-basic"
                                    label=" (*)Did you miss your employer's Open Enrollment
                                    Period and do you have to wait until the
                                    next OE Period?"
                                    variant="outlined"
                                    select
                                    name="empOpenEnrollmentState"
                                    value={values.empOpenEnrollmentState}
                                    onChange={handleChange}
                                    error={
                                      touched.empOpenEnrollmentState &&
                                      Boolean(errors.empOpenEnrollmentState)
                                    }
                                    helperText={
                                      touched.empOpenEnrollmentState &&
                                      errors.empOpenEnrollmentState
                                    }
                                    fullWidth
                                  >
                                    <MenuItem value="">Please Select </MenuItem>
                                    {enrollment.map((option) => (
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
                            </Grid>
                          </CardContent>
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
                              type="submit"
                              onClick={() => {setError(!empOpenEnrollmentState); handleDateChange(datePickerValue)}}
                            >
                              Save
                            </Button>
                            <Button
                              variant="outlined"
                              className="cancel-btn-role"
                              sx={{
                                margin: "3px 5px",
                                backgroundColor: "#afa2a2",
                              }}
                              onClick={() => {reset(); setDateErr(false); setDatePickerValue(null)}}
                            >
                              Clear
                            </Button>
                          </Grid>
                        </Card>
                      </Grid>
                    </Grid>
                  </Box>
                </Form>
                <Footer />
              </div>
            </>
          );
        }}
      </Formik>
    </>
  );
};

export default StartMyAca;
