// import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import {
  Card,
  CardContent,
  Checkbox,
  FormControl,
  Grid,
  makeStyles,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./style.css";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Header from "../Header";
import Footer from "../Footer";
import RequestBenefitChanges from "../RequestBenefitChanges";
import RequestBenefitChangesCancel from "../RequestBenefitChangesCancel";
import StartMyQLE from "../StartMyQLE";
import UploadDocumentation from "../UploadDocumentation";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getStep1Details } from "../../reducers/getStep1Reducer";
import { fetchGetStep1Request } from "../../actions/getStep1Actions";
import { useDispatch, useSelector } from "react-redux";
import StorageService from "../../services/Storage.service";

const steps = [
  "Start My QLE",
  "Request Benefit Changes",
  "Upload Documentation",
];

//   const useStyles = makeStyles(() => {
//       root: {
//           "& .css-1hfw69i-MuiButtonBase-root-MuiButton-root:hover": "orange"
//       }
//   })

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

//const QLEForm = () => {
  const QLEForm = ({ token }: any) => {
  let params = useParams();
  const dispatch = useDispatch();
  
  const [value, setValue] = React.useState("");
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});
  
  let employerNameCoki = StorageService.getCookies("employerName");
  const [disabled, setDisabled] = useState(true);
  const [isHandleStep, setIsHandleStep] = useState(false);

  const navigate = useNavigate();

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
     if (completedSteps() === totalSteps())  {
       navigate('/'+employerNameCoki+"/form-thankyou");
       return true;
     }
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    //setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setActiveStep(activeStep - 1);
  };

 

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  let getStep1Res: any = useSelector(getStep1Details);

  useEffect(() => {
    getStep1ByEventId();
  }, []);

  const getStep1ByEventId = () => {
    getStep1Res = null;
    let eventToken = StorageService.getCookies("eventToken");
    let token: any = params.token ? params.token : eventToken;
    if (token && token !== "0")
      dispatch(
        fetchGetStep1Request({ token })
      );
  };

  useEffect(() => {
    if (getStep1Res && getStep1Res['eventId'] > 0) {
      let eventToken = StorageService.getCookies("eventToken");
      console.log(getStep1Res['eventId']);
      if(!isHandleStep && params.token){
       setActiveStep(getStep1Res['step'] - 1); //commenting for time being
      }
      else if (!isHandleStep && getStep1Res.token && getStep1Res.step == 1){
        setActiveStep(1);
      }
      else if (!isHandleStep && getStep1Res.token && getStep1Res.step == 2){
        setActiveStep(2);
      }
      //else {setActiveStep(1);}
      setDisabled(false);
    }
  else if(getStep1Res && getStep1Res.step == 3 
    // && getStep1Res.status == "PendingReview"
    ){
    //navigate("/form-thankyou");
    navigate(`/`+employerNameCoki+`/form-thankyou/${getStep1Res.status}`);
  }
  }, [getStep1Res]);

  const handleStep = (step: number) => () => {
    setActiveStep(step);
    setIsHandleStep(true);
  };

  return (
    <>
      <Header />
      <div className="content">
        <div className="layout-padding">
          <div className="steps-inst-styling">
            Click on steps 1, 2, 3 below to navigate between steps
          </div>
          <Box sx={{ width: "100%" }}>
            <Stepper
              sx={{ margin: "2rem 1px", display: { xs: "none", md: "flex" } }}
              nonLinear
              activeStep={activeStep}
            >
              {steps.map((label, index) => (
                <Step key={label} completed={completed[index]}>
                  <StepButton color="inherit" onClick={handleStep(index)} 
                  // disabled={disabled} 
                  //disabled={!(index - activeStep)}
                  disabled={getStep1Res && getStep1Res['eventId'] == 0 }
                  >
                    <span
                      style={{ fontSize: "1rem", fontWeight: "600" }}
                      className={activeStep === index ? "step-styling" : ""}
                    >
                      {" "}
                      {label}{" "}
                    </span>
                  </StepButton>
                </Step>
              ))}
            </Stepper>

            <Stepper
              className="steper-hide"
              sx={{ margin: "2rem 1px", display: { xs: "flex", md: "none" } }}
              nonLinear
              activeStep={activeStep}
            >
              {steps.map((label, index) => (
                <React.Fragment>
                  <Step key={label} completed={completed[index]}>
                    <StepButton color="inherit" onClick={handleStep(index)} >
                      <span
                        style={{ fontSize: "1.3rem", fontWeight: "600" }}
                        className={activeStep === index ? "step-styling" : ""}
                      >
                        {" "}
                        {label}{" "}
                      </span>
                    </StepButton>
                  </Step>
                </React.Fragment>
              ))}
            </Stepper>

            <Stepper
              sx={{ margin: "2rem 1px", display: { xs: "flex", md: "none" } }}
              nonLinear
              activeStep={activeStep}
            >
              
              {steps.map((label, index) => (
                <React.Fragment>
                  <Step key={label} completed={completed[index]}>
                    <p
                      className={
                        activeStep === index ? "seq-styling red" : "seq-styling"
                      }
                    >
                      {index + 1}
                    </p>
                    <StepButton color="inherit" onClick={handleStep(index)}>
                      <span
                        className={activeStep === index ? "step-styling" : ""}
                      >
                        {" "}
                        {label}{" "}
                      </span>
                    </StepButton>
                  </Step>
                </React.Fragment>
              ))}
            </Stepper>

            <div>
              {allStepsCompleted() ? (
                <React.Fragment>
            
                  <Grid item xs={12} md={12}>
                    <Card>
                      {/* <CardActionArea> */}
                      <Typography
                        gutterBottom
                        className="card-header"
                        variant="h5"
                        component="div"
                      >
                        Thank you!
                      </Typography>
                      <CardContent>
                        <Typography variant="h6" className="ans-styling">
                          Thank you for providing your QLE documentation and
                          requested benefit changes. We are reviewing your
                          submission and will follow up with a status within
                          five (5) business days.
                        </Typography>
                        <Typography className="ans-styling">
                          In the meantime, if you have any questions, please
                          call 855.208.7036 or send an email to
                          support@qleservices.com.
                        </Typography>
                        <Typography className="ans-styling">
                          Your QLE's current status is: <span className="pending-review">Pending Review</span>
                        </Typography>
                      </CardContent>
                      {/* </CardActionArea> */}
                    </Card>
                  </Grid>
                  {/* <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button onClick={handleReset}>Reset</Button>
                  </Box> */}
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    <>
                      <div className="content-form">
                        {activeStep === 0 ? (
                          <>
                            <StartMyQLE activeStep={activeStep} token={params.token} setDisabled={setDisabled}/>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "row-reverse",
                                pt: 2,
                              }}
                            >
                              {/* {activeStep !== steps.length && (
                                <Button
                                  onClick={() => {
                                    handleComplete();
                                    handleNext();
                                  }}
                                  sx={{
                                    backgroundColor: "red",
                                    "&:hover": {
                                      backgroundColor: "orange",
                                    },
                                  }}
                                  variant="contained"
                                  className="flex-end btn-bg-red"
                                >
                                  {completedSteps() === totalSteps() - 1
                                    ? "Submit"
                                    : "Save and Continue"}
                                </Button>
                              )} */}
                            </Box>
                          </>
                        ) : activeStep === 1 && getStep1Res.enrollOrCancel == 1 ? (
                          <>
                            <Grid>
                              <RequestBenefitChanges  token={params.token}/>

                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "row-reverse",
                                  pt: 2,
                                }}
                              >
                                {/* {activeStep !== steps.length && (
                                  <Button
                                    onClick={() => {
                                      handleComplete();
                                      handleNext();
                                    }}
                                    sx={{
                                      backgroundColor: "red",
                                      "&:hover": {
                                        backgroundColor: "orange",
                                      },
                                    }}
                                    variant="contained"
                                    className="flex-end btn-bg-red"
                                  >
                                    {completedSteps() === totalSteps() - 1
                                      ? "Submit"
                                      : "Save and Continue"}
                                  </Button>
                                )} */}
                                {/* <Button
                                  color="inherit"
                                  // disabled={activeStep === 0}
                                  onClick={handleBack}
                                  sx={{
                                    backgroundColor: "red",
                                    color: "white",
                                    "&:hover": {
                                      backgroundColor: "orange",
                                    },
                                    mr: 1,
                                  }}
                                  variant="contained"
                                  className="flex-end btn-bg-red"
                                >
                                  Previous
                                </Button> */}
                              </Box>
                            </Grid>
                          </>
                        ) : activeStep === 1 && getStep1Res.enrollOrCancel == 0 ? (
                          <>
                            <Grid>
                              <RequestBenefitChangesCancel  token={params.token}/>

                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "row-reverse",
                                  pt: 2,
                                }}
                              >
                              </Box>
                            </Grid>
                          </>
                        ) : activeStep === 2 ? (
                          <>
                            <UploadDocumentation />
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "row-reverse",
                                pt: 2,
                              }}
                            >
                              {/* {activeStep !== steps.length && (
                                <Button
                                  onClick={() => {
                                    handleComplete();
                                    handleNext();
                                  }}
                                  sx={{
                                    backgroundColor: "red",
                                    "&:hover": {
                                      backgroundColor: "orange",
                                    },
                                  }}
                                  variant="contained"
                                  className="flex-end btn-bg-red"
                                >
                                  {completedSteps() === totalSteps() - 1
                                    ? "Submit"
                                    : "Save and Continue"}
                                </Button>
                              )} */}

                              {/* <Button
                                color="inherit"
                                // disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{
                                  backgroundColor: "red",
                                  color: "white",
                                  "&:hover": {
                                    backgroundColor: "orange",
                                  },
                                  mr: 1,
                                }}
                              >
                                Previous
                              </Button> */}
                            </Box>
                          </>
                        ) : null}
                      </div>
                    </>
                  </Typography>
                </React.Fragment>
              )}
            </div>
          </Box>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default QLEForm;

