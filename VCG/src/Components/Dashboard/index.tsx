import React, { useEffect, useState } from "react";
import Header from "../Header";
import SwipeableSidenavbar from "../Sidenavbar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { largeScrees, smallScreen } from "../../Helper/slider";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Typography } from "@mui/material";
import InfoRoundedIcon from '@mui/icons-material/InfoOutlined';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import ContentCopySharpIcon from '@mui/icons-material/ContentCopySharp';
import ArchiveSharpIcon from '@mui/icons-material/ArchiveSharp';
import "./style.css"
import { useDispatch ,useSelector} from "react-redux";
import { getDashboardDetails } from "../../reducers/dashboardReducer";
import { fetchDashboardRequest } from "../../actions/dashboardActions";
import { getAllEmployerDetails } from "../../reducers/employersReducer/allEmployersReducer";
import { fetchAllEmployersRequest } from "../../actions/employersActions/allEmployersActions";
import Footer from "../Footer";

const Dashboard = (props: any) => {
  const dispatch = useDispatch();
  const [headerValues, setHeaderValues] = useState({ sidebar: 2, header: 10 });
  const [organisation, setOrganisation] = React.useState("1");

  const handleHeaders = () => {
    headerValues.sidebar == 2
      ? setHeaderValues(smallScreen())
      : setHeaderValues(largeScrees());
  };

  const menuRes = useSelector(getAllEmployerDetails);
  useEffect(() => {
    getMenus();
  }, []);

  const getMenus = () => {
    dispatch(
      fetchAllEmployersRequest({})
    );
  };

  useEffect(() => {
    if (menuRes && menuRes.length > 0) {
      getdashboardetails();
    }
  }, [menuRes]);
    

  const dashboardRes = useSelector(getDashboardDetails);

  const getdashboardetails = () => {
    if(menuRes && menuRes.length > 0){
      let id = menuRes[0].id;
    dispatch(
      fetchDashboardRequest({id})
    );
    }
  };

  useEffect(() => {
    if (dashboardRes && dashboardRes.response) {
      alert(dashboardRes.response.qleInitiated)
    }
  }, [dashboardRes]);

  const data = [
    {
      heading: "QLE - Qualifying Life Events",
      name: "qle",
      children: [
        { number: dashboardRes && dashboardRes ? dashboardRes.qlePendingReview : 0, icon: "timer", text: "Pending review", color: "#FAA32F",id:1},
        { number: dashboardRes && dashboardRes? dashboardRes.qleAdditionalInfoRequired : 0, icon: "info",text: "Additional information required", color: "#F16022",id:2},
        { number: dashboardRes && dashboardRes? dashboardRes.qleChangesCompleted : 0, icon: "tick", text: "Completed", color: "#007DBA",id:4 },
        { number: dashboardRes && dashboardRes ? dashboardRes.qleInitiated :0, icon: "revisit", text: "Intitated", color: "#FAA32F",id:0 },
        { number: dashboardRes && dashboardRes ? dashboardRes.qleApprovedOrPending:0, icon: "timer", text: "Approved Or Pending", color: "#7dba00",id:3 },
        { number: dashboardRes && dashboardRes ? dashboardRes.qleDenied :0, icon: "denied", text: "Denied", color: "#ba4800",id:5 },
        { number: dashboardRes && dashboardRes ? dashboardRes.qleDuplicate:0, icon: "dublicate", text: "Duplicate", color: "#ba007d",id:6 },
        { number: dashboardRes && dashboardRes ? dashboardRes.qleArchived : 0, icon: "Archive", text: "Archived", color: "#ba8000", id: 7 },
      ],
    },
    {
        heading: "ACA - Employer Health Coverage Request",
        name: "aca-applications",
        children: [
         { number: dashboardRes && dashboardRes ? dashboardRes.acaNew : 0, icon: "rocket", text: "New", color: "#FAA32F", id: 0},
         { number: dashboardRes && dashboardRes ? dashboardRes.acaAdditionalInfoRequired : 0, icon: "info", text: "Additional Information required", color: "#F16022", id: 1 },
         { number: dashboardRes && dashboardRes ? dashboardRes.acaRevisit : 0, icon: "revisit", text: "Revisit", color: "#FAA32F", id: 2 },
         { number: dashboardRes && dashboardRes ? dashboardRes.acaCompleted : 0, icon: "tick", text: "Completed", color: "#007DBA", id: 3 },
         { number: dashboardRes && dashboardRes ? dashboardRes.acaCancelled : 0, icon: "denied", text: "Cancelled", color: "#7dba00", id: 4 }
       ],
     },
  ];

  const [empId, setEmpid] = React.useState(1);
  const containerRef = React.useRef(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const navigate = useNavigate();

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };
  
const handleEmplrItemChange =(e:any) =>{
  let id=e;
  setEmpid(id);
  setOrganisation(id);
  dispatch(
    fetchDashboardRequest({id})
  );
}
  const handleChange = (event: SelectChangeEvent) => {
    setOrganisation(event.target.value);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0} xs={12}>
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
                        sx={{background: "white", height: "45px", }}
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
              </Box> 
            
            <Box>
                  {data && data.map((item:any,index:any) =>((
                    <Grid container xs={12} key={index} className="container">
                      <Grid item xs={12} className="dashboard-heading" sx={{height: "47px"}}>
                        {item.heading}
                      </Grid>
                      <Grid container xs={12} sx={{background:"white"}}>
                        {item.children.map((box, index) => (
                          <Grid
                            container
                            key={index}
                            xs={12}
                            md={2.5}
                            sx={{ background: `${box.color}`, color: "white", borderBottom: `13px solid ${box.color}` }}
                            className={box.changeOnHover ? "boxes changeOnHover" : "boxes" }
                            onClick={() =>navigate(`/${item.name}/${box.id}/${empId}`)}
                          >
                            <Grid item xs={9} sx={{padding: "18px 0 18px 18px"}}>
                              <Typography variant="h4" sx={{margin: "0px 0px 5px 0px"}}>{box.number}</Typography>
                              <Typography className="cards-font" >{box.text}</Typography>
                            </Grid>

                            <Grid item xs={3}>
                              <div className="dashboard-icon">
                                {box.icon === "info" ? <InfoRoundedIcon sx={{margin: "10px 15px 23px 10px", color:"#6c7293 !important" , fontSize:"1.3rem"}}/>
                                :box.icon === "rocket" ? <RocketLaunchRoundedIcon sx={{margin: "10px 15px 23px 10px", color:"#6c7293 !important" , fontSize:"1.3rem"}}/>
                                :box.icon === "timer" ? <AccessTimeFilledRoundedIcon sx={{margin: "10px 15px 23px 10px", color:"#6c7293 !important" , fontSize:"1.3rem"}}/>
                                :box.icon === "tick" ? <CheckCircleRoundedIcon sx={{margin: "10px 15px 23px 10px", color:"#6c7293 !important" , fontSize:"1.3rem"}}/>
                                :box.icon === "revisit" ? <AutorenewRoundedIcon sx={{margin: "10px 15px 23px 10px", color:"#6c7293 !important" , fontSize:"1.3rem"}}/>
                                :box.icon === "denied" ? <CancelRoundedIcon sx={{margin: "10px 15px 23px 10px", color:"#6c7293 !important" , fontSize:"1.3rem"}}/>
                                :box.icon === "dublicate" ? <ContentCopySharpIcon sx={{margin: "10px 15px 23px 10px", color:"#6c7293 !important" , fontSize:"1.3rem"}}/>
                                :box.icon === "Archive" ? <ArchiveSharpIcon sx={{margin: "10px 15px 23px 10px", color:"#6c7293 !important" , fontSize:"1.3rem"}}/>
                                : null}</div>
                              </Grid>
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                  )))}
                </Box>
              <Footer/>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default Dashboard;
