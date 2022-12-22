import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllEmployersByTypeRequest } from "../../../actions/employersActions/allEmployersByTypeActions";
import { getAllEmployerByTypeDetails } from "../../../reducers/employersReducer/allEmployersByTypeReducer";
import { getActiveUSERDetails } from "../../../reducers/usersReducer/allActiveUserReducer";
import { fetchActiveUserRequest } from "../../../actions/usersActions/allActiveUserActions";
import Moment from 'moment';
import { fetchQuantitiesReportRequest } from "../../../actions/reportActions/getQuantitiesReportActions";
import { getQuantitiesReport } from "../../../reducers/reportReducer/quantitiesReportReducer";
import ReactHtmlParser from 'html-react-parser';
import DownloadIcon from "@mui/icons-material/Download";
import {saveAs} from "file-saver"
import { fetchQuantitiesReportDownloadRequest } from "../../../actions/reportActions/getQuantitiesReportDownloadActions";
import { getQuantitiesReportDownload } from "../../../reducers/reportReducer/quantitiesReportDownloadReducer";
import moment from "moment";
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

const QuantitiesReport = (props: any) => {
  const [startDate, setStartDate] = React.useState<string | null>(Moment(new Date()).format('MM-DD-YYYY'));
  const [endDate, setEndDate] = React.useState<string | null>(Moment(new Date()).format('MM-DD-YYYY'));
  const [reportType, setReportType] = React.useState(props.type);
  const [employer, setEmployer] = React.useState(0);
  const [searchType, setSearchType] = React.useState("User");
  const [timeline, setTimeline] = React.useState("Date Range");
  const [userOrEmployerData, setUserOrEmployerData] = React.useState([]);
  const [year, setYear] = React.useState("");
  const [contentType, setContentType] = React.useState("");
  const [isSubmitted, setSubmitted] = useState(false);
  const [reportResult, setReportResult] = React.useState("");
  const currentDate = Moment(new Date()).format('MM-DD-YYYY');
  const dispatch = useDispatch();
  const employerRes = useSelector(getAllEmployerDetails);
  const getUsersRes = useSelector(getUSERDetails);
  let userOrEmployerRes:any = [];
  
  useEffect(() => {
    userOrEmployerRes = [];
    if(searchType == "User"){
      dispatch(
        fetchUserRequest({})
      );
      if(getUsersRes && getUsersRes.length > 0){
        getUsersRes && getUsersRes.length > 0 &&
        getUsersRes.map((e: any, idx: number) => ([
          userOrEmployerRes.push({ id: e.id , name: e.name})
      ]))
      } 
    }
    else if(searchType == "Employer"){
      const getEvents = (type) => {
      dispatch(
        fetchAllEmployersRequest({})
      );
      };
      getEvents(reportType);
      
      if(employerRes && employerRes.length > 0){
        employerRes && employerRes.length > 0 &&
        employerRes.map((e: any, idx: number) => ([
          userOrEmployerRes.push({  id: e.id , name: e.name })
      ]))
      }
    }
    setUserOrEmployerData(userOrEmployerRes);
    console.log(userOrEmployerData);
  }, [searchType]);
  
  const searchByType = [
      { value: "User", option: "User" },
    { value: "Employer", option: "Employer" }
  ];
  
  const timelineConst = [
    { value: "Date Range", option: "Date Range" },
    { value: "Full Year", option: "Full Year" },
    { value: "Q1", option: "Q1" },
    { value: "Q2", option: "Q2" },
    { value: "Q3", option: "Q3" },
    { value: "Q4", option: "Q4" }
  ];

  const yearConst :any = [];
  const currentYear = new Date(). getFullYear();
  for(let i = 9; i > 0 ; i--) {
    yearConst.push({ value:currentYear-i , option:currentYear-i })
  }
  yearConst.push({ value:currentYear , option:currentYear });

  const classses = useStyles();

  const handleSubmit = (val) => {
    setContentType(val.toString());
    setSubmitted(true);
    let id = "userId";
    if(searchType == "Employer"){
      id = "employerId"
    }
    const tempReportReqData: any = {
      id:employer,
      "startDate":moment(startDate).format('MM/DD/YYYY'),
      "endDate": moment(endDate).format('MM/DD/YYYY'),
      "year": year,
      "timeline": timeline,
      "searchType":searchType,
      "contentType": val,
      "reportType":reportType
    }      
    if(employer){
      dispatch(fetchQuantitiesReportRequest(tempReportReqData)); 
    }
    
  }

  const handleDownload = (val) => {
    setContentType(val.toString());
    setSubmitted(true);
    let id = "userId";
    if(searchType == "Employer"){
      id = "employerId"
    }
    const tempReportReqData: any = {
      id:employer,
      "startDate":moment(startDate).format('MM/DD/YYYY'),
      "endDate": moment(endDate).format('MM/DD/YYYY'),
      "year": year,
      "timeline": timeline,
      "searchType":searchType,
      "contentType": val,
      "reportType":reportType
    }      
    if(val == "PDF"){}
    dispatch(fetchQuantitiesReportDownloadRequest(tempReportReqData)); 
  }

  const reportResData:any = useSelector(getQuantitiesReport);
  const reportDownloadResData:any = useSelector(getQuantitiesReportDownload);

  useEffect(() => {
    if(reportDownloadResData.data){
      saveAs(reportDownloadResData.data, "QuantitiesReport.pdf")
      reportDownloadResData.data = null;
    }
    }, [reportDownloadResData.data]);

  useEffect(() => {
    if(reportResData.data){
      setReportResult(reportResData.data);
      reportResData.data=null;
    }
  }, [reportResData.data]);

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1} sx={{ margin: "10px 0px" }}>
        <Grid item xs={2}>
              <FormControl sx={{ width: "100%" }}>
              <InputLabel id="demo-simple-select-helper-label">
                Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label="Type"
                fullWidth
                value={searchType}
                name="type"
              >
                      {searchByType && searchByType.length > 0 &&
                        searchByType.map((e: any) => (
                          <MenuItem value={e.option} 
                          onClick={() => {
                          setSearchType(e.option);
                          setEmployer(0);
                          }}
                          >
                            {e.option}
                          </MenuItem>
                        ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={2}>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="demo-simple-select-helper-label">
                {searchType}
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label={searchType}
                fullWidth
                value={employer}
                name="employer"
              >
                <MenuItem value="0" onClick={() => setEmployer(0)}>Select
                      </MenuItem>
                        {userOrEmployerData && userOrEmployerData.length > 0 &&
                        userOrEmployerData.map((e: any, idx: number) => (
                          <MenuItem value={e.id}  
                          onClick={() => setEmployer(e.id)}>
                            {e.name}
                          </MenuItem>
                        ))}
              </Select>
              <div className={employer == 0 && isSubmitted ? "error-span show" : "error-span"}>
                {!employer && isSubmitted? "Please Select the "+searchType : ""}
              </div>
            </FormControl>
          </Grid>

        <Grid item xs={2}>
              <FormControl sx={{ width: "100%" }}>
              <InputLabel id="demo-simple-select-helper-label">
                Timeline
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label="Timeline"
                fullWidth
                value={timeline}
                name="timeline"
              >
                      {timelineConst && timelineConst.length > 0 &&
                        timelineConst.map((e: any) => (
                          <MenuItem value={e.option} 
                          onClick={() => {
                          setTimeline(e.option);
                          }}
                          >
                            {e.option}
                          </MenuItem>
                        ))}
              </Select>
            </FormControl>
          </Grid>

          {timeline == "Date Range" && 
          <React.Fragment>
            <Grid item xs={2}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack spacing={3}>
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  minDate={new Date('2-01-01')}
                  maxDate={new Date(currentDate)}
                  onChange={(newValue) => {
                    setStartDate(Moment(newValue).format('MM-DD-YYYY'));
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
          </Grid>

          <Grid item xs={2}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack spacing={3}>
                <DatePicker
                  label="End Date"
                  value={endDate}
                  minDate={new Date('2-01-01')}
                  maxDate={new Date(currentDate)}
                  onChange={(newValue) => {
                    setEndDate(Moment(newValue).format('MM-DD-YYYY'));
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
          </Grid>  
          </React.Fragment>
          }
          
          {(timeline == "Full Year" || timeline == "Q1" || timeline == "Q2" || timeline == "Q3" || timeline == "Q4") && 
          <React.Fragment>
          <Grid item xs={2}>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="demo-simple-select-helper-label">Year</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label="year"
                onChange={(e) => setYear(e.target.value)}
                fullWidth
                value={year}
                name="year"
              >
                {yearConst.map((ele) => (
                  <MenuItem value={ele.value}
                    onClick={() => {
                    setYear(ele.value);
                    }}
                    >{ele.option}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          </React.Fragment>
          }

          <Grid item sx={{alignSelf:"inherit"}}>
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
        <div>
        {ReactHtmlParser(reportResult)}
        </div>
        </Grid>
        </Grid>
        }
      </Box>
    </React.Fragment>
  );
};

export default QuantitiesReport;
