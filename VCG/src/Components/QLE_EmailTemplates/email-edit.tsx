import React, { useState,useEffect } from "react";
import Header from "../Header";
import SwipeableSidenavbar from "../Sidenavbar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { largeScrees, smallScreen } from "../../Helper/slider";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography } from "@mui/material";
import TextEditor from "../TextEditor";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEditQLEEmailTemplateDetails } from "../../reducers/qleEmailTemplateReducer/editQLEEmailTemplateReducer";
import { fetchEditQLEEmailTemplateRequest } from "../../actions/qleEmailTemplateActions/editQLEEmailTemplateActions";
import { getQLEEmailTemplateDetails } from "../../reducers/qleEmailTemplateReducer/getQLEEmailTemplateReducer";
import { fetchGetQLEEmailTemplateRequest } from "../../actions/qleEmailTemplateActions/getQLEEmailTemplateActions";

const QLE_Edit_Email =( ): JSX.Element => {
 
  
  let params = useParams();
  const [headerValues, setHeaderValues] = useState({ sidebar: 2, header: 10 });
  const handleHeaders = () => {
    headerValues.sidebar == 2
      ? setHeaderValues(smallScreen())
      : setHeaderValues(largeScrees());
  };

  
  const [templateId, setTemplateId] = React.useState(0);
  const navigate = useNavigate();
  const [editorData, setEditorData] = React.useState("");
  const [editorDataTemp, setEditorDataTemp] = React.useState("");

  const dispatch = useDispatch()

  useEffect(() => {
    getEmailTempById();
  }, []);

  const getEmailTempById = () => {
    let id: any = params.templateId;
    if (id > 0){
    setTemplateId(id)
   
      dispatch(
        fetchGetQLEEmailTemplateRequest({ id })
      );
    }
  };

 
  const getEmailTempRes = useSelector(getQLEEmailTemplateDetails);
  const [isSubmitted, setSubmitted] = useState(false);
  const [data,setData] = useState("");

let getName = ""
  useEffect(() => {
    if (templateId > 0) {
      if (getEmailTempRes && getEmailTempRes['id'] > 0) {
        let homePageDesc = getEmailTempRes['content'];
        let homePage = getEmailTempRes['subject'];
         getName = getEmailTempRes['name'];
         setData(getName)
        setEditorData(homePageDesc);
        setEditorDataTemp(homePage)
      }
    } 
  }, [getEmailTempRes]);

 
  const handleEditorData = (incomingData: any) => {
    setEditorData(incomingData);
  }

  const handleSubmit = (e:any) => {
    if (templateId > 0) {
      setSubmitted(true);
      const tempUpdateEmpQLEStepsData: any = {
        "id": templateId,
        "content": editorData,
         "name":getEmailTempRes.name,
         "subject":editorDataTemp,
      
      }
      if (editorData && editorDataTemp.length ) {
        dispatch(fetchEditQLEEmailTemplateRequest(tempUpdateEmpQLEStepsData));
        
      } 
    }
  }
  
  const editEmailTempRes = useSelector(getEditQLEEmailTemplateDetails);
  useEffect(() => {
    if (editEmailTempRes && editEmailTempRes['id'] > 0) {
      editEmailTempRes.id = 0;
     setTimeout(() => {
      toast.success(" QLE Email updated Successfully");
  
     },1000)
     navigate("/qle-email");
    }
  }, [editEmailTempRes]);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
          <Grid
            xs={6}
            style={{ transition: "500ms", background: "#f2f2f2" }}
            md={headerValues.sidebar}
          >
            <SwipeableSidenavbar width={headerValues.sidebar} />
          </Grid>
          <Grid
            item
            xs={6}
            style={{ transition: "500ms", background: "#f2f2f2" }}
            md={headerValues.header}
          >
            <Header handleHeaders={handleHeaders} />

           

            <Box style={{ margin: "36px 15px" }} sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid
                  className="title-styling"
                  sx={{ alignSelf: "self-end" }}
                  item
                  xs={9}
                >
                  QLE / Email Template
                </Grid>
              </Grid>
            </Box>
            <Paper sx={{ margin: "15px", boxShadow: "none !important" }}>
              <Grid container xs={12} sx={{ border: "1px solid lightgray" }}>
              <Grid
                  container
                  justifyContent="space-between"
                  sx={{
                    padding: "15px",
                    border: "1px solid lightgray",
                    background: "#f6f8fa",
                  }}
                  mb={3}
                >
                  <Grid item>
                  <Typography
                    >
                    {data}
                    </Typography>
                    
                  </Grid>
                </Grid>
             
                  <Grid item xs={1} md={12} mb={2} style={{margin:"10px"}} >
                
                  <TextField
                    id="outlined-basic"
                    label=""
                    variant="outlined"
                    name="subject"
                    fullWidth
                    value={editorDataTemp}
                    onChange={(e) => (setEditorDataTemp(e.target.value))}
                    
                  />
              
                </Grid>
                

                <Grid item xs={12} sx={{ padding: "15px" }} >
                <TextEditor data={editorData} handleEditorData={handleEditorData} />
                      <div className={!editorData && isSubmitted ? "error-span show" : "error-span"}>
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
                  type="submit"
                
                  onClick={(e) => handleSubmit(e)}
                >
                  Save Changes
                </Button>
                <Button
                  variant="outlined"
                  className="cancel-btn-role"
                  sx={{ margin: "3px 5px" }}
                  onClick={() => {
                    navigate("/qle-email");
                  }}
                >
                  Cancel
                </Button>
              </Grid>
            
                </Grid>
              </Grid>
            </Paper>
            <Grid
              container
              xs={3}
              sx={{
                position: "relative",
                bottom: 0,
                left: "2",
                margin: "10px",
                color: "gray",
              }}
            >
              © Copyright 2022. All Rights Reserved.
            </Grid>
          </Grid>
        </Grid>
      </Box>
   

    
    </>
  );
};

export default QLE_Edit_Email;
