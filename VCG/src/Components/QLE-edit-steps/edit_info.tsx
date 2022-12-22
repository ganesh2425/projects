import {
  Grid,
  TextField,
  FormControl,
  Typography,
  Checkbox,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import * as yup from 'yup';
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import moment from "moment";
import FormHelperText from "@mui/material/FormHelperText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEditDetails } from "../../reducers/qles-editReducer/editinfoReducer"
import { fetchEditRequest } from "../../actions/qle-editActions/edit-infoActions";
import { IQleEditForm, Irole } from "../../interfaces/qle-EditinfoType";
import { Form, Formik, FormikProps, validateYupSchema } from "formik";
import { toast } from "react-toastify";
import { getEditByIdDetails } from "../../reducers/qles-editReducer/getEditByIdReducer"
import { fetchGetEditByIdRequest } from "../../actions/qle-editActions/getEditByIdActions";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { format } from "path";
import { history } from "../../config/history";
import { fetchEventStatusRequest } from "../../actions/qleActions/getEventStatusActions";
import { getEventStatusDetails } from "../../reducers/qleReducer/eventStatusReducer";

const Edit_QLE_Info =(props: any): JSX.Element=> {
  let params = useParams();
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = React.useState('');
  const [eventDateSelected, seteventDateSelected] = React.useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
  const [status, setStatus] = React.useState('');
  const [selectedPrev, setSelectedPrev] = useState<Irole[]>([]);
  const [eventTypeSelected2, setEventTypeSelected2] = React.useState('');
  const [eventTypeSelectedname, setEventTypeSelectedname] = React.useState('');
  const [events, setEvents] = React.useState(0);
  const [subEvents, setSubEvents] = useState(['']);
  const navigate = useNavigate();
  const [isInfoShown, setInfoShown] = useState(false);

  const getEventsRes = useSelector(getEditByIdDetails);

  let isDisabled : boolean = false;
  if(status==="Initiated"){
    isDisabled = true;
  }
  else if(status==="Archived"){
    // toast.info("Event cannot be updated in this status");
    isDisabled = true;
  }
  
  const getEditinfoById = () => {
    let id: any = params.id
    dispatch(
      fetchGetEditByIdRequest({ id })
    );
  };
    
  const [initialValues, setInitialValues] = useState<IQleEditForm>({
    id: 0,
    firstName: '',
    middleName: '',
    lastName: '',
    SSN: '',
    eventTypeId: '',
    eventSubTypeId: '',
    event1: '',
    event2: '',
    email: '',
    number: '',
    dob: '',
    status: '',
    uniqueLink: '',
    evntDate:'',
  });
  
  useEffect(() => {
    let id: any =params.id;
    if (params.id ) {
    
      if (getEventsRes && parseInt(getEventsRes['eventId']) > 0) {
       
        setInitialValues({
          id: getEventsRes['eventId'],
          firstName: getEventsRes['firstName'],
          middleName: getEventsRes['middleName'],
          lastName: getEventsRes['lastName'],
          SSN: getEventsRes['ssn'],
          eventTypeId: getEventsRes['eventTypeId'],
          eventSubTypeId: getEventsRes['eventSubTypeId'],
          event1: getEventsRes['eventType'],
          event2: getEventsRes['eventSubType'],
          email: getEventsRes['email'],
          number: getEventsRes['phoneNo'],
          dob: getEventsRes['dob'],
          status: getEventsRes['eventStatus'],
          uniqueLink: getEventsRes['uniqueLink'],
          evntDate: getEventsRes['evntDate'],
        });
        setSelectedValue(getEventsRes['eventTypeId']);
        setEventTypeSelected2(getEventsRes['eventSubTypeId']);
        setStatus(getEventsRes['eventStatus']);
        setEventTypeSelectedname(getEventsRes['eventSubType']);
      } else { }
    }
    else {
      setInitialValues({
        id: 0,
        firstName: '',
        middleName: '',
        lastName: '',
        SSN: '',
        eventTypeId: '',
        eventSubTypeId: '',
        event1: '',
        event2: '',
        email: '',
        number: '',
        dob: '',
        status: '',
        uniqueLink: '',
        evntDate:'',
      });
    }
  }, []);

  let editinfoRes: any = useSelector(getEditDetails);
  useEffect(() => {
    if (editinfoRes && editinfoRes.isSuccess == false) {
      toast.error(editinfoRes.errorMessages[0]);
      editinfoRes.isSuccess = null;
    }
    else if (editinfoRes && editinfoRes.eventId > 0 && !editinfoRes.pending) {
    // if (editinfoRes && editinfoRes.eventId > 0 && !editinfoRes.pending) {
      toast.success(`Event Edited Successfully`);
      setTimeout(() => {
         navigate('/qle');
      }, 100);
      // editinfoRes = null;
      editinfoRes.eventId = null;
    }
  }, [editinfoRes]);

  const todayDate = () => {
    let date = new Date();
    let day = String(date.getDate());
    let month = String(date.getMonth() + 1);
    let year = String(date.getFullYear());
    let todaydate = year + '-' + (month.length == 1 ? + '-0' + month : "-" + month) + (day.length == 1 ? '-0' + day : day);
    
    return todaydate;
  }

  var QLEStatus:any = [];

  const QLEStatusTemp = useSelector(getEventStatusDetails);
  console.log("QLEStatusTemp",QLEStatusTemp.qleEventStatusList);
  if(QLEStatusTemp && QLEStatusTemp.qleEventStatusList){
  let QLEStatusDetails :any = [];
  if(status == "PendingReview"){
    QLEStatusDetails = QLEStatusTemp.qleEventStatusList
    .slice(1,QLEStatusTemp.qleEventStatusList.length-2);
  }else if(status == "Archived"){
    QLEStatusDetails = ["Archived"]
  }else if(status == "Initiated"){
    QLEStatusDetails = ["Initiated"]
  }else{
    QLEStatusDetails = QLEStatusTemp.qleEventStatusList
    .slice(2,QLEStatusTemp.qleEventStatusList.length-2);
  }

  var QLEStatus:any = [];
  for (let i in  QLEStatusDetails) {
    if(QLEStatusDetails[i] === "Approved/Pending"){
      QLEStatus.push({value:QLEStatusDetails[i].replace(" ","").replace("/","Or"),option:QLEStatusDetails[i]});
    }else{
      QLEStatus.push({value:QLEStatusDetails[i].replace(" ",""),option:QLEStatusDetails[i]});
    }
  }
  }


  const validationSchema = yup.object({
    firstName: yup
      .string()
      .required("* First Name is required"),
    lastName: yup
      .string()
      .required("* Last Name is required"),
    middleName: yup
      .string(),
    SSN: yup
      .string()
      .min(9, "SSN must be 9 characters ")
      .max(12, "SSN must be 9 characters ")
      .required("* SSN is required"),
    evntDate: yup
      .string()
      .required("* this Field is required"),
      status: yup.string().required(" Status is required"),
  });

  const handleStatusChange = (event: any) => {
    setStatus(event);
  };
  
  return (
    <>
      <Formik
      disabled
        initialValues={initialValues}

        onSubmit={(values: IQleEditForm) => {
          setSubmitted(true);
          values.eventTypeId = selectedValue;
          values.eventSubTypeId = eventTypeSelected2;
          values.status = status;
          values.evntDate = moment(new Date(values.evntDate)).format("MM/DD/YYYY");
          const tempData: IQleEditForm = {
            "id": values.id,
            "firstName": values.firstName,
            "middleName": values.middleName,
            "lastName": values.lastName,
            "SSN": values.SSN,
            "event1": values.event1,
            "event2": values.event2,
            "email": values.email,
            "number": values.number,
            "dob": values.dob,
            "evntDate":values.evntDate,
            "status": values.status,
            "uniqueLink": values.uniqueLink,
            "eventSubTypeId": values.eventSubTypeId,
            "eventTypeId": values.eventTypeId,
          }
          // if ( values.id > 0) {
          dispatch(fetchEditRequest(tempData));
          // }

        }}
       
        validationSchema={validationSchema}
        enableReinitialize
      >{(props: FormikProps<IQleEditForm>) => {
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

          <Box sx={{ flexGrow: 1 }}>
          <Tooltip title={isDisabled ? `Record in ${status} status cannot be created/modified` : ""}>  
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    id="outlined-basic"
                    label="First Name"
                    fullWidth
                    value={values.firstName}
                    name="firstName"
                    onChange={handleChange}
                    error={touched.firstName && Boolean(errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                    disabled={isDisabled}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    id="outlined-basic"
                    label="Middle Name"
                    variant="outlined"
                    fullWidth
                    value={values.middleName}
                    name="middleName"
                    onChange={handleChange}
                    disabled={isDisabled}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    id="outlined-basic"
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    value={values.lastName}
                    name="lastName"
                    onChange={handleChange}
                    error={touched.lastName && Boolean(errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                    disabled={isDisabled}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    id="outlined-basic"
                    label="SSN"
                    variant="outlined"
                    fullWidth
                    value={values.SSN}
                    name="SSN"
                    onChange={handleChange}
                    error={touched.SSN && Boolean(errors.SSN)}
                    helperText={touched.SSN && errors.SSN}
                    disabled={isDisabled}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    id="outlined-basic"
                    label="Email Address"
                    variant="outlined"
                    value={values.email}
                    fullWidth
                    InputProps={{
                      style: { borderRadius: 0 },
                    }}
                    disabled
                    onChange={handleChange}
                    className="disable-styling"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    id="outlined-basic"
                    label="Number"
                    variant="outlined"
                    value={values.number}
                    fullWidth
                    disabled
                    onChange={handleChange}
                    className="disable-styling"
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    id="outlined-basic"
                    label="Event Type"
                    variant="outlined"
                    value={values.event1}
                    fullWidth
                    disabled
                    onChange={handleChange}
                    className="disable-styling"
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    id="outlined-basic"
                    label="Event SubType"
                    variant="outlined"
                    value={values.event2}
                    fullWidth
                    disabled
                    onChange={handleChange}
                    className="disable-styling"
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                          <TextField
                            defaultValue={todayDate()}
                            id="outlined-basic"
                    label="Event date"
                    variant="outlined"
                            type="date"
                            name="evntDate"
                            fullWidth
                            value={values.evntDate ?  moment(values.evntDate ).format("YYYY-MM-DD"): ""}
                            onChange={handleChange}
                            inputProps={{
                              min: moment().subtract(60, 'days').format("YYYY-MM-DD"),
                              max: moment().add(5, 'days').format("YYYY-MM-DD") 
                           }}
                           error={touched.evntDate && Boolean(errors.evntDate)}
                    helperText={touched.evntDate && errors.evntDate}
                    disabled={isDisabled}
                          />

                        </Grid>
                        
                <Grid item xs={12} md={4}>
              
                  <FormControl sx={{ width: "100%" }}>
                  <InputLabel id="demo-simple-select-helper-label">
                      Status
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      label="Status"
                      // onChange={handleStatusChange}
                      fullWidth
                      value={status} 
                      name="status"
                      disabled={isDisabled} 
                    >
                      {QLEStatus.map((ele) => (
                        <MenuItem value={ele.value} onClick={() => handleStatusChange(ele.value)}>{ele.option}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  
                 
                </Grid>

                <Grid item xs={12} md={4}>
                {/* <InputLabel id="demo-simple-select-helper-label">
                      Unique Link
                    </InputLabel> */}
                  <TextField
                    id="outlined-basic"
                    label="Unique link"
                    variant="outlined"
                    fullWidth
                    value={values.uniqueLink}
                    disabled
                    name="uniqueLink"
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>

              <Grid
                item
                sx={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  margin: "10px 0px"
                }}
              >
                <Button
                    variant="contained"
                    className="save-btn-role"
                    sx={{ margin: "3px 5px" }}
                    type="submit"
                    disabled={isDisabled}
                  >
                    Save Changes
                  </Button>
              </Grid>
            </Form>
            </Tooltip>
          </Box>
        )
      }}
      </Formik>

    </>
  );
};

export default Edit_QLE_Info;
