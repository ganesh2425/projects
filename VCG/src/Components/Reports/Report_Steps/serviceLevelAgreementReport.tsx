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
import { getActiveUSERDetails } from "../../../reducers/usersReducer/allActiveUserReducer";
import { fetchAllEmployersByTypeRequest } from "../../../actions/employersActions/allEmployersByTypeActions";
import { getAllEmployerByTypeDetails } from "../../../reducers/employersReducer/allEmployersByTypeReducer";
import moment from "moment";
import ReactHtmlParser from 'html-react-parser';
import { fetchSLAReportRequest } from "../../../actions/reportActions/getSLAReportActions";
import { getSLAReport } from "../../../reducers/reportReducer/sLAReportReducer";
import { getSLAReportDownload } from "../../../reducers/reportReducer/sLAReportDownloadReducer";
import {saveAs} from "file-saver"
import { fetchSLAReportDownloadRequest } from "../../../actions/reportActions/getSLAReportDownloadActions";
import { getAllEmployerDetails } from "../../../reducers/employersReducer/allEmployersReducer";
import { fetchAllEmployersRequest } from "../../../actions/employersActions/allEmployersActions";
import { getUSERDetails } from "../../../reducers/usersReducer/allUserReducer";
import {fetchUserRequest} from "../../../actions/usersActions/allUserActions";

const useStyles = makeStyles({
  root: {
    "& .MuiInputLabel-root": { top: "-3px" },
    "& .MuiOutlinedInput-root": { borderRadius: "0px" },
  },
});


const ServiceLevelAgreementReport = (props: any) => {
  const [startDate, setStartDate] = React.useState<string | null>(moment(new Date()).format('MM-DD-YYYY'));
  const [endDate, setEndDate] = React.useState<string | null>(moment(new Date()).format('MM-DD-YYYY'));
  const [reportType, setReportType] = React.useState(props.type);
  const [contentType, setContentType] = React.useState("");
  const [employer, setEmployer] = React.useState(0);
  
  const dispatch = useDispatch();
  const getEvents = (type) => {
    dispatch(
      fetchAllEmployersRequest({type})
    );
  };

  const employerRes = useSelector(getAllEmployerDetails);
  useEffect(() => {
    getEvents(reportType);
  }, []);

  const newDate = new Date()
  const currentDate = moment(new Date()).format('YYYY-MM-DD')
  const [isSubmitted, setSubmitted] = useState(false);
  const [reportResult, setReportResult] = React.useState("");

  const handleSubmit = (val) => {
    setContentType(val.toString());
    setSubmitted(true);
    const tempReportReqData: any = {
      "employerId":employer,
      "startDate":moment(startDate).format('MM/DD/YYYY'),
      "endDate": moment(endDate).format('MM/DD/YYYY'),
      "type": reportType,
      "contentType": val
    }      
    if(employer && startDate && endDate)
    dispatch(fetchSLAReportRequest(tempReportReqData)); 
  }

  let reportResData:any = useSelector(getSLAReport);
  useEffect(() => {
    if(reportResData.data){
      setReportResult(reportResData.data);
      reportResData.data=null;
    }
  }, [reportResData.data]);
  
  const reportDownloadResData:any = useSelector(getSLAReportDownload);

  useEffect(() => {
    if(reportDownloadResData.data){
      saveAs(reportDownloadResData.data, "ServiceLevelAgreementReport.pdf")
      reportDownloadResData.data = null;
    }
    }, [reportDownloadResData.data]);

  const handleDownload = (val) => {
    setContentType(val.toString());
    setSubmitted(true);
    const tempReportReqData: any = {
      "employerId":employer,
      "startDate":moment(startDate).format('MM/DD/YYYY'),
      "endDate": moment(endDate).format('MM/DD/YYYY'),
      "type": reportType,
      "contentType": val
    }      
    dispatch(fetchSLAReportDownloadRequest(tempReportReqData)); 
  }

  const classses = useStyles();
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
                  label="Start Date"
                  value={startDate}
                  minDate={new Date('2-01-01')}
                  maxDate={new Date(currentDate)}
                  onChange={(newValue) => {
                    setStartDate(moment(newValue).format('MM-DD-YYYY'));
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
          </Grid>

          <Grid item xs={3}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack spacing={3}>
                <DatePicker
                  label="End Date"
                  value={endDate}
                  minDate={new Date('2-01-01')}
                  maxDate={new Date(currentDate)}
                  onChange={(newValue) => {
                    setEndDate(moment(newValue).format('MM-DD-YYYY'));
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
          </Grid>

          <Grid item sx={{ alignSelf: "inherit" }}>
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

export default ServiceLevelAgreementReport;
