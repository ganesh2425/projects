import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import "./style.css";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <Header />
      <Box sx={{ flexGrow: 1 }} style={{ padding: "15px 15px" }}>
        <Grid
          container
          spacing={2}
          sx={{ border: "1px solid blue" }}
          className="landing-page-container"
        >
          <Grid item xs={0} md={7.1}></Grid>
          <Grid item xs={12} md={4.7}>
            <Card>
              {/* <CardActionArea> */}
              <CardContent>
                <Typography variant="h5" className="Lpage-heading">
                  Welcome to the employer health coverage information request
                  portal
                </Typography>

                <Typography className="Lpage-content">
                  As part of your application for health coverage through the
                  Health Insurance Marketplace, you must provide information
                  about the health coverage offered by your employer. This
                  information is used to determine if you qualify for a
                  government subsidy to help you pay for coverage that you
                  purchase through the Marketplace.
                </Typography>

                <Button
                  variant="contained"
                  color="error"
                  fullWidth
                  className="Lpage-button"
                >
                  Start My ACA
                </Button>
              </CardContent>
              {/* </CardActionArea> */}
            </Card>
          </Grid>
        </Grid>

        <Grid
          container
          justifyContent="space-between"
          sx={{ color: "#6c757d", padding: "20px 0px 0px 0px"}}
        >
          <Grid item xs={6} md={3}>
            <Typography>© Copyright 2022. All Rights Reserved.</Typography>
          </Grid>

          <Grid item xs={6} md={1}>
            <Typography>Privacy Policy</Typography>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default LandingPage;
