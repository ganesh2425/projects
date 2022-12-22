import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployerRequest } from "../../actions/employerActions";
import { fetchPrivacypolicyRequest } from "../../actions/PrivacypolicyActions";
import { getEmployerDetails } from "../../reducers/employerReducer";
import { getPRIVACYPOLICYEnteredDetails } from "../../reducers/PrivacypolicyReducer";
import StorageService from "../../services/Storage.service";
import Footer from "../Footer";
import Header from "../Header";

const PrivacyPolicy = () => {
  let url = window.location.href;
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const employerRes = useSelector(getEmployerDetails);
  useEffect(() => {
    getEmployer();
  }, []);

  const getEmployer = () => {
    let employerTest = url.toString();
    console.log(employerTest);
    //alert(employerTest);
    let employer = "https://www.randstad.com";
    let indexW = employer.indexOf("w");
    let subStr1 = employer.substring(indexW + 4);
    let indexDot = subStr1.indexOf(".");
    let employerName = subStr1.substring(0, indexDot);
    dispatch(fetchEmployerRequest({ employerName }));
  };

  useEffect(() => {
    if (employerRes && employerRes.response) {
      StorageService.setCookies("employerId", employerRes.response.id);
      let eId = StorageService.getCookies("employerId");
      if (eId > 0) dispatch(fetchPrivacypolicyRequest({}));
    }
  }, [employerRes]);

  const Privacy: any = useSelector(getPRIVACYPOLICYEnteredDetails);

  useEffect(() => {
    // dispatch(fetchHOMERequest({}));
    if (Privacy) {
      console.log(Privacy);
    }
  }, [Privacy]);
  return (
    <React.Fragment>
      <Header />

      <div className="contactus-block">
        <div style={{ paddingBottom: "20px" }}>
          <Typography style={{ fontSize: "1.75rem" }} variant="h3">
            Privacy Policy
          </Typography>
        </div>
        <Box sx={{ flexGrow: 1 }} className="contactsection">
          <Grid container spacing={1}>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              mt={1}
              style={{
                padding: "15px 15px",
                marginLeft: "10px",
                fontSize: "15px",
              }}
            >
              <div className="">
                {/* <img src={'./'  + 'assets/img/phone.svg'} height="64" /> */}

                <Typography className="Lpage-home-p">
                  {Privacy && (
                    <p
                      dangerouslySetInnerHTML={{
                        __html: Privacy,
                      }}
                    ></p>
                  )}
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
export default PrivacyPolicy;
