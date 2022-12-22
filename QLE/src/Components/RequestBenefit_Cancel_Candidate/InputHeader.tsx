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
  return (
    <Grid container xs={12} >
      <Grid item xs={1.33}>
        {/* <Typography >Name</Typography> */}
        {/* <hr className="hr-mview"/> */}
      </Grid>
    </Grid>
  );
};

export default InputHeader;
