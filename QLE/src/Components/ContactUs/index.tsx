import React from "react";
import Footer from "../Footer";
import Header from "../Header";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";

const ContactUs = () => {
  return (
    <React.Fragment>
      <Header />

      <div className="contactus-block">
        <div style={{paddingBottom: '20px'}}>
          <Typography style={{fontSize:"1.75rem"}} variant="h3">Contact</Typography>
        </div>
        <Box sx={{ flexGrow: 1 }} className="contactsection">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4}>
              <div className="contact-us">
                {/* <img src={'./'  + 'assets/img/phone.svg'} height="64" /> */}
                <img src={process.env.REACT_APP_RELATIVE_PATH + '/assets/img/phone.svg'} height="64" /> 
                <Typography variant="h4" className="contact-details">855.208.7036</Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <div className="contact-us">
                {/* <img src={'./'  + 'assets/img/paper-plane.svg'} height="64" /> */}
                <img src={process.env.REACT_APP_RELATIVE_PATH   + '/assets/img/paper-plane.svg'} height="64" />
                
                <Typography variant="h4" className="contact-details">
                  <a
                    href="mailto:support@qleservices.com"
                    className="email-address"
                  >
                    support@qleservices.com
                  </a>
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <div className="contact-us">
                {/* <img src={'./'  + 'assets/img/envelope.svg'} height="64" /> */}
                <img src={ process.env.REACT_APP_RELATIVE_PATH   + '/assets/img/envelope.svg'} height="64" />
               
                <Typography variant="h4" className="contact-details">
                  P.O. Box 724162
                  <br />
                  Attn: QLE Services
                  <br />
                  Atlanta, GA 31139
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Box>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default ContactUs;
