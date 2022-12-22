/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState } from "react";
import { largeScrees, smallScreen } from "../../Helper/slider";
import SwipeableSidenavbar from "../Sidenavbar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Header from "../Header";
import { Button, Typography } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ACA_Application_Edit_Information from "./steps/editInformation";
import ACA_Application_Activity from "./steps/activity";
import ACA_Application_Employer from "./steps/employer";
import ACA_Application_Eligibility from "./steps/eligibility";
import ACA_Application_HealthPlan from "./steps/healthPlan";
import ACA_Application_Communication from "./steps/communications";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import DownloadIcon from "@mui/icons-material/Download";
import EmailIcon from "@mui/icons-material/Email";
import { useParams } from "react-router-dom";
import ACA_Application_NewYearPlan from "./steps/newYearPlan";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetACAPreviewRequest } from "../../actions/acaPreviewAction/acaPreviewActions";
import { getACAPreviewDetails } from "../../reducers/acaPreviewReducer/acaPreviewReducer"; 
import {saveAs} from "file-saver"
import { getACADownloadDetails } from "../../reducers/acaPreviewReducer/acaDownloadReducer";
import { fetchGetACADownloadRequest } from "../../actions/acaPreviewAction/acaDownloadActions";
import { getACAEmailDetails } from "../../reducers/acaPreviewReducer/acaEmailReducer";
import { fetchGetACAEmailRequest } from "../../actions/acaPreviewAction/acaEmailActions";
import { toast } from "react-toastify";
import Footer from "../../Components/Footer";
import { fetchGetACAEventRequest } from "../../actions/acaActions/getACAEventActions";
import { getACAEventDetails } from "../../reducers/acaReducer/getACAEventReducer";

const Application_edit = (): JSX.Element => {
  const [headerValues, setHeaderValues] = useState({ sidebar: 2, header: 10 });
  const [value, setValue] = React.useState(0);
 
  const [reportResult, setReportResult] = React.useState("");

  const handleHeaders = () => {
    headerValues.sidebar == 2
      ? setHeaderValues(smallScreen())
      : setHeaderValues(largeScrees());
  };
  const ACAStatus = [
    { value: 0, option: "New" },
    { value: 1, option: "InformationRequired" },
    { value: 2, option: "Revisit" },
    { value: 3, option: "Completed" },
    { value: 4, option: "Cancelled " },
    { value: 5, option: "All " },
  ];
  const getACAEventId = () => {
    let id: any = params.eventId;
    if (id > 0) {
      dispatch(fetchGetACAEventRequest({ id }));
    }
  };

 
  useEffect(() => {
    let id: any = params.eventId;
    if(id>0)  {
      getACAEventId();
    }
  }, []);

    const getACAEventRes = useSelector(getACAEventDetails);

  const getACAPreview = useSelector(getACAPreviewDetails)
  var response = getACAPreview.data
  useEffect(() => {
    if (response) {
      const file = new Blob([response], { type:'application/pdf' })
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, "_blank")
      getACAPreview.data=null
    }
  },[response]);

    const handleEventItemChange = (e:any) => {
    let id: any = params.eventId;
      if (id > 0) {
        dispatch(fetchGetACAPreviewRequest({ id }));
      } 
  }
 

const getACADownlodRes:any = useSelector(getACADownloadDetails)
var downloadRes =  getACADownlodRes.data

useEffect(() => {
  if(downloadRes){
	 setReportResult(downloadRes)
	 saveAs(downloadRes, "AcaApplications.pdf")
	 getACADownlodRes.data= null
  }
}, [downloadRes]);

const  handleDownload =(e:any)=> {
  let id:any = params.eventId
  if(id > 0 ){
    dispatch(fetchGetACADownloadRequest({id}))
  }
}

const [email,setEmail] = useState("")
const getEmailRes:any = useSelector(getACAEmailDetails)

useEffect(() => {
  if(getEmailRes && getEmailRes.data){
    setEmail(getEmailRes.data)
  }
},[getEmailRes.data])

const handleEmail = (e:any)=> {
  let id:any= params.eventId
  if(id > 0) {
    dispatch(fetchGetACAEmailRequest({id}))
    toast.success("Sent Email Successfully")
  }
}

  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const dispatch = useDispatch();
  const params = useParams();
 
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
              style={{ margin: "36px 0px 16px", padding: "7px 13px" }}
              sx={{ flexGrow: 1 }}
            >
              <Grid container spacing={2}>
                <Grid
                  className="title-styling"
                  item
                  xs={7}
                  sx={{ display: "flex" }}
                >
                 <div>ACA/</div>
                 { getACAEventRes.firstName}{ getACAEventRes.middleName} { getACAEventRes.lastName}
                  {<div className="userStatus">{getACAEventRes.status ? ACAStatus[parseInt(getACAEventRes.status)].option : ""}</div>}
                   
                </Grid>
                <Grid
                  item
                  sx={{
                    display: "flex",
                    flexDirection: "row-reverse",
                    justifyContent: "space-between",
                    padding:"0px !important"
                  }}
                  xs={5}
                >
                  <Grid >
                  <Button className="btn-styling-aca-edit"  variant="outlined" startIcon={<EmailIcon />} onClick={(e) => handleEmail(e)}>
                    Email PDF
                  </Button>
                  </Grid>

                  <Grid >
                    <Button
                      className="btn-styling-aca-edit"  variant="outlined" startIcon={<DownloadIcon/>}
                      onClick={(e) => handleDownload(e)}
                      
                    >
                      Download Report
                    </Button>
                  </Grid>
                  <Grid >
                    <Button className="btn-styling-aca-edit" variant="outlined" startIcon={<FindInPageIcon />} onClick={(e) => handleEventItemChange(e)} >
                      Preview PDF
                    </Button>
                  </Grid> 
                </Grid>
              </Grid> 
            </Box>

            <Paper
              sx={{
                margin: "10px",
                padding: "16px",
                overflowX: "hidden",
                boxShadow:"none"
              }}
            >
              <Box sx={{ width: "100%" }} className="tab-styling">
                <Box sx={{ borderBottom: 0, borderColor: "divider" }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    variant="fullWidth"
                  >
                    <Tab
                      className="tab-active"
                      label="Edit Information"
                      {...a11yProps(0)}
                    />
                    <Tab
                      className="tab-active"
                      label="Employer"
                      {...a11yProps(1)}
                    />
                    <Tab
                      className="tab-active"
                      label="Health Plan"
                      {...a11yProps(2)}
                    />
                    <Tab
                      className="tab-active"
                      label="New Year Plan"
                      {...a11yProps(3)}
                    />
                    <Tab
                      className="tab-active"
                      label="Eligibility"
                      {...a11yProps(4)}
                    />
                    <Tab
                      className="tab-active"
                      label="Communications"
                      {...a11yProps(5)}
                    />
                    <Tab
                      className="tab-active"
                      label="Activity"
                      {...a11yProps(6)}
                    />
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                  <ACA_Application_Edit_Information
                     
                  />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <ACA_Application_Employer/>
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <ACA_Application_HealthPlan />
                </TabPanel>
                <TabPanel value={value} index={3}>
                  <ACA_Application_NewYearPlan />
                </TabPanel>
                <TabPanel value={value} index={4}>
                  <ACA_Application_Eligibility />
                </TabPanel>
                <TabPanel value={value} index={5}>
                  <ACA_Application_Communication />
                </TabPanel>
                <TabPanel value={value} index={6}>
                  <ACA_Application_Activity />
                </TabPanel>
              </Box>
            </Paper>
            <Footer/>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default Application_edit;

