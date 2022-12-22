import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import TextEditor from "../../TextEditor";
import Event from "./event";
import Home from "./home";
import Step2 from "./step2";
import Step1 from "./step1";
import Step3 from "./step3";
import PrivacyPolicy from "./privacyPolicy";
import Plans from "./plans";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import "./style.css";

// const Employer_QLE_Steps = () => {
  const Employer_QLE_Steps = ({
    employerId
}: any): JSX.Element => {

  const [value, setValue] = React.useState(0);

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
    <Box sx={{ width: "100%" }} className="sub-tabs-styling">
      <Box sx={{ border: 0, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="fullWidth"
        >
          <Tab className="tab-active " label="Home" {...a11yProps(0)} />
          <Tab  className="tab-active " label="Step 1" {...a11yProps(1)} />
          <Tab  className="tab-active " label="Step 2" {...a11yProps(2)} />
          <Tab  className="tab-active " label="Step 3" {...a11yProps(3)} />
          <Tab  className="tab-active " label="Privacy Policy" {...a11yProps(4)} />
          <Tab   className="tab-active " label="Events" {...a11yProps(5)} />
          <Tab  className="tab-active " label="Plans" {...a11yProps(6)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Home employerId={employerId} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Step1 employerId={employerId}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Step2 employerId={employerId}/>   
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Step3  employerId={employerId} />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <PrivacyPolicy employerId={employerId}/>
      </TabPanel>
      <TabPanel value={value} index={5}>
        <Event employerId={employerId}/>
      </TabPanel>
      <TabPanel value={value} index={6}>
        <Plans employerId={employerId}/>
      </TabPanel>
    </Box>
  );
};
export default Employer_QLE_Steps;

