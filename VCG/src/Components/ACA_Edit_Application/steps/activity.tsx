import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import { makeStyles } from "@mui/styles";
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchGetACAEventRequest } from '../../../actions/acaActions/getACAEventActions';
import { useDispatch, useSelector } from 'react-redux';
import { getACAEventDetails } from '../../../reducers/acaReducer/getACAEventReducer';

const useStyles = makeStyles({
  root: {
    "& .css-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root.Mui-completed": { color: "#F16022 !important" },
  },
});


export default function ACA_Application_Activity() {
  const [activeStep, setActiveStep]:any = React.useState(10);
  const classses = useStyles();
  const params = useParams()
  const dispatch = useDispatch()
  
  
  const [eventId,setEventId] = React.useState(" ")
  const getACAEventRes:any = useSelector(getACAEventDetails)
  var data:any = getACAEventRes.activityList
  
  // useEffect(() => {
  //   getACAEventId();
  // }, [getACAEventRes]);

 /* const getACAEventId = () => {
    let id: any = params.eventId;
    if (id > 0) {
      // setEventId(acaEventId);
      dispatch(fetchGetACAEventRequest({ id }));
    }
  };*/
  

if(data !== null){
  
  data = data && data.sort((a:any,b:any) => new Date(a.createdDate).getTime() < new Date(b.createdDate).getTime() ? 1 : -1);
}
  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper  activeStep={activeStep} orientation="vertical">
        { data && data.map((step:any, index:number) => (
          <Step sx={{color:"red"}} key={step.activity} >
            <StepLabel  className={classses.root}
            
            >
              {step.activity} <br/>
              <Typography variant="caption">{step.createdDate} by {step.createdBy}</Typography>
            </StepLabel>
            
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}