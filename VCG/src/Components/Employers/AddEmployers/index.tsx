/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState } from "react";
import { largeScrees, smallScreen } from "../../../Helper/slider";
import SwipeableSidenavbar from "../../Sidenavbar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Header from "../../Header";
import {  Typography } from "@mui/material";
import "./style.css";
import CustomizedSwitches from "../../SwitchButton";
import Employer_QLE_Steps from "../Employer_QLE_Steps";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Add_Employer_ACA_Edit_Steps from "../Add_Employer_ACA_Steps";
import Add_Employer_Employer_Information from "../Add_Employer_Employer_Information";
import { useParams } from "react-router-dom";
import { getEmployerDetails } from "../../../reducers/employersReducer/getEmployerReducer";
import { useSelector, useDispatch } from "react-redux";
import { fetchGetEmployerRequest } from "../../../actions/employersActions/getEmployerActions";
import { fetchUpdateEmpQLEStepsRequest } from "../../../actions/employersActions/updateEmpQLEStepsActions";
import { getUpdateEmpQLESteps } from "../../../reducers/employersReducer/updateEmpQLEStepsReducer";
import { useNavigate } from "react-router-dom";
import HolidayTable from "../Holidays";
import Footer from "../../Footer";

const AddEmployer = ({ employerId }: any) => {
  let params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [headerValues, setHeaderValues] = useState({ sidebar: 2, header: 10 });
  const [activeStep, setActiveStep] = useState(1);
  const [value, setValue] = React.useState(0);

  const handleHeaders = () => {
    headerValues.sidebar == 2
      ? setHeaderValues(smallScreen())
      : setHeaderValues(largeScrees());
  };

  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [qleEnabled, setQLEEnabled] = React.useState(true);
  const [acaEnabled, setACAEnabled] = React.useState(true);

  useEffect(() => {
    getEmployerById();
  }, []);

  const getEmployerById = () => {
    let id: any = params.employerId;
    dispatch(fetchGetEmployerRequest({ id }));
  };

  const getEmployerRes = useSelector(getEmployerDetails);

  useEffect(() => {
    let id: any = params.employerId;
    if (parseInt(id) > 0) {
      if (getEmployerRes && parseInt(getEmployerRes["id"]) > 0) {
        let qleEnabledVal = getEmployerRes["qleEnabled"];
        let acaEnabledVal = getEmployerRes["acaEnabled"];
        setQLEEnabled(qleEnabledVal);
        setACAEnabled(acaEnabledVal);
      }
    }
  }, [getEmployerRes]);

  let id: any = params.employerId;

  const tempUpdateEmpQLEStepsData: any = {
    id: parseInt(id),
    qleEnabled: qleEnabled,
  };

  const handleSwitch = (e: any) => {
    let valStatus = e.target.checked;
    if (e.target.checked == true) {
      setQLEEnabled(true);
      tempUpdateEmpQLEStepsData.qleEnabled = true;
    } else {
      setQLEEnabled(false);
      tempUpdateEmpQLEStepsData.qleEnabled = false;
    }
    dispatch(fetchUpdateEmpQLEStepsRequest(tempUpdateEmpQLEStepsData));
  };

  let getUpdateEmpQLEStepsRes: any = useSelector(getUpdateEmpQLESteps);

  useEffect(() => {
    if (getUpdateEmpQLEStepsRes && getUpdateEmpQLEStepsRes["id"] > 0) {
      getUpdateEmpQLEStepsRes = null;
      //window.location.reload();
      // setTimeout(() => {
      //   navigate(`/employers/${id}`);
      // }, 1500);
    }
  }, [getUpdateEmpQLEStepsRes]);

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

            {/* <Box sx={{ flexGrow: 1 }}>
            <Grid spacing={2}>
              <Grid xs={8}>Roles</Grid>
              <Grid xs={4}>Add Role</Grid>
            </Grid> 
          </Box> */}

            <Box
              style={{ marginTop: "25px", padding: "7px 13px" }}
              sx={{ flexGrow: 1 }}
            >
              <Grid container spacing={2}>
                <Grid className="title-styling" item xs={10}>
                  Employer
                </Grid>
              </Grid>
            </Box>

            <Paper
              sx={{
                margin: "10px",
                // width: "96%",
                // height: "72vh",
                padding: "16px",
                overflowX: "hidden",
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
                      label="Employer Information"
                      {...a11yProps(0)}
                    />
                    <Tab
                      className="tab-active"
                      //disabled={params.employerId == "0" ? true : false}
                      label="ACA"
                      {...a11yProps(1)}
                    />
                    <Tab
                      className="tab-active"
                      //disabled={params.employerId == "0" ? true : false}
                      label="QLE"
                      {...a11yProps(2)}
                    />
                    <Tab
                      className="tab-active"
                      label="Holidays"
                      // disabled={params.employerId == "0" ? true : false}
                      {...a11yProps(3)}
                    />
                  </Tabs>
                </Box>

                <TabPanel value={value} index={0}>
                  <Box>
                    <Add_Employer_Employer_Information />
                  </Box>
                </TabPanel>

                <TabPanel value={value} index={1}>
                  {/* <Box>
                    <Grid className="switch-alignment">
                    <CustomizedSwitches
                        style={{ float: "right" }}
                        labelPlace="end"
                        label="Enabled"
                        getData={handleSwitch1}
                        checked={acaEnabled}
                      />

                    </Grid>
                  </Box> */}
                  <Add_Employer_ACA_Edit_Steps employerId={params.employerId} />
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <Box>
                    <Grid className="switch-alignment">
                      <CustomizedSwitches
                        style={{ float: "right" }}
                        labelPlace="end"
                        label="Enabled"
                        getData={handleSwitch}
                        checked={qleEnabled}
                      />
                    </Grid>
                    <Grid>
                      <Employer_QLE_Steps employerId={params.employerId} />
                    </Grid>
                  </Box>
                </TabPanel>
                <TabPanel value={value} index={3}>
                  <Box>
                    <HolidayTable employerId={params.employerId} />
                  </Box>
                </TabPanel>
              </Box>
            </Paper>
            <Footer />
          </Grid>
        </Grid>
      </Box>

    </React.Fragment>
  );
};

export default AddEmployer;

/*
 <Grid item sx={{ display: "flex" }}>
                <Button
                  className={activeStep === 1 ? "activeTab" : ""}
                  variant="contained"
                  sx={{
                    backgroundColor: "#f6f8fa",
                    borderRadius: "0px",
                    color: "black",
                    textTransform:"capitalize",
                    boxShadow:"none",
                    
                    "&:hover": {
                     
                      color: "white",
                      boxShadow:"none",
                    },
                    minWidth: "33%",
                    flexGrow: 1,
                  }}
                  onClick={() => setActiveStep(1)}
                >
                  Employer Information
                </Button>
                <Button
                  className={activeStep === 2 ? "activeTab" : ""}
                  variant="contained"
                  sx={{
                    backgroundColor: "#f6f8fa",
                    borderRadius: "0px",
                    color: "black",
                    boxShadow:"none",
                    "&:hover": {
                      backgroundColor: "#1565c0",
                      color: "white",
                      boxShadow:"none",
                    },
                    "&:active": {
                        backgroundColor: "#F16022",
                        color: "white",
                    },
                    minWidth: "33%",
                    flexGrow: 0,
                  }}
                  onClick={() => setActiveStep(2)}
                >
                  ACA
                </Button>
                <Button
                  className={activeStep === 3 ? "activeTab" : ""}
                  variant="contained"
                  sx={{
                    backgroundColor: "#f6f8fa",
                    borderRadius: "0px",
                    color: "black",
                    boxShadow:"none",
                    "&:hover": {
                      backgroundColor: "#1565c0",
                      color: "white",
                      boxShadow:"none",
                    },
                    minWidth: "33%",
                    flexGrow: 0,
                  }}
                  onClick={() => setActiveStep(3)}
                >
                  QLE
                </Button>
              </Grid>

*/
