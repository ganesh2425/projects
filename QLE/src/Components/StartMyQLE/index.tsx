import { Grid, TextField, FormControl, Typography, Checkbox, Button, makeStyles } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useFormik } from "formik";
import InputMask from "react-input-mask";
import { Istep1Form } from "../../interfaces/types";
import * as yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { fetchSTEP1Request } from "../../actions/step1Actions";
import { fetchEVENTSRequest } from "../../actions/eventsActions";
import { toast } from "react-toastify";
import { getEVENTSEnteredDetails } from "../../reducers/eventsReducer";
import { getSTEP1EnteredDetails } from "../../reducers/step1Reducer";
import { getOTPEnteredDetails } from "../../reducers/otpReducer";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { getStep1Details } from "../../reducers/getStep1Reducer";
import { fetchGetStep1Request } from "../../actions/getStep1Actions";
import { useParams } from "react-router-dom";
import { fetchEditStep1Request } from "../../actions/editStep1Actions";
import { getEditStep1Details } from "../../reducers/editStep1Reducer";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { IoInformationCircle } from "react-icons/io5";
import ReactHtmlParser from 'html-react-parser';
import { history } from "../../config/history";
import StorageService from "../../services/Storage.service";
import DatePicker from 'react-date-picker';

// const StartMyQLE = ({ activeStep, eventId }: any) => {
const StartMyQLE = ({ activeStep, token, setDisabled }: any) => {
  let employerNameCoki = StorageService.getCookies("employerName");
  const [datePickerValue, setDatePickerValue] = useState<any>(null as any);

  let params = useParams();

  let [selectedValue, setSelectedValue] = React.useState(0);
  const [eventTypeSelected, setEventTypeSelected] = React.useState(false);
  let [resultantOptionSelected, setResultantOptionSelected] = React.useState(0);

  const dispatch = useDispatch();
  let otpRes = useSelector(getOTPEnteredDetails);
  const [subEvents, setSubEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const eventsRes = useSelector(getEVENTSEnteredDetails);

  const onChangeDate = (event: any) => {
   setDatePickerValue(event);
   if (event && event.getFullYear().toString().length >= 4) {
    return false;
    } 
  }

  useEffect(() => {
    return () => {
      otpRes.isSuccess = false;
    };
  }, []);

  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = () => {
    dispatch(
      fetchEVENTSRequest({})
    );
  };

  useEffect(() => {
    if (eventsRes && eventsRes.response) {
      setEvents(eventsRes.response);
      getStep1ByEventId();
    }
  }, [eventsRes]);

  // const handleEventChange = (e: any) => {
  //   setSelectedValue(e.target.value);
  //   setEventTypeSelected(e.target.value);
  //   setSubEvents(e.qleEventSubtypes);
  // };

  const handleResultantOptions = (e: any) => {
    setResultantOptionSelected(e.target.value);
  }

  const handleEventItemChange = (e: any) => {
    setSelectedValue(e.id);
    setEventTypeSelected(e.id);
    setSubEvents(e.qleSubTypes);
  }

  const todayDate = () => {
    let date = new Date();
    let day = String(date.getDate());
    let month = String(date.getMonth() + 1);
    let year = String(date.getFullYear());
    console.log(day, month, date)
    let todaydate = year + '-' + (month.length == 1 ? + '-0' + month : "-" + month) + (day.length == 1 ? '-0' + day : day);
    return todaydate;
  }

  const validationSchema = yup.object({
    firstName: yup
      .string()
      .required("* First Name is required"),
    lastName: yup
      .string()
      .required("* Last Name is required"),
    middleName: yup
      .string(),
    ssn: yup
      .string()
      .test("len", "Invalid SSN", (val:any) => {
        const val_length_without_dashes = val.replace(/-|_/g, "").length;
        return val_length_without_dashes === 9;
      })
      .required("* SSN is required"),
    // evntDate: yup
    //   .string()
    //   .required("* this Field is required"),
    // eventType: yup
    //   .string()
    //   .required("* this Field is required"),
    remViaTxt: yup
      .string()
      .required("* this Field is required"),
    // eventSubType: yup
    //   .string()
    //   .required("* this Field is required"),

  });

  const [contactCertBoxStatus, setContactCertBoxStatus] = React.useState(false);
  const handleContactCertBoxChange = (e: any) => {
    let valStatus = e.target.checked;
    if (e.target.checked == true) {
      setContactCertBoxStatus(true);
    }
    else {
      setContactCertBoxStatus(false);
    }
  }

  const [qleCertBoxStatus, setQLECertBoxStatus] = React.useState(false);
  const handleQLECertBoxChange = (e: any) => {
    let valStatus = e.target.checked;
    if (e.target.checked == true) {
      setQLECertBoxStatus(true);
    }
    else {
      setQLECertBoxStatus(false);
    }
  }

  const [isSubmitted, setSubmitted] = useState(false);

  //const [disabled, setDisabled] = useState(false);

  let getStep1Res: any = useSelector(getStep1Details);
  // useEffect(() => {
  //   getStep1ByEventId();
  // }, []);

  const getStep1ByEventId = () => {
    // let id: any = params.eventId;
    // if (parseInt(id) > 0)
    //   dispatch(
    //     fetchGetStep1Request({ id })
    //   );
    getStep1Res = null;
    let eventToken = StorageService.getCookies("eventToken");
    let token: any = params.token ? params.token : eventToken;
    if (token && token !== "0")
      dispatch(
        fetchGetStep1Request({ token })
      );
  };

  useEffect(() => {
    // let id: any = params.eventId;
    let eventToken = StorageService.getCookies("eventToken");
    let token: any = params.token ? params.token : eventToken;
    // if (parseInt(id) > 0) {
    if (token) {
      if (getStep1Res && getStep1Res['eventId'] > 0) {
        console.log(getStep1Res['eventId']);
        setInitialValues({
          eventId: getStep1Res['eventId'],
          firstName: getStep1Res['firstName'],
          middleName: getStep1Res['middleName'],
          lastName: getStep1Res['lastName'],
          email: getStep1Res['email'],
          phoneNo: getStep1Res['phoneNo'],
          ssn: getStep1Res['ssn'],
          eventTypeId: getStep1Res['eventTypeId'],
          eventSubTypeId: getStep1Res['eventSubTypeId'],
          //evntDate: "2022-03-30",
          evntDate: moment(getStep1Res['evntDate']).format("YYYY-MM-DD"),
          remViaTxt: getStep1Res['remViaTxt'],
          confirmationNumber: getStep1Res['confirmationNumber'],
          otp: getStep1Res['otp'],
        });
        console.log(initialValues);
        // setDatePickerValue(new Date(moment(getStep1Res['evntDate']).format("MM-DD-YYYY")));
        setDatePickerValue(moment(new Date(getStep1Res['evntDate']), "MM-DD-YYYY").toDate());

        let filteredArr = eventsRes.response && eventsRes.response.find((x: any) => x.id == parseInt(getStep1Res['eventTypeId']));

        if (filteredArr) {
          handleEventItemChange(filteredArr);
        }

        setResultantOptionSelected(parseInt(getStep1Res['eventSubTypeId']));
        setContactCertBoxStatus(true);
        setQLECertBoxStatus(true);
      }
      else {
        setInitialValues({
          eventId: 0,
          firstName: "",
          lastName: "",
          middleName: "",
          ssn: "",
          evntDate: "",
          eventTypeId: "",
          remViaTxt: "",
          email: "",
          phoneNo: "",
          eventSubTypeId: "",
          confirmationNumber: "",
          otp:"",
        });
      }
    }
  }, [getStep1Res]);

  const [initialValues, setInitialValues] = useState<Istep1Form>({
    eventId: 0,
    firstName: "",
    lastName: "",
    middleName: "",
    ssn: "",
    evntDate: "",
    eventTypeId: "",
    remViaTxt: "",
    email: "",
    phoneNo: "",
    eventSubTypeId: "",
    confirmationNumber: "",
    otp:"",
  });

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values: Istep1Form, actions) => {
      setSubmitted(true);
      setDisabled(false);
      // if (selectedValue && resultantOptionSelected && contactCertBoxStatus && qleCertBoxStatus
      //   && (moment(new Date(), "DD/MM/YYYY").diff(moment(new Date(values.evntDate), "DD/MM/YYYY"), 'days') < 60)) 
      //   {
      //   values.eventTypeId = selectedValue.toString();
      //   values.eventSubTypeId = resultantOptionSelected.toString();
      //   values.email = otpRes.email;
      //   values.phoneNo = otpRes.phoneNo;
      //   values.evntDate = moment(new Date(values.evntDate)).format("MM/DD/YYYY");
      //   if(values.eventId == 0){
      //   dispatch(fetchSTEP1Request(values));
      // }
      if (selectedValue && resultantOptionSelected && contactCertBoxStatus && qleCertBoxStatus
        && (moment(new Date(), "DD/MM/YYYY").diff(moment(new Date(datePickerValue), "DD/MM/YYYY"), 'days') < 60)) {
        values.eventTypeId = selectedValue.toString();
        values.eventSubTypeId = resultantOptionSelected.toString();
        values.email = otpRes.email;
        values.phoneNo = otpRes.phoneNo;
        values.otp=otpRes.otp;
        values.evntDate = moment(new Date(datePickerValue)).format("MM/DD/YYYY");
        if (values.eventId == 0) {
          dispatch(fetchSTEP1Request(values));
        }
        else {
          values.confirmationNumber = getStep1Res.confirmationNumber;
          values.email = getStep1Res.email;
          values.phoneNo = getStep1Res.phoneNo;
          values.otp=otpRes.otp;
          dispatch(fetchEditStep1Request(values));
        }
      }
    },
  });

  const navigate = useNavigate();

  let step1Res: any = useSelector(getSTEP1EnteredDetails);
  useEffect(() => {
    if (step1Res && step1Res.isSuccess == false) {
      toast.error(step1Res.errorMessages[0]);
    }
    else if (step1Res && step1Res.token) {
      toast.success(`Saved Step 1 Info Successfully`);
      StorageService.setCookies('eventToken', step1Res.token);
      //history.push('/step1/' + step1Res.token)
      //setDisabled(true);
      //step1Res = null;
      setTimeout(() => {
        navigate(`/`+employerNameCoki+"/requestbenefit");
        //history.push('/step1/' + step1Res.token)
        document.location.reload();
      }, 1500);
    }
  }, [step1Res]);

  let editStep1Res: any = useSelector(getEditStep1Details);
  useEffect(() => {
    if (editStep1Res && editStep1Res.isSuccess == false) {
      toast.error(editStep1Res.errorMessages[0]);
    }
    else if (editStep1Res && editStep1Res.eventId > 0) {
      toast.success(`Step1 Edited Successfully`);
      StorageService.setCookies('eventToken', editStep1Res.token);
      //setDisabled(true);
      //editStep1Res = null;
      setTimeout(() => {
        //navigate(`/step1/${editStep1Res.token}`);
        navigate(`/`+employerNameCoki+"/requestbenefit");
        document.location.reload();
      }, 1500);
    }
  }, [editStep1Res]);

  return (
    <div>
      <React.Fragment>
        <Typography sx={{ mt: 2, mb: 1 }}>
          <>
            <div className="content-form">
              {activeStep === 0 ? (
                <>
                  <form onSubmit={formik.handleSubmit}>
                    <Box sx={{ flexGrow: 1 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                          <TextField
                            id="outlined-basic"
                            label="First Name (*)"
                            variant="outlined"
                            name="firstName"
                            fullWidth
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            error={
                              formik.touched.firstName &&
                              Boolean(formik.errors.firstName)
                            }
                            helperText={
                              formik.touched.firstName &&
                              formik.errors.firstName
                            }
                          />
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <TextField
                            id="outlined-basic"
                            label="Middle Name"
                            variant="outlined"
                            name="middleName"
                            fullWidth
                            value={formik.values.middleName}
                            onChange={formik.handleChange}
                            error={
                              formik.touched.middleName &&
                              Boolean(formik.errors.middleName)
                            }
                            helperText={
                              formik.touched.middleName &&
                              formik.errors.middleName
                            }
                          />
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <TextField
                            id="outlined-basic"
                            label="Last Name (*)"
                            name="lastName"
                            variant="outlined"
                            fullWidth
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            error={
                              formik.touched.lastName &&
                              Boolean(formik.errors.lastName)
                            }
                            helperText={
                              formik.touched.lastName && formik.errors.lastName
                            }
                          />
                        </Grid>
                        {/* <Grid item xs={12} md={4}>
                          <TextField
                            id="outlined-basic"
                            label="Middle Name"
                            variant="outlined"
                            name="middleName"
                            fullWidth
                            value={formik.values.middleName}
                            onChange={formik.handleChange}
                            error={
                              formik.touched.middleName &&
                              Boolean(formik.errors.middleName)
                            }
                            helperText={
                              formik.touched.middleName &&
                              formik.errors.middleName
                            }
                          />
                        </Grid> */}
                        <Grid item xs={12} md={4}>
                          <InputMask
                            mask="999-99-9999"
                            type="number"
                            placeholder="Enter SSN"
                            value={formik.values.ssn}
                            disabled={false}
                            onChange={formik.handleChange("ssn")}
                          >
                            {() => (
                              <TextField
                                id="outlined-basic"
                                label="SSN (*)"
                                variant="outlined"
                                name="ssn"
                                fullWidth
                                value={formik.values.ssn}
                                error={
                                  formik.touched.ssn &&
                                  Boolean(formik.errors.ssn)
                                }
                                helperText={
                                  formik.touched.ssn && formik.errors.ssn
                                }
                              />
                            )}
                          </InputMask>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <TextField
                            id="outlined-basic"
                            label="Email Address"
                            variant="outlined"
                            name="email"
                            value={otpRes.email ? otpRes.email : getStep1Res['email']}
                            onChange={formik.handleChange("email")}
                            fullWidth
                            InputProps={{
                              style: { borderRadius: 0 },
                            }}
                            disabled
                            className="disable-styling"
                          />
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <TextField
                            id="outlined-basic"
                            label="Phone Number"
                            variant="outlined"
                            value={otpRes.phoneNo ? otpRes.phoneNo : getStep1Res['phoneNo']}
                            onChange={formik.handleChange("phone")}
                            name="phone"
                            fullWidth
                            // InputProps={{
                            //     readOnly: true,
                            //   }}
                            disabled
                            className="disable-styling"
                          />
                        </Grid>
                        <Grid item xs={12} md={12}>
                          <FormControl sx={{ width: "100%" }}>
                            <InputLabel id="demo-simple-select-helper-label">
                              Event Type (*)
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-helper-label"
                              id="demo-simple-select-helper"
                              label="Event Type (*)"
                              name="eventType"
                              value={selectedValue}
                              //onChange={handleChange}
                              fullWidth
                            //value={formik.values.eventType}
                            // onChange={formik.handleChange}
                            // error={
                            //   formik.touched.eventType &&
                            //   Boolean(formik.errors.eventType)
                            // }
                            >
                              <MenuItem value="">
                                <em>Please Select</em>
                              </MenuItem>
                              {console.log(events)}
                              {events && events.length > 0 &&
                                events.map((e: any, idx: number) => (
                                  <MenuItem value={e.id} key={idx} onClick={() => handleEventItemChange(e)} >
                                    {e.name}
                                  </MenuItem>
                                ))}
                            </Select>
                          </FormControl>
                          <div className={!selectedValue && isSubmitted ? "error-span cert" : "error-span"}>
                            {!selectedValue && isSubmitted ? "Please select an event" : ""}
                          </div>
                        </Grid>

                        {eventTypeSelected && (
                          <Grid item xs={12}>
                            <FormControl sx={{ width: "100%" }}>
                              <InputLabel id="demo-simple-select-helper-label">
                                Event Sub Type (*)
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                // value={resultantOptionSelected}
                                label="Event Sub Type (*)"
                                onChange={handleResultantOptions}
                                fullWidth
                                name="eventSubTypeId"
                                value={resultantOptionSelected}
                              // error={
                              //   formik.touched.eventSubType &&
                              //   Boolean(formik.errors.eventSubType)
                              // }
                              >
                                <MenuItem value="">
                                  <em>Please Select</em>
                                </MenuItem>

                                {subEvents && subEvents.length > 0 && subEvents.map((e: any, idx: number) => (
                                  <MenuItem value={e.id} key={idx}>
                                    {e.name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                            <div className={!resultantOptionSelected && isSubmitted ? "error-span cert" : "error-span"}>
                              {!resultantOptionSelected && isSubmitted ? "Please select sub event type" : ""}
                            </div>
                          </Grid>
                        )}
                        <Grid item xs={12} md={4} className="Event Date">
                          <span className="Date" > Event Date (*)
                            <Tooltip
                              title="The actual date of the event. For example, if you lost health coverage through your spouse's employer, the Event Date is the date that your coverage will end. If you gained other coverage – for example, through your spouse's employer – the Event Date is the date that your new coverage becomes effective."
                              placement="top"
                              arrow
                            >
                              <IconButton>
                                {/* <DeleteIcon /> */}
                                <IoInformationCircle />
                              </IconButton>
                            </Tooltip>
                          </span>
                          <DatePicker
                            onChange={setDatePickerValue}
                            format="MM-dd-y"
                            name="evntDate"
                            // // value={getStep1Res ? moment(new Date (getStep1Res['evntDate']),"MM-DD-YYYY").toDate() : new Date()}
                            value={datePickerValue}
                            // maxDate={new Date(new Date().setDate(new Date().getDate() + 5))}
                            maxDate={datePickerValue ? moment(datePickerValue, "MM-DD-YYYY").add(5, 'days').toDate()
                                    : moment(new Date(), "MM-DD-YYYY").add(5, 'days').toDate()}
                            //minDate={new Date(new Date().setDate(new Date().getDate() - 60))}
                            minDate={datePickerValue ? moment(datePickerValue, "MM-DD-YYYY").subtract(60, 'days').toDate()
                                : moment(new Date(), "MM-DD-YYYY").subtract(60, 'days').toDate()}
                          />
                          <div className={!datePickerValue && isSubmitted ? "error-span cert" : "error-span"}>
                            {!datePickerValue && isSubmitted ? "Please select event date" : ""}
                          </div>
                          <div className={(datePickerValue && moment(new Date(), "DD/MM/YYYY").diff(moment(new Date(datePickerValue), "DD/MM/YYYY"), 'days')) > 60 ? "error-span cert" : "error-span"}>
                            {(datePickerValue && moment(new Date(), "DD/MM/YYYY").diff(moment(new Date(datePickerValue), "DD/MM/YYYY"), 'days')) > 60 ? "Event happened within last 60 days can only be enrolled" : ""}
                          </div>
                        </Grid>

                        <Grid item xs={12} md={8} className="additional_email">
                          <FormControl sx={{ width: "100%" }}>
                            <InputLabel id="demo-simple-select-helper-label">
                              Receive reminders about your QLE via text message
                              in addition to email? (*)
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-helper-label"
                              id="demo-simple-select-helper"
                              name="remViaTxt"
                              // value={selectedValue}
                              label="Receive reminders about your QLE via text message in addition to email? (*)"
                              // onChange={handYesNoLeChange}
                              fullWidth
                              value={formik.values.remViaTxt}
                              onChange={formik.handleChange}
                              error={
                                formik.touched.remViaTxt &&
                                Boolean(formik.errors.remViaTxt)
                              }
                            // helperText={
                            //   formik.touched.evntDate &&
                            //   formik.errors.evntDate
                            // }
                            >
                              <MenuItem value="">
                                <em>Please Select</em>
                              </MenuItem>
                              <MenuItem value="Yes">Yes</MenuItem>
                              <MenuItem value="No">No</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>

                        {/* <Grid item xs={12} md={8}>
                          <DatePicker
                            onChange={setDatePickerValue}
                            format="MM-dd-y"
                            name="evntDate"
                            value={datePickerValue}
                            maxDate={new Date(new Date().setDate(new Date().getDate() + 5))}
                            minDate={new Date(new Date().setDate(new Date().getDate() - 60))}
                          />
                        </Grid> */}
                      </Grid>
                    </Box>

                    <Grid item xs={12} sx={{ marginTop: "23px" }}>
                      <Typography variant="h5" className="section-heading">
                        Contact Certification Box:
                      </Typography>
                      <Typography className="section-sub-heading">
                        {/* {otpRes && otpRes.contactCertificationBox} */}
                        {/* {ReactHtmlParser(otpRes && otpRes.contactCertificationBox)} */}
                        {otpRes && otpRes.contactCertificationBox ? ReactHtmlParser(otpRes.contactCertificationBox)
                          : ReactHtmlParser(getStep1Res && getStep1Res.step1QleContactBox)}
                      </Typography>
                    </Grid>

                    <Grid>
                      <FormControlLabel
                        //value="end"
                        id="contactCertBox"
                        name="contactCertBox"
                        control={<Checkbox />}
                        label="I agree to the above"
                        labelPlacement="end"
                        sx={{ fontSize: ".875rem !important" }}
                        onChange={handleContactCertBoxChange}
                        checked={contactCertBoxStatus}
                      />
                    </Grid>
                    <div className={!contactCertBoxStatus && isSubmitted ? "error-span cert" : "error-span"}>
                      {!contactCertBoxStatus && isSubmitted ? "Please accept terms and conditions" : ""}
                    </div>

                    <hr className="hr-styling" />

                    <Grid item xs={12}>
                      <Typography variant="h5" className="section-heading">
                        QLE Certification Box:
                      </Typography>
                      <Typography className="section-sub-heading">
                        {/* {otpRes && otpRes.qleCertificationBox} */}
                        {otpRes && otpRes.qleCertificationBox ? ReactHtmlParser(otpRes.qleCertificationBox)
                          : ReactHtmlParser(getStep1Res && getStep1Res.step1QleCertificationBox)}
                        {/* {ReactHtmlParser(otpRes && otpRes.qleCertificationBox)} */}
                      </Typography>

                      {/* <Typography className="py-10 section-sub-heading-styling">
                        Benefit plans must follow certain rules when
                        administering status changes. Under the provisions of
                        Randstad's plans, you're permitted to change your
                        coverage during the year only if you experience certain
                        life events, such as the loss or gain of other health
                        coverage.
                      </Typography>

                      <Typography className="py-10 section-sub-heading-styling">
                        By completing this page, you certify that:
                      </Typography>

                      <ul className="section-sub-heading-styling">
                        <li>
                          The information you're about to provide is true and
                          correct, and
                        </li>
                        <li>
                          You understand that any fraudulent statement,
                          falsification, or material omission of information may
                          subject you to discipline up to and including
                          termination of employment.
                        </li>
                      </ul> */}

                      <Grid>
                        <FormControlLabel
                          value="end"
                          id="qleCertBox"
                          name="qleCertBox"
                          control={<Checkbox />}
                          label="I agree to the above"
                          labelPlacement="end"
                          sx={{ fontSize: ".875rem !important" }}
                          onChange={handleQLECertBoxChange}
                          checked={qleCertBoxStatus}
                        />
                      </Grid>
                      <div className={!qleCertBoxStatus && isSubmitted ? "error-span cert" : "error-span"}>
                        {!qleCertBoxStatus && isSubmitted ? "Please accept terms and conditions" : ""}
                      </div>

                      <Typography className="section-agree-styling">
                        {/* {ReactHtmlParser(otpRes && otpRes.disclaimer)} */}
                        {otpRes && otpRes.disclaimer ? ReactHtmlParser(otpRes.disclaimer)
                          : ReactHtmlParser(getStep1Res && getStep1Res.step1QleDisclaimer)}
                      </Typography>

                      {/* <Typography className="section-agree-styling">
                        You will receive email messages from the following email
                        address with updates on your QLE submission:
                        support@qleservices.com.
                      </Typography>

                      <Typography className="section-agree-styling">
                        If you do not receive an email upon submitting your QLE,
                        please check your junk or spam folder.
                      </Typography> */}

                      <hr className="hr-styling" />

                      <Button
                        variant="contained"
                        className="flex-end btn-bg-red"
                        type="submit"
                        //disabled={disabled}
                        sx={{
                          backgroundColor: "red",
                          "&:hover": {
                            backgroundColor: "orange",
                          },
                        }}
                      >
                        Save & Continue
                      </Button>
                    </Grid>
                  </form>
                </>
              ) : activeStep === 1 ? (
                <>
                  <Grid></Grid>
                </>
              ) : null}
            </div>
          </>
        </Typography>
      </React.Fragment>
    </div>
  );
}

export default StartMyQLE;