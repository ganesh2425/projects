import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  TextField,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import TextEditor from "../TextEditor";

import { fetchSentStatusMailRequest } from "../../actions/qle-editActions/sentStatusMailAction";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { ISentEmailForm } from "../../interfaces/sendStatusEmailTypes";
import { getSentStatusMailDetails } from "../../reducers/qles-editReducer/sentStatusMailReducer";
import { Form, Formik, FormikProps } from "formik";
import * as yup from 'yup';
import { fetchEventStatusRequest } from "../../actions/qleActions/getEventStatusActions";
import { getEventStatusDetails } from "../../reducers/qleReducer/eventStatusReducer";
import { getEditByIdDetails } from "../../reducers/qles-editReducer/getEditByIdReducer"


const SendStatusEmail = (props: any): JSX.Element  => {

  let params = useParams();
  const dispatch = useDispatch();

  const [status, setStatus] = React.useState('');
  const [isSubmitted, setSubmitted] = useState(false);
  const [contentData, setContentData] = React.useState('');


  const handleContentData = (incomingData: any) => {
    setContentData(incomingData);
  }

  const validationSchema = yup.object({
    emailSubject: yup
      .string()
      .required("* Subject is required"),
    
  });

  const [initialValues, setInitialValues] = useState<ISentEmailForm>({

    eventId: '',
    eventStatus: '',
    emailSubject: '',
    emailContent: ''
  })

  let mailRes: any = useSelector(getSentStatusMailDetails);
  useEffect(() => {
    if(params.id){
    let value=false;
    value=mailRes['isSuccess'];
    if (mailRes && mailRes.isSuccess == false) {
      toast.error(mailRes.errorMessages[0]);
      mailRes.isSuccess = null;
    }else if (mailRes && value) {
      toast.success(` Status Email Sent Successfully`);
      mailRes.id = null;
      mailRes.isSuccess=false;
      setTimeout(() => {
        //window.location.assign("/users");

      }, 1500);
    }
  }
  }, [mailRes]);

  const handleStatusChange = (event: any) => {
    setStatus(event);
  };

  const getEventsRes = useSelector(getEditByIdDetails);
  const QLEStatusTemp = useSelector(getEventStatusDetails);
  console.log("QLEStatusTemp",QLEStatusTemp.qleEventStatusList);
  if(QLEStatusTemp && QLEStatusTemp.qleEventStatusList){
  let QLEStatusDetails :any = [];
  if(getEventsRes && getEventsRes['eventStatus'] == "PendingReview"){
    QLEStatusDetails = QLEStatusTemp.qleEventStatusList
    .slice(1,QLEStatusTemp.qleEventStatusList.length-2);
  }else if(getEventsRes && getEventsRes['eventStatus'] == "Initiated"){
    QLEStatusDetails = ["Initiated"]
  }else{
    QLEStatusDetails = QLEStatusTemp.qleEventStatusList
    .slice(2,QLEStatusTemp.qleEventStatusList.length-2);
  }
  var QLEStatus:any = [];
  for (let i in  QLEStatusDetails) {
    QLEStatus.push({value:QLEStatusDetails[i].replace(" ","").replace("/","Or"),option:QLEStatusDetails[i]});
  }
  }


  return (
    <Formik
      initialValues={initialValues}

      onSubmit={(values: ISentEmailForm) => {
        setSubmitted(true);
        values.eventStatus=status;
        let eventId: any = params.id;
        values.eventId=eventId;
        values.emailContent=contentData;
        const tempData: ISentEmailForm = {
          "eventStatus": values.eventStatus,
          "emailSubject": values.emailSubject,
          "emailContent": values.emailContent,
          "eventId": values.eventId
        }
        if (eventId) {
          dispatch(fetchSentStatusMailRequest(tempData));
        }
      }}
      validationSchema={validationSchema}
      enableReinitialize

    >{(props: FormikProps<ISentEmailForm>) => {
      const {
        values,
        touched,
        errors,
        handleBlur,
        handleChange,
        isValid,
        dirty,
      } = props;


      return (
        <>
          <Form>
            <Paper sx={{ boxShadow: "none" }}>
              <Grid container sx={{ margin: "20px 0px" }}>
                <Grid item xs={12}>
                  <FormControl sx={{ width: "100%" }}>
                    <InputLabel id="demo-simple-select-helper-label">
                      Please Select Status

                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      label="Please Select Status"
                      fullWidth
                      value={status}
                      name="eventStatus"
                    >
                      <MenuItem value="">Please Select Status</MenuItem>
                      {QLEStatus.map((ele) => (
                        <MenuItem value={ele.value} onClick={() => handleStatusChange(ele.value)} >{ele.option}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

             
              <br></br>
              <Grid item xs={12} md={12}>
                <TextField
                  id="outlined-basic"
                  label="Subject"
                  variant="outlined"
                  fullWidth
                  name="emailSubject"
                  value={ values.emailSubject}
                  onChange={handleChange}
                  error={touched.emailSubject && Boolean(errors.emailSubject)}
                  helperText={touched.emailSubject && errors.emailSubject}
                />
                 
              </Grid>
              <br></br>
              <TextEditor data={contentData} handleEditorData={handleContentData} />
              <div className={!contentData && isSubmitted ? "error-span show" : "error-span"}>
                {!contentData && isSubmitted ? "Please enter data" : ""}
              </div>
              <Grid
                item
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
                  type="submit"
                >
                  Send
                </Button>
              </Grid>
            </Paper>
          </Form>
        </>
      )
    }}
    </Formik>
  );
};
export default SendStatusEmail;
