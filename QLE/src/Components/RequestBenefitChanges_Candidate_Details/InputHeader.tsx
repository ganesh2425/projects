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
import React from "react";

const InputHeader = (params: any) => {
  const showAll =
    params.title !== "Child(ren)" &&
    params.title !== "Domestic Partner's Child(ren)";

  return (
    <Grid container xs={12} className="input-cont">
      <Grid item xs={1.2}>
        <Typography className="input-name">First Name</Typography>
        <hr className="hr-mview" />
      </Grid>

      <Grid item xs={1.2}>
        <Typography className="input-name">Middle Name</Typography>
        <hr className="hr-mview" />
      </Grid>

      <Grid item xs={1.2}>
        <Typography className="input-name">Last Name</Typography>
        <hr className="hr-mview" />
      </Grid>

      <Grid item xs={2} >
        <Typography className="input-name"style={{position:"relative",left:"3rem"}}>DOB</Typography>
        <hr className="hr-mview" />
      </Grid>

      <Grid item xs={1.0}>
        <Typography className="input-name">Gender</Typography>
        <hr className="hr-mview" />
      </Grid>

      <Grid item xs={1.0}>
        <Typography className="input-name">SSN</Typography>
        <hr className="hr-mview" />
      </Grid>


      <Grid item xs={1.0}>
        <Typography className="input-name">Eligible For Medicare</Typography>
        <hr className="hr-mview" />
      </Grid>


      {/* {showAll ? ( */}
      <Grid item xs={1.0}>
        <Typography className="input-name">
          Eligible For Randstad Benefits
        </Typography>
        <hr className="hr-mview" />
      </Grid>
      {/* ) : null} */}

      {showAll ? (
        <Grid item xs={1.0}>
          <Typography className="input-name">
            Has access to coverage through his/her employer?
          </Typography>
          <hr className="hr-mview" />
        </Grid>

      ) : null}

      {/* {!showAll ? ( */}
      <React.Fragment>
        <Grid item xs={1.0}>

          <Typography className="input-name">Enroll in</Typography>
          <hr className="hr-mview" />
        </Grid>
        {params.title === "Child(ren)" ? (
        <Grid item xs={1.0}>
          <Typography className="input-name">
            Legal Dependent/Step Child?
          </Typography>
          <hr className="hr-mview" />
        </Grid>
      ) : null}
        <Grid item xs={1.0} >

          <Typography style={{ visibility: "hidden" }} className="input-name">Enroll in</Typography>
          {/* <hr className="hr-mview"/> */}
        </Grid>
      </React.Fragment>
      {/* //  ) : null}  */}

     

      {/* {params.title === "Child(ren)" ||
    params.title === "Domestic Partner's Child(ren)" ? (
      <Grid item onClick={()=>{setShowForm(false)}}>
        <DeleteRoundedIcon sx={{ padding: "12px 4px", color: "red" }} />
      </Grid>
    ) : null} */}
    </Grid>
  );
};

export default InputHeader;
