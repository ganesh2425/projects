import React, { useEffect, useState } from 'react'
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Button, Typography } from "@mui/material";
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
import { fetchResendOTPRequest } from "../../actions/resendOTPActions";
import { getLoginDetails } from "../../reducers/authReducer";
import { getResendOTPEnteredDetails } from "../../reducers/resendOTPReducer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { isNullOrUndefined } from 'util';

const ResendOTPVerficationForm = () => {
  let employerName = StorageService.getCookies("employerName");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formStatusProps: IFormStatusProps = {
    success: {
      message: 'OTP verified successfullyyyy.',
      type: 'success',
    },
    error: {
      message: 'Incorrect OTP details. Please try again.',
      type: 'error',
    },
  }
  const [formStatus, setFormStatus] = useState<IFormStatus>({
    message: '',
    type: '',
  })
  const [sentOTP, setSentOTP] = useState(false);
  const handleOTP = () => {
    setSentOTP(true);
  };
  const verifyOTP = () => {
    console.log("Verified");
  };
  const [strOTP, setOTP] = useState("");
  const handleOTPChange = (otp: any) => {
    setOTP(otp);
    setError(false);
    setDisplayFormStatus(false);
  };

  const [hasErrored, setError] = useState(false);
  const [displayFormStatus, setDisplayFormStatus] = useState(false);
  const data = {
    accessToken: StorageService.getCookies("accessToken"),
    otp: strOTP
  }
  const handleSubmit = () => {
    if (!strOTP) {
      setError(true);
    }
    else {
      dispatch(fetchOTPRequest(data));
      setError(false);
    }
  }

  const [otpData, setOTPData] = useState<OTPState>({
    pending: false,
    error: null,
    email: "",
    phoneNo: "",
    contactCertificationBox: "",
    qleCertificationBox: "",
    disclaimer:"",
    otp:"",
  });

  let otpRes = useSelector(getOTPEnteredDetails);
  useEffect(() => {
    if (otpRes && otpRes.qleCertificationBox && otpRes.isSuccess) {
      toast.success(`OTP verified successfully`);
      let email = otpRes.email;
      let phoneNo = otpRes.phoneNo;
      //otpRes = null;
      navigate(`/`+employerName+`/step1/0`);
      //navigate(`/form/${email}/${phoneNo}`);
      //setDisplayFormStatus(true);
      //setFormStatus(formStatusProps.success);
      setOTP("");
    }
    else if (otpRes && otpRes.isSuccess == false) {
      setDisplayFormStatus(true);
      setFormStatus(formStatusProps.error);
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

//   const loginData = {
//     email: StorageService.getCookies("email"),
//     mobile: StorageService.getCookies("mobile"),
//     isCaptchaVerified:1
// }

// const loginData = {
//   email: StorageService.getCookies("email"),
//   mobile: StorageService.getCookies("mobile"),
//   isCaptchaVerified:1
// }

// let loginRes = useSelector(getLoginDetails);
// useEffect(() => {
//   if (loginRes && loginRes.accessToken) {
//     toast.success(`OTP has been resent`);
//     loginRes.accessToken = "";
//   } else if (loginRes && loginRes.error) {
//     setDisplayFormStatus(true);
//     setFormStatus(formStatusProps.error);
//     setOTP("");
//   }
// }, [loginRes]);


  const handleResendClick = (e:any) => {
    setSubmitDisabled(false);
    //dispatch(fetchLoginRequest(loginData));
    dispatch(fetchResendOTPRequest(StorageService.getCookies("accessToken")));
    console.log("Resend Click");
    setOTP("");
    setDisplayFormStatus(false);
 }

 let resendOTPRes : any = useSelector(getResendOTPEnteredDetails);
useEffect(() => {
  if (resendOTPRes && resendOTPRes.isSuccess) {
    toast.success(`OTP has been resent`);
    resendOTPRes = null;
  } else if (resendOTPRes && !resendOTPRes.isSuccess) {
    setDisplayFormStatus(true);
    setFormStatus(formStatusProps.error);
    setOTP("");
  }
}, [resendOTPRes]);


  return (
    <React.Fragment>
      <Header />
      <Box sx={{ flexGrow: 1 }} style={{ padding: "16px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} className="img-block">
            {/* <img src={'./'  + 'assets/img/two-factor-authentication.svg'} /> */}
            <img src={process.env.REACT_APP_RELATIVE_PATH  + '/assets/img/two-factor-authentication.svg'} />
          </Grid>

          <Formik
            initialValues={{
              mobile: '',
              email: '',
              isCaptchaVerified: 0
            }}
            onSubmit={(values: any, actions) => {
              handleSubmit()
              console.log(values);
              setTimeout(() => {
                actions.setSubmitting(false)
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
                  <div className="loginsection">
                    <div className="loginblock">
                      <img
                        className="shield"
                        // src={'./'  + 'assets/img/usershield.svg'}
                        src={process.env.REACT_APP_RELATIVE_PATH  +  '/assets/img/usershield.svg'}
                        height="70"
                      />
                      <Form
                        className="login-form shadow-sm"
                        action="javascript;"
                        method="post"
                      >
                        <Typography className="usernamepass">
                          Enter 6-digits code received on your email or mobile
                        </Typography>
                        <React.Fragment>
                          <div style={{ padding: "10px 0px 25px" }}>
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
                              maxTime={10}
                              className="resend-otp-btn"
                              inputClassName="resend-styling"
                            />
                          </div>
                        <div className={hasErrored ? "error-span show" : "error-span"}>
                          {hasErrored ? "Please enter OTP" : ""}
                        </div>
                        <div className="submit-btn">
                          <Button disabled={isSubmitDisabled} type="submit">Verify OTP</Button>
                        </div>
                        { (
                          <div className="error-span show">
                            { displayFormStatus && formStatus.type === 'error' ? (
                              <p>
                                {formStatus.message}
                              </p>
                            ) : null}
                          </div>
                        )}
                        {/* <div className="resend-otp-btn" onClick={() => resendOTP()}>
                          <Button className="resend-styling">Resend OTP</Button>
                        </div> */}
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

export default ResendOTPVerficationForm;
