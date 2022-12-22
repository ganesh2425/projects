import { Grid, Paper, Typography } from "@mui/material";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState} from "react";
import { getcommunicationDetails } from "../../reducers/qles-editReducer/communicationReducer";
import { fetchCommunicationRequest } from "../../actions/qle-editActions/communicationsActions";
import { useParams } from "react-router-dom";
import ReactHtmlParser from 'html-react-parser';


const Communications = (props: any): JSX.Element => {
  const dispatch = useDispatch();
  const [id, setEventId] = useState(1);
  const [communicationDes,setCommunicationDetails] =React.useState<any>([])
  let params = useParams();


  useEffect(() => {
    if(params.id){
    getcommunication();
    }
  }, []);

  const getcommunication = () => {
    let id: any = params.id
    setEventId(id);
    dispatch(
      fetchCommunicationRequest({id})
    );

  };

  const communication :any = useSelector(getcommunicationDetails); 
  useEffect(() => {
    const tempData: any = []; 
    if (communication) {
      let details=communication['communicationDetails'];
     setCommunicationDetails(details);
    }
  }, [communication]);


  
return (
  <>
    <Paper sx={{boxShadow:"none"}}>
      <Grid container xs={12} sx={{border: "1px solid lightgray"}}>
        <Grid container justifyContent="space-between" sx={{padding: "15px", border: "1px solid lightgray", background: "#f6f8fa"}}>
          <Grid item >
            <Typography>Signup Email Sent</Typography>
          </Grid>
        </Grid>
{communication && communication.map((data:any,index:any) =>(
        <Grid item xs={12} sx={{padding: "15px"}}>
               <Grid item className="dateView">{data.createdDate}</Grid>
              <Typography className="communications-para">{ReactHtmlParser(data.communicationString)}</Typography>
          </Grid>
          ))} 
      </Grid>
    </Paper>
  </>
);
};

export default Communications;
