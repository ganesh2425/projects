import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button, IconButton, Tooltip, Typography } from "@mui/material";
import Header from "../Header";
import Footer from "../Footer";
import TextField from "@mui/material/TextField";
import EmailIcon from "@mui/icons-material/Email";
import * as yup from "yup";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Recaptcha from "react-recaptcha";
import { useDispatch, useSelector } from "react-redux";
import { getReLoginDetails } from "../../reducers/reLoginReducer/reLoginReducer";
import { useNavigate } from "react-router-dom";
import { IReLoginForm } from "../../interfaces/loginType";
import { fetchreLoginRequest } from "../../actions/resendLink/loginActions";
import { getEVENTSEnteredDetails } from "../../reducers/eventsReducer";
import { fetchEVENTSRequest } from "../../actions/eventsActions";
import { Formik, useFormik } from "formik";
import { toast } from "react-toastify";
import moment from "moment";
import { IoInformationCircle } from "react-icons/io5";


const ResendLink = () => {

  const [subEvents, setSubEvents] = useState([]);
  const eventsRes = useSelector(getEVENTSEnteredDetails);

  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = () => {


    dispatch(
      fetchEVENTSRequest({})
    );
  };

  const [states, setStates] = useState([]);
  useEffect(() => {

    if (eventsRes && eventsRes.response) {
      setStates(eventsRes.response);

    }
  }, [eventsRes]);

  const [eventTypeSelected, setEventTypeSelected] = React.useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
  let [selectedValue, setSelectedValue] = React.useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();



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
  const reSendLink: any = useSelector(getReLoginDetails)

  useEffect(() => {
    if (reSendLink.pending === false) {
      if (reSendLink.isSuccess === false && reSendLink.errorMessages.length === 1) {
        toast.error(reSendLink.errorMessages[0])


      } else if (reSendLink.isSuccess === true && reSendLink.errorMessages.length === 0) {
        toast.success("Mail Sent Successfully To Valid Email Address")
      }
    }
  }, [reSendLink])

  const CheckLogin = (data: IReLoginForm, resetForm: () => void) => {
    if (captchaResponse) {
      dispatch(fetchreLoginRequest(data));
    }
  }
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    evntDate: yup
      .string()
      .required("Event data is required"),

  });

  const [initialValues, setInitialValues] = useState<IReLoginForm>({
    evntDate: "",
    eventTypeId: 0,
    isCaptchaVerified: 0,
    email: "",
    eventSubTypeId: 0,
  });
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values: IReLoginForm, actions) => {
      if ((moment(new Date(), "DD/MM/YYYY").diff(moment(new Date(values.evntDate), "DD/MM/YYYY"), 'days') < 60)) {
        values.evntDate = moment(new Date(values.evntDate)).format("MM/DD/YYYY");

        setSubmitted(true);
        CheckLogin(values, actions.resetForm)
      }
      setTimeout(() => {
        actions.setSubmitting(false)

      }, 500)
    },
  });
  const verifyCallback = (response: any) => {
    setCaptchaResponse(response);
  }




  const [captchaResponse, setCaptchaResponse] = useState("");


  var callback = function () {
    console.log('Done!!!!');
  };


  return (
    <React.Fragment>
      <Header />
      <Box sx={{ flexGrow: 1 }} style={{ padding: "16px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <div className="loginsection">
              <div className="loginblock">
                {/* <img
                  className="shield"
                  src={process.env.REACT_APP_RELATIVE_PATH + '/assets/img/link.svg'}
                  height="50"
                /> */}

                <Typography className="usernamepass">Resend my link</Typography>

                <React.Fragment>
                  <div style={{ padding: "5px 0px" }}>
                    <TextField
                      fullWidth
                      label="Email"
                      id="email"
                      name="email"
                      InputProps={{
                        endAdornment: <EmailIcon style={{ color: "rgba(0,0,0,.5)" }} />,
                        style: { borderRadius: 0 },
                      }}
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </div>
                  <Grid item xs={12} className="event-type">
                    <FormControl fullWidth>
                      <InputLabel htmlFor="grouped-select"
                      >
                        Please select event type
                      </InputLabel>
                      <Select
                       style={{borderRadius:"inherit"}}
                        id="eventTypeId"
                        label="Please select event type"
                        name="eventTypeId"
                        fullWidth
                        value={selectedValue}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.eventTypeId &&
                          Boolean(formik.errors.eventTypeId)
                        }
                      >

                        {states.length > 0 &&
                          states.map((e: any, id: number) => (
                            <MenuItem value={e.id} key={id} onClick={() => handleEventItemChange(e)} >
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
                    <Grid item xs={12} className="event-type">
                      <FormControl sx={{ width: "100%" }}>
                        <InputLabel id="demo-simple-select-helper-label">
                          Event Sub Type
                        </InputLabel>
                        <Select
                         style={{borderRadius:"inherit"}}
                          labelId="demo-simple-select-helper-label"
                          id="eventSubTypeId"
                          label="Event Sub Type"
                          fullWidth
                          name="eventSubTypeId"
                          value={formik.values.eventSubTypeId}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.eventSubTypeId &&
                            Boolean(formik.errors.eventSubTypeId)
                          }
                        >

                          <MenuItem value="">
                            <em>Please Select</em>
                          </MenuItem>

                          {subEvents.length > 0 &&
                            subEvents.map((e: any, id: number) => (
                              <MenuItem value={e.id} key={id}  >
                                {e.name}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                      <div className={!formik.values.eventSubTypeId && isSubmitted ? "error-span cert" : "error-span"}>
                        {!formik.values.eventSubTypeId && isSubmitted ? "Please select sub event type" : ""}
                      </div>
                    </Grid>
                  )}
                  <Grid item xs={12} md={12}>
                    Event Date
                    <Tooltip
                      title="The actual date of the event. For example, if you lost health coverage through your spouse's employer, the Event Date is the date that your coverage will end. If you gained other coverage – for example, through your spouse's employer – the Event Date is the date that your new coverage becomes effective."
                      placement="top"
                      arrow
                    >
                      <IconButton>

                        <IoInformationCircle />
                      </IconButton>
                    </Tooltip>
                    <TextField
                     style={{borderRadius:"inherit"}}
                      defaultValue={todayDate()}
                      id="date"
                      type="date"
                      name="evntDate"
                      fullWidth
                      inputProps={{
                        min: moment().subtract(60, 'days').format("YYYY-MM-DD"),
                        max: moment().add(5, 'days').format("YYYY-MM-DD")
                      }}
                      value={formik.values.evntDate ? moment(formik.values.evntDate).format("YYYY-MM-DD") : ""}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.evntDate &&
                        Boolean(formik.errors.evntDate)
                      }
                      helperText={
                        formik.touched.evntDate && formik.errors.evntDate
                      }
                    />
                    <div className={(formik.values.evntDate && moment(new Date(), "DD/MM/YYYY").diff(moment(new Date(formik.values.evntDate), "DD/MM/YYYY"), 'days')) > 60 ? "error-span cert" : "error-span"}>
                      {(formik.values.evntDate && moment(new Date(), "DD/MM/YYYY").diff(moment(new Date(formik.values.evntDate), "DD/MM/YYYY"), 'days')) > 60 ? "Event happened within last 60 days can only be enrolled" : ""}
                    </div>
                  </Grid>
                  <div
                    style={{
                      maxWidth: "300px",
                      margin: "0 auto",
                      padding: "10px 0px 0px 0px",
                    }}
                  >
                    <Recaptcha
                      sitekey="6LfhEoAeAAAAAIuO0SM9eanP7xI2aZnJwOfTGRRc"
                      render="explicit"
                      onloadCallback={callback}
                      verifyCallback={verifyCallback}
                    />
                  </div>
                  <div className={isSubmitted && !captchaResponse ? "error-span show" : "error-span"}>
                    {!captchaResponse ? "Please verify captcha" : ""}
                  </div>
                </React.Fragment>

                <div
                  className="submit-btn"
                  onClick={() => {
                    formik.handleSubmit();
                  }}
                >
                  <Button>Submit</Button>
                </div>

              </div>
            </div>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </React.Fragment>
  );
};

export default ResendLink;


