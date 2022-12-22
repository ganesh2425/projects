import React, { useState, useEffect } from "react";
import Header from "../Header";
import SwipeableSidenavbar from "../Sidenavbar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { largeScrees, smallScreen } from "../../Helper/slider";
import Slide from "@mui/material/Slide";
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
import SearchBar from "material-ui-search-bar";
// import axios from "axios";
// import { AxiosRequestHeaders } from "axios";
import { fetchUserRequest } from "../../actions/usersActions/allUserActions";
import { useDispatch, useSelector } from "react-redux";
import { getUSERDetails } from "../../reducers/usersReducer/allUserReducer";
import { delUserDetails } from "../../reducers/usersReducer/delUserReducer";
import { fetchDelUserRequest } from "../../actions/usersActions/delUserActions";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TransitionProps } from "@mui/material/transitions";
import { Typography } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
// import Slide from "@mui/material/Slide";

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

const User = (props: any) => {
  const dispatch = useDispatch();
  const [headerValues, setHeaderValues] = useState({ sidebar: 2, header: 10 });
  const handleHeaders = () => {
    headerValues.sidebar == 2
      ? setHeaderValues(smallScreen())
      : setHeaderValues(largeScrees());
  };

  const userList = useSelector(getUSERDetails);

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = () => {
    dispatch(
      fetchUserRequest({})
    );

  };
  useEffect(() => {
    const tempData: any = [];
    if (userList) {
      setRows(userList);
    }
  }, [userList]);

  const [userId, setUserId] = React.useState(0);
  const [checked, setChecked] = React.useState(false);
  const containerRef = React.useRef(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const navigate = useNavigate();

  const [UserDatas, setRows] = React.useState(userList);
  const [searched, setSearched] = useState<string>("");

  const classes = useStyles();


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
    let filteredRows: any = userList;

    if (filteredArr.length) {
      filteredArr.forEach((filter: any, i: any) => {

        if (filter["id"] == "name") {
          filteredRows = filteredRows.filter((x: { name: string }) => x.name.toLowerCase().includes(filter["value"].toLowerCase()))
        }
        else if (filter["id"] == "email") {
          filteredRows = filteredRows.filter((x: { email: string }) => x.email.toLowerCase().includes(filter["value"].toLowerCase()))
        }
        else if (filter["id"] == "role") {
          console.log(filteredRows); console.log("kk")
          filteredRows = filteredRows.filter((d: any) => d.roles.find((c: any) => c.name.toLowerCase().includes(filter["value"].toLowerCase())));
          // filteredRows = filteredRows.filter((d: any) =>d.roles.find((c: any)=>{console.log(c.name)}));

        }
        else if (filter["id"] == "status") {
          filteredRows = filteredRows.filter((x: { status: string }) => x.status.toLowerCase().includes(filter["value"].toLowerCase()))
        }
      })
    }
    setRows(filteredRows);
    //filteredRows.length > 0 ? setRows(filteredRows) : setRows(userList);
  };

  const cancelSearch = (accessor: string) => {
    setSearched("");
    requestSearch(searched, accessor);
  };
  const handleEdit = (id: number) => {
    navigate(`/add-user/${id}`);
    //navigate(`/add-role`);
  }
  const handleRemove = (id: number) => {
    dispatch(fetchDelUserRequest({ id }));
  }
  const userDataAfterDel = useSelector(delUserDetails);

  useEffect(() => {
    if (userDataAfterDel && userDataAfterDel.data && !userDataAfterDel.pending) {
      handleClose();
      toast.success(`Deleted Successfully`);
      userDataAfterDel.data = null;
      getUserDetails();
    }
    else if (userDataAfterDel.error === "Unauthorized") {
      handleClose();
      toast.error('User could not be deleted');
      userDataAfterDel.data = null;
    }
  }, [userDataAfterDel]);


  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const classses = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = (e: any) => {
    setOpen(true);
  };

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

            {/* <Box sx={{ flexGrow: 1 }}>
              <Grid spacing={2}>
                <Grid xs={8}>Roles</Grid>
                <Grid xs={4}>Add Role</Grid>
              </Grid>
            </Box> */}

            <Box style={{ margin: "36px 15px" }} sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid className="title-styling" item xs={10}>
                  Users
                </Grid>
                <Grid
                  style={{ textAlign: "right" }}
                  item
                  xs={2}
                  onClick={() => navigate("/add-user/0")}
                >
                  <span className="addRole-styling">
                    <AddIcon className="role-icon-styling" />
                    Add User
                  </span>
                </Grid>
              </Grid>
            </Box>
            <Paper sx={{ margin: "10px" }}>
              <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell className="bg-table">Name</TableCell>
                    <TableCell className="bg-table">Email</TableCell>
                    <TableCell className="bg-table">Roles</TableCell>
                    <TableCell className="bg-table">Status</TableCell>
                    <TableCell className="bg-table"></TableCell>
                    <TableCell className="bg-table"></TableCell>
                  </TableRow>
                </TableHead>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <SearchBar
                        value={searched}
                        onChange={(searchValn) => requestSearch(searchValn, "name")}
                        onCancelSearch={() => cancelSearch("name")}
                        placeholder={"Search by Name"}
                      />

                    </TableCell>
                    <TableCell>
                      <SearchBar
                        value={searched}
                        onChange={(searchVal: any) => requestSearch(searchVal, "email")}
                        onCancelSearch={() => cancelSearch("email")}
                        placeholder={"Search by Email"}
                      />
                    </TableCell>
                    <TableCell>
                      <SearchBar
                        value={searched}
                        onChange={(searchVal: any) => requestSearch(searchVal, "role")}
                        onCancelSearch={() => cancelSearch("role")}
                        placeholder={"Search by Role"}
                      />
                    </TableCell>
                    <TableCell>
                      <SearchBar
                        value={searched}
                        onChange={(searchVal: any) => requestSearch(searchVal, "status")}
                        onCancelSearch={() => cancelSearch("status")}
                        placeholder={"Search by status"}
                      />
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {console.log(UserDatas)}
                  {UserDatas.
                    slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).
                    map((user: any, index: number) => (
                      <TableRow
                        key={index}
                        className={index % 2 == 0 ? "table-bg" : ""}
                      >
                        <TableCell key={index}>{user.name}</TableCell>
                        <TableCell key={index}>{user.email}</TableCell>
                        <TableCell key={index}>
                          {
                            user.roles.map((role: any) => (
                              <TableCell style={{ border: '1px solid balck' }}>{role.name}</TableCell>
                            ))}
                        </TableCell>
                        <TableCell key={index}>{user.status}</TableCell>

                        {/* <TableCell>
                          <EditIcon color="primary"onClick={() => handleEdit(user.id)} />
                        </TableCell>
                        <TableCell>
                          <DeleteIcon color="primary" onClick={() => handleRemove(user.id)} />
                        </TableCell> */}

                        <TableCell>
                          <EditIcon color="primary" key={`${user.id}.7`} className="editIcon" onClick={() => {
                            handleEdit(user.id)
                          }} />
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="text"
                            sx={{ border: "none", width: "20px", padding: "0px", marginTop: "-5px" }}
                            key={`${user.id}.8`}
                            onClick={() => {
                              setUserId(user.id);
                              setOpen(true);
                            }}  
                          >
                            <DeleteIcon color="primary"  />
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

                            key={`${user.id}.9`}
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
                              <Button className="save-btn-role" onClick={() => handleRemove(userId)}>Yes</Button>

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
                count={userList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default User;
