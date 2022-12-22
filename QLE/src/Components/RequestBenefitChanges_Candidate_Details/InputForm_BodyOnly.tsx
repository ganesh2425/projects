import { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Typography,
  FormControl,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import ListItemText from "@mui/material/ListItemText";
import OutlinedInput from "@mui/material/OutlinedInput";
import Checkbox from "@mui/material/Checkbox";
import { ConstructionOutlined } from "@mui/icons-material";
import moment from "moment";
import InputMask from 'react-input-mask';
import DatePicker from 'react-date-picker';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Medical",
  "Dental",
  "Vision"
];

export type formContent = {
  title: string,
  firstName: string,
  lastName: string,
  middleName: string,
  SSN: string,
  dob: string,
  gender: string,
  eligibleForRanstad: string,
  eligibleForMedicare: string,
  hasAccessToCoverage: string,
  childTypeIn: string;
  enrollIn: any[],
}

const InputFormBody = (params: any) => {
  console.log("params.dependentData")
  console.log(params.dependentData)
  const [showForm, setShowForm] = useState(true);
  //console.log("selectedCoverages")
  const [enrollName, setEnrollName] = useState<string[]>([]);
  const showAll =
    params.title !== "Child(ren)" + "_" + params.cIndex &&
    params.title !== "Domestic Partner's Child(ren)" + "_" + params.cIndex;
  // const [inputForm, setInputForm] = useState({
  //   title: params.title == "Child(ren)" ? params.title + "_" + params.cIndex : params.title,
  //   firstName: "",
  //   lastName: "",
  //   middleName: "",
  //   SSN: "",
  //   dob: "",
  //   gender: "",
  //   eligibleForRanstad: "",
  //   eligibleForMedicare: "",
  //   hasAccessToCoverage: "",
  //   enrollIn: [],
  //   childTypeIn: ""
  // });

  const [datePickerValue, setDatePickerValue] = useState(new Date());

  const [inputForm, setInputForm] = useState<formContent>({
    // title: params.title == "Child(ren)" ? params.title + "_" + params.cIndex : params.title,
    title: params.title,
    firstName: "",
    lastName: "",
    middleName: "",
    SSN: "",
    // dob: moment(datePickerValue).format("MM/DD/YYYY"),
    dob:"",
    gender: "",
    eligibleForRanstad: "",
    eligibleForMedicare: "",
    hasAccessToCoverage: "",
    enrollIn: [],
    childTypeIn: ""
  });

  const [isChanged, setIsChanged] = useState(false);

  if (params.dependentData.length > 0 && params.action == "edit"
    && isChanged == false && !params.isTierChanged) {

    // params
    let dt = "";
    if (params.title == "Spouse")
      dt = "0";
    else if (params.title.includes("Child(ren)")) {
      if (params.title.includes("Domestic")) {
        dt = "3";
      }
      else {
        dt = "1";
      }
    }
    else if (params.title == "Domestic Partner")
      dt = "2";

    let filteredArr = params.dependentData.filter((x: any) => x.dependentType == dt);

    if (filteredArr && filteredArr.length > 0
      && params.title.includes("Child(ren)")) {

      let idx = parseInt(params.title.substring(params.title.length - 1));

      if (idx < filteredArr.length) {
        inputForm.firstName = filteredArr[idx].firstName;
        inputForm.lastName = filteredArr[idx].lastName;
        inputForm.middleName = filteredArr[idx].middleName;
        inputForm.SSN = filteredArr[idx].ssn;
        //inputForm.dob = moment(filteredArr[idx].dob).format("YYYY-MM-DD");
        inputForm.dob = moment(new Date(filteredArr[idx].dob)).format("MM/DD/YYYY")
        //setDatePickerValue(new Date());
        inputForm.gender = filteredArr[idx].gender;
        inputForm.eligibleForMedicare = filteredArr[idx].elgForMedCare;
        inputForm.eligibleForRanstad = filteredArr[idx].elgForRanstadBenefits;
        inputForm.hasAccessToCoverage = filteredArr[idx].coverageThroughEmp;
        inputForm.childTypeIn = filteredArr[idx].childTypeIn;
        inputForm.enrollIn = [];
        if (filteredArr[idx].enrolledIn == "0") {
          if (enrollName.findIndex((x: any) => x == "Medical") == -1) {
            enrollName.push("Medical");
          }
          if (enrollName.findIndex((x: any) => x == "Dental") == -1) {
            enrollName.push("Dental");
          }
          if (enrollName.findIndex((x: any) => x == "Vision") == -1) {
            enrollName.push("Vision");
          }
        }
        else if (filteredArr[idx].enrolledIn == "1") {
          if (enrollName.findIndex((x: any) => x == "Medical") == -1) {
            enrollName.push("Medical");
          }
        }
        else if (filteredArr[idx].enrolledIn == "2") {
          if (enrollName.findIndex((x: any) => x == "Dental") == -1) {
            enrollName.push("Dental");
          }
        }
        else if (filteredArr[idx].enrolledIn == "3") {
          if (enrollName.findIndex((x: any) => x == "Vision") == -1) {
            enrollName.push("Vision");
          }
        }
        else if (filteredArr[idx].enrolledIn == "4") {
          if (enrollName.findIndex((x: any) => x == "Medical") == -1) {
            enrollName.push("Medical");
          }
          if (enrollName.findIndex((x: any) => x == "Dental") == -1) {
            enrollName.push("Dental");
          }
        }
        else if (filteredArr[idx].enrolledIn == "5") {
          if (enrollName.findIndex((x: any) => x == "Medical") == -1) {
            enrollName.push("Medical");
          }
          if (enrollName.findIndex((x: any) => x == "Vision") == -1) {
            enrollName.push("Vision");
          }
        }
        else if (filteredArr[idx].enrolledIn == "6") {
          if (enrollName.findIndex((x: any) => x == "Dental") == -1) {
            enrollName.push("Dental");
          }
          if (enrollName.findIndex((x: any) => x == "Vision") == -1) {
            enrollName.push("Vision");
          }
        }
        inputForm.enrollIn = enrollName;

        if (params.formData.findIndex((x: any) => x.title == params.title) == -1) {
          params.formData.push(inputForm);
        }
      }
    }

    else if (filteredArr) {
      if (filteredArr.length > 0) {
        inputForm.firstName = filteredArr[0].firstName;
        inputForm.lastName = filteredArr[0].lastName;
        inputForm.middleName = filteredArr[0].middleName;
        inputForm.SSN = filteredArr[0].ssn;
        //inputForm.dob = moment(filteredArr[0].dob).format("YYYY-MM-DD");
        inputForm.dob = moment(new Date(filteredArr[0].dob)).format("MM/DD/YYYY")
        //setDatePickerValue(moment(new Date (filteredArr[0].dob),"MM-DD-YYYY").toDate());
        inputForm.gender = filteredArr[0].gender;
        inputForm.eligibleForMedicare = filteredArr[0].elgForMedCare;
        inputForm.eligibleForRanstad = filteredArr[0].elgForRanstadBenefits;
        inputForm.hasAccessToCoverage = filteredArr[0].coverageThroughEmp;
        inputForm.childTypeIn = filteredArr[0].childTypeIn;
        inputForm.enrollIn = [];
        if (filteredArr[0].enrolledIn == "0") {
          if (enrollName.findIndex((x: any) => x == "Medical") == -1) {
            enrollName.push("Medical");
          }
          if (enrollName.findIndex((x: any) => x == "Dental") == -1) {
            enrollName.push("Dental");
          }
          if (enrollName.findIndex((x: any) => x == "Vision") == -1) {
            enrollName.push("Vision");
          }
        }
        else if (filteredArr[0].enrolledIn == "1") {
          if (enrollName.findIndex((x: any) => x == "Medical") == -1) {
            enrollName.push("Medical");
          }
        }
        else if (filteredArr[0].enrolledIn == "2") {
          if (enrollName.findIndex((x: any) => x == "Dental") == -1) {
            enrollName.push("Dental");
          }
        }
        else if (filteredArr[0].enrolledIn == "3") {
          if (enrollName.findIndex((x: any) => x == "Vision") == -1) {
            enrollName.push("Vision");
          }
        }
        else if (filteredArr[0].enrolledIn == "4") {
          if (enrollName.findIndex((x: any) => x == "Medical") == -1) {
            enrollName.push("Medical");
          }
          if (enrollName.findIndex((x: any) => x == "Dental") == -1) {
            enrollName.push("Dental");
          }
        }
        else if (filteredArr[0].enrolledIn == "5") {
          if (enrollName.findIndex((x: any) => x == "Medical") == -1) {
            enrollName.push("Medical");
          }
          if (enrollName.findIndex((x: any) => x == "Vision") == -1) {
            enrollName.push("Vision");
          }
        }
        else if (filteredArr[0].enrolledIn == "6") {
          if (enrollName.findIndex((x: any) => x == "Dental") == -1) {
            enrollName.push("Dental");
          }
          if (enrollName.findIndex((x: any) => x == "Vision") == -1) {
            enrollName.push("Vision");
          }
        }
        inputForm.enrollIn = enrollName;
        if (params.formData.findIndex((x: any) => x.title == params.title) == -1) {
          params.formData.push(inputForm);
        }
      }
    }
  }


  const handleEnrollChange = (event: SelectChangeEvent<typeof enrollName>) => {
    const {
      target: { value },
    } = event;
    setEnrollName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    // inputForm.enrollIn = enrollName;
  };

  let formTestData: any = [];

  let clone = params.formData.map((x: any) => { return { ...x } });

  const handleChange = (e: any) => {

    setIsChanged(true);

    // if (e.target.name == 'enrollIn') {
    //   console.log( typeof e.target.value)
    //   e.target.value = enrollName;
    //   setEnrollName(
    //     typeof e.target.value === "string" ? e.target.value.split(",") : e.target.value
    //   );
    // }

    if (e.target) {
      setInputForm({
        ...inputForm,
        [e.target.name]: e.target.value,
      });


      //console.log("new form ", inputForm);
      if (e.target.name == 'enrollIn') {
        if (e.target.value.length > 0) {
          inputForm.enrollIn = [];
          e.target.value.forEach((element: any) => {
            inputForm.enrollIn.push(element);
          });
        }
        else {
          inputForm.enrollIn = [];
        }
      }
    }

    else if (e.getDate() > 0) {
      setDatePickerValue(e);
    }

    if (params.formData.length > 0) {
      if (params.formData.findIndex((x: any) => x.title == inputForm.title) == -1) {
        if (params.title == "Child(ren)" || params.title == "Domestic Partner's Child(ren)") {
          inputForm.title = params.title + "_" + params.cIndex;
        }
        params.formData.push(inputForm);
      }
      else {
        let idx = params.formData.findIndex((x: any) => x.title == inputForm.title);
        params.formData[idx].title = inputForm.title;
        params.formData[idx].firstName = inputForm.firstName;
        params.formData[idx].lastName = inputForm.lastName;
        params.formData[idx].middleName = inputForm.middleName;
        params.formData[idx].SSN = inputForm.SSN;
        params.formData[idx].dob = inputForm.dob;
        params.formData[idx].gender = inputForm.gender;
        params.formData[idx].eligibleForRanstad = inputForm.eligibleForRanstad;
        params.formData[idx].eligibleForMedicare = inputForm.eligibleForMedicare;
        params.formData[idx].hasAccessToCoverage = inputForm.hasAccessToCoverage;
        params.formData[idx].enrollIn = inputForm.enrollIn;
        params.formData[idx].childTypeIn = inputForm.childTypeIn;
      }
    }
    else {
      if (params.title == "Child(ren)" || params.title == "Domestic Partner's Child(ren)") {
        inputForm.title = params.title + "_" + params.cIndex;
      }
      params.formData.push(inputForm);
    }
    console.log(params.formData);
  };

  const handleDelete = (idx: number, titleStr: string) => {
    let ind = params.formData.findIndex((x: any) => x.title == titleStr);
    params.formData.splice(ind, 1);
    setShowForm(false);
    params.setShowDelete(true);
    setIsChanged(true);
  };

  return (
    <>
      {" "}
      {showForm ? (
        <Grid container xs={12} spacing={1} className="input-cont" style={{}}>
          <Grid item xs={12} md={1.2} >
            <Typography className="label-sx">Name</Typography>
            <div
              className={
                params.isSubmitted && !inputForm.firstName ? "error-span cert d1" : "error-span"
              }
            >
              {params.isSubmitted && !inputForm.firstName ? "Enter First Name" : ""}
            </div>
            <TextField
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              // sx={{ margin: "0px 5px" }}
              value={inputForm.firstName}
              //onChange={handleChange}
              onChange={event => {
                inputForm.firstName = event.target.value;
                handleChange(event);
              }}
              name="firstName"
              fullWidth
            />

            {/* <div
              className={
                params.isSubmitted && !inputForm.firstName ? "error-span child" : "error-span"
              }
            >
              {params.isSubmitted && !inputForm.firstName ? "Enter First Name" : ""}
            </div> */}
          </Grid>

          <Grid item xs={12} md={1.2}>
            <Typography className="label-sx">Middle Name</Typography>
            <TextField
              id="outlined-basic"
              label="Middle Name"
              variant="outlined"
              value={inputForm.middleName}
              //onChange={handleChange}
              onChange={event => {
                inputForm.middleName = event.target.value;
                handleChange(event);
              }}
              name="middleName"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={1.2}>
            <Typography className="label-sx">Last Name</Typography>
            <div
              className={
                params.isSubmitted && !inputForm.lastName ? "error-span cert d1" : "error-span"
              }
            >
              {params.isSubmitted && !inputForm.lastName ? "Enter Last Name" : ""}
            </div>
            <TextField
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              // sx={{ margin: "0px 5px" }}
              value={inputForm.lastName}
              //onChange={handleChange}
              onChange={event => {
                inputForm.lastName = event.target.value;
                handleChange(event);
              }}
              name="lastName"
              fullWidth
            />
            {/* <div
              className={
                params.isSubmitted && !inputForm.lastName ? "error-span child" : "error-span"
              }
            >
              {params.isSubmitted && !inputForm.lastName ? "Enter Last Name" : ""}
            </div> */}
          </Grid>

          <Grid item xs={12} md={1.87}>
            <Typography className="label-sx">DOB</Typography>
            <div
              className={
                params.isSubmitted && !inputForm.dob ? "error-span cert d1" : "error-span"
              }
            >
              {params.isSubmitted && !inputForm.dob ? "Enter DOB" : ""}
            </div>


            {/* <TextField
              // id="date"
              // label="Birthday"
              type="date"
              fullWidth
              // defaultValue={todayDate()}
              value={inputForm.dob}
              //onChange={handleChange}
              onChange={event => {
                inputForm.dob = event.target.value;
                handleChange(event);
              }}
              name="dob"

            /> */}

            <DatePicker
            className="date_picker2"
              onChange={(event: any) => {
                setDatePickerValue(event);
                inputForm.dob = event ? moment(new Date(event)).format("MM/DD/YYYY") : ""
                handleChange(event);
              }}
              //onChange={setDatePickerValue}
              format="MM-dd-y"
              name="dob"
              value={inputForm.dob ? new Date(inputForm.dob) : null}
            />

          </Grid>

          <Grid item xs={12} md={1.1}>
            <Typography className="label-sx">Gender</Typography>
            <div
              className={
                params.isSubmitted && !inputForm.gender ? "error-span cert d1" : "error-span"
              }
            >
              {params.isSubmitted && !inputForm.gender ? "Select Gender" : ""}
            </div>
            <FormControl sx={{ minWidth: "100%" }}>

              <InputLabel id="demo-simple-select-helper-label">
                Gender
              </InputLabel>

              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label="Gender"

                // sx={{ margin: "0px 5px" }}
                value={inputForm.gender}
                //onChange={handleChange}
                onChange={event => {
                  inputForm.gender = event.target.value;
                  handleChange(event);
                }}
                name="gender"

              >

                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
              {/* <div
                className={
                  params.isSubmitted && !inputForm.gender ? "error-span child" : "error-span"
                }
              >
                {params.isSubmitted && !inputForm.gender ? "Select Gender" : ""}
              </div> */}
            </FormControl>
          </Grid>

          <Grid item xs={12} md={1.0}>
            <Typography className="label-sx">SSN</Typography>
            <div
              className={
                params.isSubmitted && !inputForm.SSN 
                ? "error-span cert d1" 
                :  (params.isSubmitted && inputForm.SSN 
                  && (/^(?!000|666)[0-8][0-9]{2}-(?!00)[0-9]{2}-(?!0000)[0-9]{4}$/.test(inputForm.SSN) == false))
                ?  "error-span cert d1" 
                :"error-span"
              }
            >
              { params.isSubmitted && !inputForm.SSN 
                ? "Enter SSN" 
                :  (params.isSubmitted && inputForm.SSN 
                  && (/^(?!000|666)[0-8][0-9]{2}-(?!00)[0-9]{2}-(?!0000)[0-9]{4}$/.test(inputForm.SSN ) == false))
                ?  "Invalid SSN" 
                :""}
            </div>
            <InputMask
              mask="999-99-9999"
              type="number"
              placeholder="Enter SSN"
              value={inputForm.SSN}
              disabled={false}
              //onChange={handleChange}
              onChange={event => {
                inputForm.SSN = event.target.value;
                handleChange(event);
              }}
            >
              {() => (
                <TextField
                  id="outlined-basic"
                  label="SSN"
                  //value={inputForm.SSN}
                  //onChange={handleChange}
                  name="SSN"
                  fullWidth
                />
              )}
            </InputMask>
            {/* <div
              className={
                params.isSubmitted && !inputForm.SSN ? "error-span child" : "error-span"
              }
            >
              {params.isSubmitted && !inputForm.SSN ? "Enter SSN" : ""}
            </div> */}
          </Grid>


          <Grid item xs={12} md={1.0}>
            <Typography className="label-sx">Eligible For Medicare</Typography>
            <FormControl sx={{ width: "100%" }}>

              <InputLabel id="demo-simple-select-helper-label">
                Select
              </InputLabel>
              <Select
                fullWidth
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label="Select"
                autoWidth
                value={inputForm.eligibleForMedicare}
                //onChange={handleChange}
                onChange={event => {
                  inputForm.eligibleForMedicare = event.target.value;
                  handleChange(event);
                }}
                name="eligibleForMedicare"
              //  sx={{margin: "0px 5px"}}
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>
          </Grid>


          {/* {showAll ? ( */}
          <Grid item xs={12} md={1.0}>
            <Typography className="label-sx">Eligible For Randstad Benefits</Typography>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="demo-simple-select-helper-label">
                Select
              </InputLabel>
              <Select
                fullWidth
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label="Select"
                autoWidth
                // sx={{ margin: "0px 5px" }}
                value={inputForm.eligibleForRanstad}
                //onChange={handleChange}
                onChange={event => {
                  inputForm.eligibleForRanstad = event.target.value;
                  handleChange(event);
                }}
                name="eligibleForRanstad"
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {/* ) : null} */}

          {showAll ? (
            <Grid item xs={12} md={1.0}>
              <Typography className="label-sx">Has access to coverage through his/her employer?</Typography>
              <FormControl sx={{ minWidth: "100%" }}>
                <InputLabel id="demo-simple-select-helper-label">
                  Select
                </InputLabel>
                <Select
                  fullWidth
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  label="Select"
                  autoWidth
                  // sx={{ margin: "0px 5px" }}
                  value={inputForm.hasAccessToCoverage}
                  //onChange={handleChange}
                  onChange={event => {
                    inputForm.hasAccessToCoverage = event.target.value;
                    handleChange(event);
                  }}
                  name="hasAccessToCoverage"
                >
                  <MenuItem value="">Select</MenuItem>
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
              </FormControl>

            </Grid>
          ) : null}

          {/* {!showAll ?  */}

          <Grid item xs={12} md={1.0} >
          <div
                className={
                  params.isSubmitted && (!enrollName || enrollName.length == 0) ? "error-span cert d1" : "error-span"
                }
              >
                {params.isSubmitted && (!enrollName || enrollName.length == 0) ? "Select atleast one option to enroll in" : ""}
              </div>
            <FormControl sx={{ width: "100px" }}>
              <InputLabel id="demo-multiple-checkbox-label">Select</InputLabel>
              <Select
                fullWidth
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                label="select"
                multiple
                value={enrollName}
                //onChange={handleChange}
                onChange={event => {
                  setEnrollName(
                    typeof event.target.value === "string" ? event.target.value.split(",") : event.target.value
                  );
                  handleChange(event);
                }}
                // onChange={() => {
                //   handleEnrollChange;
                //   //handleChange;
                //   // setShowForm(false);
                //   // params.setShowDelete(true);
                // }}
                // input={<OutlinedInput label="Enroll In" />}
                name="enrollIn"
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {names.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={enrollName.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {params.title === "Child(ren)" + "_" + params.cIndex ? (
            <Grid item xs={12} md={1.0}>
              <Typography className="label-sx">Legal Dependent/Step Child?</Typography>
              <FormControl sx={{ minWidth: "100%" }}>
                <InputLabel id="demo-simple-select-helper-label">
                  Select
                </InputLabel>
                <Select
                  fullWidth
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  label="Select"
                  autoWidth
                  // sx={{ margin: "0px 5px" }}
                  value={inputForm.childTypeIn}
                  //onChange={handleChange}
                  onChange={event => {
                    inputForm.childTypeIn = event.target.value;
                    handleChange(event);
                  }}
                  name="childTypeIn"
                >
                  <MenuItem value="">Select</MenuItem>
                  <MenuItem value="1">Legal Dependent</MenuItem>
                  <MenuItem value="2">Step Child</MenuItem>
                </Select>
              </FormControl>

            </Grid>
          ) : null}

          <Grid>
            {(params.title === "Child(ren)" + "_" + params.cIndex ||
              params.title === "Domestic Partner's Child(ren)" + "_" + params.cIndex) &&
              params.showDelete ? (
              <Grid
                item xs={12} md={1.0}
                sx={{ position: "relative", bottom: "11px", left: "14px" }}
                onClick={() => {
                  handleDelete(params.cIndex, params.title);
                  // setShowForm(false);
                  // params.setShowDelete(true);
                }}
                style={{ textAlign: "center" }}
              >

                <DeleteForeverSharpIcon sx={{ color: "red", cursor: "pointer" }} />
                {/* <Typography>Delete this form</Typography> */}
              </Grid>
            ) : null}
          </Grid>
          {/* : null} */}


          {/* <Button onClick={handleSubmit}>Submit</Button> */}
        </Grid>
      ) : null}
    </>
  );
};

export default InputFormBody;
