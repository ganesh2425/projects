import React from "react";
// import HolidayTable from "../Holidays";
import NewEmployerInformationForm from "./NewEmployersInfo";
import { Button, Grid, MenuItem, Typography } from "@mui/material";


 const Add_Employer_Employer_Information = () => {
  // const Add_Employer_Employer_Information = ({
  //   employerId,
  // }: any) => {

  return (
    <>
      <NewEmployerInformationForm />
      <hr className="emp-form-container" />
      {/* <HolidayTable /> */}

      {/* <Grid
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
        >
          Save
        </Button>
        <Button
          variant="outlined"
          className="cancel-btn-role"
          sx={{ margin: "3px 5px" }}
        >
          Cancel
        </Button>
      </Grid> */}
    </>
  );
};

export default Add_Employer_Employer_Information;
