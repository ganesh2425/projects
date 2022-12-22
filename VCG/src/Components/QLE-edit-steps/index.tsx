import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import TextEditor from "../TextEditor";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import "./style.css";
import Edit_QLE_Info from "./edit_info";
import SendStatusEmail from "./sendStatusEmail";
import Communications from "./communications";
import QLE_Files from "./files";
import QLE_Answers from "./answers";
import QLE_Notes from "./notes";
import QLE_Activity from "./activity";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const QLE_Edit_Steps = (props: any): JSX.Element => {
  
  const [value, setValue] = React.useState(0)
  const navigate = useNavigate();
  let params = useParams();

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
          <Tab className="tab-active " label="Edit Information" {...a11yProps(0)} />
          <Tab  className="tab-active " label="Answers" {...a11yProps(1)} />
          <Tab  className="tab-active " label="Files" {...a11yProps(2)} />
          <Tab  className="tab-active " label="Notes" {...a11yProps(3)} />
          <Tab  className="tab-active " label="Send Status Email" {...a11yProps(4)} />
          <Tab   className="tab-active " label="Communications" {...a11yProps(5)}  />
          <Tab  className="tab-active " label="Activity" {...a11yProps(6)} />
        </Tabs>
      </Box>
      
      <TabPanel value={value} index={0}>
        <Edit_QLE_Info id={params.id}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <QLE_Answers  id={params.id} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <QLE_Files   id={params.id}/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <QLE_Notes  id={params.id}/>
      </TabPanel>
      <TabPanel value={value} index={4}>
         <SendStatusEmail  id={params.id}/>
      </TabPanel>
      <TabPanel value={value} index={5}>
        <Communications id={params.id} />
      </TabPanel>
      <TabPanel value={value} index={6}>
        <QLE_Activity  id={params.id} />
      </TabPanel>
    </Box>
  );
};
export default QLE_Edit_Steps;

