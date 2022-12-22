import React, { useState } from "react";
import { largeScrees, smallScreen } from "../../Helper/slider";
import SwipeableSidenavbar from "../Sidenavbar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Header from "../Header"
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button, Typography } from "@mui/material";
import "./style.css";
import NewEmployerInformationForm from "../Employers/NewEmployersInfo/index"
// import HolidayTable from "../Holidays";
import CustomizedSwitches from "../SwitchButton";
import Employer_QLE__Steps from "../Employers/Employer_QLE_Steps";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import QLE_Edit_Steps from "../QLE-edit-steps";
import Edit_QLE_Info from "../QLE-edit-steps/edit_info";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getEditByIdDetails } from "../../reducers/qles-editReducer/getEditByIdReducer";
import { fetchGetEditByIdRequest } from "../../actions/qle-editActions/getEditByIdActions";
import { useParams } from "react-router-dom";
import { CommentsDisabledOutlined } from "@mui/icons-material";
import Footer from "../Footer";
import { fetchEventStatusRequest } from "../../actions/qleActions/getEventStatusActions";
import { getEventStatusDetails } from "../../reducers/qleReducer/eventStatusReducer";

const QLE_edit = () => {
  const [headerValues, setHeaderValues] = useState({ sidebar: 2, header: 10 });
  const [activeStep, setActiveStep] = useState(1);
  const [value, setValue] = React.useState(0);
  const [eventType, seteventDetails] = React.useState<any>([])
  const[firstName,setfirstName]=React.useState<any>([])
  const[id, setid]= useState(1);
   
  let params = useParams();
  const dispatch = useDispatch();
  
  useEffect(() => {
    getedit();
  }, []);

  const getedit = () => {
    let id: any = params.id;
    if(id>0)  {
    dispatch(
      fetchGetEditByIdRequest({id})
    );
    }
  };


  const QLEStatusTemp = useSelector(getEventStatusDetails);

    useEffect(() => {
    getEventStatus();
  }, []);

  const getEventStatus = () => {
    dispatch(
      fetchEventStatusRequest({})
    );
  };

  if(QLEStatusTemp && QLEStatusTemp.qleEventStatusList){
  const QLEStatusDetails = QLEStatusTemp.qleEventStatusList;
  var QLEStatus:any = [];
  for (let i in  QLEStatusDetails) {
    if(QLEStatusDetails[i] === "Approved/Pending"){
      QLEStatus.push({value:QLEStatusDetails[i].replace(" ","").replace("/","Or"),option:QLEStatusDetails[i]});
    }else{
      QLEStatus.push({value:QLEStatusDetails[i].replace(" ",""),option:QLEStatusDetails[i]});
    }
  }
  } 
 
  const edit: any = useSelector(getEditByIdDetails); 
  useEffect(() => {
    let id: any = params.id;
    if(id>0)  {
      getedit();
    }
  }, []);
  const handleHeaders = () => {
    headerValues.sidebar == 2
      ? setHeaderValues(smallScreen())
      : setHeaderValues(largeScrees());
  };
  let currentStatus : any ='';
  if(QLEStatus && edit && edit.eventStatus){
    QLEStatus.filter(d => d.value === edit.eventStatus)
    currentStatus = QLEStatus.filter(d => d.value === edit.eventStatus);
  }
  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <React.Fragment>
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

           

            <Box
              style={{ marginTop: "25px", padding: "7px 13px" }}
              sx={{ flexGrow: 1 }}
            >
              <Grid container spacing={2}>
                <Grid className="" item xs={10}>
                  <Box sx={{ display: "flex" }}>
                    <Typography  className="qle-edit-header" variant="h4"> 
                      {edit.name}
                     
                    </Typography>
                    <Box className="pending-review"
                      
                    >
                      {currentStatus && currentStatus[0].option}
                     
                    </Box>
                  </Box>

                  <Typography sx={{fontSize: ".9375rem", color: "#6c7293 !important", marginTop:"10px"}}>
                    
                  <b>Event Type:</b>  {edit.eventType}
                    <br></br>
                    {edit.eventSubType}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Paper
              sx={{
                margin: "25px 15px",
                // width: "96%",
                // height: "72vh",
                padding: "16px",
                overflowX: "hidden",
                boxShadow:"none"
              }}
            >
              <Box sx={{ width: "100%" }} className="tab-styling">
                <Grid>
                  <QLE_Edit_Steps id={params.id}/>
                </Grid>
              </Box>
            </Paper>
           <Footer/>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default QLE_edit;


