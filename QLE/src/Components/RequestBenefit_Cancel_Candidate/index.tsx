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
import "./style.css";
import InputFormBody from "./InputForm_BodyOnly";
import InputHeader from "./InputHeader";

const Candidate_form = (params: any) => {
  const [showDelete, setShowDelete] = useState(true);

  const [children, setChildren] = useState(params.childrenData);

  const addChild = () => {
    setChildren([...children, 1]);
  };

  return (
    // <Box sx={{ margin: "20px 0px", width: "100%" }}>
    <Grid container sx={{ margin: "0px 0px" }}>
      <Grid container className="Add" xs={12} >
        {params.title === "Spouse's Child(ren)" ||
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
        {params.title === "Spouse's Child(ren)" ||
          params.title === "Domestic Partner's Child(ren)" ? (
          children.map((e: any, index: any) => (
            <InputFormBody
              title={params.title + "_" + index}
              setShowDelete={setShowDelete}
              showDelete={showDelete}
              formData={params.formData}
              setFormData={params.setFormData}
              cIndex={index}
              child={params.child}
              dpChild={params.dpChild}
              spouse={params.spouse}
              employee={params.employee}
              domesticPartner={params.domesticPartner}
              action={params.action}
              isSubmitted={params.isSubmitted}
              childrenData={params.childrenData}
              enabled={params.enabled}
            />
          ))
        ) : (
          <InputFormBody
            title={params.title}
            setShowDelete={setShowDelete}
            showDelete={showDelete}
            formData={params.formData}
            setFormData={params.setFormData}
            child={params.child}
            dpChild={params.dpChild}
            spouse={params.spouse}
            employee={params.employee}
            domesticPartner={params.domesticPartner}
            action={params.action}
            isSubmitted={params.isSubmitted}
            childrenData={params.childrenData}
            enabled={params.enabled}
          />
        )}
      </>
      {/* </Box> */}
    </Grid>
  );
};

export default Candidate_form;
