import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployerRequest } from "../../actions/employerActions";
import { fetchPRIVACYRequest } from "../../actions/privacyActions";
import { getEmployerDetails } from "../../reducers/employerReducer";
import { getPRIVACYPOLICYDetails } from "../../reducers/privacyReducer";
import Footer from "../Footer";
import Header from "../Header";
import StorageService from "../../services/Storage.service";
import { fetchSlugRequest } from "../../actions/slugActions";
import { getEmployerDetailsBySlug } from "../../reducers/slugReducer";

const PrivacyPolicy=()=>{
let url = window.location.href;

const dispatch = useDispatch();
const employerRes = useSelector(getEmployerDetailsBySlug);

useEffect(()=>{
  getEmployer();
},[]);

const getEmployer =()=>{
  const employerName=StorageService.getCookies("employerName");
  dispatch(fetchSlugRequest({employerName}));
};

useEffect(()=>{
  if (employerRes && employerRes.response) {
    // StorageService.setCookies('employerId', employerRes.response.id);
    let eId =  StorageService.getCookies("employerId");
    if (employerRes.response.id > 0)
    dispatch(fetchPRIVACYRequest({}));
  }
}, [employerRes]);

  const privacyRes = useSelector(getPRIVACYPOLICYDetails)
  let result = privacyRes.privacyPolicies
  useEffect(() =>{
    if(privacyRes){
      console.log(result)
    }
  }, [privacyRes]);
  return(
    <React.Fragment>
      <Header/>
     
      <div className="contactus-block">
        <div style={{ paddingBottom: "20px" }}>
          <Typography style={{ fontSize: "1.75rem" }} variant="h3">
             Privacy Policy
          </Typography>
        </div>
        <Box sx={{ flexGrow: 1 }} className="contactsection">
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={12} mt={1} style={{padding:"15px 15px",marginLeft:"10px", fontSize:"15px"}}>
              <div className="">
                
                <Typography  className="Lpage-home-p">
                {result && (
                    <p
                      dangerouslySetInnerHTML={{
                        __html: result,
                      }}
                    ></p>
                  )}
                </Typography>
              </div>
            </Grid>
            
          </Grid>
        </Box>
      </div>
<Footer/>
    </React.Fragment>
  )
}
export default PrivacyPolicy;