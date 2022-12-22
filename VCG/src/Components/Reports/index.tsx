import React, { useState } from "react";
import { largeScrees, smallScreen } from "../../Helper/slider";
import SwipeableSidenavbar from "../Sidenavbar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Header from "../Header";
import { Typography } from "@mui/material";
import "./style.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import DailyProductivityReport from "./Report_Steps/dailyProductivityReport";
import ServiceLevelAgreementReport from "./Report_Steps/serviceLevelAgreementReport";
import AgingReport from "./Report_Steps/agingReport";
import { useParams } from "react-router-dom";
import QuantitiesReport from "./Report_Steps/quantitiesReport";
import Footer from "../Footer";

const   Reports = () => {
  const [headerValues, setHeaderValues] = useState({ sidebar: 2, header: 10 });
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

  let params = useParams();
  let type: any = params.type;

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

            <Box style={{ margin: "45px 15px 26px" }} sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid
                  className="title-styling"
                  sx={{ alignSelf: "self-end" }}
                  item
                  xs={9}
                >
                  {type} / Reports
                </Grid>
              </Grid>
            </Box>

            <Paper
              sx={{
                margin: "10px",
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
                      label="Daily Productivity Report"
                      {...a11yProps(0)}
                    />
                    <Tab
                      className="tab-active"
                      label="Quantities Report"
                      {...a11yProps(1)}
                    />
                    <Tab
                      className="tab-active"
                      label="Service Level Agreement Report"
                      {...a11yProps(2)}
                    />
                    <Tab
                      className="tab-active"
                      label="Aging Report"
                      {...a11yProps(3)}
                    />
                  </Tabs>
                </Box>

                <TabPanel value={value} index={0}>
                  <Box>
                    <DailyProductivityReport type={type}/>
                  </Box>
                </TabPanel>

                <TabPanel value={value} index={1}>
                  <QuantitiesReport type={type}/>
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <Box>
                    <ServiceLevelAgreementReport type={type}/>
                  </Box>
                </TabPanel>
                <TabPanel value={value} index={3}>
                  <Box>
                    <AgingReport type={type}/>
                  </Box>
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

export default Reports;
