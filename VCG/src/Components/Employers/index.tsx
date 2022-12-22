import React, { useState } from "react";
import Header from "../Header";
import SwipeableSidenavbar from "../Sidenavbar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { largeScrees, smallScreen } from "../../Helper/slider";
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
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { Modal } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Typography } from "@mui/material";
// import "./style.css";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { getAllEmployerDetails } from "../../reducers/employersReducer/allEmployersReducer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { fetchAllEmployersRequest } from "../../actions/employersActions/allEmployersActions";
import { delEmployerDetails } from "../../reducers/employersReducer/delEmployerReducer";
import { fetchDelEmployerRequest } from "../../actions/employersActions/delEmployerActions";
import Footer from "../Footer";

const useStyles = makeStyles({
  root: {
    "& .MuiInputLabel-root": { top: "-3px" },
    "& .MuiOutlinedInput-root": { borderRadius: "0px" },
    "& .css-xso64x-MuiTableCell-root": { padding: "10px !important" },

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

const Employers = (props: any) => {
  const [headerValues, setHeaderValues] = useState({ sidebar: 2, header: 10 });
  const handleHeaders = () => {
    headerValues.sidebar == 2
      ? setHeaderValues(smallScreen())
      : setHeaderValues(largeScrees());
  };

  const [employerId, setEmployerId] = useState(0);
  const [checked, setChecked] = React.useState(false);
  const containerRef = React.useRef(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  //   const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = (e: any) => {
    setOpen(true);
  };

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const classses = useStyles();
  const dispatch = useDispatch()
  const getEmployerRes = useSelector(getAllEmployerDetails)

  useEffect(() => {
    getEmployer();
  }, []);

  const getEmployer = () => {
    dispatch(
      fetchAllEmployersRequest({})
    );
  };

  // useEffect(() => {
  //   if (getEmployerRes) {
  //     setRows(getEmployerRes);
  //   }
  // }, [getEmployerRes]);

  const [rolesData, setRows] = React.useState(getEmployerRes);

  const handleEdit = (id: number) => {
    navigate(`/addEmployer/${id}`);
  }
  const handleRemove = (id: number) => {
    dispatch(fetchDelEmployerRequest({ id }));
  }

  let delEmployerRes = useSelector(delEmployerDetails)
  console.log("delemployerres", delEmployerRes);

  useEffect(() => {
    if (delEmployerRes && delEmployerRes.data && !delEmployerRes.pending) {
      console.log("roleDataAfterDel" + delEmployerRes);
      handleClose();
      toast.success(`Deleted Successfully`);
      delEmployerRes.data = null;
      getEmployer();
      setTimeout(() => {
        //window.location.assign("/employers");
        //navigate(`/employers`);
      }, 3000)

    }
  }, [delEmployerRes]);

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

            {/* <Box sx={{ flexGrow: 1 }}>
              <Grid spacing={2}>
                <Grid xs={8}>Roles</Grid>
                <Grid xs={4}>Add Role</Grid>
              </Grid>
            </Box> */}

            <Box style={{ margin: "36px 15px" }} sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid className="title-styling" item xs={10}>
                  Employers
                </Grid>
                <Grid
                  style={{ textAlign: "right" }}
                  item
                  xs={2}
                  onClick={() => navigate("/addEmployer/0")}
                >
                  <span className="addRole-styling" onAuxClick={() => (navigate("/addEmployer"))}>
                    <AddIcon className="role-icon-styling" />
                    Add Employer
                  </span>
                </Grid>
              </Grid>
            </Box>

            <Paper sx={{ margin: "10px" }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table" sx={{ padding: "10px" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell className="bg-table">Name</TableCell>
                      <TableCell className="bg-table">
                        Identification Number (EIN)
                      </TableCell>
                      <TableCell className="bg-table">Address</TableCell>
                      <TableCell className="bg-table">Status</TableCell>
                      <TableCell className="bg-table"></TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {getEmployerRes
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((role) => (
                        <TableRow
                          key={`${role.id}.1`}
                          className={role.id % 2 == 1 ? "table-bg" : ""}
                        >
                          <TableCell key={`${role.id}.2`}>{role.name}</TableCell>
                          <TableCell key={`${role.id}.3`}>
                            {role.ein}
                          </TableCell>
                          <TableCell
                            key={`${role.id}.4`}
                          // style={{ display: "flex" }}
                          >
                            <div style={{ display: "flex", flexWrap: "wrap" }}>
                              <div className="">{role.address}</div>
                            </div>
                          </TableCell>
                          <TableCell key={`${role.id}.5`}>
                            <div className={role.status ? "blueClass" : "redClass"}>
                              {" "}
                              {role.status}{" "}
                            </div>
                          </TableCell>
                          <TableCell key={`${role.id}.6`}>
                            <EditIcon color="primary" key={`${role.id}.7`} className="editIcon" onClick={() => {
                              handleEdit(role.id)
                            }} />
                            <Button
                              variant="text"
                              sx={{ border: "none", width: "20px", padding: "0px", marginTop: "-16px" }}
                              key={`${role.id}.8`}
                              onClick={() => {
                                setEmployerId(role.id);
                                setOpen(true);
                              }}
                            >
                              <DeleteIcon color="primary" />
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

                              key={`${role.id}.9`}
                            >
                              {console.log("open is ", open)}
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
                                <Button className="save-btn-role" onClick={() => handleRemove(employerId)}>Yes</Button>

                              </DialogActions>
                            </Dialog>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={getEmployerRes.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Grid>
        </Grid>
        <Footer />
      </Box>
    </React.Fragment>
  );
};

export default Employers;


