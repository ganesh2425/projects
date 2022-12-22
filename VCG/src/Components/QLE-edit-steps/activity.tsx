import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getEditByIdDetails } from "../../reducers/qles-editReducer/getEditByIdReducer"
import { fetchGetEditByIdRequest } from "../../actions/qle-editActions/getEditByIdActions";
import { useParams } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    "& .css-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root.Mui-completed": { color: "#F16022 !important" },
    
  },
});


// export default function QLE_Activity() {
  const QLE_Activity =(props: any): JSX.Element => {

  const [activeStep, setActiveStep] = React.useState(0);
  const[id, setActivity]= useState(1);
  const[qleEventActivity,setqleEventActivity]=React.useState<any>([])
  const[sort , setSort]=React.useState();
 
  let params = useParams();
  const dispatch = useDispatch();
  const QleActivity: any = useSelector(getEditByIdDetails);
  // useEffect(() => {
  //   if(QleEventId >0){
  //   getQle();
  //   }
  // }, []);

  const getQle = () => {
    let id: any = params.id
    dispatch(
      fetchGetEditByIdRequest({ id })
    );
  };
  
  useEffect(() => {
    if (QleActivity) {
      let details = QleActivity['qleEventActivity'];
      setqleEventActivity(details)
    // setActiveStep(qleEventActivity.length);
    }
  });
  

 const sorting =()=>{
    let sort = QleActivity.sort((a, b) => new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime());
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const classses = useStyles();
  var data=QleActivity.qleEventActivity
  data = data.sort((a,b) => new Date(a.createdDate).getTime() < new Date(b.createdDate).getTime() ? 1 : -1);
  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper  activeStep={activeStep} orientation="vertical">
        {qleEventActivity.map((step, index) => (
          <Step sx={{color:"red"}} key={step.label} >
            <StepLabel  className={classses.root}
              optional={
   (<Typography variant="caption">{step.eventActivity}<br></br>{step.createdDate}  by {step.createdBy}</Typography>) 
                

              }
            >
              </StepLabel>
              {/* {step.label} */}
            
            {/* <StepContent>
              <Typography>{step.description}</Typography>
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? 'Finish' : 'Continue'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent> */}
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
export default QLE_Activity;