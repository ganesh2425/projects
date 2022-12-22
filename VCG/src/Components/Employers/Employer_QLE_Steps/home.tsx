import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Button, Typography } from "@mui/material";
import TextEditor from "../../TextEditor";
import { useSelector, useDispatch } from "react-redux";
import { fetchUpdateEmpQLEStepsRequest } from "../../../actions/employersActions/updateEmpQLEStepsActions";
import { getUpdateEmpQLESteps } from "../../../reducers/employersReducer/updateEmpQLEStepsReducer";
import { toast } from "react-toastify";
import { getEmployerDetails } from "../../../reducers/employersReducer/getEmployerReducer";
import { fetchGetEmployerRequest } from "../../../actions/employersActions/getEmployerActions";
import { useNavigate } from "react-router-dom";

// const Home = () => {
const Home = ({
  employerId
}: any): JSX.Element => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editorData, setEditorData] = React.useState('');

  //   const [editorData, setEditorData] = React.useState(`<div>
  //   <h2>
  //     Need To Make A Change To Your Benefits Due To A Family-Related Life
  //     Event?
  //   </h2>

  //   <p>
  //     You've come to the right place! Certain life events, like a Boxorce or
  //     losing or gaining health coverage, are considered "qualifying life
  //     events." When you experience a qualifying life event (QLE), you are
  //     eligible to make related changes to your benefits, as long as you notify
  //     Randstad and provide required supporting documentation within 60 days of
  //     the even
  //   </p>

  //   <hr/>

  //   <p>
  //     Click on the "Start My QLE" button below to get started with your QLE
  //     submission. We'll walk you through every step of the process. If you
  //     have questions, feel free to check out our Frequently Asked Questions or
  //     contact our partner, VCG Administration Services, at 855.208.7036 Monday
  //     - Friday from 9AM to 5PM Eastern Time.
  //   </p>

  //   <p variant="h3">IMPORTANT NOTES:</p>

  //   <ul>
  //     <li>
  //       Please do not submit your QLE too far in advance of your event date.
  //       We are unable to make changes to your Randstad benefits in advance of
  //       the date of your event. You may submit your QLE up to five (5) days in
  //       advance of the date of your QLE.
  //     </li>
  //     <li>
  //     If you want to make changes to your benefits as the result of marriage or the birth/adoption of a child, please click here to visit the "My Benefits" page in UPoint. Then click on the "Marriage" or "Birth/Adoption of a Child" tile to initiate your QLE. For all other QLE events, click the "Start My QLE" button below.
  //     </li>
  //   </ul>

  //   <hr/>
  //     <p>Check your email for your custom link to continue your QLE or</p>
  //     <p>to have your custom link resent.</p>
  // </div>`);

  const [isSubmitted, setSubmitted] = useState(false);

  // useEffect(() => {
  //   getEmployerById();
  // }, []);

  // const getEmployerById = () => {
  //   let id: any = employerId
  //   dispatch(
  //     fetchGetEmployerRequest({ id })
  //   );
  // };

  const getEmployerRes = useSelector(getEmployerDetails);
  let getUpdateEmpQLEStepsRes: any = useSelector(getUpdateEmpQLESteps);

  useEffect(() => {
    if (employerId > 0) {
      getUpdateEmpQLEStepsRes = null;
      // getUpdateEmpQLEStepsRes['qleHomePageDescription'] = getUpdateEmpQLEStepsRes &&  getUpdateEmpQLEStepsRes['qleHomePageDescription'] 
      //  ? null : null;
      if (getEmployerRes && parseInt(getEmployerRes['id']) > 0) {
        let homePageDesc = getEmployerRes['qleHomePageDescription'];
        //if(homePageDesc)
          setEditorData(homePageDesc);
      }
    } 
  }, [getEmployerRes]);

  const handleEditorData = (incomingData: any) => {
    setEditorData(incomingData);
  }

  const handleSubmit = () => {
    setSubmitted(true);
    if (employerId > 0 && editorData.length > 0) {
      
      toast.success("Home details updated successfully");
      const tempUpdateEmpQLEStepsData: any = {
        "id": employerId,
        "qleHomePageDescription": editorData,
      }
      if(editorData)
      dispatch(fetchUpdateEmpQLEStepsRequest(tempUpdateEmpQLEStepsData));
    }
  }



  useEffect(() => {
    if (getUpdateEmpQLEStepsRes && getUpdateEmpQLEStepsRes['id'] > 0) {
      //toast.success("Home details updated successfully");
      setEditorData(getUpdateEmpQLEStepsRes['qleHomePageDescription']);
    }
  }, [getUpdateEmpQLEStepsRes]);

  const handleCancel = (e: any) => {
    navigate("/employers");
  };

  return (
    
    <>
      <TextEditor data={getUpdateEmpQLEStepsRes['qleHomePageDescription'] ? getUpdateEmpQLEStepsRes['qleHomePageDescription'] : editorData} handleEditorData={handleEditorData} />
      <div className={!editorData  && isSubmitted ? "error-span show" : "error-span"}>
        {!editorData && isSubmitted? "Please enter data" : ""}
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
          // onClick={()=>{console.log("data in text editor", editorData)}}
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
