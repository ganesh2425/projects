import { useState } from "react";
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
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import DeleteRoundedIcon from '@mui/icons-material/DeleteForeverSharp';
import "./style.css";
import { HiveRounded } from "@mui/icons-material";

const InputForm = (params: any) => {
  const [showForm, setShowForm] = useState(true);

  return (
    <>
      {showForm ? (
        <Grid container xs={12} className="input-cont">
          <Grid item xs={1.33}>
            <Typography className="input-name">First Name</Typography>
            <hr/>
            <TextField
              id="outlined-basic"
              label="Firsts Name"
              variant="outlined"
              sx={{ margin: "0px 5px" }}
            />
          </Grid>

          <Grid item xs={1.33}>
            <Typography className="input-name">Middle Name</Typography>
            <hr/>
            <TextField
              id="outlined-basic"
              label="Middle Name"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={1.33}>
            <Typography className="input-name">Last Name</Typography>
            <hr/>

            <TextField
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              sx={{ margin: "0px 5px" }}
            />
          </Grid>

          <Grid item xs={1.33}>
            <Typography className="input-name">DOB</Typography>
            <hr/>

            <TextField
              // id="date"
              // label="Birthday"
              type="date"
              fullWidth
              // defaultValue={todayDate()}
            />
          </Grid>

          <Grid item xs={1.33}>
            <Typography className="input-name">Gender</Typography>
            <hr/>

            <FormControl sx={{ minWidth: "95%" }}>
              <InputLabel id="demo-simple-select-helper-label">
                Gender
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label="Gender"
                fullWidth
                sx={{ margin: "0px 5px" }}
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={1.33}>
            <Typography className="input-name">SSN</Typography>
            <HiveRounded/>

            <TextField id="outlined-basic" label="SSN" />
          </Grid>

          <Grid item xs={1.33}>
            <Typography className="input-name">
              Eligible For Randstad Benefits
            </Typography>
            <hr/>

            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="demo-simple-select-helper-label">
                Eligible For Randstad Benefits
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label="Eligible For Randstad Benefits"
                autoWidth
                sx={{ margin: "0px 5px" }}
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={1.33}>
            <Typography className="input-name">
              Eligible For Medicare
            </Typography>
            <hr/>

            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="demo-simple-select-helper-label">
                Eligible For Medicare HII
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label="Eligible For Medicare"
                autoWidth
                //  sx={{margin: "0px 5px"}}
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={1.33}>
            <Typography className="input-name">
              Has access to coverage through his/her employer?
            </Typography>
            <hr/>

            <FormControl sx={{ minWidth: "100%" }}>
              <InputLabel id="demo-simple-select-helper-label">
                Has access to coverage through his/her employer?
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label="Has access to coverage through his/her employer?"
                autoWidth
                sx={{ margin: "0px 5px" }}
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {params.title === "Child(ren)" ||
          params.title === "Domestic Partner's Child(ren)" ? (
            <Grid item onClick={()=>{setShowForm(false)}}>
            <DeleteForeverSharpIcon sx={{ padding: "12px 4px", color: "red" }} />
            </Grid>
          ) : null}
        </Grid>
      ) : null}
    </>
  );
};

export default InputForm;
