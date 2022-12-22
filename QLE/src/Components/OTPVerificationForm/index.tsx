import React, { useEffect, useState } from 'react'
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Button, Typography, CircularProgress } from "@mui/material";
import Header from "../Header";
import Footer from "../Footer";
import TextField from "@mui/material/TextField";
import PhoneIphoneRoundedIcon from "@mui/icons-material/PhoneIphoneRounded";
import EmailIcon from "@mui/icons-material/Email";
import OTPInput, { ResendOTP } from "otp-input-react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, FormikProps, Form, Field } from 'formik';
import { fetchOTPRequest } from "../../actions/otpActions";
import { OTP, OTPState } from "../../interfaces/types";
import StorageService from "../../services/Storage.service";
import { getOTPEnteredDetails } from "../../reducers/otpReducer";
import { ILoginForm, IFormStatus, IFormStatusProps } from "../../interfaces/loginType";
import { fetchLoginRequest } from "../../actions/authActions";
import { getLoginDetails } from "../../reducers/authReducer";
import { fetchResendOTPRequest } from "../../actions/resendOTPActions";
import { getResendOTPEnteredDetails } from "../../reducers/resendOTPReducer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const OTPVerficationForm = () => {
  let employerName = StorageService.getCookies("employerName");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [strOTP, setOTP] = useState("");

  const handleOTPChange = (otp: any) => {
    if (otpRes && otpRes.isSuccess == false && otpRes.errorMessages
      && otpRes.errorMessages.length > 0) {
      otpRes.errorMessages[0] = "";
    }
    setOTP(otp);
    setError(false);
  };

  const [hasErrored, setError] = useState(false);

  const data = {
    accessToken: StorageService.getCookies("accessToken"),
    otp: strOTP
  }

  const handleSubmit = () => {
    if (otpRes && otpRes.isSuccess == false && otpRes.errorMessages
      && otpRes.errorMessages.length > 0) {
      otpRes.errorMessages[0] = "";
    }
    if (!strOTP) {
      setError(true);
    }
    else {
      setLoading(true);
      dispatch(fetchOTPRequest(data));
      setError(false);
      setLoading(false);
    }
  }

  const [otpData, setOTPData] = useState<OTPState>({
    pending: false,
    error: null,
    email: "",
    phoneNo: "",
    contactCertificationBox: "",
    qleCertificationBox: "",
    disclaimer: "",
    otp:"",
  });

  let otpRes = useSelector(getOTPEnteredDetails);
  useEffect(() => {
    if (otpRes && otpRes.qleCertificationBox && otpRes.isSuccess) {
      setLoading(false);
      setSubmitDisabled(false);
      toast.success(`OTP verified successfully`);
      navigate(`/`+employerName+`/step1/0`);
      setOTP("");
    }
    else if (otpRes && otpRes.isSuccess == false) {
      setLoading(false);
      setSubmitDisabled(false);
      setOTP("");
    }
  }, [otpData.error, otpRes]);

  const renderButton = (buttonProps: any) => {
    if (buttonProps.remainingTime != 0) {
      console.log("submit should be enabled");
    }
    else {
      console.log("submit should be disabled");
    }
    return (
      <button {...buttonProps}>
        {buttonProps.remainingTime !== 0 ? `Resend OTP in ${buttonProps.remainingTime}s` : "Resend OTP"}
      </button>
    );
  };

  const renderTime = () => React.Fragment;

  const [isSubmitDisabled, setSubmitDisabled] = useState(false);

  const [loading, setLoading] = useState(false);

  const loginData = {
    email: StorageService.getCookies("email"),
    mobile: StorageService.getCookies("mobile"),
    isCaptchaVerified: 1
  }

  const handleResendClick = (e: any) => {
    if (otpRes && otpRes.isSuccess == false && otpRes.errorMessages
      && otpRes.errorMessages.length > 0) {
      otpRes.errorMessages[0] = "";
    }
    setSubmitDisabled(false);
    setError(false);
    dispatch(fetchResendOTPRequest(StorageService.getCookies("accessToken")));
    console.log("Resend Click");
    setOTP("");
  }

  let resendOTPRes: any = useSelector(getResendOTPEnteredDetails);
  useEffect(() => {
    if (resendOTPRes && resendOTPRes.isSuccess) {
      toast.success(`OTP has been resent`);
      resendOTPRes = null;
    } else if (resendOTPRes && !resendOTPRes.isSuccess && resendOTPRes.errorMessages && resendOTPRes.errorMessages.length > 0) {
      setOTP("");
    }
  }, [resendOTPRes]);

  return (
    <React.Fragment>
      <Header />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} className="img-block">
            {/* <img src={'./'  + 'assets/img/two-factor-authentication.svg'} /> */}
            <img src={process.env.REACT_APP_RELATIVE_PATH + '/assets/img/two-factor-authentication.svg'} style={{ paddingLeft: "60px", height: "480px" }} />
          </Grid>

          <Formik
            initialValues={{
              mobile: '',
              email: '',
              isCaptchaVerified: 0
            }}
            onSubmit={(values: any, actions) => {
              setLoading(true);
              handleSubmit();
              console.log(values);
              setTimeout(() => {
                setLoading(false);
                actions.setSubmitting(false);
              }, 500)
            }}
          >
            {(props: FormikProps<ILoginForm>) => {
              const {
                values,
                touched,
                errors,
                handleBlur,
                handleChange,
                isSubmitting,
              } = props

              const verifyCallback = () => {
                // props.setFieldValue("isCaptchaVerified", 1)
              }
              return (
                <Grid item xs={12} md={6}>
                  <div className="loginsection" style={{ marginTop: "60px" }}>
                    <div className="loginblock">
                      {/* <img
                        className="shield"
                        // src={'./'  + 'assets/img/usershield.svg'}
                        src={process.env.REACT_APP_RELATIVE_PATH + '/assets/img/usershield.svg'}
                        height="70"
                      /> */}
                      <Form
                        className="login-form shadow-sm"
                        action="javascript;"
                        method="post"
                      >
                        <Typography className="usernamepass">
                          Please enter the 6-digit code that was sent to the email address and mobile phone number you provided on the previous screen.
                        </Typography>
                        <React.Fragment>
                          <div style={{ padding: "10px 0px 25px 30px" }}>
                            <OTPInput
                              value={strOTP}
                              onChange={handleOTPChange}
                              autoFocus
                              OTPLength={6}
                              otpType="number"
                              disabled={false}
                              secure={false}
                            />
                          </div>
                        </React.Fragment>
                        <div>
                          <ResendOTP
                            renderButton={renderButton}
                            renderTime={renderTime}
                            onResendClick={handleResendClick}
                            //maxTime={10}
                            maxTime={process.env.REACT_APP_OTP_EXPIRATION_TIME}
                            className="resend-otp-btn"
                            inputClassName="resend-styling"
                          />
                        </div>
                        <div className={hasErrored ? "error-span show" : "error-span"}>
                          {hasErrored ? "Please enter OTP" : ""}
                        </div>
                        <Button disabled={isSubmitDisabled} type="submit" className="submit-btn">
                          {loading && <CircularProgress variant="determinate" value={100} thickness={7} className="circularProgress" />}
                          Verify OTP
                        </Button>
                        {(
                          <div className="error-span show">
                            {otpRes && otpRes.isSuccess == false && otpRes.errorMessages
                              && otpRes.errorMessages.length > 0 ? (
                              <p>
                                {otpRes.errorMessages[0]
                                }
                              </p>
                            ) : null}
                          </div>
                        )}
                      </Form>
                    </div>
                  </div>
                </Grid>
              )
            }}
          </Formik>
        </Grid>

      </Box>
      <Footer />
    </React.Fragment>
  );
};

export default OTPVerficationForm;
