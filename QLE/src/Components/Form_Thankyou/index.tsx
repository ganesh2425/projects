import { Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";
import Header from "../Header";
import { useParams } from "react-router-dom";

const QLE_Form_Thankyou = (status:any) => {       
  let params = useParams();

  return (
    <>
        <Header />
      <Grid item xs={12} md={12} sx={{ margin: "10px 20px" }}>
        <Card>
          {/* <CardActionArea> */}
          <Typography
            gutterBottom
            className="card-header"
            variant="h5"
            component="div"
          >
            Thank you!
          </Typography>
          <CardContent>
            <Typography variant="h6" className="ans-styling">
              Thank you for providing your QLE documentation and requested
              benefit changes. We are reviewing your submission and will follow
              up with a status within five (5) business days.
            </Typography>
            <Typography className="ans-styling">
              In the meantime, if you have any questions, please call
              855.208.7036 or send an email to <a
                    href="mailto:support@qleservices.com"
                    className="email-address"
                  >
                    support@qleservices.com
                  </a>.
            </Typography>
            <Typography className="ans-styling">
              Your QLE's current status is:{" "}
              <span className="pending-review">{params.status}</span>
            </Typography>
          </CardContent>
          {/* </CardActionArea> */}
        </Card>
      </Grid>
    </>
  );
};

export default QLE_Form_Thankyou;
