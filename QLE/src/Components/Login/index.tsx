import React, { useEffect, useState } from 'react';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Button, Typography, CircularProgress } from "@mui/material";
import Header from "../Header";
import Footer from "../Footer";
import TextField from "@mui/material/TextField";
import PhoneIphoneRoundedIcon from "@mui/icons-material/PhoneIphoneRounded";
import EmailIcon from "@mui/icons-material/Email";
import Recaptcha from "react-recaptcha";
// import OTPInput, { ResendOTP } from "otp-input-react";
import { useNavigate } from "react-router-dom";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import { ILoginForm, IFormStatus, IFormStatusProps } from "../../interfaces/loginType";
import { useDispatch, useSelector } from "react-redux";
import { LoginState } from "../../interfaces/types";
import { getLoginDetails } from "../../reducers/authReducer";
import StorageService from "../../services/Storage.service";
import { commonAction } from "../../actions/configActions";
import { fetchLoginRequest } from "../../actions/authActions";
import { PHONECOUNTRYCODE } from "../../constants/actionTypes";

const formStatusProps: IFormStatusProps = {
  success: {
    message: 'Access successful.',
    type: 'success',
  },
  error: {
    message: 'Incorrect details. Please try again.',
    type: 'error',
  },
}

const Login = () => {
  let employerNameCoki = StorageService.getCookies("employerName");
  const dispatch = useDispatch();
  const [displayFormStatus, setDisplayFormStatus] = useState(false)
  const [loginData, setLoginData] = useState<LoginState>({
    pending: false,
    error: null,
    accessToken: ''
  });
  const [formStatus, setFormStatus] = useState<IFormStatus>({
    message: '',
    type: '',
  })

  const loginRes = useSelector(getLoginDetails);
  useEffect(() => {
    if (loginRes.accessToken && !loginData.accessToken) {
      setLoginData(loginRes)
      setFormStatus(formStatusProps.success)
      StorageService.setCookies('accessToken', loginRes.accessToken);
      navigate(`/`+employerNameCoki+"/verify-otp");
      document.location.reload();
      dispatch(commonAction({ entity_admin: false, entity_user: false }));
      setLoading(false);
    } else if (loginRes.error === 'Unauthorized') {
      document.body.classList.remove("api-loading");
      // toast.error('Invalid login credentials, Please try again');
      setDisplayFormStatus(true)
      setLoading(false);
      setFormStatus(formStatusProps.error)
    }
  }, [loginData.accessToken, loginRes]);

  const CheckLogin = (data: ILoginForm, resetForm: () => void) => {
    StorageService.setCookies('email', data.email);
    StorageService.setCookies('mobile', data.mobile);
    if (captchaResponse) {
      dispatch(fetchLoginRequest(data));
    }
    else {
      setCaptchaResponse("");
    }
  }

  const [captchaResponse, setCaptchaResponse] = useState("");

  //let isSubmitted = false;

  const callback = function () {
    console.log('Done!!!!');
  };

  const captureCaptcha = (value: any) => {
    console.log("Captcha value:", value);
  };

  const [sentOTP, setSentOTP] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
  const [isSubmitDisabled, setSubmitDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    mobile: yup
      .string()
      .min(10, "Mobile Number should be of minimum 10 characters length")
      //.matches(PHONECOUNTRYCODE, "Please enter mobile number with country code")
      .required("Mobile Number is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      mobile: "",
      isCaptchaVerified: 0
    },
    validationSchema: validationSchema,
    onSubmit: (values: ILoginForm, actions) => {
      //alert(JSON.stringify(values, null, 2));
      setSubmitDisabled(true);
      setLoading(true);
      setSubmitted(true);
      CheckLogin(values, actions.resetForm)
      console.log(values);
      setTimeout(() => {
        setLoading(false);
        setSubmitDisabled(false);
        actions.setSubmitting(false)
      }, 500)
    },
  });

  const verifyCallback = (response: any) => {
    setCaptchaResponse(response);
  }

  const handleOTP = () => {
    setSentOTP(true);
    navigate(`/`+employerNameCoki+"/verify-otp");
  };

  return (
    <React.Fragment>
      <Header />
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} className="img-block">
              {/* <img src={'./'  + 'assets/img/two-factor-authentication.svg'} /> */}
              <img style={{ paddingLeft: "60px", height: "480px" }} src={process.env.REACT_APP_RELATIVE_PATH + '/assets/img/two-factor-authentication.svg'} />
            </Grid>
            <Grid item xs={12} md={6}>
              <div className="loginsection" style={{ marginTop: "10px", marginBottom: "10px" }}>
                <div className="loginblock">
                  {/* <img
                    className="shield"
                    // src={'./'  + 'assets/img/usershield.svg'}
                    src={process.env.REACT_APP_RELATIVE_PATH + '/assets/img/usershield.svg'}

                    height="60"
                  /> */}

                  <Typography className="usernamepass">
                    For added security, we will send you a 6-digit code to enter on the next screen. Please provide an email address and mobile phone number, to which we will send the code
                  </Typography>
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
                    <div style={{ padding: "5px 0px" }}>
                      <TextField
                        fullWidth
                        label="Mobile +1-XXX-XXX-XXXX"
                        id="mobile"
                        name="mobile"
                        InputProps={{
                          endAdornment: <PhoneIphoneRoundedIcon style={{ color: "rgba(0,0,0,.5)" }} />,
                          style: { borderRadius: 0 },
                        }}
                        value={formik.values.mobile}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.mobile && Boolean(formik.errors.mobile)
                        }
                        helperText={formik.touched.mobile && formik.errors.mobile}
                      />
                    </div>
                    <div
                      style={{
                        maxWidth: "300px",
                        margin: "0 auto",
                        padding: "10px 0px 20px 0px",
                      }}
                    >
                      <Recaptcha
                        sitekey="6LfhEoAeAAAAAIuO0SM9eanP7xI2aZnJwOfTGRRc"
                        render="explicit"
                        onloadCallback={callback}
                        verifyCallback={verifyCallback}
                      />
                    </div>
                    {console.log(isSubmitted)}
                    <div className={isSubmitted && !captchaResponse ? "error-span show" : "error-span"}>
                      {!captchaResponse ? "Please verify captcha" : ""}
                    </div>
                  </React.Fragment>
                  <Button disabled={isSubmitDisabled} type="submit" className="submit-btn">
                    {loading && <CircularProgress variant="determinate" value={100} thickness={7} className="circularProgress" />}
                    Submit
                  </Button>
                </div>
              </div>
            </Grid>
          </Grid>
        </Box>
      </form>
      <Footer />
    </React.Fragment>
  );
};

export default Login;
