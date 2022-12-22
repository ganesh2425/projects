import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import EmailIcon from "@mui/icons-material/Email";
import { useNavigate } from "react-router-dom";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
// import "./style.css";
import { useDispatch,useSelector} from "react-redux";
import { IForgotPwdForm} from "../../../interfaces/forgotPwdType";
import { toast } from "react-toastify";
import { fetchForgotPwdRequest } from "../../../actions/forgotPwdActions";
 import { getForgotPwdDetails } from "../../../reducers/forgotPwdReducer";


const ForgotPwd = () => {
  const dispatch = useDispatch();

  const [formStatus, setFormStatus] = useState('');

  let forgotPwdRes:any = useSelector(getForgotPwdDetails);
 
  const  forgotPassword= (data: any) => {
    if(data.email){
      dispatch(fetchForgotPwdRequest(data));
    }
  };
  
  const  handleInput = (data: any) => {
    setFormStatus(" ");
  };

  useEffect(() => {
    if (forgotPwdRes && forgotPwdRes['data'] && !forgotPwdRes['pending']) {
      if( forgotPwdRes['data'].isSuccess == true){
       toast.success(`Password Sent Successfully`);
       setTimeout(() => {
        window.location.assign("/");
        }, 2000);
      } 
      else{
        setFormStatus(forgotPwdRes['data'].errorMessages[0]);
      }
    }
  }, [forgotPwdRes]);
  
  const validationSchema = yup.object({
    email: yup.string()
    .email('Please enter valid email format')
      .required('Please enter a valid email'),
  });

  const formik = useFormik({
    initialValues: {
      email: ""  
    },
    validationSchema: validationSchema,
    onSubmit: (values: IForgotPwdForm, actions) => {
      forgotPassword(values);
    },
  });

  return (
    <React.Fragment>
      <Box
        sx={{ flexGrow: 1 }}
        style={{ margin: "92px 150px", background: "#f2f2f2" }}
      >
        <Grid container spacing={6}>
          <Grid item xs={12} md={6} className="img-block">
            <img src={ process.env.PUBLIC_URL + "/assets/img/forgot-password.png"}
            height={"550px"}
            width={"550px"}/>
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
                      label="Email"
                      id="email"
                      type="email"
                      name="email"
                      InputProps={{
                        endAdornment: (
                          <EmailIcon style={{ color: "rgba(0,0,0,.5)" }} />
                        ),
                        style: { borderRadius: 0 },
                      }}
                      value={formik.values.email}
                      //onChange={formik.handleChange}
                      onChange={(e) => {formik.handleChange(e); handleInput(e)}}
                      error={
                        formik.touched.email &&
                        Boolean(formik.errors.email)
                      }
                      helperText={
                        formik.touched.email && formik.errors.email
                      }
                    />
                  </div>
                  
                </React.Fragment>
                <div
                  className="submit-btn"
                  onClick={() => {
                    formik.handleSubmit();
                  }}
                >
                  <Button sx={{ color: "#fff", textTransform: "capitalize" }} type="submit">
                    Submit
                  </Button>
                </div>
              
                <div
                className={
                  formStatus
                    ? "error-span login"
                    : "error-span"
                }
              >
                {formStatus ? formStatus : ""}
              </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
 
};

export default ForgotPwd;
