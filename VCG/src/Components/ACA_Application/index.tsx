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
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { makeStyles } from "@mui/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { CircularProgress, FormControl, MenuItem, Select, Typography } from "@mui/material";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import './style.css'
import { getAllEmployerDetails } from "../../reducers/employersReducer/allEmployersReducer";
import { fetchAllEmployersRequest } from "../../actions/employersActions/allEmployersActions";
import { fetchAllACARequest } from "../../actions/acaActions/allACAActions";
import { Button } from "@mui/material";
import { Dialog } from "@mui/material";
import { DialogActions } from "@mui/material";
import { DialogContent } from "@mui/material";
import { DialogContentText } from "@mui/material";
import { DialogTitle } from "@mui/material";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { TransitionProps } from "@mui/material/transitions";
import { fetchDelACAEventRequest } from "../../actions/acaActions/delACAEventActions";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { getAllACADetails } from "../../reducers/acaReducer/allACAReducer";
import { delACAEventDetails } from "../../reducers/acaReducer/delACAEventReducer";
import Footer from "../Footer";
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

const Applications = (props: any) => {
  const [headerValues, setHeaderValues] = useState({ sidebar: 2, header: 10 });
  const handleHeaders = () => {
    headerValues.sidebar == 2
      ? setHeaderValues(smallScreen())
      : setHeaderValues(largeScrees());
  };
  const dispatch = useDispatch();
  const [organisation, setOrganisation] = React.useState(1);
  const [status, setStatus] = useState(5);
  const [empIds, setEmp] = useState(1);
  const [open, setOpen] = React.useState(false);
  const [eventId, setEventId] = useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const navigate = useNavigate();

  let params = useParams();

  const handleRemove = (eventId: number) => {
    dispatch(fetchDelACAEventRequest({ eventId }));
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChange = (event: any) => {
    setOrganisation(event.target.value);
  };

  const tempResponse = useSelector(getAllACADetails);
  const allACARes = tempResponse.data;
  useEffect(() => {
    getACADetails();
  }, []);

  const getACADetails = () => {
    let statusId: any = status;
    let empId: any = empIds;
    if (params.acaStatusId && params.acaEmpId) {
      statusId = params.acaStatusId;
      empId = params.acaEmpId;
    }
    setStatus(statusId);
    setEmp(empId);
    setOrganisation(empId);
    dispatch(fetchAllACARequest({ statusId, empId }));
  };

  useEffect(() => {
    const tempData: any = [];
    if (allACARes) {
      setRows(allACARes);
    }
  }, [allACARes]);
  const menuRes = useSelector(getAllEmployerDetails);
  useEffect(() => {
    getMenus();
  }, []);

  const getMenus = () => {
    dispatch(fetchAllEmployersRequest({}));
  };

  const [ACA, setRows] = useState<any>([allACARes]);
  const [searched, setSearched] = useState<string>("");

  const classes = useStyles();
  const [sort, setsort] = useState<any>([allACARes]);
  const [order, setorder] = useState<any>("ASC");

  const Sorting = (col) => {
    let sortdata = [];
    if (order === "ASC") {
      if (col == "dateReceived") {
        sortdata = ACA.sort((a, b) =>
          a.dateReceived.toLowerCase() > b.dateReceived.toLowerCase() ? 1 : -1
        );
      } else if (col == "firstName") {
        sortdata = ACA.sort((a, b) => (a.firstName > b.firstName ? 1 : -1));
      } else if (col == "lastName") {
        sortdata = ACA.sort((a, b) => (a.lastName > b.lastName ? 1 : -1));
      } else if (col == "employerName") {
        sortdata = ACA.sort((a, b) =>
          a.employerName > b.employerName ? 1 : -1
        );
      } else if (col == "dob") {
        sortdata = ACA.sort((a, b) => (a.dob > b.dob ? 1 : -1));
      } else if (col == "confirmationNumber") {
        sortdata = ACA.sort((a, b) =>
          a.confirmationNumber > b.confirmationNumber ? 1 : -1
        );
      } else if (col == "ssn") {
        sortdata = ACA.sort((a, b) => (a.ssn > b.ssn ? 1 : -1));
      } else if (col == "status") {
        sortdata = ACA.sort((a, b) => (a.status > b.status ? 1 : -1));
      }

      setorder("DSC");
      setRows(sortdata);
    } else if (order === "DSC") {
      if (col == "dateReceived") {
        sortdata = ACA.sort((a, b) =>
          a.dateReceived.toLowerCase() < b.dateReceived.toLowerCase() ? 1 : -1
        );
      } else if (col == "firstName") {
        sortdata = ACA.sort((a, b) => (a.firstName < b.firstName ? 1 : -1));
      } else if (col == "lastName") {
        sortdata = ACA.sort((a, b) => (a.lastName < b.lastName ? 1 : -1));
      }  else if (col == "employerName") {
        sortdata = ACA.sort((a, b) =>
          a.employerName < b.employerName ? 1 : -1
        );
      } else if (col == "dob") {
        sortdata = ACA.sort((a, b) => (a.dob < b.dob ? 1 : -1));
      } else if (col == "confirmationNumber") {
        sortdata = ACA.sort((a, b) =>
          a.confirmationNumber < b.confirmationNumber ? 1 : -1
        );
      } else if (col == "ssn") {
        sortdata = ACA.sort((a, b) => (a.ssn < b.ssn ? 1 : -1));
      } else if (col == "status") {
        sortdata = ACA.sort((a, b) => (a.status < b.status ? 1 : -1));
      }

      setorder("ASC");
      setRows(sortdata);
    }
  };

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
    let filteredRows: any = allACARes;

    if (filteredArr.length) {
      filteredArr.forEach((filter: any, i: any) => {
        if (filter["id"] == "dateR") {
          filteredRows = filteredRows.filter((x: { dateReceived: string }) =>
            x.dateReceived.toLowerCase().includes(filter["value"].toLowerCase())
          );
        } else if (filter["id"] == "Name") {
          filteredRows = filteredRows.filter((x: { firstName: string }) =>
            x.firstName.toLowerCase().includes(filter["value"].toLowerCase())
          );
        } else if (filter["id"] == "lName") {
          filteredRows = filteredRows.filter((x: { lastName: string }) =>
            x.lastName.toLowerCase().includes(filter["value"].toLowerCase())
          );
        }else if (filter["id"] == "empName") {
          filteredRows = filteredRows.filter((x: { employerName: string }) =>
            x.employerName.toLowerCase().includes(filter["value"].toLowerCase())
          );
        } else if (filter["id"] == "Dob") {
          filteredRows = filteredRows.filter((x: { dob: string }) =>
            x.dob.toLowerCase().includes(filter["value"].toLowerCase())
          );
        } else if (filter["id"] == "Conf") {
          filteredRows = filteredRows.filter(
            (x: { confirmationNumber: string }) =>
              x.confirmationNumber
                .toLowerCase()
                .includes(filter["value"].toLowerCase())
          );
        } else if (filter["id"] == "Ssn") {
          filteredRows = filteredRows.filter((x: { ssn: string }) =>
            x.ssn.toLowerCase().includes(filter["value"].toLowerCase())
          );
        } else if (filter["id"] == "Status") {
          filteredRows = filteredRows.filter((x: { status: string }) =>
          ACAStatus[parseInt(x.status)].option.toLowerCase().includes(filter["value"].toLowerCase())
          );
        }
      });
    }
    setRows(filteredRows);
  };

  const cancelSearch = (accessor: string) => {
    setSearched("");
    requestSearch(searched, accessor);
  };

  const handleEdit = (eventId: number) => {
    navigate(`/edit-aca-applications/${eventId}`);
  };

  const acaDataAfterDel = useSelector(delACAEventDetails);
  useEffect(() => {
    if (acaDataAfterDel && acaDataAfterDel.data && !acaDataAfterDel.pending) {
      handleClose();
      toast.success(`Deleted Successfully`);
      acaDataAfterDel.data = null;
      getACADetails();
    } else if (acaDataAfterDel.error === "Unauthorized") {
      handleClose();
      toast.error(
        "Application could not be deleted as it is associated with a user"
      );
      acaDataAfterDel.data = null;
    }
  }, [acaDataAfterDel]);

  const handleStatusChange = (event: any) => {
    let statusId = event.target.value;
    let empId = empIds;
    setStatus(event.target.value);
    dispatch(fetchAllACARequest({ statusId, empId }));
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEmpIdChange = (e: any) => {
    let empId = e;
    let statusId = status;
    setEmp(empId);

    dispatch(fetchAllACARequest({ empId, statusId }));
  };

  const ACAStatus = [
    { value: 0, option: "New" },
    { value: 1, option: "Information Required" },
    { value: 2, option: "Revisit" },
    { value: 3, option: "Completed" },
    { value: 4, option: "Cancelled " },
    { value: 5, option: "All " },
  ];
  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
          <Grid className="box"
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
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2} sx={{ padding: "34px 19px 20px" }}>
                <Grid
                  className="title-styling"
                  item
                  xs={9}
                  sx={{ alignSelf: "center" }}
                >
                  ACA / Applications
                </Grid>
                <Grid
                  style={{ textAlign: "left", paddingTop: "0px" }}
                  item
                  xs={3}
                >
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <Select
                        value={organisation}
                        onChange={handleChange}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        sx={{ background: "white", height: "44px" }}
                      >
                        <MenuItem value=""></MenuItem>
                        {menuRes &&
                          menuRes.length > 0 &&
                          menuRes.map((e: any, idx: number) => (
                            <MenuItem
                              value={e.id}
                              key={idx}
                              onClick={() => handleEmpIdChange(e.id)}
                            >
                              {e.name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Paper sx={{ margin: "10px" }}>
              <Grid container>
                <Grid item md={8.2} className="qle-status">
                  <span className="qle-status-text">Status: </span>
                  {ACAStatus[status].option}
                </Grid>
                <Grid item md={3.5}  >
                  <FormControl fullWidth >
                    <Select  id="demo-simple-select"
                      value={status}
                      onChange={handleStatusChange}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      sx={{ height: "40px", marginTop: "10px" }}
                    >
                      {ACAStatus.map((ele) => (
                        <MenuItem  value={ele.value}>{ele.option}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              { tempResponse && tempResponse.pending &&
              <LoadingOverlay className={"spinner"}
                    active={true}
                    spinner
                    // text='Loading your content...'
                    >
              </LoadingOverlay> 
              }
              <TableContainer sx={{ maxwidth: 200 }}>
                <Table
                  stickyHeader
                  aria-label="sticky table"
                  sx={{ padding: "0px" }}
                  
                >
                  <TableHead>
                    <TableRow>
                    
                      <TableCell className="bg-table"sx={{ padding: "5px" }}>
                        FirstName{" "}
                        <CompareArrowsIcon
                          fontSize="small"
                          sx={{
                            transform: "rotate(90deg)",
                            margin: "0px 0px -5px 0px",
                            color: "#8080808f",
                            padding: "0px" 
                          }}
                          onClick={() => Sorting("firstName")}
                        />
                      </TableCell>
                      <TableCell className="bg-table"sx={{ padding: "5px" }}>
                        LastName{" "}
                        <CompareArrowsIcon
                          fontSize="small"
                          sx={{
                            transform: "rotate(90deg)",
                            margin: "0px 0px -5px 0px",
                            color: "#8080808f",
                            padding: "0px" 
                          }}
                          onClick={() => Sorting("lastName")}
                        />
                      </TableCell>
                      <TableCell
                        className="bg-table"
                        sx={{
                          width: "100px",
                          padding: "5px" 
                        }}
                      >
                        Date Received{" "}
                        <CompareArrowsIcon
                          fontSize="small"
                          sx={{
                            transform: "rotate(90deg)",
                            margin: "0px 0px -5px 0px",
                            color: "#8080808f",
                            padding: "0px" 
                          }}
                          onClick={() => Sorting("dateReceived")}
                        />
                      </TableCell>
                      <TableCell className="bg-table" sx={{
                          width: "100px",
                          padding: "9px" 
                        }}>
                        Employer{" "}
                        <CompareArrowsIcon
                          fontSize="small"
                          sx={{
                            transform: "rotate(90deg)",
                            margin: "0px 0px -5px 0px",
                            color: "#8080808f",
                            padding: "0px" 
                          }}
                          onClick={() => Sorting("employerName")}
                        />
                      </TableCell>
                      <TableCell
                        className="bg-table"
                        sx={{
                          width: "125px",
                          padding:"10px"
                          
                        }}
                      >
                        Date of Birth{" "}
                        <CompareArrowsIcon
                          fontSize="small"
                          sx={{
                            transform: "rotate(90deg)",
                            margin: "0px 0px -5px 0px",
                            color: "#8080808f",
                            padding: "0px" 
                          }}
                          onClick={() => Sorting("dob")}
                        />
                      </TableCell>
                      <TableCell className="bg-table"sx={{ padding: "5px" }}>
                        Conf#{" "}
                        <CompareArrowsIcon
                          fontSize="small"
                          sx={{
                            transform: "rotate(90deg)",
                            margin: "0px 0px -5px 0px",
                            color: "#8080808f",
                            padding: "0px" 
                          }}
                          onClick={() => Sorting("confirmationNumber")}
                        />
                      </TableCell>
                      <TableCell className="bg-table"sx={{ padding: "5px" }}>
                        SSN{" "}
                        <CompareArrowsIcon
                          fontSize="small"
                          sx={{
                            transform: "rotate(90deg)",
                            margin: "0px 0px -5px 0px",
                            color: "#8080808f",
                            padding: "0px" 
                          }}
                          onClick={() => Sorting("ssn")}
                        />
                      </TableCell>
                      <TableCell className="bg-table"sx={{ padding: "5px" }}>
                        Status{" "}
                        <CompareArrowsIcon
                          fontSize="small"
                          sx={{
                            transform: "rotate(90deg)",
                            margin: "0px 0px -5px 0px",
                            color: "#8080808f",
                            padding: "5px" 
                          }}
                          onClick={() => Sorting("status")}
                        />
                      </TableCell>
                      <TableCell className="bg-table"sx={{ padding: "5px" }}></TableCell>
                      <TableCell className="bg-table"sx={{ padding: "5px" }}></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableHead>
                    <TableRow>
                     
                      <TableCell
                      sx={{ padding: "5px" }}>
                        <SearchBar
                          value={searched}
                          onChange={(searchValn) =>
                            requestSearch(searchValn, "Name")
                          }
                          
                          
                          onCancelSearch={() => cancelSearch("Name")}
                          placeholder={"Search by firstName"}
                          style={{
                            textOverflow: "ellipsis",
                            width: "130px",
                            overflow: "hidden",
                            
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ padding: "5px" }}
                      >
                        <SearchBar
                          value={searched}
                          onChange={(searchValn) =>
                            requestSearch(searchValn, "lName")
                          }
                          
                          onCancelSearch={() => cancelSearch("lName")}
                          placeholder={"Search by lastName"}

                          style={{
                            textOverflow: "ellipsis",
                            width: "130px",
                            overflow: "hidden",

                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ padding: "5px" }}
                      >
                        <SearchBar
                          value={searched}
                          onChange={(searchValn) =>
                            requestSearch(searchValn, "dateR")
                          }
                          
                          onCancelSearch={() => cancelSearch("dateR")}
                          placeholder={"Search by dateReceived"}

                          style={{
                            textOverflow: "ellipsis",
                            width: "130px",
                            overflow: "hidden",

                          }}
                        />
                      </TableCell>
                      <TableCell
                      sx={{ padding: "10px" }} >
                        <SearchBar
                          value={searched}
                          onChange={(searchValn) =>
                            requestSearch(searchValn, "empName")
                          }
                          onCancelSearch={() => cancelSearch("empName")}
                          placeholder={"Search by employerName"}
                          style={{
                            textOverflow: "ellipsis",
                            width: "130px",
                            overflow: "hidden",
                          }}
                        />
                      </TableCell>
                      <TableCell
                      sx={{ padding: "10px" }}>
                        <SearchBar
                          value={searched}
                          onChange={(searchValn) =>
                            requestSearch(searchValn, "Dob")
                          }
                          onCancelSearch={() => cancelSearch("Dob")}
                          placeholder={"Search by dob"}
                          style={{
                            textOverflow: "ellipsis",
                            width: "130px",
                            overflow: "hidden",
                          }}
                        />
                      </TableCell>
                      <TableCell
                      sx={{ padding: "5px" }}>
                        <SearchBar
                          value={searched}
                          onChange={(searchValn) =>
                            requestSearch(searchValn, "Conf")
                          }
                          onCancelSearch={() => cancelSearch("Conf")}
                          placeholder={"Search by confirmationNumber"}
                          style={{
                            textOverflow: "ellipsis",
                            width: "130px",
                            overflow: "hidden",
                          }}
                        />
                      </TableCell>
                      <TableCell 
                      sx={{ padding: "5px" }}>
                        <SearchBar
                          value={searched}
                          onChange={(searchValn) =>
                            requestSearch(searchValn, "Ssn")
                          }
                          onCancelSearch={() => cancelSearch("Ssn")}
                          placeholder={"Search by ssn"}
                          style={{
                            textOverflow: "ellipsis",
                            width: "130px",
                            overflow: "hidden",
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ padding: "5px" }}>
                        <SearchBar
                          value={searched}
                          onChange={(searchValn) =>
                            requestSearch(searchValn, "Status")
                          }
                          onCancelSearch={() => cancelSearch("Status")}
                          placeholder={"Search by status"}
                          style={{
                            textOverflow: "ellipsis",
                            width: "130px",
                            overflow: "hidden",
                          }}
                        />
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {ACA && ACA.length > 0 && 
                    ACA.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    ).map((role: any, index: number) => (
                      <TableRow
                        key={index}
                        className={index % 2 == 0 ? "table-bg" : ""}
                      >
                       
                        <TableCell style={{
                          textOverflow: "ellipsis",
                          width: "100px",
                          overflow: "hidden"
                        }} 
                        key={index}>{role.firstName}</TableCell>
                        <TableCell style={{
                          textOverflow: "ellipsis",
                          width: "100px",
                          overflow: "hidden"
                        }} 
                        key={index}>{role.lastName}</TableCell>
                         <TableCell style={{
                          textOverflow: "ellipsis",
                          width: "100px",
                          overflow: "hidden"
                        }} 
                        key={index}>{role.dateReceived}</TableCell>
                        <TableCell style={{
                          textOverflow: "ellipsis",
                          width: "100px",
                          overflow: "hidden",
                        }}
                         key={index}>{role.employerName}</TableCell>
                        <TableCell style={{
                          textOverflow: "ellipsis",
                          width: "100px",
                          overflow: "hidden"
                        }} 
                        key={index}>{role.dob}</TableCell>
                        <TableCell style={{
                          textOverflow: "ellipsis",
                          width: "100px",
                          overflow: "hidden"
                        }} 
                        key={index}>
                          {role.confirmationNumber}
                        </TableCell>
                        <TableCell style={{
                          textOverflow: "ellipsis",
                          width: "100px",
                          overflow: "hidden"
                        }}
                         key={index}>{role.ssn}</TableCell>
                        
                        <TableCell style={{
                          textOverflow: "ellipsis",
                          width: "10px",
                          overflow: "hidden"
                        }} 
                        key={index}>{role.status ? ACAStatus[parseInt(role.status)].option : ""}</TableCell>
                         
                        <TableCell
                        style={{
                          textOverflow: "ellipsis",
                          width: "10px",
                          overflow: "hidden",
                          padding:"0px",
                        }} >
                          <EditIcon
                            sx={{ cursor: "pointer" }}
                            key={`${role.acaEventId}.7`}
                            color="primary"
                            className=""
                            onClick={() => {
                              handleEdit(role.acaEventId);
                            }}
                          />
                        </TableCell>
                        <TableCell
                        style={{
                          textOverflow: "ellipsis",
                          width: "10px",
                          overflow: "hidden"
                        }} >
                          <Button
                            variant="text"
                            sx={{
                              border: "none",
                              width: "20px",
                              padding: "0px",
                            }}
                            key={`${role.acaEventId}.8`}
                            onClick={() => {
                              setEventId(role.acaEventId);
                              setOpen(true);
                            }}
                          >
                            <DeleteIcon
                              color="primary"
                              key={`${role.acaEventId}.7`}
                            />
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
                            key={`${role.acaEventId}.9`}
                          >
                            <DialogTitle>
                              <Typography
                                variant="caption"
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Typography
                                  variant="h5"
                                  sx={{ fontSize: "18px", fontWeight: "600" }}
                                >
                                  {"Confirmation"}
                                </Typography>

                                <IconButton
                                  aria-label="close"
                                  onClick={handleClose}
                                  sx={{
                                    position: "absolute",
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
                              <DialogContentText
                                sx={{ fontSize: "17px" }}
                                id="alert-dialog-slide-description"
                              >
                                Sure to Delete?
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions sx={{ padding: "12px 19px" }}>
                              <Button
                                className="cancel-btn-role"
                                onClick={handleClose}
                              >
                                No
                              </Button>
                              <Button
                                className="save-btn-role"
                                onClick={() => handleRemove(eventId)}
                              >
                                Yes
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={allACARes.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableContainer>
            </Paper>
           <Footer/>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
};
export default Applications;
