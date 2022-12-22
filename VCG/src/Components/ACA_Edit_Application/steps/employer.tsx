import React from "react";
import { Grid, Paper } from "@mui/material";
import { Button, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { getACAEventDetails } from "../../../reducers/acaReducer/getACAEventReducer";

export default function ACA_Application_Employer() {
  const getACAEventRes: any = useSelector(getACAEventDetails);

  return (
    <>
      <Paper sx={{ boxShadow: "none" }}>
        <Grid container>
          <Grid item xs={12} sx={{ padding: "0px 20px" }}>
            <TextField
              InputProps={{
                style: { borderRadius: 0 },
              }}
              id="outlined-basic"
              label="Employer Name"
              variant="outlined"
              name="employerName"
              fullWidth
              value={getACAEventRes.employerName}
              disabled
            />
          </Grid>

          <Grid item xs={12} sx={{ margin: "20px" }}>
            <Grid
              container
              xs={8}
              sx={{ borderBottom: "1px solid #ebedf2", padding: "10px 0px " }}
            >
              <Grid item xs={6}>
                <Typography className="reports-font-styling">
                  Employer Identification Number
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography className="reports-font-styling">
                  {getACAEventRes.employerEin}
                </Typography>
              </Grid>
            </Grid>

            <Grid
              container
              xs={8}
              sx={{ borderBottom: "1px solid #ebedf2", padding: "10px 0px " }}
            >
              <Grid item xs={6}>
                <Typography className="reports-font-styling">
                  Employer Address
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography className="reports-font-styling">
                  {getACAEventRes.employerAddress}
                </Typography>
              </Grid>
            </Grid>

            <Grid
              container
              xs={8}
              sx={{ borderBottom: "1px solid #ebedf2", padding: "10px 0px " }}
            >
              <Grid item xs={6}>
                <Typography className="reports-font-styling">
                  Employer Phone / Type
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography className="reports-font-styling">
                  {getACAEventRes.employerPhoneAndType}
                </Typography>
              </Grid>
            </Grid>

            <Grid
              container
              xs={8}
              sx={{ borderBottom: "1px solid #ebedf2", padding: "10px 0px " }}
            >
              <Grid item xs={6}>
                <Typography className="reports-font-styling">
                  Employer Primary Contact
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{getACAEventRes.employerPrimaryContact}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
