import { Button, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import DescriptionIcon from "@mui/icons-material/Description";
import { Box } from "@mui/system";
import "../style.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import {useEffect } from "react"
import {toast} from "react-toastify"
import { fetchAddNoteRequest } from "../../../actions/acaActions/ACA_AddNoteActions";
import { getAddNoteDetails } from "../../../reducers/acaReducer/addACA_NoteReducer";
import { TextField } from "@material-ui/core";
import { getACAEventDetails } from "../../../reducers/acaReducer/getACAEventReducer";
import { getAddEmailDetails } from "../../../reducers/acaReducer/addACA_EmailReducer";
import { fetchAddEmailRequest } from "../../../actions/acaActions/ACA_AddEmailActions";
import { fetchGetACAEventRequest } from "../../../actions/acaActions/getACAEventActions";

const ACA_Application_Communication = ( ):JSX.Element => {

  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const [editorData, setEditorData] = React.useState("");
  const [editorPhoneData, seteditorPhoneData] = React.useState("0");
  const [editPhone,setEditPhone] = React.useState("")
  const [editEmailData, setEditEmailData] = React.useState("1");
  const [editEmail,setEditEmail] = React.useState("")
 
  const [eventId,setEventId] = React.useState(" ")

  const [isSubmitted, setSubmitted] =React.useState(false);

  const getACAEventRes:any = useSelector(getACAEventDetails)
  const getACAEventId = () => {
    let id: any = params.eventId;
    if (id > 0) {
      dispatch(fetchGetACAEventRequest({ id }));
    }
  };

  var data:any = getACAEventRes.communicationRecords
  data = data.sort((a,b) => new Date(a.createdDate) < new Date(b.createdDate) ? 1 : -1);
  var  response:any = getACAEventRes.eventNotes
  response = response.sort((a,b) => new Date(a.createdDate) < new Date(b.createdDate) ? 1 : -1);


  const handleEditorData = (e: any) => {
   e.preventDefault();
    setEditorData(e.target.value);
  }
  const handleEmailData = (e: any) => {
    e.preventDefault();
    setEditEmail(e.target.value);
   }
   const handlePhoneLogData = (e: any) => {
    e.preventDefault();
    setEditPhone(e.target.value);
   }
   
  const handleSubmit = () => {
    let id: any = params.eventId;
    if (id > 0) {
     setSubmitted(true)
      const tempData: any = {
        "id": id,
        "note": editorData,
      }
       if(editorData)
      dispatch(fetchAddNoteRequest(tempData));
    }
  }
  let NotesResp:any=useSelector(getAddNoteDetails);
 
  useEffect(() => {
    let value=NotesResp['isSuccess'];
    let id: any = params.eventId;
      if(NotesResp && value > 0)
      { 
        setTimeout(() => {
          toast.success("Notes Added successfully")
          getACAEventId()
        },1500)
      }
      value=false;
      NotesResp.id = null;
      NotesResp.isSuccess=false;
      
  })



  const handlePhoneSubmit = () => {
    let id: any = params.eventId;
    if (id > 0) {
      setSubmitted(true)
      const tempData: any = {
        "id": id,
        "communicationString": editPhone,
        "communicationThrough":editorPhoneData,
      }
       if(editorPhoneData && editPhone)
      dispatch(fetchAddEmailRequest(tempData));
      // toast.success("Phone added successfully")
    }
  }
 


  const handleEmailSubmit = () => {
    let id: any = params.eventId;
    if (id > 0) {
      setSubmitted(true)
      const tempData: any = {
        "id": id,
        "communicationString": editEmail,
        "communicationThrough":editEmailData,
      }
       if(editEmailData && editEmail)
      dispatch(fetchAddEmailRequest(tempData));

    }
  }

  const emailRes:any = useSelector(getAddEmailDetails)

  useEffect(() => {
    let value=emailRes['isSuccess'];
    let id: any = params.eventId;
      if(emailRes && value > 0)
      { 
        toast.success("Added successfully")
        getACAEventId()
         
      }
      value=false;
      emailRes.id = null;
      emailRes.isSuccess=false;
  })
  

  const [state, setState] = React.useState("overview");
  

  return (
    <>
      {state === "overview" ? (
        <Box>
          <Grid
            container
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              margin: "10px 0px",
            }}
          >
            <Button
              variant="contained"
              className="save-btn-role"
              sx={{ margin: "3px 5px" }}
              onClick={() => setState("notes")}
            >
              New Note
            </Button>
            <Button
              variant="contained"
              className="save-btn-role"
              sx={{ margin: "3px 5px" }}
              onClick={() => setState("email")}
            >
              New Email Log
            </Button>
            <Button
              variant="contained"
              className="save-btn-role"
              sx={{ margin: "3px 5px" }}
              onClick={() => setState("phone")}
            >
              New Phone Log
            </Button>
          </Grid>

          <Grid
            container
            justifyContent="space-between"
            className="card-layout"
         
          >
            <Grid
              item
              xs={12}
              className="card-header"
            >
               <Typography style={{fontSize:"15px"}}>Phone</Typography>

              <Typography sx={{fontWeight:"500"}}></Typography>
            </Grid>

            <Grid item xs={12} className="card-desc"style={{fontSize:"15px"}}>
             { data && data.map((item:any,key:number) => {
               return(
               
                item.type === "Phone" && <Grid  padding={1.5} style={{display:"flex",justifyContent:"space-between"}} className="card-layout">
                  <PhoneIcon />
             <Typography key={key} >{item.communicationString}</Typography>
             <Typography sx={{fontWeight:"700"}}>{item.createdDate}</Typography>
           </Grid>
                 )
            
             })}
            </Grid>
          </Grid>

          <Grid
            container
            className="card-layout"
          
          >
            <Grid
              item
              xs={12}
              className="card-header"
            >
              <Typography style={{fontSize:"15px"}}>Note</Typography>
              

              <Typography sx={{fontWeight:"500"}}></Typography>
          
              </Grid>

            <Grid item xs={12}  className="card-desc" style={{justifyContent:"space-evenly"}}>
            
            {response.map((item:any,id:number) => {
              return(
                <Grid  padding={1.5} style={{display:"flex",justifyContent:"space-between"}} className="card-layout">
                     <DescriptionIcon />
                  <Typography>{item.note}</Typography>
                  <Typography sx={{fontWeight:"700"}}>{item.createdDate}</Typography>
                </Grid>
              )
            })}
          
           </Grid>
         
          </Grid>

          <Grid
            container
            justifyContent="space-between"
            className="card-layout"
          >
            <Grid
              item
              xs={12}
              className="card-header"
            >
            <Typography style={{fontSize:"15px"}}>Email</Typography>
              <Typography sx={{fontWeight:"500"}}></Typography>
              
            </Grid>

             <Grid item xs={12} className="card-desc">
             {data.map((item:any,id:number) => {
               return(
               
                item.type === "Email" && <Grid  padding={1.5} style={{display:"flex",justifyContent:"space-between"}} className="card-layout">
                  <EmailIcon />
             <Typography>{item.communicationString}</Typography>
             <Typography sx={{fontWeight:"700"}}>{item.createdDate}</Typography>
           </Grid>
                 )
            
             })}
            </Grid>
          </Grid>
        </Box>
      ) : state === "phone" ? (
        <Box>
          <Typography variant="h6">Phone</Typography>

          <hr />
                       <TextField
                        id="phone"
                        name="phone"
                        variant="outlined"
                        fullWidth
                        style={{width:"100%"}}
                        value={editPhone}
                        minRows={8}
                        onChange={handlePhoneLogData}
                        multiline
                        required
                        
                      />
                      <div className={!editPhone && isSubmitted ? "error-span show" : "error-span"}>
                        {!editPhone && isSubmitted? "Please enter data" : ""}
                      </div>
          <Grid
            container
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              margin: "10px 0px",
            }}
          >
            <Button
              variant="contained"
              className="save-btn-role"
              sx={{ margin: "3px 5px" }}
              onClick={handlePhoneSubmit}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              className="cancel-btn-role"
              sx={{ margin: "3px 5px", background: "#e6e6e6" }}
              onClick={() => {
                setState("overview");
                setEditPhone("")

              }}
            >
              Cancel
            </Button>
          </Grid>
        </Box>
      ) : state === "email" ? (
        <Box>
          <Typography variant="h6">Email</Typography>

          <hr />

          <TextField
                        id="email"
                        name="email"
                        variant="outlined"
                        fullWidth
                        style={{width:"100%"}}
                        value={editEmail}
                        minRows={8}
                        onChange={handleEmailData}
                        multiline
                        required
                        
                      />
                       <div className={!editEmail && isSubmitted ? "error-span show" : "error-span"}>
                        {!editEmail && isSubmitted? "Please enter data" : ""}
                      </div>
                       
          <Grid
            container
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              margin: "10px 0px",
            }}
          >
            <Button
              variant="contained"
              className="save-btn-role"
              sx={{ margin: "3px 5px" }}
              onClick={handleEmailSubmit}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              className="cancel-btn-role"
              sx={{ margin: "3px 5px", background: "#e6e6e6" }}
              onClick={() => {
                setState("overview");
                setEditEmail("");
                
              }}
            >
              Cancel
            </Button>
          </Grid>
        </Box>
      ) : state === "notes" ? (
        <Box>
          <Typography variant="h6">Notes</Typography>

          <hr />
                      <TextField
                        id="name"
                        name="name"
                        variant="outlined"
                        fullWidth
                        style={{width:"100%"}}
                        value={editorData}
                        minRows={8}
                        onChange={handleEditorData}
                        multiline
                        required
                        
                      />
                       <div className={!editorData && isSubmitted ? "error-span show" : "error-span"}>
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
              sx={{ margin: "3px 5px", background: "#e6e6e6" }}
              onClick={() => {
                setState("overview");
                setEditorData("")
              }}
            >
              Cancel
            </Button>
          </Grid>
        </Box>
      ) : null}
    </>
  );
};

export default ACA_Application_Communication;