{
  /* <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
  <Button
    color="inherit"
    disabled={activeStep === 0}
    onClick={handleBack}
    sx={{ mr: 1 }}
  >
    Back
  </Button>

  {activeStep !== steps.length && (
    <Button
      onClick={handleComplete}
      onClick={handleNext}
      sx={{
        backgroundColor: "red",
        "&:hover": {
          backgroundColor: "orange",
        },
      }}
      variant="contained"
      className="flex-end btn-bg-red"
    >
      {completedSteps() === totalSteps() - 1 ? "Submit" : "Save and Continue"}
    </Button>
  )}
</Box>; */
}

/*


<Grid>
                                <Button
                                  variant="contained"
                                  className="flex-end btn-bg-red"
                                  sx={{
                                    backgroundColor: "red",
                                    "&:hover": {
                                      backgroundColor: "orange",
                                    },
                                  }}
                                  onClick={handleNext}
                                >
                                  Save & Continue
                                </Button>
                                <Button
                                  variant="contained"
                                  className="flex-end btn-bg-red"
                                  sx={{
                                    backgroundColor: "red",
                                    "&:hover": {
                                      backgroundColor: "orange",
                                    },
                                    margin: "0px 10px",
                                  }}
                                  onClick={handleBack}
                                >
                                  Previous
                                </Button>
                              </Grid>



*/
