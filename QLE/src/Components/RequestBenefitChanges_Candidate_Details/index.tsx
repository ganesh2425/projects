//import { useState } from "react";
import React, { Fragment, useContext, useEffect, useState } from "react";
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
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import "./style.css";
import InputForm from "./InputForm";
import InputFormBody from "./InputForm_BodyOnly";
import InputHeader from "./InputHeader";
import { closestIndexTo } from "date-fns";

const Candidate_form = (params: any) => {
  const [showDelete, setShowDelete] = useState(true);
  let arr: any = [1];
  //const [children, setChildren] = useState(params.action == "edit" ? params.childrenData : arr);
  const [children, setChildren] = useState(params.childrenData);
  //console.log(children);
  //const [children, setChildren] = useState(params.action == "edit" ? params.childrenData : [1]);
  //const [children, setChildren] = useState([1]);
  const addChild = () => {
    setChildren([...children, 1]);
  };

  return (
    <Box sx={{ margin: "20px 0px", width: "100%" }}>
      <Grid container xs={12} className="c-form-title">
        <Typography variant="h5">{params.title}</Typography>
        {params.title === "Child(ren)" ||
          params.title === "Domestic Partner's Child(ren)" ? (
          <Button
            className="add-styling"
            variant="contained"
            disabled={false}
            onClick={() => {
              addChild();
              setShowDelete(true);
            }}
          >

            Add Child
          </Button>

        ) : null}
      </Grid>

      <>
        <InputHeader title={params.title} />
        {params.title === "Child(ren)" ||
          params.title === "Domestic Partner's Child(ren)" ? (
          children.map((e: any, index: any) => (
            <InputFormBody
              title={params.title + "_" + index}
              setShowDelete={setShowDelete}
              showDelete={showDelete}
              formData={params.formData}
              setFormData={params.setFormData}
              cIndex={index}
              selectedCoverages={params.selectedCoverages}
              dependentData={params.dependentData}
              action={params.action}
              isTierChanged={params.isTierChanged}
              isSubmitted={params.isSubmitted}
              setFormError={params.setFormError}
            //tier={params.tier}
            />
          ))
        ) : (
          <InputFormBody
            title={params.title}
            setShowDelete={setShowDelete}
            showDelete={showDelete}
            formData={params.formData}
            setFormData={params.setFormData}
            selectedCoverages={params.selectedCoverages}
            dependentData={params.dependentData}
            action={params.action}
            isTierChanged={params.isTierChanged}
            isSubmitted={params.isSubmitted}
            setFormError={params.setFormError}
          //tier={params.tier}
          />
        )}
      </>
    </Box>
  );
};

export default Candidate_form;
