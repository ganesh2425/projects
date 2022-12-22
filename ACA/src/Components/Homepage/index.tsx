import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { getEmployerDetails } from "../../reducers/employerReducer";
import { fetchEmployerRequest } from "../../actions/employerActions";
import { getHOMEEnteredDetails } from "../../reducers/homeReducer";
import { fetchHOMERequest } from "../../actions/homeActions";
import StorageService from "../../services/Storage.service";
import { fetchSlugRequest } from "../../actions/slugActions";
import { getEmployerDetailsBySlug } from "../../reducers/slugReducer";

const Homepage = () => {
  let url = window.location.href;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const employerRes = useSelector(getEmployerDetailsBySlug);
  useEffect(() => {
    getEmployer();
  }, []);

  const getEmployer = () => {
    // let employer = url.toString();
    // let indexW = employer.indexOf("w");
    // let subStr1 = employer.substring(indexW + 4);
    // let indexDot = subStr1.indexOf(".");
    // let employerName = subStr1.substring(0, indexDot);
    let pathName = window.location.pathname; //This will give /randstad
    let idx = pathName.indexOf("/");
    let employerName = pathName.substring(idx+1);

    dispatch(
      fetchSlugRequest({ employerName })
    );

  };

  useEffect(() => {
    if (employerRes && employerRes.response) {
      StorageService.setCookies("employerId", employerRes.response.id);
      StorageService.setCookies('employerName', employerRes.response.name.replace(/[^a-zA-Z]/g,""));
      let eId = StorageService.getCookies("employerId");
      if (eId > 0) dispatch(fetchHOMERequest({}));
    }
  }, [employerRes]);


  const homeSuccess: any = useSelector(getHOMEEnteredDetails);
  useEffect(() => {
    if (homeSuccess) {
      console.log(homeSuccess);
    }
  }, [homeSuccess]);
  return (
    <React.Fragment>
      <Header />
      <Box sx={{ flexGrow: 1 }} style={{ padding: "15px 0px" }}>
        <Grid
          container
          spacing={2}
          sx={{ border: "1px solid blue" }}
          className="landing-page-container"
        >
          <Grid item xs={0} md={7.1}></Grid>
          <Grid item xs={12} md={4.7}>
            <Card>
              <CardContent>
                <Typography variant="h5" className="Lpage-heading">
                  Welcome to the employer health coverage information request
                  portal
                </Typography>

                <Typography className="Lpage-home-p">
                  {homeSuccess && (
                    <p
                      dangerouslySetInnerHTML={{
                        __html: homeSuccess,
                      }}
                    ></p>
                  )}
                </Typography>

                <Button
                  variant="contained"
                  color="error"
                  fullWidth
                  className="Lpage-button"
                  onClick={() => navigate(`/`+StorageService.getCookies('employerName')+`/login`)}
                >
                  Start My ACA
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Footer />
      </Box>
    </React.Fragment>
  );
};

export default Homepage;
