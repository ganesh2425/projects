import React, { useState,useEffect } from "react";
import {  useParams } from "react-router-dom";
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
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getACAEmailTemplateDetails } from "../../reducers/acaEmailTemplateReducer/getACAEmailTemplateReducer";
import { fetchGetACAEmailTemplateRequest } from "../../actions/acaEmailTemplateActions/getACAEmailTemplateActions";
import { fetchEditACAEmailTemplateRequest } from "../../actions/acaEmailTemplateActions/editACAEmailTemplateActions";
import { getEditACAEmailTemplateDetails } from "../../reducers/acaEmailTemplateReducer/editACAEmailTemplateReducer";
import { getACAMessageTemplateDetails } from "../../reducers/acaEmailTemplateReducer/getACAMessageTemplateReducer";
import { fetchGetACAMessageTemplateRequest } from "../../actions/acaEmailTemplateActions/getACAMessageTemplateActions";


const useStyles = makeStyles({
  root: {
    "& .MuiInputLabel-root": { top: "-3px" },
    "& .MuiOutlinedInput-root": { borderRadius: "0px" },
  },
});

const ACA_Edit_Email = (props: any) => {
   
  const [headerValues, setHeaderValues] = useState({ sidebar: 2, header: 10 });
  const handleHeaders = () => {
    headerValues.sidebar == 2
      ? setHeaderValues(smallScreen())
      : setHeaderValues(largeScrees());
  };
  
  const params = useParams();
  const dispatch = useDispatch();
  const [acaTemplateId, setTemplateId] = React.useState(0);
  const navigate = useNavigate();
  const [editorData, setEditorData] = React.useState("");
  const [editorSubject, setEditorSubject] = React.useState("");

  const getAcaEmailTempRes = useSelector(getACAEmailTemplateDetails)
  useEffect(() => {
    getEmailTempById();
  }, []);

  const getEmailTempById = () => {
    let id: any = params.acaTemplateId;
    if (id > 0){
    setTemplateId(id)
      dispatch(
        fetchGetACAEmailTemplateRequest({ id })
      );
    }
  };
  
  useEffect(() => {
    getMessageTempById();
  }, []);

  const getMessageTempById = () => {
    let id: any = params.acaTemplateId;
    if (id > 0){
    setTemplateId(id)
      dispatch(
        fetchGetACAMessageTemplateRequest({ id })
      );
    }
  };

  const [isSubmitted, setSubmitted] = useState(false);
  const [data, setData] = useState("");

 let getName = "" 

  useEffect(() => {
    if (acaTemplateId > 0) {
      if (getAcaEmailTempRes && getAcaEmailTempRes['id'] > 0) {
        const homePageDesc = getAcaEmailTempRes["content"]
        const homePage = getAcaEmailTempRes["subject"]
        getName = getAcaEmailTempRes["subject"]
        setData(getName)
        setEditorData(homePageDesc)
        setEditorSubject(homePage)
        
      }
    } 
  }, [getAcaEmailTempRes]);

  const handleEditorData = (incomingData: any) => {
    setEditorData(incomingData);
  }

  const handleSubmit = (e:any) => {
    if (acaTemplateId > 0) {
      setSubmitted(true);
      const tempUpdateEmpQLEStepsData: any = {
        "id": acaTemplateId,
        "content": editorData,
         "name":getAcaEmailTempRes.name,
         "subject":editorSubject
      
      }
      if(editorData && editorSubject)
      dispatch(fetchEditACAEmailTemplateRequest(tempUpdateEmpQLEStepsData));
    }
  }
  
  const editEmailTempRes = useSelector(getEditACAEmailTemplateDetails);
  useEffect(() => {
    if (editEmailTempRes && editEmailTempRes['id'] > 0) {
     toast.success(" ACA Email updated Successfully");
      editEmailTempRes.id = 0;
      navigate("/aca-email");
    }
  }, [editEmailTempRes]);


  return (
    <React.Fragment>
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
                  {window.location.href.includes("qle-email")
                    ? "QLE"
                    : window.location.href.includes("aca-email")
                    ? "ACA"
                    : null}{" "}
                  / Email Template
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
                  <Grid item >
                  <Typography
                    >
                    {data}
                    </Typography>
                    
                  </Grid>
                </Grid>
              <Grid item xs={12} md={12} mb={2} style={{margin: "10px"}}
              
              >
                  <TextField
                  
                    id="outlined-basic"
                    label=""
                    variant="outlined"
                    name="subject"
                    fullWidth
                    value={editorSubject}
                    onChange={(e) => (setEditorSubject(e.target.value))}
                    
                  />
                </Grid>

                <Grid item xs={12} sx={{ padding: "15px" }}>
                <TextEditor data={editorData} handleEditorData={handleEditorData} />
                <div className={!editorData  && isSubmitted ? "error-span show" : "error-span"}>
                  {!editorData && isSubmitted? "Please enter data" : ""}
                </div>
                
                  <Grid
                    container
                    sx={{
                      display: "flex",
                      flexDirection: "row-reverse",
                      margin: "10px 0px",
                    }}
                  >
                    <Grid item>
                      <Button
                        variant="contained"
                        className="save-btn-role"
                        type="submit"
                        onClick={(e) => handleSubmit(e)}
                        sx={{ margin: "3px 5px" }}
                      >
                        Save Changes
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        className="cancel-btn-role"
                        sx={{ margin: "3px 5px" }}
                        onClick={() => {
                          navigate("/aca-email");
                        }}
                      >
                        Cancel
                      </Button>
                    </Grid>
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
    </React.Fragment>
  );
};

export default ACA_Edit_Email;
