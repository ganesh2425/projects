import React, { useState,useEffect } from "react";
import Header from "../Header";
import SwipeableSidenavbar from "../Sidenavbar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { largeScrees, smallScreen } from "../../Helper/slider";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { Button, TextareaAutosize, TextField, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getQLEMessageTemplateDetails } from "../../reducers/qleEmailTemplateReducer/getQLEMessageTemplateReducer";
import { fetchGetQLEMessageTemplateRequest } from "../../actions/qleEmailTemplateActions/getQLEMessageTemplateActions";
import { fetchEditQLEMessageTemplateRequest } from "../../actions/qleEmailTemplateActions/editQLEMessageTemplateActions";
import { getEditQLEMessageTemplateDetails } from "../../reducers/qleEmailTemplateReducer/editQLEMessageTemplateReducer";
import { getACAMessageTemplateDetails } from "../../reducers/acaEmailTemplateReducer/getACAMessageTemplateReducer";
import { fetchEditACAMessageTemplateRequest } from "../../actions/acaEmailTemplateActions/editACAMessageTemplateActions";
import { fetchGetACAMessageTemplateRequest } from "../../actions/acaEmailTemplateActions/getACAMessageTemplateActions";
import { getEditACAMessageTemplateDetails } from "../../reducers/acaEmailTemplateReducer/editACAMessageTemplateReducer";




const useStyles = makeStyles({
  root: {
    "& .MuiInputLabel-root": { top: "-3px" },
    "& .MuiOutlinedInput-root": { borderRadius: "0px" },
  },
});

const ACA_Edit_Message =( ): JSX.Element => {
  let params = useParams();
  const [headerValues, setHeaderValues] = useState({ sidebar: 2, header: 10 });
  const handleHeaders = () => {
    headerValues.sidebar == 2
      ? setHeaderValues(smallScreen())
      : setHeaderValues(largeScrees());
  };

  const [acaTemplateId, setTemplateId] = React.useState(0);
  const navigate = useNavigate();
  const [editorMessage, setEditorMessage] = React.useState("");
  

  const dispatch = useDispatch()
  const getACAMessageTempRes = useSelector(getACAMessageTemplateDetails)
  
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

  useEffect(() => {
    if (acaTemplateId > 0) {
      if (getACAMessageTempRes && getACAMessageTempRes['id'] > 0) {
        let messageEdit = getACAMessageTempRes['content'];
        setEditorMessage(messageEdit);
      }
    } 
  }, [getACAMessageTempRes]);

  const handleChangeForMessage = (e:any) => {
    setEditorMessage(e.target.value)
    
  }

  const handleSubmit = (e:any) => {
    if (acaTemplateId > 0) {
      setSubmitted(true);
      const messageEditTemplate: any = {
        "id": acaTemplateId,
        "content": editorMessage,
         "name":getACAMessageTempRes.name
      
      }
     
      if  (editorMessage) {
        dispatch(fetchEditACAMessageTemplateRequest(messageEditTemplate));
      } 
    }
  }
  
  const editMessageTempRes = useSelector(getEditACAMessageTemplateDetails);
  useEffect(() => {
    if (editMessageTempRes && editMessageTempRes['id'] > 0) {
      editMessageTempRes.id = 0;
      setTimeout(() => {
        toast.success(" ACA Message updated Successfully");
    
       },1000)
       navigate("/aca-email");
  
    }
  }, [editMessageTempRes]);
 
 
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
                  ACA / Message Template
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
                >
                  <Grid item>
                    <Typography
                    >
                    {getACAMessageTempRes.name}
                    
                    </Typography>
                  </Grid>
                </Grid>

                <Grid item xs={12} sx={{ padding: "15px" }} >
               
                  <TextField
                      id="name"
                      name="name"
                      variant="outlined"
                      fullWidth
                      style={{width:"100%"}}
                      value={editorMessage}
                      minRows={3}
                      onChange={handleChangeForMessage}
                      multiline
                      required
                      
                    />
                     <div className={!editorMessage  && isSubmitted ? "error-span show" : "error-span"} >
                        {!editorMessage && isSubmitted? "Please enter data" : ""}
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
                    navigate("/aca-email");
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

export default ACA_Edit_Message;
