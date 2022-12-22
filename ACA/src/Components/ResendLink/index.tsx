import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button, Typography } from "@mui/material";
import Header from "../Header";
import Footer from "../Footer";
import TextField from "@mui/material/TextField";
import EventNoteIcon from "@mui/icons-material/EventNote";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import ListSubheader from "@mui/material/ListSubheader";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Recaptcha from "react-recaptcha";


interface attribute {
  value: string;
  displayText?: string;
  showText?: string;
}

interface options {
  displayText: string;
  attribute1: attribute[]
}

type simpleType = options[];

const optionsData: simpleType = [{
  displayText : "I and/or members of my family lost other health coverage & want to enroll in Randstad coverage",
      attribute1 : [
        {
          value : '1',
          showText: "Had coverage through spouse's/domestic partner's employer – spouse/domestic partner is no longer eligible for those benefits"
      },
          {
          value : '2',
          showText: "Had coverage through spouse's/domestic partner's employer – now divorced/legally separated from spouse or lost domestic partnership"
      },

      {
        value : '3',
        showText: "Had coverage through spouse's/domestic partner's employer – spouse/domestic partner died"
    },
    {
      value : '4',
      showText: "Had coverage through Medicare, Medicaid, or a state children's health insurance program (CHIP) – no longer eligible for program"
  },

  {
    value : '5',
    showText: "Had coverage through parent – no longer eligible for coverage under parent's plans"
},
{
  value : '6',
  showText: "Other loss of coverage"
}
  ]
},

{
  displayText : "I and/or members of my family gained other health coverage & want to cancel Randstad coverage",
      attribute1 : [
        {
          value : '7',
          showText: "Spouse/domestic partner is now eligible for benefits through his/her employer"
      },
          {
          value : '8',
          showText: "Eligible for Medicare, Medicaid, or a state children's health insurance program (CHIP)"
      },

      {
        value : '9',
        showText: "Leaving the USA and returning to home country"
    },

    {
      value : '10',
      showText: "Other gain of coverage"
  }



  ]

},

  {
    displayText : "Other qualifying life event",
        attribute1 : [
          {
            value : '11',
            showText: "Change in cost of day care provider – I want to change my FSA contribution"
        },
            {
            value : '12',
            showText: "Death of dependent child – I want to remove child from Randstad coverage"
        },

        {
          value : '13',
          showText: "Death of spouse – I want to remove spouse from Randstad coverage"
      },

      {
        value : '14',
        showText: "Divorce/legal separation/annulment – I want to remove spouse from Randstad coverage"
    },

    {
      value : '12',
      showText: "Death of domestic partner or loss of domestic partnership – I want to remove domestic partner from Randstad coverage"
  },
 
        ]
  }     






]


const ResendLink = () => {
  const captureCaptcha = (value: any) => {
    console.log("Captcha value:", value);
  };

  const [sentOTP, setSentOTP] = useState(false);

  const handleOTP = () => {
    setSentOTP(true);
  };

  const verifyOTP = () => {
    console.log("Verified");
  };

  const [OTP, setOTP] = useState("");
  const [isSent, setResendOTP] = useState(false);

  const resendOTP = () => {
    setResendOTP(true);

    setTimeout(() => {
      setResendOTP(false);
    }, 2000);
  };

  var callback = function () {
    console.log('Done!!!!');
  };
  
  return (
    <React.Fragment>
      <Header />
      <Box sx={{ flexGrow: 1 }} style={{ padding: "16px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <div className="loginsection">
              <div className="loginblock">
                <img
                  className="shield"
                  src={process.env.REACT_APP_RELATIVE_PATH   + 'assets/img/link.svg' }
                  height="50"
                />

                <Typography className="usernamepass">Resend my link</Typography>

                <React.Fragment>
                  <div style={{ padding: "10px 0px" }}>
                    <TextField
                      fullWidth
                      label="Email"
                      id="fullWidth"
                      InputProps={{
                        style: { borderRadius: 0 },
                      }}
                    />
                  </div>
                  <div style={{ padding: "10px 0px" }}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="grouped-select">
                        Please select event type
                      </InputLabel>
                      <Select
                        defaultValue=""
                        id="grouped-select"
                        label="Please select event type"
                      >
                        <MenuItem value="">
                          <em>Please select event type</em>
                        </MenuItem>

                        {optionsData.map(opt => (
                          <React.Fragment>
                             <ListSubheader>{opt.displayText}</ListSubheader>
                             {opt.attribute1.map((option: any) => (
                              <span>
                                <MenuItem
                                  style={{ paddingLeft: "30px" }}
                                  value={option.value}
                                >
                                  {option.showText}
                                </MenuItem>
                              </span>
                            ))}
                          </React.Fragment>
                        ))}

                      
                      </Select>
                    </FormControl>
                  </div>
                  <div style={{ padding: "10px 0px" }}>
                    <TextField
                      fullWidth
                      label="Event Date MM/DD/YYYY"
                      id="fullWidth"
                      InputProps={{
                        endAdornment: <EventNoteIcon />,
                        style: { borderRadius: 0 },
                      }}
                    />
                  </div>
                  <div
                    style={{
                      maxWidth: "300px",
                      margin: "0 auto",
                      padding: "10px 0px 20px 0px",
                    }}
                  >
                    <Recaptcha
                      sitekey="6LfhEoAeAAAAAIuO0SM9eanP7xI2aZnJwOfTGRRc"
                      render="explicit"
                      onloadCallback={callback}
                    />
                  </div>
                </React.Fragment>

                <div className="submit-btn" onClick={() => handleOTP()}>
                  <Button> Submit</Button>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </React.Fragment>
  );
};

export default ResendLink;
