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
import { useDispatch, useSelector } from "react-redux";
import { getAllRolesDetails } from "../../reducers/rolesReducer/allRolesReducer";
import { fetchAllRolesRequest } from "../../actions/rolesActions/allRolesActions";
import { RootState } from "../../reducers/index";
import SearchBar from "material-ui-search-bar";
import { delRoleDetails } from "../../reducers/rolesReducer/delRoleReducer";
import { fetchDelRoleRequest } from "../../actions/rolesActions/delRoleActions";
import { toast } from "react-toastify";
import { AnyARecord } from "node:dns";
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

const Roles = (props: any) => {
  const dispatch = useDispatch();
  const [headerValues, setHeaderValues] = useState({ sidebar: 2, header: 10 });
  const handleHeaders = () => {
    headerValues.sidebar == 2
      ? setHeaderValues(smallScreen())
      : setHeaderValues(largeScrees());
  };

  
  const [roleId, setRoleId] = React.useState(0);
  const [checked, setChecked] = React.useState(false);
  const containerRef = React.useRef(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    getRoles();
  }, []);

  const getRoles = () => {
    dispatch(fetchAllRolesRequest({}));
  };

  const allRolesRes = useSelector(getAllRolesDetails);

  useEffect(() => {
    if (allRolesRes && allRolesRes.length > 0) {
      setRows(allRolesRes);
    }
  }, [allRolesRes]);

  const [rolesData, setRows] = React.useState(allRolesRes);
  const [searched, setSearched] = useState<string>("");

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const classses = useStyles();

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
    let filteredRows: any = allRolesRes;

    if (filteredArr.length) {
      filteredArr.forEach((filter: any, i: any) => {

        if (filter["id"] == "name") {
          filteredRows = filteredRows.filter((x: { name: string }) => x.name.toLowerCase().includes(filter["value"].toLowerCase()))
          // filteredRows = filteredRows.filter((str: { name: string })=>{
          //   return str.name.toLowerCase().indexOf(filter["value"].toLowerCase()) >= 0; 
          // });
        }
        else if (filter["id"] == "desc") {
          filteredRows = filteredRows.filter((x: { description: string }) => x.description.toLowerCase().includes(filter["value"].toLowerCase()))
        }
        else if (filter["id"] == "privilege") {
          filteredRows = filteredRows.filter((d: any) => d.privilegeSet.find((c: any) => c.toLowerCase().includes(filter["value"].toLowerCase())));
        }
      })
    }
    setRows(filteredRows);
    //filteredRows.length > 0 ? setRows(filteredRows) : setRows(allRolesRes);
  };

  const cancelSearch = (accessor: string) => {
    setSearched("");
    requestSearch(searched, accessor);
  };

  const handleRemove = (id: number) => {
    dispatch(fetchDelRoleRequest({ id }));
  }

  const handleEdit = (id: number) => {
    navigate(`/add-role/${id}`);
    //navigate(`/add-role`);
  }

  const roleDataAfterDel = useSelector(delRoleDetails);

  useEffect(() => {
    if (roleDataAfterDel && roleDataAfterDel.data && !roleDataAfterDel.pending) {
      handleClose();
      if(roleDataAfterDel.data.includes("could not be deleted")){
        toast.error(roleDataAfterDel.data);
      }else{
        toast.success(`Deleted Successfully`);
      }
      roleDataAfterDel.data = null;
      getRoles();
    }
    else if (roleDataAfterDel.error === "Unauthorized") {
      handleClose();
      toast.error('Role could not be deleted as it is associated with a user');
      roleDataAfterDel.data = null;
    }
  }, [roleDataAfterDel]);

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
                  Roles
                </Grid>
                <Grid
                  style={{ textAlign: "right" }}
                  item
                  xs={2}
                  onClick={() => navigate("/add-role/0")}
                >
                  <span className="addRole-styling">
                    <AddIcon className="role-icon-styling" />
                    Add Role
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
                      <TableCell className="bg-table">Description</TableCell>
                      <TableCell className="bg-table">Privilege</TableCell>
                      <TableCell className="bg-table"></TableCell>
                      <TableCell className="bg-table"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <SearchBar
                          value={searched}
                          onChange={(searchValn: any) => requestSearch(searchValn, "name")}
                          onCancelSearch={() => cancelSearch("name")}
                          placeholder={"Search by Name"}
                        />

                      </TableCell>
                      <TableCell>
                        <SearchBar
                          value={searched}
                          onChange={(searchVal: any) => requestSearch(searchVal, "desc")}
                          onCancelSearch={() => cancelSearch("desc")}
                          placeholder={"Search by Description"}
                        />
                      </TableCell>
                      <TableCell>
                        <SearchBar
                          value={searched}
                          onChange={(searchVal: any) => requestSearch(searchVal, "privilege")}
                          onCancelSearch={() => cancelSearch("privilege")}
                          placeholder={"Search by Privilege"}
                        />
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {console.log(rolesData)}
                    {rolesData
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((role: any, index: number) => (
                        <TableRow
                          key={role.id}
                          className={index % 2 == 0 ? "table-bg" : ""}
                        >
                          <TableCell key={role.id}>{role.name}</TableCell>
                          <TableCell key={role.id}>{role.description}</TableCell>
                          <TableCell
                            key={role.id}
                          // style={{ display: "flex" }}
                          >
                            <div style={{ display: "flex", flexWrap: "wrap" }}>
                              {console.log(role.privilegeSet)}
                              {role.privilegeSet.map((previlage: any) => (
                                <div className="previlage-style">{previlage}</div>
                              ))}
                            </div>
                          </TableCell>
                          {/* <TableCell>

                            <EditIcon color="primary" onClick={() => handleEdit(role.id)} />
                          </TableCell>
                          <TableCell>
                            <DeleteIcon color="primary" onClick={() => handleRemove(role.id)} />
                          </TableCell>
                           */}

                          <TableCell>
                            <EditIcon color="primary" key={`${role.id}.7`} className="editIcon" onClick={() => {
                              handleEdit(role.id)
                            }} />
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="text"
                              sx={{ border: "none", width: "20px", padding: "0px", marginTop: "-5px" }}
                              key={`${role.id}.8`}
                              onClick={() => {
                                setRoleId(role.id);
                                setOpen(true);
                              }}  
                            >
                              <DeleteIcon color="primary"  key={`${role.id}.7`} />
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
                                <Button className="save-btn-role" onClick={() => handleRemove(roleId)}>Yes</Button>

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
                count={allRolesRes.length}
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

export default Roles;
