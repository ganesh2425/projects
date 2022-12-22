import { Box, Button, Grid, TextField } from "@mui/material";
import TextEditor from "../TextEditor";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Formik, FormikProps, validateYupSchema } from "formik";
import { INotesForm } from '../../interfaces/notesType';
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchNotesRequest } from '../../actions/qle-editActions/notesActions';
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { getEditByIdDetails } from "../../reducers/qles-editReducer/getEditByIdReducer"
import { getNotesDetails } from "../../reducers/qles-editReducer/notesReducer";
import { Typography } from "@material-ui/core";
import DescriptionIcon from "@mui/icons-material/Description";
import { fetchGetEditByIdRequest } from "../../actions/qle-editActions/getEditByIdActions";
import Tooltip from "@mui/material/Tooltip";

const QLE_Notes = (props: any): JSX.Element => {

  let params = useParams();
  const dispatch = useDispatch();
  const [isSubmitted, setSubmitted] = useState(false);
  const [initialValues, setInitialValues] = useState<INotesForm>({
    qleEventId: '',
    eventNotes: '',
  })
  
 
  const [editorData, setEditorData] = React.useState('');
  const[qleEventNotes,setqleEventNotes]=React.useState<any>([])
  const qleNotes : any = useSelector(getEditByIdDetails);
  var data:any = qleNotes.qleEventNotes
  data = data.sort((a,b) => new Date(a.createdDate) < new Date(b.createdDate) ? 1 : -1);
  var  response:any = qleNotes.qleEventNotes
  response = response.sort((a,b) => new Date(a.createdDate) < new Date(b.createdDate) ? 1 : -1);
  const navigate = useNavigate();
  const getQle = () => {
    let id: any = params.id
    dispatch(
      fetchGetEditByIdRequest({ id })
    );
  };
  
  useEffect(() => {
    if (qleNotes) {
      let details = qleNotes['qleEventNotes'];
      setqleEventNotes(details)
    // setActiveStep(qleEventActivity.length);
    }
  });
 const handleEditorData = (e: any) => {
   e.preventDefault();
    setEditorData(e.target.value);
  }
  const handleSubmit = () => {
    let eventId: any = params.id;
    setSubmitted(true);
    if (eventId > 0) {
      const tempData: any = {
        "id": eventId,
        "eventNotes": editorData,
        
      }
      if (editorData)
        dispatch(fetchNotesRequest(tempData));
    }
  }
  let notesResp: any = useSelector(getNotesDetails);
  useEffect(() => {
    if (params.id) {
      let value = notesResp['isSuccess'];
      if (notesResp && value) {
        toast.success("Notes added successfully");
        // setState("overview");
        navigate(`/qle-edit/${params.id}`)
        let id: any = params.id
        dispatch(
          fetchGetEditByIdRequest({ id })
        );
      }
      value = false;
      notesResp.id = null;
      notesResp.isSuccess = false;
    }
  })

  let isDisabled : boolean = false;
  if(qleNotes['eventStatus'] ==="Initiated"){
    isDisabled = true;
  }
  else if(qleNotes['eventStatus'] ==="Archived"){
    // toast.info("Event cannot be updated in this status");
    isDisabled = true;
  }

  const [state, setState] = React.useState("overview");
  return (
    <>
      {
        state === "overview" ? (
          <Box>
            <Tooltip title={isDisabled ? `Record in ${qleNotes['eventStatus']} status cannot be created/modified` : ""}>  
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
                disabled={isDisabled}
              >
                New Note
              </Button>
              
            </Grid>
            </Tooltip>
            
            <Grid
              container
              className="card-layout"

            >
              <Grid
                item
                xs={12}
                className="card-header"
              >
                <Typography style={{ fontSize: "15px" }}>Note</Typography>

              </Grid>

              <Grid item xs={12} className="card-desc" style={{ justifyContent: "space-evenly" }}>

                 {response.map((item: any, id: number) => {
                  return (
                    <Grid padding={1.5} style={{ display: "flex", justifyContent: "space-between" }} className="card-layout">
                      <DescriptionIcon />
                      <Typography>{item.eventNotes}</Typography>
                      <Typography>{item.createdDate}</Typography>
                    </Grid>

                  )
                })} 

              </Grid>

            </Grid>
          </Box>
        ) 
         : state === "notes" ? (
          <Box>
            <Typography variant="h6">Notes</Typography>

            <hr />
            <TextField
              id="name"
              name="name"
              variant="outlined"
              fullWidth
              style={{ width: "100%" }}
              value={editorData}
              minRows={8}
              onChange={handleEditorData}
              multiline
              required

            />
            <div className={!editorData && isSubmitted ? "error-span show" : "error-span"}>
              {!editorData && isSubmitted ? "Please enter data" : ""}
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
                }}
              >
                Cancel
              </Button>
            </Grid>
          </Box>
        ) : null}
    </>
  );
}

export default QLE_Notes;