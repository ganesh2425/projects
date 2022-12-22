import React, { useEffect, useRef, useState } from "react";
import Header from "../Header";
import SwipeableSidenavbar from "../Sidenavbar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { largeScrees, smallScreen } from "../../Helper/slider";
import { makeStyles } from "@mui/styles";
import { useNavigate, useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import DraggableComponent from "../Draggable";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Footer from "../../Components/Footer"


import {
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import "./style.css";
import { getUserProfileDetails } from "../../reducers/userProfileReducer/getUserProfileReducer";
import { fetchGetUserProfileRequest } from "../../actions/userProfile/getUserProfileActions";
import { useDispatch,useSelector } from "react-redux";
import { Form, Formik, FormikProps, useFormik } from "formik";
import { IAddUserProfile, IChangeUserProfile } from "../../interfaces/employerType";
import { EditUserProfile, IUserProfile } from "../../interfaces/types";
import { fetchEditUserProfileRequest } from "../../actions/userProfile/editUserProfile";
import { styled } from "@mui/material/styles";
import { getEditUserProfileDetails } from "../../reducers/userProfileReducer/editUserProfile";
import { toast } from "react-toastify";
import * as yup from "yup";
import { ChangeUserProfilePasswordDetails } from "../../reducers/userProfileReducer/changePasswordReducer";
import * as Yup from 'yup';
import { fetchChangeUserProfilePasswordRequest } from "../../actions/userProfile/changePasswordActions";
import { getUploadImageEnteredDetails } from "../../reducers/userProfileReducer/uploadImageReducer";
import { getUploadImageDetails } from "../../reducers/userProfileReducer/getUploadImageReducer";
import { fetchGetUploadImageRequest } from "../../actions/userProfile/getUploadImageActions";
import { fetchUploadImageRequest } from "../../actions/userProfile/uploadImageActions";

const useStyles = makeStyles({
  root: {
    "& .MuiInputLabel-root": { top: "-3px" },
    "& .MuiOutlinedInput-root": { borderRadius: "0px" },
    "& .css-xso64x-MuiTableCell-root": { padding: "10px !important" },
  },
});

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const User_profile = (props: any) => {
  const [headerValues, setHeaderValues] = useState({ sidebar: 2, header: 10 });
  const handleHeaders = () => {
    headerValues.sidebar == 2
      ? setHeaderValues(smallScreen())
      : setHeaderValues(largeScrees());
  };

  const [reportResult, setReportResult] = React.useState("");
  const [checked, setChecked] = React.useState(false);
  const containerRef = React.useRef(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const navigate = useNavigate();
  const [organisation, setOrganisation] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  //   const [dialogOpen, setDialogOpen] = React.useState(false);
  const fileInput = React.useRef(null)
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "left",
    color: theme.palette.text.secondary,
    borderRadius: "0px",
    boxShadow: "none",
  }));
  
  const [data, setValues] = React.useState({
    password: "",
    showPassword: false,
    confirmPassword: "",
    showConfirmPassword: false,
  });

  
  const handleClickShowPassword = (e: any) => {
    setValues({
      ...data,
      showPassword: !data.showPassword,
    });
  };

  const handleClickShowConfirmPassword = (e: any) => {
    setValues({
      ...data,
      showConfirmPassword: !data.showConfirmPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const [editorPhoneData, seteditorPhoneData] = React.useState("");
  const [editPhone,setEditPhone] = React.useState("")

  const handlePhoneLogData = (e: any) => {

    setEditPhone(e.target.value);
   }

   const handlePhoneData = (e: any) => {
 
    seteditorPhoneData(e.target.value);
   }
  
  const validationSchema = yup.object({
    firstName: yup.string().required("First Name is required"),
    lastName: yup
    .string()
    .required("Last Name is Required"),
   
    
  });
  const validation = Yup.object().shape({
    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
        .required('Confirm Password is required')
        .oneOf([Yup.ref('password')], 'Passwords must match')
        
});

// -------------------uploadImage----------------- 
const [save, setSave] = useState("");
const uploadImageRes:any = useSelector(getUploadImageEnteredDetails)
var resp:any = uploadImageRes.data

useEffect(() => {
  if (resp  && resp.isSuccess === true) {
    toast.success("Image  Uploaded Successfully");
    getUploadImage()
    uploadImageRes.data = null;
  } else if (resp && resp.isSuccess === false) {
    toast.error(resp.errorMessages[0]);
    resp.errorMessages[0]=null
  }
}, [resp]);


  const handleFiles = (e: any) => {
    setSave(e.target.files[0]);
  };
 
  const handleUpload = (e: any) => {
    const formData = new FormData();
      formData.append("image", save);
      dispatch(fetchUploadImageRequest({ formData }));
     
  };

//---------------------get upload image ---------------------

const getUploadImageRes:any = useSelector(getUploadImageDetails)
var res = getUploadImageRes.data

const [image,setImage] = useState("")

useEffect(() => {
  if (res) {
    const file = new Blob([res], { type:'image/png' })
    var fileURL = URL.createObjectURL(file);
    setImage(fileURL);
    getUploadImageRes.data=null
  }
},[res]);

useEffect(() => {
  getUploadImage()
},[]);

const getUploadImage = () => {
  dispatch(fetchGetUploadImageRequest({}))
}

  //------------------user Profile ---------------------

  const getUserProfileRes:any = useSelector(getUserProfileDetails)
 

  const getUserProfile = () => {
    dispatch(
      fetchGetUserProfileRequest({})
    );
  };
  useEffect(() => {
      if (getUserProfileRes) {
        setIntialValues({
          firstName: getUserProfileRes['firstName'],
          middleName: getUserProfileRes['middleName'],
          lastName: getUserProfileRes['lastName'],
          email:getUserProfileRes["email"],
         
        });
      }
     else {
      setIntialValues({
        firstName:"",
        lastName:"",
        middleName:"",
        email:""
       
      });
    }
  }, [getUserProfileRes]);
  const dispatch = useDispatch()
  let editUserProfileRes:any = useSelector(getEditUserProfileDetails);

  useEffect(() => {
    if (editUserProfileRes && editUserProfileRes.isSuccess === true) {
       toast.success(`User Profile Edited Successfully`);
       getUserProfile()
       editUserProfileRes.isSuccess = false;
      
    }
  }, [editUserProfileRes]);

  let NotesResp:any=useSelector(ChangeUserProfilePasswordDetails);

  useEffect(() => {
    let value=NotesResp['isSuccess'];
     
    if(NotesResp.pending === false){
    if(NotesResp.isSuccess === false && NotesResp.errorMessages.length === 1  ){
      toast.error(NotesResp.errorMessages[0])
      NotesResp.errorMessages[0]=null
    }
    else if(NotesResp.isSuccess === true && NotesResp.errorMessages.length === 0){
        toast.success("Password Changed successfully")
        NotesResp.isSuccess=false
    }
    
   }
  },[NotesResp])
  const [passwordConfirmation, setPasswordConfirmation] = useState(true);

  const handlePhoneSubmit = (e:any) => {
     e.preventDefault()
      setSubmitted(true)
      const tempData: any = {
        "password": editPhone,
        "confirmPassword":editorPhoneData,
      }

      if(editPhone === editorPhoneData){
        setPasswordConfirmation(true)
        dispatch(fetchChangeUserProfilePasswordRequest(tempData));
      }else{
        setPasswordConfirmation(false)
      }   
  }
  const [isSubmitted, setSubmitted] = useState(false);

  
  const [initialValues, setIntialValues] = useState<IAddUserProfile>({
    firstName:"",
    lastName:"",
    middleName:"",
    email:""
  });
 
return(
  <>
   <Formik
        initialValues={initialValues}
        onSubmit={(values: IAddUserProfile) => {
         
          const tempEditEmployer: EditUserProfile = {
            "firstName": values.firstName,
            "lastName": values.lastName,
            "middleName": values.middleName,
            "email": values.email,
            
          }
            dispatch(fetchEditUserProfileRequest(tempEditEmployer));
           
        }}
        validationSchema={validationSchema}
        enableReinitialize
      >
        {(props: FormikProps<IAddUserProfile>) => {
          const {
            values,
            touched,
            errors,
            handleBlur,
            handleChange,
            isValid,
            dirty,
          } = props;
         
          
   return(

  <Form>
  <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
          <Grid
            xs={6}
            style={{ transition: "500ms", background: "#f2f2f2" }}
            md={headerValues.sidebar}
            item
          >
            <SwipeableSidenavbar width={headerValues.sidebar} />
          </Grid>
          <Grid
            item
            xs={6}
            style={{ transition: "500ms", background: "#f2f2f2" }}
            md={headerValues.header}
          >
            <Header handleHeaders={handleHeaders} />

            <Box style={{ margin: "41px 15px 10px" }} sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid className="title-styling" item xs={10}>
                  Profile
                </Grid>
              </Grid>
            </Box>

            <Grid container spacing={1} justifyContent="space-between">
              <Grid item xs={6}>
                <Paper sx={{ margin: "10px", boxShadow:"none" }}>
                <Box sx={{ padding: "20px" }} >
                  <Typography className="profile-header" variant="h6"   >
                    {" "}
                    Personal Information{" "}
                  </Typography>
                  <Grid container spacing={1} sx={{marginBottom:"12px"}}  >
                    <Grid item xs={3}>

                        <img src={image}  />
                     
                    </Grid>

                    <Grid item xs={9}>
                      <label id="first">
                      <Typography component="div">
                         <TextField
                          id="choose-file"
                          type="file"
                          onChange={handleFiles}
                          sx={{width:"250px",cursor: "pointer !important"}}
                      
                          
                      />
                               <Button
                                      onClick={handleUpload}
                                      variant="contained"
                                      className="save-btn-role"
                                     sx={{ml:2}}
                                    >
                                      upload
                                    </Button>
                      </Typography>
                    </label>
                    
                     </Grid>
                    </Grid>

                  <Grid container spacing={2} >
                    <Grid item xs={12}>
                     
                       <TextField
                        id="firstName"
                        label="First Name"
                        variant="outlined"
                        fullWidth
                        name="firstName"
                        value={values.firstName}
                       onChange={handleChange}
                       error={touched.firstName && Boolean(errors.firstName)}
              helperText={touched.firstName && errors.firstName}
              
                      />
                    
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="middleName"
                        label="Middle Name"
                        variant="outlined"
                        fullWidth
                        value={values.middleName}
                         onChange={handleChange}
              error={touched.middleName && Boolean(errors.middleName)}
              helperText={touched.middleName && errors.middleName}
                      />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        id="outlined-basic"
                        label="Last Name"
                        variant="outlined"
                        fullWidth
                        name="lastName"
                        value={values.lastName}
                        onChange={handleChange}
                        error={touched.lastName && Boolean(errors.lastName)}
                        helperText={touched.lastName && errors.lastName}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="email"
                        name="email"
                        label="Email Address"
                        variant="outlined"
                        value={values.email}
                        fullWidth
                        disabled
                        onChange={handleChange}
                        className="disable-styling"
                      />
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    sx={{
                      display: "flex",
                      flexDirection: "row-reverse",
                      marginTop: "10px ",
                    }}
                  >
                    <Button
                      variant="contained"
                      className="save-btn-role"
                      type="submit"
                    >
                      Save Updates
                    </Button>
                  </Grid>
                  </Box>
                </Paper>
              </Grid>
             
              <Grid item xs={6}>
                <Paper sx={{ padding: "20px", margin: "10px", boxShadow:"none" }}>
            
                  <Typography className="profile-header" variant="h6"   >
                    {" "}
                    Change Password{" "}
                  </Typography>
                  <FormControl sx={{width: "100%" }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={data.showPassword ? "text" : "password"}
                      value={editPhone}
                      name="password"
                      fullWidth
                      onChange={handlePhoneLogData}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {data.showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                     <div className={!editPhone && isSubmitted ? "error-span show" : "error-span"}>
                        {!editPhone && isSubmitted? "Enter Password" : ""}
                      </div>
                      
                  </FormControl>

            
                  <FormControl sx={{ width: "100%", marginTop:"12px" }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      Confirm Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={data.showConfirmPassword ? "text" : "password"}
                      value={editorPhoneData}
                      name="confirmPassword"
                      fullWidth
                      onChange={handlePhoneData}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={(e) => handleClickShowConfirmPassword(e)}
                            onMouseDown={(e) => handleMouseDownPassword(e)}
                            edge="end"
                          >
                            {data.showConfirmPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Confirm Password"
                    />

                     { !passwordConfirmation && <div className= "error-span show">
                        password not matched
                      </div>
                    }
                     
                  </FormControl>

                  <Grid
                    item
                    sx={{
                      display: "flex",
                      flexDirection: "row-reverse",
                      marginTop: "10px",
                    }}
                  >
                    <Button
                      variant="contained"
                      className="save-btn-role"
                      onClick={handlePhoneSubmit}
                    
                    >
                      Update Password
                    </Button>
                  </Grid>
                 
                </Paper>
              </Grid>
             
            </Grid>

            <Footer/>
          </Grid>
        </Grid>
      </Box>
           </Form> 
  )
      }}
      </Formik>
    </>
  )  
}

export default User_profile;
