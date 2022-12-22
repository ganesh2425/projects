import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import {
  Button,
  Checkbox,
  Grid,
  TextField,
  Typography,
  FormControl,
} from "@mui/material";
import { RBC_context } from "../../Contexts/RequestBenefitChanges.context";
import { getValue } from "@testing-library/user-event/dist/utils";

const SelectBoxes = (params: any) => {
  const [selectedPlan, setSelectedPlan] = React.useState(0);
  const {
    selectedDentalPlan,
    selectedMedicalPlan,
    selectedVisionPlan,
    handleMedicalPlan,
    handleDentalPlan,
    handleVisionPlan,
    coverageTier
  } = React.useContext(RBC_context);

  const getValue = () => {
      if(params.name === "Medical") return selectedMedicalPlan;
      else if(params.name === "Dental") return selectedDentalPlan;
      else if(params.name === "Vision") return selectedVisionPlan;
  }

  const handlePlan = (e: any) => {
    setSelectedPlan(e.target.value);
  };

  const handleCurrentPlan = (e: any) => {
    if (e.target.name === "Medical") handleMedicalPlan(e);
    else if (e.target.name === "Dental") handleDentalPlan(e);
    else if (e.target.name === "Vision") handleVisionPlan(e);
    else console.log("None of the above options are selected");
  };

  return (
    <Grid container xs={12} spacing={2}>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-helper-label">Plan</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            name={params.name}
            value={selectedPlan}
            label="Plan"
            onChange={(e) => {
              handlePlan(e);
            }}
            fullWidth
          >
            {params.plan.map((e: any) => (
              <MenuItem value={e.value}>{e.name}</MenuItem>
            ))}
          </Select>
          <FormHelperText>
            {!selectedPlan ? "" : params.plan[selectedPlan].helperText}
          </FormHelperText>
        </FormControl>
      </Grid>

      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-helper-label">
            Coverage Tier
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={getValue()}
            label="Coverage Tier"
            fullWidth
            name={params.name}
            onChange={(e) => {
              handleCurrentPlan(e);
            }}
          >
            {/* {console.log(options1[parseInt(selectedValue) - 1])} */}
            {coverageTier.map((e: any) => (
              <MenuItem value={e.value}>{e.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Grid container justifyContent="flex-end">
            {/* {alert(params.amountPlaceholder)} */}
          {params.amountPlaceholder ? selectedPlan ? (
            <Grid item xs={12} md={6} sx={{padding: "0px 9px"}}>
              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-amount"></InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  value={null}
                  // onChange={handleChange("amount")}
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  label=""
                  placeholder={params.plan[selectedPlan].amountPlaceholder}
                />
              </FormControl>
            </Grid>
          ) : (
            ""
          ): null}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SelectBoxes;
