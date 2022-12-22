import React, { useEffect, useState } from "react";
import Header from "../Header";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Button } from "@mui/material";
import Footer from "../Footer";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getHOMEEnteredDetails } from "../../reducers/homeReducer";
import { fetchHOMERequest } from "../../actions/homeActions";
import { fetchEmployerRequest } from "../../actions/employerActions";
import { getEmployerDetails } from "../../reducers/employerReducer";
import StorageService from "../../services/Storage.service";
import { fetchSlugRequest } from "../../actions/slugActions";
import { getEmployerDetailsBySlug } from "../../reducers/slugReducer";

const Homepage = ({ }: any) => {
  let url = window.location.href;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const employerRes = useSelector(getEmployerDetailsBySlug);
  useEffect(() => {
    getEmployer();
  }, []);

  const getEmployer = () => {
    let employerTest = url.toString();
    console.log(employerTest)
    //alert(employerTest);

    // let employer = "https://www.randstad.com";
    // let indexW = employer.indexOf("w");
    // let subStr1 = employer.substring(indexW + 4);
    // let indexDot = subStr1.indexOf(".");
    // let employerName = subStr1.substring(0, indexDot);

    //let employer = "https://dev.qleservices.com/randstad";
    let pathName = window.location.pathname; //This will give /randstad
    let idx = pathName.indexOf("/");
    let employerName = pathName.substring(idx+1);

    dispatch(
      fetchSlugRequest({ employerName })
    );

  };

  useEffect(() => {

    if (employerRes && employerRes.response) {
      if (employerRes.response.id > 0){
        StorageService.setCookies('employerId', employerRes.response.id);
        StorageService.setCookies('employerName', employerRes.response.name.replace(/[^a-zA-Z]/g,""));
      }
      let eId = StorageService.getCookies("employerId");
      if (eId > 0) dispatch(fetchHOMERequest({}));
    }
  }, [employerRes]);

  const homeSuccess: any = useSelector(getHOMEEnteredDetails);

  useEffect(() => {
    // dispatch(fetchHOMERequest({}));
    if (homeSuccess) {
      console.log(homeSuccess)
    }
  }, [homeSuccess])

  const handleClick = () => {
    navigate(`/`+StorageService.getCookies('employerName')+'/login');
    //document.location.reload();
  }

  return (
    <React.Fragment>
      <Header />
      <Box sx={{ flexGrow: 1 }} style={{ padding: "15px 15px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Card>
              {console.log(process.env.REACT_APP_RELATIVE_PATH)}
              {/* <CardActionArea> */}
              <Typography
                gutterBottom
                className="card-header"
                variant="h5"
                component="div"
              >
                Qualifying Life Events

              </Typography>
              <CardContent>
                <Typography variant="h6" className="header-styling">
                  Need to make a change to your benefits due to a family-related life event?
                </Typography>
                <Typography className="home-p">
                  {homeSuccess && <p dangerouslySetInnerHTML={{ __html: homeSuccess }}></p>}
                </Typography>
                <div style={{ textAlign: "center" }}>
                  <Button className="startmyqle" variant="contained" onClick={handleClick}>Start My QLE</Button>
                </div>
              </CardContent>
              {/* </CardActionArea> */}
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              {/* <CardActionArea> */}
              <Typography
                gutterBottom
                variant="h5"
                className="card-header"
                component="div"
              >
                Already started your QLE?
              </Typography>
              <CardContent>
                <Typography variant="body2" style={{ padding: "5px 0px" }}>
                  Check your email for your custom link to continue your QLE or
                </Typography>
                <Typography variant="body2" style={{ padding: "5px 0px" }}>
                  <Button className="customlink-btn" onClick={() => navigate(`/`+StorageService.getCookies('employerId')+'/resend-link')}>Click here</Button> <span>to have your custom link resent.</span>
                </Typography>
              </CardContent>
              {/* </CardActionArea> */}
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </React.Fragment>
  );
};

export default Homepage;