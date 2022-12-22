import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Button, Typography } from "@mui/material";
import TextEditor from "../../../TextEditor";
import { useSelector, useDispatch } from "react-redux";
import { fetchUpdateEmpQLEStepsRequest } from "../../../../actions/employersActions/updateEmpQLEStepsActions";
import { getUpdateEmpQLESteps } from "../../../../reducers/employersReducer/updateEmpQLEStepsReducer";
import { toast } from "react-toastify";
import { getEmployerDetails } from "../../../../reducers/employersReducer/getEmployerReducer";
import { fetchGetEmployerRequest } from "../../../../actions/employersActions/getEmployerActions";
import { useNavigate } from "react-router-dom";

// const Home = () => {
const Home = ({
  employerId
}: any): JSX.Element => {

  const dispatch = useDispatch();
  const navigate = useNavigate()
    const [homePage, setHomePage] = React.useState("");
  
   
  
    const [isSubmitted, setSubmitted] = useState(false);
  
    const getEmployerRes = useSelector(getEmployerDetails);
  
    useEffect(() => {
      if (employerId > 0) {
        if (getEmployerRes && parseInt(getEmployerRes["id"]) > 0) {
          let privacyPolicy = getEmployerRes["acaHomepageDescription"];
         
          setHomePage(privacyPolicy)
        }
      }
    }, [getEmployerRes]);
  
    const handleEditorData = (incomingData: any) => {
      setHomePage(incomingData);
    };
   
    const handleSubmit = () => {
      setSubmitted(true);
      if (employerId > 0 && homePage.length > 0 ) {
       
        toast.success("Home details updated successfully");
        const tempUpdateEmpACAStepsData: any = {
          "id": employerId,
          "acaHomepageDescription": homePage,
        };
        if (homePage)
          dispatch(fetchUpdateEmpQLEStepsRequest(tempUpdateEmpACAStepsData));
      }
    };
  
    let getUpdateEmpQLEStepsRes: any = useSelector(getUpdateEmpQLESteps);
  
    useEffect(() => {
      if (getUpdateEmpQLEStepsRes && getUpdateEmpQLEStepsRes["id"] > 0) {
       
        setHomePage(getUpdateEmpQLEStepsRes['acaHomepageDescription']);
      }
    }, [getUpdateEmpQLEStepsRes]);

    const handleCancel=(e: any)=>{
        // console.log("cancelled");
        navigate("/employers")
    }
  
    return (
      <>
        <TextEditor
          data={getUpdateEmpQLEStepsRes['acaHomepageDescription'] ? getUpdateEmpQLEStepsRes['acaHomepageDescription'] : homePage ? homePage : " "} handleEditorData={handleEditorData}
        />
        <div
          className={
            !homePage && isSubmitted
              ? "error-span show"
              : "error-span"
          }
        >
          {!homePage && isSubmitted ? "Please enter data" : ""}
        </div>
  
        <Grid
          item
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
            marginTop: "10px",
            width: "100%",
          }}
        >
          <Button
            variant="contained"
            className="save-btn-role"
            sx={{ margin: "3px 5px" }}
            onClick={handleSubmit}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            className="cancel-btn-role"
            sx={{ margin: "3px 5px" }}
            onClick={(e) => handleCancel(e)}
          >
            Cancel
          </Button>
        </Grid>
      </>
    );
  };

export default Home;
