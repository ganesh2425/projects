import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Header";
import SwipeableSidenavbar from "../Sidenavbar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { largeScrees, smallScreen } from "../../Helper/slider";
import Slide from "@mui/material/Slide";
import SearchBar from "material-ui-search-bar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import CloseIcon from '@mui/icons-material/Close';
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { makeStyles } from "@mui/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { getAllQlesDetails } from "../../reducers/qleReducer/allQleReducer";
import { fetchAllQlesRequest } from "../../actions/qleActions/allQleActions";
import { CircularProgress, FormControl, IconButton, MenuItem, Select, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import "./style.css"
import { getAllEmployerDetails } from "../../reducers/employersReducer/allEmployersReducer";
import { fetchAllEmployersRequest } from "../../actions/employersActions/allEmployersActions";
import { getDelQleEventDetails } from "../../reducers/qleReducer/delQleReducer";
import { fetchDelQleEventRequest } from "../../actions/qleActions/delQleActions";
import { history } from "../../config/history";
import Footer from "../Footer";

import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { TransitionProps } from "@mui/material/transitions";
import { fetchEventStatusRequest } from "../../actions/qleActions/getEventStatusActions";
import { getEventStatusDetails } from "../../reducers/qleReducer/eventStatusReducer";
// import SearchBar from "material-ui-search-bar";
import LoadingOverlay from 'react-loading-overlay';

const useStyles = makeStyles({
  root: {
    "& .MuiInputLabel-root": { top: "-3px" },
    "& .MuiOutlinedInput-root": { borderRadius: "0px" },

  },
});
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const QLE = (props: any) => {
  const dispatch = useDispatch();
  const [headerValues, setHeaderValues] = useState({ sidebar: 2, header: 10 });
  const [organisation, setOrganisation] = React.useState(1);
  const [status, setStatus] = useState(0);
  const [empIds, setEmp] = useState(1);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const navigate = useNavigate();

  let params = useParams();
  const handleHeaders = () => {
    headerValues.sidebar == 2
      ? setHeaderValues(smallScreen())
      : setHeaderValues(largeScrees());
  };
  const handleTestChange = (id: number) => {
    dispatch(fetchAllQlesRequest({ id }));
  }

  useEffect(() => {
    getMenus();
  }, []);

  const getMenus = () => {
    dispatch(
      fetchAllEmployersRequest({})
    );
  };

  const menuRes = useSelector(getAllEmployerDetails);
  useEffect(() => {
    const tempData: any = [];
    if (menuRes) {
      //setRows(QLEdatas);
      getQLEDetails();
    }
  }, [menuRes]);


  // useEffect(() => {
  //   getQLEDetails();
  // }, []);

  const getQLEDetails = () => {
    let statusId: any = status;
    let empId: any = empIds;
    if (params.qleStatusId && params.qleEmpId) {
      statusId = params.qleStatusId;
      empId = params.qleEmpId;
    }
    setStatus(statusId);
    setEmp(empId);
    setOrganisation(empId);
    dispatch(
      fetchAllQlesRequest({ statusId, empId })
    );
  };

  const QLEdatas = useSelector(getAllQlesDetails);

  useEffect(() => {
    const tempData: any = [];
    if (QLEdatas && QLEdatas.data) {
      setRows(QLEdatas.data);

    }
  }, [QLEdatas]);

  const [QLE, setRows] = useState<any>([QLEdatas]);
  const [qleId, setqleId] = React.useState(0);
  const [searched, setSearched] = useState<string>("");
  const [sortedField, setSortedField] = React.useState(null);

  const classes = useStyles();
  const [sort, setsort] = useState<any>([QLEdatas]);
  const [order, setorder] = useState<any>("ASC");

  const Sorting = (col) => {
    let sortdata = [];
    if (order === "ASC") {
      if (col == "name") {
        sortdata = QLE.sort((a, b) => (a.name.toLowerCase()) > (b.name.toLowerCase()) ? 1 : -1);
      } else if (col == "ssn") {
        sortdata = QLE.sort((a, b) => (a.ssn > b.ssn) ? 1 : -1);
      } else if (col == "eventType") {
        sortdata = QLE.sort((a, b) => (a.eventType > b.eventType) ? 1 : -1);
      } else if (col == "evntDate") {
        sortdata = QLE.sort((a, b) => (a.evntDate > b.evntDate) ? 1 : -1);
      } else if (col == "submittedDate") {
        sortdata = QLE.sort((a, b) => (a.submittedDate > b.submittedDate) ? 1 : -1);
      } else if (col == "modifiedDate") {
        sortdata = QLE.sort((a, b) => (a.modifiedDate > b.modifiedDate) ? 1 : -1);
      }

      setorder("DSC");
      setRows(sortdata);
    } else if (order === "DSC") {
      if (col == "name") {
        sortdata = QLE.sort((a, b) => ((a.name.toLowerCase()) < (b.name.toLowerCase())) ? 1 : -1);
      } else if (col == "ssn") {
        sortdata = QLE.sort((a, b) => (a.ssn < b.ssn) ? 1 : -1);
      } else if (col == "eventType") {
        sortdata = QLE.sort((a, b) => (a.eventType < b.eventType) ? 1 : -1);
      }
      else if (col == "evntDate") {
        sortdata = QLE.sort((a, b) => (a.evntDate < b.evntDate) ? 1 : -1);
      }
      else if (col == "submittedDate") {
        sortdata = QLE.sort((a, b) => (a.submittedDate < b.submittedDate) ? 1 : -1);
      }
      else if (col == "modifiedDate") {
        sortdata = QLE.sort((a, b) => (a.modifiedDate < b.modifiedDate) ? 1 : -1);
      }

      setorder("ASC");
      setRows(sortdata);
    }


  }
  const initialValue: any = [];
  const [filtered, setFiltered] = React.useState(initialValue);

  const requestSearch = (value: string, accessor: string) => {
    let filteredArr = filtered;
    let insertNewFilter = 1;
    if (filteredArr.length) {
      filteredArr.forEach((filter: any, i: any) => {
        if (filter["id"] === accessor) {
          if (value === "" || !value.length) filteredArr.splice(i, 1);
          else filter["value"] = value;
          insertNewFilter = 0;
        }
      });
    }
    if (insertNewFilter) {
      filteredArr.push({ id: accessor, value: value });
    }
    setFiltered(filteredArr);
    let filteredRows: any = QLEdatas;

    if (filteredArr.length) {
      filteredArr.forEach((filter: any, i: any) => {

        if (filter["id"] == "name") {
          filteredRows = filteredRows.filter((x: { name: string }) => x.name.toLowerCase().includes(filter["value"].toLowerCase()))
        }
        else if (filter["id"] == "ssn") {
          filteredRows = filteredRows.filter((x: { ssn: string }) => x.ssn.toLowerCase().includes(filter["value"].toLowerCase()))
        }
        else if (filter["id"] == "eventTypeId") {
          filteredRows = filteredRows.filter((x: { eventTypeId: string }) => x.eventTypeId.toLowerCase().includes(filter["value"].toLowerCase()))
        }
        else if (filter["id"] == "eventType") {
          filteredRows = filteredRows.filter((x: { eventType: string }) => x.eventType.toLowerCase().includes(filter["value"].toLowerCase()))
        }
        else if (filter["id"] == "eventsubTypeId") {
          filteredRows = filteredRows.filter((x: { eventsubTypeId: string }) => x.eventsubTypeId.toLowerCase().includes(filter["value"].toLowerCase()))
        }
        else if (filter["id"] == "evensubtType") {
          filteredRows = filteredRows.filter((x: { evensubtType: string }) => x.evensubtType.toLowerCase().includes(filter["value"].toLowerCase()))
        }
        else if (filter["id"] == "evntDate") {
          filteredRows = filteredRows.filter((x: { evntDate: string }) => x.evntDate.toLowerCase().includes(filter["value"].toLowerCase()))
        }
        else if (filter["id"] == "submittedDate") {
          filteredRows = filteredRows.filter((x: { submittedDate: string }) => x.submittedDate.toLowerCase().includes(filter["value"].toLowerCase()))
        }
        else if (filter["id"] == "modifiedDate") {
          filteredRows = filteredRows.filter((x: { modifiedDate: string }) => x.modifiedDate.toLowerCase().includes(filter["value"].toLowerCase()))
        }

      })
    }
    setRows(filteredRows);
  };

  const cancelSearch = (accessor: string) => {
    setSearched("");
    requestSearch(searched, accessor);
  };

  const handleEdit = (id: number) => {
    navigate(`/qle-edit/${id}`);
  }
  const handleRemove = (id: number) => {
    dispatch(fetchDelQleEventRequest({ id }));
  }
  const qleDataAfterDel: any = useSelector(getDelQleEventDetails)
  useEffect(() => {
    if (qleDataAfterDel && qleDataAfterDel.isSuccess) {
      handleClose();
      toast.success("Employer deleted successfully");
      qleDataAfterDel.isSuccess = false;
      getQLEDetails();
    }
  }, [qleDataAfterDel]);

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getEventStatus();
  }, []);

  const getEventStatus = () => {
    dispatch(
      fetchEventStatusRequest({})
    );
  };

  const QLEStatusTemp = useSelector(getEventStatusDetails);
  if(QLEStatusTemp && QLEStatusTemp.qleEventStatusList){
  const QLEStatusDetails = QLEStatusTemp.qleEventStatusList;
  var QLEStatus:any = [];
  for (let i in  QLEStatusDetails) {
    QLEStatus.push({value:i,option:QLEStatusDetails[i]});
  }
  }

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChange = (event: any) => {
    setOrganisation(event.target.value);
  };

  const handleStatusChange = (event: any) => {
    let statusId = event.target.value;
    let empId = empIds;
    setStatus(event.target.value);
    let data = [statusId, empIds]
    dispatch(fetchAllQlesRequest({ statusId, empId }));
  };

  const handleEmplrItemChange = (e: any) => {
    let empId = e;
    let statusId = status;
    setEmp(empId);
    dispatch(fetchAllQlesRequest({ statusId, empId }));

  }

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const classses = useStyles();
  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
          <Grid
            xs={6}
            style={{ transition: "500ms", background: "#f2f2f2" }}
            md={headerValues.sidebar}
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
            <Box style={{ margin: "36px 15px" }} sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid className="title-styling" item xs={9}>
                  Hi, welcome back!
                </Grid>
                <Grid style={{ textAlign: "left" }} item xs={3}>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <Select
                        value={organisation}
                        onChange={handleChange}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        sx={{ background: "white", height: "44px", }}

                      >
                        <MenuItem value="">
                        </MenuItem>
                        {menuRes && menuRes.length > 0 &&
                          menuRes.map((e: any, idx: number) => (
                            <MenuItem value={e.id} key={idx} onClick={() => handleEmplrItemChange(e.id)} >
                              {e.name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>

                  </Box>
                </Grid>
              </Grid>
              <br></br>
              <Paper >
                <Grid container>
                  <Grid item md={8.2} className="qle-status">
                    <span className="qle-status-text">Status: </span>
                    {QLEStatus && QLEStatus[status].option}
                  </Grid>
                  <Grid item md={3.5}>
                    <FormControl fullWidth>
                      <Select
                        value={status}
                        onChange={handleStatusChange}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        sx={{ height: "40px", marginTop: "10px", }}

                      // onClick={() => handleTestChange(status)}
                      >
                        {QLEStatus && QLEStatus.map((ele) => (
                          <MenuItem value={ele.value}>{ele.option}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                { QLEdatas && QLEdatas.pending &&
                <LoadingOverlay className={"spinner"}
                    active={true}
                    spinner
                    // text='Loading your content...'
                    >
                </LoadingOverlay>
                 }
                <TableContainer sx={{ maxHeight: 500 }}>
                  <Table stickyHeader aria-label="sticky table" >
                    <TableHead >
                      <TableRow>
                        <TableCell className="bg-table">
                          Name
                          <CompareArrowsIcon
                            fontSize="small"
                            sx={{
                              transform: "rotate(90deg)",
                              margin: "0px 0px -5px 0px",
                              color: "#8080808f",
                            }}
                            onClick={() => Sorting("name")}
                          />
                        </TableCell>

                        <TableCell className="bg-table">
                          SSN{" "}
                          <CompareArrowsIcon
                            fontSize="small"
                            sx={{
                              transform: "rotate(90deg)",
                              margin: "0px 0px -5px 0px",
                              color: "#8080808f",

                            }}
                            onClick={() => Sorting("ssn")}
                          />
                        </TableCell>
                        <TableCell className="bg-table">
                          Event Type{" "}
                          <CompareArrowsIcon
                            fontSize="small"
                            sx={{
                              transform: "rotate(90deg)",
                              margin: "0px 0px -5px 0px",
                              color: "#8080808f",
                            }}
                            onClick={() => Sorting("eventType")}
                          />
                        </TableCell>
                        <TableCell className="bg-table">
                          Event Date{" "}
                          <CompareArrowsIcon
                            fontSize="small"
                            sx={{
                              transform: "rotate(90deg)",
                              margin: "0px 0px -5px 0px",
                              color: "#8080808f",
                            }}
                            onClick={() => Sorting("evntDate")}
                          />
                        </TableCell>
                        <TableCell className="bg-table">
                          Date Submitted
                          <CompareArrowsIcon
                            fontSize="small"
                            sx={{
                              transform: "rotate(90deg)",
                              margin: "0px 0px -5px 0px",
                              color: "#8080808f",
                            }}
                            onClick={() => Sorting("submittedDate")}
                          />
                        </TableCell>
                        <TableCell className="bg-table">
                          Date Modified{" "}
                          <CompareArrowsIcon
                            fontSize="small"
                            sx={{
                              transform: "rotate(90deg)",
                              margin: "0px 0px -5px 0px",
                              color: "#8080808f",
                            }}
                            onClick={() => Sorting("modifiedDate")}
                          />
                        </TableCell>
                        <TableCell className="bg-table"></TableCell>
                        <TableCell className="bg-table"></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableHead>
                      <TableRow>
                        <TableCell >
                          <SearchBar
                            value={searched}
                            onChange={(searchValn) => requestSearch(searchValn, "name")}
                            onCancelSearch={() => cancelSearch("name")}
                            placeholder={"Search by Name"}
                            style={{
                              textOverflow: "ellipsis",
                              width: "130px",
                              overflow: "hidden",
                              padding: "0px"
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <SearchBar
                            value={searched}
                            onChange={(searchValn) => requestSearch(searchValn, "ssn")}
                            onCancelSearch={() => cancelSearch("ssn")}
                            placeholder={"Search by SSN"}
                            style={{
                              textOverflow: "ellipsis",
                              width: "130px",
                              overflow: "hidden",
                              padding: "0px"
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <SearchBar
                            value={searched}
                            onChange={(searchValn) => requestSearch(searchValn, "eventType")}
                            onCancelSearch={() => cancelSearch("eventType")}
                            placeholder={"Search by Event Type"}
                            style={{
                              textOverflow: "ellipsis",
                              width: "130px",
                              overflow: "hidden",
                              padding: "0px"
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <SearchBar
                            value={searched}
                            onChange={(searchValn) => requestSearch(searchValn, "evntDate")}
                            onCancelSearch={() => cancelSearch("evntDate")}
                            placeholder={"Search by Event Date"}
                            style={{
                              textOverflow: "ellipsis",
                              width: "130px",
                              overflow: "hidden"
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <SearchBar
                            value={searched}
                            onChange={(searchValn) => requestSearch(searchValn, "submittedDate")}
                            onCancelSearch={() => cancelSearch("submittedDate")}
                            placeholder={"Search by Date Submitted"}
                            style={{
                              textOverflow: "ellipsis",
                              width: "130px",
                              overflow: "hidden",
                              padding: "0px"
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <SearchBar
                            value={searched}
                            onChange={(searchValn) => requestSearch(searchValn, "modifiedDate")}
                            onCancelSearch={() => cancelSearch("modifiedDate")}
                            placeholder={"Search by Date Modified"}
                            style={{
                              textOverflow: "ellipsis",
                              width: "130px",
                              overflow: "hidden",
                              padding: "0px"
                            }}
                          />
                        </TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                 
                    <TableBody>
                        {QLE && QLE.length > 0 &&
                        QLE.
                        slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).
                        map((member: any, index: number) => (
                          <TableRow
                            key={index}
                            className={index % 2 == 0 ? "table-bg" : ""}
                          >
                            <TableCell
                              style={{
                                textOverflow: "ellipsis",
                                width: "130px",
                                overflow: "hidden"
                              }}
                              key={index}>{member.name}</TableCell>
                            <TableCell style={{
                              textOverflow: "ellipsis",
                              width: "130px",
                              overflow: "hidden"
                            }}
                              key={index}>{member.ssn}</TableCell>
                            <TableCell style={{
                              textOverflow: "ellipsis",
                              width: "170px",
                              overflow: "hidden"
                            }}
                              key={index}>
                              <Grid container sx={{ maxWidth: "700px" }}>
                                <Grid item className="muted-text-qle">{member.eventType}</Grid>

                              </Grid>
                            </TableCell>

                            <TableCell style={{
                              textOverflow: "ellipsis",
                              width: "130px",
                              overflow: "hidden"
                            }} key={index}>{member.evntDate}</TableCell>
                            <TableCell style={{
                              textOverflow: "ellipsis",
                              width: "150px",
                              overflow: "hidden"
                            }} key={index}>{member.submittedDate}</TableCell>
                            <TableCell style={{
                              textOverflow: "ellipsis",
                              width: "130px",
                              overflow: "hidden"
                            }} key={index}>{member.modifiedDate}</TableCell>
                            <TableCell style={{
                              textOverflow: "ellipsis",
                              width: "10px",
                              overflow: "hidden",
                              padding: "0px"
                            }} >
                              <EditIcon
                                color="primary"
                                className="editIcon"
                                onClick={() => handleEdit(member.eventId)}
                              />
                            </TableCell>
                            <TableCell style={{
                              textOverflow: "ellipsis",
                              width: "10px",
                              overflow: "hidden",
                              padding: "0px"
                            }}>
                              <Button
                                variant="text"
                                sx={{ border: "none", width: "20px", padding: "0px", marginTop: "-5px" }}
                                key={`${member.eventId}.8`}
                                onClick={() => {
                                  setqleId(member.eventId);
                                  setOpen(true);
                                }}
                              >
                                <DeleteIcon color="primary" key={`${member.eventId}.7`} />
                              </Button>
                              <Dialog
                                open={open}
                                TransitionComponent={Transition}
                                keepMounted
                                onClose={handleClose}
                                aria-describedby="alert-dialog-slide-description"
                                sx={{
                                  top: "-450px",
                                }}
                                fullWidth
                                BackdropProps={{
                                  invisible: true,

                                }}

                                key={`${member.eventId}.9`}
                                style={{ padding: '0px', boxShadow: 'pink', }}

                              >
                                <DialogTitle >
                                  <Typography
                                    variant="caption"
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <Typography variant="h5" sx={{ fontSize: "18px", fontWeight: "600" }}>
                                      {"Confirmation"}
                                    </Typography>

                                    <IconButton
                                      aria-label="close"
                                      onClick={handleClose}
                                      sx={{
                                        position: 'absolute',
                                        right: 8,
                                        top: 8,
                                        color: (theme) => theme.palette.grey[500],
                                      }}
                                    >
                                      <CloseIcon />
                                    </IconButton>
                                  </Typography>
                                </DialogTitle>
                                <DialogContent>
                                  <DialogContentText sx={{ fontSize: "17px" }} id="alert-dialog-slide-description">
                                    Sure to Delete?
                                  </DialogContentText>
                                </DialogContent>
                                <DialogActions sx={{ padding: "12px 19px" }}>
                                  <Button className="cancel-btn-role" onClick={handleClose}>No</Button>
                                  <Button className="save-btn-role" onClick={() => handleRemove(qleId)}>Yes</Button>
                                </DialogActions>
                              </Dialog>

                            </TableCell>
                          </TableRow>
                        ))
                        }
                    </TableBody>
                  </Table>
                  <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={QLEdatas.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TableContainer>
              </Paper>
            </Box>
            <Footer />
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
};
export default QLE;





