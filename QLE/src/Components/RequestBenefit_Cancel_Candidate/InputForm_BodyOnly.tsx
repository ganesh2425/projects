import { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Typography,
  FormControl,
  Button,
} from "@mui/material";
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';

const InputFormBody = (params: any) => {

  const [showForm, setShowForm] = useState(true);

  const [inputForm, setInputForm] = useState({
    //title: params.title == "Spouse's Child(ren)" ? params.title + "_" + params.cIndex : params.title,
    title: "",
    candidateName: "",
  });

  const [isChanged, setIsChanged] = useState(false);

  // if (params.dependentData.length > 0 && params.action == "edit"
  //   && isChanged == false) {

  if ((params.child.length > 0 || params.dpChild.length > 0 || params.spouse || params.employee || params.domesticPartner) && params.action == "edit"
    && isChanged == false) {

    let dependentData: any = [];

    if (params.employee) {
      let dependent = {
        title: "",
        candidateName: ""
      }
      dependent.title = "Employee";
      dependent.candidateName = params.employee;
      dependentData.push(dependent);
    }

    if (params.spouse) {
      let dependent = {
        title: "",
        candidateName: ""
      }
      dependent.title = "Spouse";
      dependent.candidateName = params.spouse;
      dependentData.push(dependent);
    }

    if (params.domesticPartner) {
      let dependent = {
        title: "",
        candidateName: ""
      }
      dependent.title = "Domestic Partner";
      dependent.candidateName = params.domesticPartner;
      dependentData.push(dependent);
    }

    if (params.child.length > 0) {
      params.child.forEach((element: any, index: any) => {
        let dependent = {
          title: "",
          candidateName: ""
        }
        dependent.title = "Spouse's Child(ren)_" + index;
        dependent.candidateName = element;
        dependentData.push(dependent);
      });
    }


    if (params.dpChild.length > 0) {
      params.dpChild.forEach((element: any, index: any) => {
        let dependent = {
          title: "",
          candidateName: ""
        }
        dependent.title = "Domestic Partner's Child(ren)_" + index;
        dependent.candidateName = element;
        dependentData.push(dependent);
      });
    }

    // params
    // let dt = "";
    // if (params.title == "Spouse")
    //   dt = "0";
    // else if (params.title.includes("Spouse's Child(ren)")) {
    //   if (params.title.includes("Domestic")) {
    //     dt = "3";
    //   }
    //   else {
    //     dt = "1";
    //   }
    // }
    // else if (params.title == "Domestic Partner")
    //   dt = "2";

    let filteredArr = dependentData.filter((x: any) => x.title == params.title);

    if (filteredArr && filteredArr.length > 0 && params.title.includes("Child(ren)")) {
      //let idx = parseInt(params.title.substring(params.title.length - 1));
      inputForm.candidateName = filteredArr[0].candidateName;
      inputForm.title = filteredArr[0].title;
      if (params.formData.findIndex((x: any) => x.title == params.title) == -1) {
        params.formData.push(inputForm);
      }
    }
    else if (filteredArr) {
      if (filteredArr.length > 0) {
        inputForm.candidateName = filteredArr[0].candidateName;
        inputForm.title = filteredArr[0].title;
        if (params.formData.findIndex((x: any) => x.title == params.title) == -1) {
          params.formData.push(inputForm);
        }
      }
    }
  }

  const handleChange = (e: any) => {

    setIsChanged(true);

    const { name, value } = e.target;
    setInputForm((prevState: any) => ({
      ...prevState,
      [name]: value,
      title: params.title == "Spouse's Child(ren)" ? params.title + "_" + params.cIndex : params.title
    }));

    if (params.formData.length > 0) {
      if (params.formData.findIndex((x: any) => x.title == inputForm.title) == -1) {
        if (params.title == "Spouse's Child(ren)" || params.title == "Domestic Partner's Child(ren)") {
          inputForm.title = params.title + "_" + params.cIndex;
        }
        params.formData.push(inputForm);
      }
      else {
        let idx = params.formData.findIndex((x: any) => x.title == inputForm.title);
        params.formData[idx].title = inputForm.title;
        params.formData[idx].candidateName = inputForm.candidateName;
      }
    }
    else {
      if (params.title == "Spouse's Child(ren)" || params.title == "Domestic Partner's Child(ren)") {
        inputForm.title = params.title + "_" + params.cIndex;
      }
      params.formData.push(inputForm);
    }
    console.log(params.formData);
    //handleChange(e);
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
        <Grid container xs={12} spacing={1} className="input-cont Name " style={{}}>
          <Grid item xs={12} md={1.33} >
            <Typography className="label-sx">Name</Typography>
            <div
              className={
                params.isSubmitted && params.enabled && !inputForm.candidateName ? "error-span cert d1" : "error-span"
              }
            >
              {params.isSubmitted && !inputForm.candidateName ? "Enter Name" : ""}
            </div>
            <TextField
              style={{ width: "210px" }}
              id="outlined-basic"
              label="Name"
              variant="outlined"
              value={inputForm.candidateName}
              //onChange={handleChange}
              onChange={event => {
                inputForm.candidateName = event.target.value;
                handleChange(event);
              }}
              name="candidateName"
              fullWidth
              disabled={params.enabled ? false : true}
            />
          </Grid>

          {(params.title === "Spouse's Child(ren)" + "_" + params.cIndex ||
            params.title === "Domestic Partner's Child(ren)" + "_" + params.cIndex) &&
            params.showDelete ? (
            <Grid
              item xs={12} md={1.33}
              onClick={() => {
                handleDelete(params.cIndex, params.title);
              }}
              style={{ textAlign: "center", marginLeft: "177px" }}
            >
              <DeleteForeverSharpIcon sx={{ padding: "12px 4px", color: "red", cursor: "pointer" }} />
            </Grid>
          ) : null}

        </Grid>
      ) : null}
    </>
  );
};

export default InputFormBody;
