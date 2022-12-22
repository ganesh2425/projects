import React, { useEffect, useState } from "react";
import {
  Grid,
  ListItem,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { downloadHolidayDetails } from "../../../reducers/holidayReducer/holidayTempReducer";
import { useDispatch, useSelector } from "react-redux";
import { fetchDownloadHolidayTempRequest } from "../../../actions/holidayActions/holidayTempActions";
import { useNavigate, useParams } from "react-router-dom";
import { saveAs } from "file-saver";
import { getHolidayListDetails } from "../../../reducers/holidayReducer/getHolidayListReducer";
import { fetchGetHolidayListRequest } from "../../../actions/holidayActions/getHolidayListActions";
import { fetchUploadHolidayListRequest } from "../../../actions/holidayActions/uploadHolidayActions";
import { getUploadHolidayDetails } from "../../../reducers/holidayReducer/uploadHolidayListReducer";
import { toast } from "react-toastify";

const HolidayTable = ({ employerId }: any): JSX.Element => {
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const dispatch = useDispatch();
  const params = useParams();
  const [reportResult, setReportResult] = React.useState("");
  const getHolidayRes: any = useSelector(downloadHolidayDetails);

  var downloadRes = getHolidayRes.data;
  const [year, setYear] = useState<any>(new Date().getFullYear());
  const [upload, setUpload] = useState(false);

  // downloadTemplate
  useEffect(() => {
    if (downloadRes) {
      setReportResult(downloadRes);
      toast.success(`Holiday List Template Downloaded Successfully`);
      saveAs(downloadRes, "template_holiday.xlsx");
      getHolidayRes.data = null;
    }
  }, [downloadRes]);

  const handleDownload = (e: any) => {
    let id: any = params.employerId;

    if (id > 0) {
      dispatch(fetchDownloadHolidayTempRequest({ id, year }));
    }
  };

  const years: any = [];
  const currentYear = new Date().getFullYear();
  for (let i = 9; i > 0; i--) {
    years.push({ value: currentYear - i, option: currentYear - i });
  }
  years.push({ value: currentYear, option: currentYear });

  useEffect(() => {
    getHolidays();
  }, [year, upload]);

  const getHolidays = () => {
    let id: any = params.employerId;
    dispatch(fetchGetHolidayListRequest({ id, year }));
  };

  const [list, setList] = useState<any>([]);
  const holidayListRes: any = useSelector(getHolidayListDetails);
  let errorRes: any = holidayListRes.errorMessages[0];

  useEffect(() => {
    if (holidayListRes && holidayListRes.isSuccess == true) {
      setList(holidayListRes.holidayList);
      errorRes = null;
      holidayListRes.errorMessages[0] = null;
    } else if (holidayListRes && holidayListRes.isSuccess == false) {
      setList([]);
    }
  }, [holidayListRes]);

  const data: any = holidayListRes.holidayList
    ? holidayListRes.holidayList
    : [];

  const [save, setSave] = useState("");
  const handleFiles = (e: any) => {
    setSave(e.target.files[0]);
  };
  const [errorMsg, setErrorMsg] = useState("");
  const handleUpload = (e: any) => {
    if (save.length > 0) {
    }
    const formData = new FormData();
    if (employerId && employerId > 0) {
      let id = employerId.toString();
      formData.append("file", save);
      dispatch(fetchUploadHolidayListRequest({ formData, id, year }));
      setUpload(true);
    }
  };

  const uploadRes: any = useSelector(getUploadHolidayDetails);
  var response: any = uploadRes.data;
  useEffect(() => {
    if (response && response.holidayList && response.holidayList.length > 0) {
      toast.success("Files  Uploaded Successfully");
      response.holidayList = null;
    } else if (response && response.isSuccess === false) {
      toast.error(response.errorMessages[0]);
    }
  }, [response]);

  const date = new Date();
  return (
    <>
      <Grid>
        <Typography variant="h5" className="holiday-title">
          Holiday List
        </Typography>
        <Paper className="holiday-layout">
          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: "space-between",
              margin: "16px 0px",
            }}
          >
            <Grid
              item
              xs={3}
              style={{ margin: "10px" }}
              sx={{ background: "white", height: "44px" }}
            >
              <TextField
                InputProps={{
                  style: { borderRadius: 0 },
                }}
                id="outlined-select-currency"
                select
                label="Year"
                defaultValue={date.getFullYear()}
                value={year}
                onChange={(e) => setYear(e.target.value)}
                name="year"
                fullWidth
              >
                <MenuItem value="">
                  <em>Select Type</em>
                </MenuItem>
                {years.map((ele) => (
                  <MenuItem
                    value={ele.value}
                    onClick={() => {
                      setYear(ele.value);
                    }}
                  >
                    {ele.option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid style={{ margin: "10px" }}>
              <Button
                className="btn-styling-aca-edit"
                variant="outlined"
                startIcon={<DownloadIcon />}
                onClick={(e) => handleDownload(e)}
              >
                Download Template
              </Button>
            </Grid>
            <Grid item md={3} className="upload" style={{ margin: "10px" }}>
              <TextField
                id="outlined-basic"
                inputProps={{ accept: ".xls, .xlsx" }}
                variant="outlined"
                name="file"
                type="file"
                placeholder=""
                className="align-upload"
                fullWidth
                sx={{ cursor: "pointer !important" }}
                onChange={handleFiles}
              />
              <Button
                onClick={handleUpload}
                className="btn btn-success mt-4 button"
              >
                upload
              </Button>
              {errorMsg && (
                <span style={{ color: "red", fontSize: "12px" }}>
                  {errorMsg}
                </span>
              )}
            </Grid>
          </Grid>
          <TableContainer
            sx={{ height: "fitContent", border: "1px solid lightgray" }}
          >
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell
                    className=""
                    sx={{
                      borderRight: "1px solid lightgray",
                      fontWeight: "bold",
                    }}
                  >
                    Holiday
                  </TableCell>
                  <TableCell
                    className=""
                    sx={{
                      borderRight: "1px solid lightgray",
                      fontWeight: "bold",
                      width: "15%",
                    }}
                  >
                    Recognized
                  </TableCell>
                  <TableCell
                    className=""
                    sx={{
                      borderRight: "1px solid lightgray",
                      fontWeight: "bold",
                    }}
                  >
                    Date
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <div style={{ textAlign: "center" }}>
                  {errorRes && errorRes}
                </div>
                {list &&
                  list.map((role, index) => (
                    <TableRow
                      key={index}
                      className={index % 2 == 0 ? "table-bg" : ""}
                    >
                      <TableCell key={index}>{role.holidayName}</TableCell>
                      <TableCell key={index}>{role.recognized}</TableCell>
                      <TableCell key={index}>
                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                          <div className="">{role.date}</div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                {isSuccess === false && <div>{errorMessage}</div>}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </>
  );
};

export default HolidayTable;
