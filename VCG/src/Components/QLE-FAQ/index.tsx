import React, { useEffect, useState } from "react";
import Header from "../Header";
import SwipeableSidenavbar from "../Sidenavbar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { largeScrees, smallScreen } from "../../Helper/slider";
import { makeStyles } from "@mui/styles";
import { useNavigate, useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import DraggableComponent from "../Draggable";
import { FormControl, MenuItem, Select, Typography } from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import "./style.css";
import { fetchAllEmployersRequest } from "../../actions/employersActions/allEmployersActions";
import { useDispatch, useSelector } from "react-redux";
import { getAllEmployerDetails } from "../../reducers/employersReducer/allEmployersReducer";
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

const QLE_FAQ = (props: any) => {
  const dispatch = useDispatch();
  const [headerValues, setHeaderValues] = useState({ sidebar: 2, header: 10 });
  const handleHeaders = () => {
    headerValues.sidebar == 2
      ? setHeaderValues(smallScreen())
      : setHeaderValues(largeScrees());
  };
  const [employerId, setEmployerId] = useState("");
  const [checked, setChecked] = React.useState(false);
  const containerRef = React.useRef(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const navigate = useNavigate();
  const [organisation, setOrganisation] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  //   const [dialogOpen, setDialogOpen] = React.useState(false);
  // const [type, setType] = React.useState('');
  let params = useParams();
  let type: any = params.type;

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

  const handleChange = (event: any) => {
    setOrganisation(event.target.value);
  };

  const getEvents = () => {
    dispatch(
      fetchAllEmployersRequest({})
    );
  };

  const menuRes = useSelector(getAllEmployerDetails);
  useEffect(() => {
    getEvents();
  }, []);
  
  const classses = useStyles();
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

            <Box  sx={{ flexGrow: 1 }}>
              <Grid container spacing={2} sx={{ padding: "34px 19px 20px" }}>
                <Grid className="title-styling" item xs={9} sx={{alignSelf:"center"}}>
                {type} / FAQ
              </Grid>
              <Grid style={{ textAlign: "left", paddingTop:"0px"}} item xs={3}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <Select
                      value={organisation}
                      onChange={handleChange}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      sx={{background: "white", height: "44px",  }}
                    >
                      {/* <MenuItem value={0}>Randstad</MenuItem>
                      <MenuItem value={1}>Randstad Technologies LLC.</MenuItem>
                      <MenuItem value={2}>TempForce</MenuItem> */}
                      <MenuItem value="0" onClick={() => setEmployerId("0")}>All
                      </MenuItem>
                      {menuRes && menuRes.length > 0 &&
                        menuRes.map((e: any, idx: number) => (
                          <MenuItem value={e.id} key={idx} onClick={() => setEmployerId(e.id)} >
                            {e.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              </Grid>
            </Box>

            <Paper sx={{ margin: "10px", boxShadow:"none" }}>
              <Grid container justifyContent="space-between" sx={{padding: "27px 36px 6px 40px"}}>
                <Grid className="intro-styling" item xs={6}>
                  Click and drag symbol {<DragIndicatorIcon fontSize="small" sx={{margin: "0px 0px -3px 0px" }} color="primary"/>} to move up/down
                </Grid>

                <Grid
                  style={{ textAlign: "right" }}
                  item
                  xs={4}
                  onClick={() => navigate(`/addQleFaq/${type}`)}
                >
                  <span className="addRole-styling">
                    <AddIcon className="role-icon-styling" />
                    Add FAQ
                  </span>
                </Grid>
              </Grid>

              <Grid container sx={{ padding: "0px 30px 10px 0px" }}>
                <DraggableComponent employerId={employerId} type={type} />
              </Grid>
            </Paper>
            <Footer/>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default QLE_FAQ;

