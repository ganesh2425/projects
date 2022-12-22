/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Button, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import {
  ILoginForm,
  ITempLoginForm,
  IFormStatus,
  IFormStatusProps,
} from "../../interfaces/loginType";
import { LoginState } from "../../interfaces/types";
import { getLoginDetails } from "../../reducers/authReducer";
import StorageService from "../../services/Storage.service";
import { history } from "../../config/history";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import EmailIcon from "@mui/icons-material/Email";
import Recaptcha from "react-recaptcha";
// import OTPInput, { ResendOTP } from "otp-input-react";
import { useNavigate } from "react-router-dom";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoginRequest } from "../../actions/authActions";
import { ActionTypes } from "@mui/base";
import { commonAction } from "../../actions/configActions";
import { toast } from "react-toastify";

const formStatusProps: IFormStatusProps = {
  success: {
    message: "Access successful.",
    type: "success",
  },
  error: {
    message: "Incorrect details. Please try again.",
    type: "error",
  },
};

const Login = () => {
  const dispatch = useDispatch();
  const [displayFormStatus, setDisplayFormStatus] = useState(false);
  const [loginData, setLoginData] = useState<LoginState>({
    pending: false,
    error: null,
    accessToken: "",
    message:""
  });
  const [formStatus, setFormStatus] = useState<IFormStatus>({
    message: "",
    type: "",
  });

  const [isSubmitted, setSubmitted] = useState(false);

  const loginRes:any = useSelector(getLoginDetails);

  const newToken = StorageService.getCookies("newToken");

  useEffect(() => {
     //if (loginRes.accessToken && !loginData.accessToken) {
    //if (loginRes.accessToken && (!token && token != "")) {
    if(loginRes.accessToken && newToken && newToken!= "" && loginRes.accessToken == newToken){
      //setLoginData(loginRes);
      setFormStatus(formStatusProps.success);
      StorageService.setCookies("accessToken", loginRes.accessToken);
      navigate("/dashboard");
      //dispatch(commonAction({ entity_admin: false, entity_user: false }));
    } 
    else if (loginRes.error === "Unauthorized") {
      document.body.classList.remove("api-loading");
      //toast.error('Invalid login credentials, Please try again');
      setDisplayFormStatus(true);
      setFormStatus(formStatusProps.error);
      console.log(formStatus)
    }
  }, [loginRes]);

  //   useEffect(() => {
  //     if (loginRes.accessToken) {
  //       StorageService.setCookies("token", loginRes.accessToken);
  //       window.location.assign("/roles");
  //     } else {
  //     }
  //   }, [loginData.accessToken, loginRes]);

  // const tempData: ITempLoginForm = {
  //   username: "",
  //   password: "",
  // };

  const CheckLogin = (data: ITempLoginForm, resetForm: () => void) => {
    StorageService.setCookies("username", data.username);
    StorageService.setCookies("password", data.password);
    if (captchaResponse) {
      dispatch(fetchLoginRequest(data));
    } else {
      setCaptchaResponse("");
    }
  };

  const [captchaResponse, setCaptchaResponse] = useState("");
  const navigate = useNavigate();

  var callback = function () {
    console.log("Done!!!!");
  };

  const captureCaptcha = (value: any) => {
    console.log("Captcha value:", value);
  };



  const validationSchema = yup.object({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  });

  var handleForgotPwd = function () {
    navigate("/forgotPassword");
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      isCaptchaVerified: 0,
    },
    validationSchema: validationSchema,
    onSubmit: (values: ILoginForm, actions) => {
      // alert(JSON.stringify(values, null, 2));
      setSubmitted(true);
      CheckLogin(values, actions.resetForm);
      console.log(values);
      setTimeout(() => {
        actions.setSubmitting(false);
      }, 500);
    },
  });

  const verifyCallback = (response: any) => {
    setCaptchaResponse(response);
  };
  return (
    <React.Fragment>
      <Box
        sx={{ flexGrow: 1 }}
        style={{ margin: "92px 150px", background: "#f2f2f2" }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} className="img-block">
            <img src={ process.env.PUBLIC_URL + "/assets/img/vcg-login.svg"} />
          </Grid>
          <Grid item xs={12} md={6}>
            <div className="loginsection">
              <div className="loginblock">
                <img
                  className="shield"
                  src={ process.env.PUBLIC_URL + "/assets/img/vcg-logo.svg"}
                  height="100"
                />
                <React.Fragment>
                  <div style={{ padding: "10px 0px" }}>
                    <TextField
                      fullWidth
                      label="Username"
                      id="username"
                      type="text"
                      name="username"
                      InputProps={{
                        endAdornment: (
                          <EmailIcon style={{ color: "rgba(0,0,0,.5)" }} />
                        ),
                        style: { borderRadius: 0 },
                      }}
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.username &&
                        Boolean(formik.errors.username)
                      }
                      helperText={
                        formik.touched.username && formik.errors.username
                      }
                    />
                  </div>
                  <div style={{ padding: "10px 0px" }}>
                    <TextField
                      fullWidth
                      label="Password"
                      id="password"
                      type="password"
                      name="password"
                      InputProps={{
                        endAdornment: (
                          <LockOpenIcon style={{ color: "rgba(0,0,0,.5)" }} />
                        ),
                        style: { borderRadius: 0 },
                      }}
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                      helperText={
                        formik.touched.password && formik.errors.password
                      }
                    />
                  </div>
                  <p>
                  {/* <a href="/forgotPassword">Forgot Password</a> */}
                  <a href="" onClick={handleForgotPwd}>Forgot Password</a>
                  </p>

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
                  <div
                    className={
                      isSubmitted && !captchaResponse
                        ? "error-span show"
                        : "error-span"
                    }
                  >
                    {!captchaResponse ? "Please verify captcha" : ""}
                  </div>
                </React.Fragment>
                <div
                  className="submit-btn"
                  onClick={() => {
                    formik.handleSubmit();
                  }}
                >
                  <Button sx={{ color: "#fff", textTransform: "capitalize" }}>
                    Login
                  </Button>
                </div>
                <div
                className={
                  formStatus && formStatus.type == "error"
                    ? "error-span login"
                    : "error-span"
                }
              >
                {formStatus && formStatus.type == "error" ? "'Invalid login credentials, Please try again'" : ""}
              </div>

              </div>
            </div>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default Login;
