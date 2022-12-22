/* eslint-disable react/jsx-pascal-case */
import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import TextEditor from "../../TextEditor";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PrimaryContact from "./steps/primaryContact";
import CustomizedSwitches from "../../SwitchButton";
import Add_Employer_ACA_HealthPlan from "./steps/healthPlan";
import Add_Employer_ACA_Home from "./steps/home";
import Add_Employer_ACA_Privacy_Policy from "./steps/privacyPolicy";
import Add_Employer_ACA_NewYearChanges from "./steps/newYearChanges";
import Add_Employer_ACA_Eligiblity from "./steps/eligibility";

const Add_Employer_ACA_Edit_Steps = ({ employerId }: any): JSX.Element => {
  
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
    <Box sx={{ width: "100%" }}>
      <Grid container sx={{ marginBottom: "12px" }}>
        <CustomizedSwitches labelPlace="start" label="Enabled" />
      </Grid>

      <Box sx={{ border: 0, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="fullWidth"
        >
          <Tab
            className="tab-active "
            label="Primary Contact"
            {...a11yProps(0)}
          />
          <Tab className="tab-active " label="Health Plan" {...a11yProps(1)} />
          <Tab
            className="tab-active "
            label="New Year Changes"
            {...a11yProps(2)}
          />
          <Tab className="tab-active " label="Home" {...a11yProps(3)} />
          <Tab
            className="tab-active "
            label="Privacy Policy"
            {...a11yProps(4)}
          />
          <Tab className="tab-active " label="eligibility" {...a11yProps(5)}/>
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <PrimaryContact employerId={employerId} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Add_Employer_ACA_HealthPlan employerId={employerId} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Add_Employer_ACA_NewYearChanges employerId={employerId} />
      </TabPanel> 
      <TabPanel value={value} index={5}>
        <Add_Employer_ACA_Eligiblity employerId={employerId} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Add_Employer_ACA_Home employerId={employerId} />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Add_Employer_ACA_Privacy_Policy employerId={employerId} />
      </TabPanel>
    </Box>
  );
};
export default Add_Employer_ACA_Edit_Steps;
