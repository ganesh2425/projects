import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";

const Footer = () => {
    const date = new Date();

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }} style={{padding: "16px", borderTop:"1px solid #dee2e6"}}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography style={{color:"#6c757d", fontSize: ".875rem"}}>© Copyright {date.getFullYear()}. All Rights Reserved.</Typography>
          </Grid>
          <Grid item xs={4} >
            <a style={{float: "right",color:"#6c757d", fontSize: ".875rem", fontFamily:"poppins"}}>Privacy Policy</a>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default Footer;
