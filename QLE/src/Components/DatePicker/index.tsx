import * as React from "react";
// import TextField from "@mui/material/TextField";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
// import LocalizationProvider from "@mui/lab/LocalizationProvider";
// import DatePicker from "@mui/lab/DatePicker";
// import Stack from "@mui/material/Stack";
// import { compareAsc, format } from "date-fns";
// The main submodule:
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const ResponsiveDatePickers = () => {
  const [value, setValue] = React.useState<Date | null>(new Date());
  const [startDate, setStartDate] = React.useState(new Date());

  return (
    <React.Fragment>
      {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing={3}>
          <DatePicker
            label="For desktop"
            value={value}
            //   minDate={new Date('2-01-01')}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </Stack>
      </LocalizationProvider> */}
      <DatePicker selected={startDate} onChange={(date:Date) => setStartDate(date)} />
    </React.Fragment>
  );
};

export default ResponsiveDatePickers;
