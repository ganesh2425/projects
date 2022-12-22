import { Card, CardContent, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import Header from "../Header";
import { useDispatch, useSelector } from "react-redux";
import { getAddACADetails } from "../../reducers/addACAReducer";
import { fetchAddACARequest } from "../../actions/addACAActions";
import StorageService from "../../services/Storage.service";

const ACA_Form_Thankyou = ({ employerId }: any): JSX.Element => {
  const dispatch = useDispatch();
  const addACARes: any = useSelector(getAddACADetails);

  useEffect(() => {
    if (addACARes && addACARes.response) {
      StorageService.setCookies("employerId", addACARes.response.id);
      let eId = StorageService.getCookies("employerId");
      if (eId > 0) dispatch(fetchAddACARequest({}));
    }
  }, [addACARes]);

  return (
    <>
      <Header />
      <Grid item xs={12} md={12} sx={{ margin: "10px 20px" }}>
        <Card>
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
              Your Confirmation : {addACARes && addACARes.confirmationNumber}
            </Typography>
            <br />
            <Typography className="ans-styling">
              Thank you for requesting information about your employer's health
              coverage. Your request has been received and will be reviewed
              within five (5) business days. Your employer's health information
              will be sent to you via E-mail or First Class Mail – based on your
              expressed preference. Please save your confirmation number
              displayed above for your records.
            </Typography>
            <Typography className="ans-styling">
              If you have any questions, please contact a member of our VCG team
              by telephone at 855-208-7036 or by e-mail at{" "}
              <a href="/">support@acaemployerform.com</a>.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default ACA_Form_Thankyou;
