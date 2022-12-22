import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button, CircularProgress, Typography } from "@mui/material";
import Header from "../Header";
import Footer from "../Footer";
import OTPInput, { ResendOTP } from "otp-input-react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, FormikProps, Form } from "formik";
import { fetchOTPRequest } from "../../actions/otpActions";
import { OTPState } from "../../interfaces/types";
import StorageService from "../../services/Storage.service";
import { getOTPEnteredDetails } from "../../reducers/otpReducer";
import {
  ILoginForm,
} from "../../interfaces/loginType";
import "./style.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { fetchResendOTPRequest } from "../../actions/resendotpActions";
import { getResendOTPEnteredDetails } from "../../reducers/resendOTPReducer";

const OTPVerficationForm = () => {
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
  const [displayFormStatus, setDisplayFormStatus] = useState(false);
  const data = {
    accessToken: StorageService.getCookies("accessToken"),
    otp: strOTP,
  };
  const [loading, setLoading] = useState(false);
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
    otp:"",
  });

  let otpRes = useSelector(getOTPEnteredDetails);
  useEffect(() => {
    if (otpRes && otpRes.phoneNo && otpRes.isSuccess) {
      setLoading(false);
      setSubmitDisabled(false);
      toast.success(`OTP verified successfully`);
      navigate(`/`+StorageService.getCookies("employerName")+"/startAca");
      setOTP("");
    }  else if (otpRes && otpRes.isSuccess == false) {
      setLoading(false);
      setSubmitDisabled(false);
      setDisplayFormStatus(true);
      setOTP("");
    }
  }, [otpData.error, otpRes]);

  const renderButton = (buttonProps: any) => {
    if (buttonProps.remainingTime != 0) {
      console.log("submit should be enabled");
    } else {
      console.log("submit should be disabled");
    }
    return (
      <button {...buttonProps}>
        {buttonProps.remainingTime !== 0
          ? `Resend OTP in ${buttonProps.remainingTime}s`
          : "Resend OTP"}
      </button>
    );
  };

  const renderTime = () => React.Fragment;

  const [isSubmitDisabled, setSubmitDisabled] = useState(false);

  const handleResendClick = (e: any) => {
    if (otpRes && otpRes.isSuccess == false && otpRes.errorMessages
      && otpRes.errorMessages.length > 0) {
      otpRes.errorMessages[0] = "";
    }
    setSubmitDisabled(false);
    setError(false);
    dispatch(fetchResendOTPRequest(StorageService.getCookies("accessToken")));
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
            <img
              src={
                process.env.REACT_APP_RELATIVE_PATH +
                "/assets/img/two-factor-authentication.svg"
              }
			  style={{ paddingLeft: "60px", height: "480px" }}
            />
          </Grid>

          <Formik
            initialValues={{
              mobile: "",
              email: "",
              isCaptchaVerified: 0,
            }}
            onSubmit={(values: any, actions) => {

              setLoading(true);
              handleSubmit();
              setTimeout(() => {
                setLoading(false);
                actions.setSubmitting(false);
              }, 500);
            }}
          >
            {(props: FormikProps<ILoginForm>) => {
              return (
                <Grid item xs={12} md={6}>
                  <div className="loginsection" style={{ marginTop: "60px" }}>
                    <div className="loginblock">
                     
                      <Form
                        className="login-form shadow-sm"
                        action="javascript;"
                        method="post"
                      >
                        <Typography className="usernamepass">
                          Enter 6-digits code received on your email or mobile
                        </Typography>
                        <React.Fragment>
                          <div style={{ padding: "10px 10px 25px 50px" }}>
                            <OTPInput ms={3}
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
                            // maxTime={10}
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
              );
            }}
          </Formik>
        </Grid>
      </Box>
      <Footer />
    </React.Fragment>
  );
};

export default OTPVerficationForm;
