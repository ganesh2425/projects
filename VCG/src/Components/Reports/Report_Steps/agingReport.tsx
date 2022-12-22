import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import DownloadIcon from "@mui/icons-material/Download";
import { useNavigate } from "react-router-dom";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import { fetchActiveUserRequest } from "../../../actions/usersActions/allActiveUserActions";
import { fetchAllEmployersByTypeRequest } from "../../../actions/employersActions/allEmployersByTypeActions";
import { getAllEmployerByTypeDetails } from "../../../reducers/employersReducer/allEmployersByTypeReducer";
import moment from "moment";
import ReactHtmlParser from 'html-react-parser';
import { getAgingReport } from "../../../reducers/reportReducer/agingReportReducer";
import {saveAs} from "file-saver"
import { getAgingReportDownload } from "../../../reducers/reportReducer/agingReportDownloadReducer";
import { fetchAgingReportRequest } from "../../../actions/reportActions/getAgingReportActions";
import { fetchAgingReportDownloadRequest } from "../../../actions/reportActions/getAgingReportDownloadActions";
import { getAllEmployerDetails } from "../../../reducers/employersReducer/allEmployersReducer";
import { fetchAllEmployersRequest } from "../../../actions/employersActions/allEmployersActions";

const useStyles = makeStyles({
  root: {
    "& .MuiInputLabel-root": { top: "-3px" },
    "& .MuiOutlinedInput-root": { borderRadius: "0px" },
  },
});

const AgingReport = (props: any) => {
  const [employer, setEmployer] = React.useState(0);
  const [date, setDate] = React.useState<string | null>(moment(new Date()).format('MM-DD-YYYY'));
  const [contentType, setContentType] = React.useState("");
  const [reportResult, setReportResult] = React.useState("");
  const [reportType, setReportType] = React.useState(props.type);

  const classses = useStyles();
  const dispatch = useDispatch();
  const getEvents = (type) => {
    dispatch(
      fetchAllEmployersRequest({})
    );
  };

  const employerRes = useSelector(getAllEmployerDetails);
  useEffect(() => {
    getEvents(reportType);
  }, []);
  
  const newDate = new Date()
  const currentDate = moment(new Date()).format('YYYY-MM-DD')
  const [isSubmitted, setSubmitted] = useState(false);

  const handleSubmit = (val) => {
    setContentType(val.toString());
    setSubmitted(true);
    const tempReportReqData: any = {
      "employerId":employer,
      "date": moment(date).format('MM/DD/YYYY'),
      "type": reportType,
      "contentType": val
    }      
    if(employer && date)
    dispatch(fetchAgingReportRequest(tempReportReqData)); 
  }

  let reportResData:any = useSelector(getAgingReport);
  useEffect(() => {
    if(reportResData.data){
      setReportResult(reportResData.data);
      reportResData.data=null;
    }
  }, [reportResData.data]);
  
  const handleDownload = (val) => {
    setContentType(val.toString());
    setSubmitted(true);
    const tempReportReqData: any = {
      "employerId":employer,
      "date": moment(date).format('MM/DD/YYYY'),
      "type": reportType,
      "contentType": val
    }      
    dispatch(fetchAgingReportDownloadRequest(tempReportReqData)); 
  }

  const reportDownloadResData:any = useSelector(getAgingReportDownload);

  useEffect(() => {
    if(reportDownloadResData.data){
      saveAs(reportDownloadResData.data, "AgingReport.pdf")
      reportDownloadResData.data = null;
    }
    }, [reportDownloadResData.data]);

    
  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="demo-simple-select-helper-label">
                Employer
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label="Employer"
                fullWidth
                value={employer}
                name="employer"
              >
                <MenuItem value="0" onClick={() => setEmployer(0)}>Select
                      </MenuItem>
                      {employerRes && employerRes.length > 0 &&
                        employerRes.map((e: any, idx: number) => (
                          <MenuItem value={e.id} key={idx} 
                          onClick={() => setEmployer(e.id)}>
                            {e.name}
                          </MenuItem>
                        ))}
              </Select>
              <div className={employer == 0 && isSubmitted ? "error-span show" : "error-span"}>
                {!employer && isSubmitted? "Please Select the Employer" : ""}
              </div>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack spacing={3}>
              <DatePicker
                  label="Date"
                  value={date}
                  minDate={new Date('2-01-01')}
                  maxDate={new Date(currentDate)}
                  onChange={(newValue) => {
                    setDate(newValue != null ? newValue.toString() : newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
          </Grid>

          <Grid item sx={{ alignSelf:"inherit" }}>
            <Button
              variant="contained"
              className="save-btn-role"
              sx={{ margin: "5px" }}
              onClick={() =>handleSubmit("HTML")}
            >
              Search
            </Button>
          </Grid>
        </Grid>

        <br></br>
        {reportResult &&
        <Grid container justifyContent="space-between">
          <Grid item>
        {!reportResult.includes("No data found for given criteria")  &&
        <Grid item sx={{ alignSelf: "center" }}>
            <Button
              variant="contained"
              className="save-btn-role"
              sx={{ margin: "5px" }}
              onClick={() =>handleDownload("PDF")}
              startIcon={<DownloadIcon/>}
            >
              Download Report
            </Button>
          </Grid>
        }
        <div className="reportDiv">
        {ReactHtmlParser(reportResult)}
        </div>
        </Grid>
        </Grid>
        }
        
      </Box>
    </React.Fragment>
  );
};

export default AgingReport;
