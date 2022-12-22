import {
  Button,
  Checkbox,
  Grid,
  TextField,
  Typography,
  FormControl,
} from "@mui/material";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Box } from "@mui/system";

import { Link, useNavigate } from "react-router-dom";
import FormGroup from "@mui/material/FormGroup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { fetchSTEP2CancelRequest } from "../../actions/step2CancelActions";
import { Formik, useFormik, useFormikContext, validateYupSchema } from "formik";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

import Select, { SelectChangeEvent } from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";

import Candidate_form from "../RequestBenefit_Cancel_Candidate";
import { IStep2CancelForm } from "../../interfaces/types";
import "./style.css";
import { getSTEP2CancelEnteredDetails } from "../../reducers/step2CancelReducer";

import { toast } from "react-toastify";
import { getStep1Details } from "../../reducers/getStep1Reducer";
import { fetchGetStep1Request } from "../../actions/getStep1Actions";
import { useParams } from "react-router-dom";
import ReactHtmlParser from 'html-react-parser';

import StorageService from "../../services/Storage.service";

const steps = [
  "Start My QLE",
  "Request Benefit Changes",
  "Upload Documentation",
];

const RequestBenefitChangesCancel = ({ }: any) => {
  let employerNameCoki = StorageService.getCookies("employerName");
  const dispatch = useDispatch();
  let params = useParams();
  let childArray: any = [];
  let dpChildArray: any = [];
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});
  const completedSteps = () => {
    return Object.keys(completed).length;
  };
  const totalSteps = () => {
    return steps.length;
  };

  const [cancelMedical, setCancelMedical] = React.useState(false);
  const handleMedicalBoxChange = (e: any) => {
    let valStatus = e.target.checked;
    if (e.target.checked == true) {
      setCancelMedical(true);
    } else {
      setCancelMedical(false);
    }
  };

  const [cancelDental, setCancelDental] = React.useState(false);
  const handleDentalBoxChange = (e: any) => {
    let valStatus = e.target.checked;
    if (e.target.checked == true) {
      setCancelDental(true);
    } else {
      setCancelDental(false);
    }
  };

  const [cancelVision, setCancelVision] = React.useState(false);
  const handleVisionBoxChange = (e: any) => {
    let valStatus = e.target.checked;
    if (e.target.checked == true) {
      setCancelVision(true);
    } else {
      setCancelVision(false);
    }
  };

  const [cancelDependentFsa, setCancelDependentFsa] = React.useState(false);
  const handleDependentFSABoxChange = (e: any) => {
    let valStatus = e.target.checked;
    if (e.target.checked == true) {
      setCancelDependentFsa(true);
    } else {
      setCancelDependentFsa(false);
    }
  };

  const [benefitCertBoxStatus, setBenefitCertBoxStatus] = React.useState(false);
  const handleBenefitCertBoxChange = (e: any) => {
    let valStatus = e.target.checked;
    if (e.target.checked == true) {
      setBenefitCertBoxStatus(true);
    } else {
      setBenefitCertBoxStatus(false);
    }
  };
  const [infoCertBoxStatus, setInfoCertBoxStatus] = React.useState(false);
  const handleInfoCertBoxChange = (e: any) => {
    let valStatus = e.target.checked;
    if (e.target.checked == true) {
      setInfoCertBoxStatus(true);
    } else {
      setInfoCertBoxStatus(false);
    }
  };

  // const [enrollCertBoxStatus, setEnrollCertBoxStatus] = useState(false);
  // const handleEnrollCertBoxChange = (e: any) => {
  //   let valStatus = e.target.checked;
  //   if (e.target.checked == true) {
  //     setEnrollCertBoxStatus(true);
  //   } else {
  //     setEnrollCertBoxStatus(false);
  //   }
  // };

  const medicalPlans = [
    { name: "Please Select", value: 0 },
    {
      name: "Optional: Cancel in or Change Health Care Flexible Spending Account (FSA) Annual Contribution/Goal Amount:",
      value: 1
    },
    {
      name: "Employee Only Optional: Cancel in or Change Health Care Flexible Spending Account (FSA) Annual Contribution/Goal Amount:",
      value: 2
    },
    {
      name: `Optional: Cancel in or Change Health Savings Account (HSA) Annual Contribution/Goal Amount:
      (Maximum of $3,650 if you have Employee Only coverage and up to $7,300 for all other coverage levels)`,
      value: 3
    },
  ];

  const [isSubmitted, setSubmitted] = useState(false);

  const [optionsMedId, setOptionsMedId] = React.useState(0);
  const [optionsMedAmount, setOptionsMedAmount] = React.useState("");

  const [cancelHealthAnnualFsa, setCancelHealthAnnualFsa] = React.useState("");
  const [cancelEmployeeHsa, setCancelEmployeeHsa] = React.useState("");
  const [cancelCoverHealthAnnualHsa, setCancelCoverHealthAnnualHsa] = React.useState("");

  const [cancelDependentFsaAmount, setCancelDependentFsaAmount] = React.useState("");

  const [cancelEmployee, setCancelEmployee] = React.useState(false);
  const handleCancelEmployee = (e: any) => {
    let valStatus = e.target.checked;
    if (e.target.checked == true) {
      setCancelEmployee(true);
    } else {
      setCancelEmployee(false);
    }
  };

  const [cancelSpouse, setCancelSpouse] = React.useState(false);
  const handleCancelSpouse = (e: any) => {
    let valStatus = e.target.checked;
    if (e.target.checked == true) {
      setCancelSpouse(true);
    } else {
      setCancelSpouse(false);
    }
  };

  const [cancelChild, setCancelChild] = React.useState(false);
  const handleCancelChild = (e: any) => {
    let valStatus = e.target.checked;
    if (e.target.checked == true) {
      setCancelChild(true);
    } else {
      setCancelChild(false);
    }
  };

  const [cancelDP, setCancelDP] = React.useState(false);
  const handleCancelDP = (e: any) => {
    let valStatus = e.target.checked;
    if (e.target.checked == true) {
      setCancelDP(true);
    } else {
      setCancelDP(false);
    }
  };

  const [cancelDPChild, setCancelDPChild] = React.useState(false);
  const handleCancelDPChild = (e: any) => {
    let valStatus = e.target.checked;
    if (e.target.checked == true) {
      setCancelDPChild(true);
    } else {
      setCancelDPChild(false);
    }
  };

  const handleDPChild = () => {
    let dpArr = [];
    if (step1Res.benefitDetails.domesticPartnersChild && step1Res.benefitDetails.domesticPartnersChild.length > 0) {
      for (let i = 0; i <= step1Res.benefitDetails.domesticPartnersChild.length - 1; i++)
        dpArr.push(1);
    }
    if (dpArr && dpArr.length == 0) {
      dpArr.push(1);
    }
    // console.log("llllllllllllllllllll");
    // console.log(dpArr);
    return dpArr;
  };

  const handleChild = () => {
    let cArr = [];
    if (step1Res.benefitDetails.child && step1Res.benefitDetails.child.length > 0) {
      for (let i = 0; i <= step1Res.benefitDetails.child.length - 1; i++)
        cArr.push(1);
    }
    if (cArr && cArr.length == 0) {
      cArr.push(1);
    }
    return cArr;
  };

  const [formData, setFormData] = useState<any>([]);

  const validationSchema = yup.object({
    //comments: yup.string().required("Field is required"),
  });

  const [initialValues, setInitialValues] = useState<IStep2CancelForm>({
    eventId: 0,
    cancelMedical: false,
    cancelHealthAnnualFsa: "",
    cancelCoverHealthAnnualHsa: "",
    cancelEmployeeHsa: "",
    cancelDental: false,
    cancelVision: false,
    cancelDependentFsa: false,
    cancelDependentAnnualFsa: "",
    cancelEmployee: false,
    cancelSpouse: false,
    cancelDomesticPartner: false,
    employee: "",
    spouse: "",
    domesticPartner: "",
    cancelChild: false,
    child: [],
    cancelSpouseChild: false,
    cancelDomesticPartnerChild: false,
    domesticPartnersChild: [],
    comments: "",
    commenterName: "",
  });


  const step1Res = useSelector(getStep1Details);

  useEffect(() => {
    getStep1ByEventId();
  }, []);

  const getStep1ByEventId = () => {
    let eventToken = StorageService.getCookies("eventToken");
    let token: any = params.token ? params.token : eventToken;
    if (token && token !== "0")
      dispatch(
        fetchGetStep1Request({ token })
      );
  };

  let dependentSet: any = [];

  useEffect(() => {
    let eventToken = StorageService.getCookies("eventToken");
    let token: any = params.token ? params.token : eventToken;
    if (token) {
      if (step1Res && step1Res['eventId'] > 0 && step1Res['step'] == 2) {

        setCancelMedical(step1Res.benefitDetails.cancelMedical);
        // if (step1Res.benefitDetails.cancelHealthAnnualFsa) {
        //   setOptionsMedId(1);
        //   setOptionsMedAmount(step1Res.benefitDetails.cancelHealthAnnualFsa);
        // }
        // else if (step1Res.benefitDetails.cancelCoverHealthAnnualHsa) {
        //   setOptionsMedId(3);
        //   setOptionsMedAmount(step1Res.benefitDetails.cancelCoverHealthAnnualHsa);
        // }

        if (step1Res.benefitDetails.cancelHealthAnnualFsa) {
          setCancelHealthAnnualFsa(step1Res.benefitDetails.cancelHealthAnnualFsa);
        }
        if (step1Res.benefitDetails.cancelEmployeeHsa) {
          setCancelEmployeeHsa(step1Res.benefitDetails.cancelEmployeeHsa);
        }
        if (step1Res.benefitDetails.cancelCoverHealthAnnualHsa) {
          setCancelCoverHealthAnnualHsa(step1Res.benefitDetails.cancelCoverHealthAnnualHsa);
        }

        setCancelDental(step1Res.benefitDetails.cancelDental);
        setCancelVision(step1Res.benefitDetails.cancelVision);
        setCancelDependentFsa(step1Res.benefitDetails.cancelDependentFsa);

        if (step1Res.benefitDetails.cancelDependentFsa) {
          setCancelDependentFsaAmount(step1Res.benefitDetails.cancelDependentAnnualFsa);
        }

        setCancelEmployee(step1Res.benefitDetails.cancelEmployee);
        setCancelSpouse(step1Res.benefitDetails.cancelSpouse);
        setCancelChild(step1Res.benefitDetails.cancelChild);
        setCancelDP(step1Res.benefitDetails.cancelDomesticPartner);
        setCancelDPChild(step1Res.benefitDetails.cancelDomesticPartnerChild);

        setBenefitCertBoxStatus(true);
        setInfoCertBoxStatus(true);

        if (step1Res.benefitDetails.child && step1Res.benefitDetails.child.length > 0) {
          for (let i = 0; i <= step1Res.benefitDetails.child.length - 1; i++)
            childArray.push(1);
        }
        if (childArray && childArray.length == 0) {
          childArray.push(1);
        }

        if (step1Res.benefitDetails.domesticPartnersChild && step1Res.benefitDetails.domesticPartnersChild.length > 0) {
          for (let i = 0; i <= step1Res.benefitDetails.domesticPartnersChild.length - 1; i++)
            dpChildArray.push(1);
        }
        if (dpChildArray && dpChildArray.length == 0) {
          dpChildArray.push(1);
        }

        setInitialValues({
          eventId: step1Res.eventId,
          cancelMedical: false,
          cancelHealthAnnualFsa: "",
          cancelCoverHealthAnnualHsa: "",
          cancelEmployeeHsa: "",
          cancelDental: false,
          cancelVision: false,
          cancelDependentFsa: false,
          cancelDependentAnnualFsa: "",
          cancelEmployee: false,
          cancelSpouse: false,
          cancelDomesticPartner: false,
          employee: "",
          spouse: "",
          domesticPartner: "",
          cancelChild: false,
          child: [],
          cancelSpouseChild: false,
          cancelDomesticPartnerChild: false,
          domesticPartnersChild: [],
          comments: step1Res.benefitDetails.comments,
          commenterName: step1Res['commenterName'],
        });
      }
      else {
        setInitialValues({
          eventId: 0,
          cancelMedical: false,
          cancelHealthAnnualFsa: "",
          cancelCoverHealthAnnualHsa: "",
          cancelEmployeeHsa: "",
          cancelDental: false,
          cancelVision: false,
          cancelDependentFsa: false,
          cancelDependentAnnualFsa: "",
          cancelSpouse: false,
          cancelEmployee: false,
          cancelDomesticPartner: false,
          spouse: "",
          employee: "",
          domesticPartner: "",
          cancelChild: false,
          child: [],
          cancelSpouseChild: false,
          cancelDomesticPartnerChild: false,
          domesticPartnersChild: [],
          comments: "",
          commenterName: "",
        });
      }
    }
  }, [step1Res]);

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values: IStep2CancelForm) => {
      setSubmitted(true);
      values.eventId = step1Res && step1Res.eventId ? step1Res.eventId : 0;

      values.cancelMedical = cancelMedical;
      // values.cancelHealthAnnualFsa = cancelMedical && optionsMedId == 1 ? optionsMedAmount : "";
      // values.cancelCoverHealthAnnualHsa = cancelMedical && optionsMedId == 3 ? optionsMedAmount : "";

      values.cancelDental = cancelDental;
      values.cancelVision = cancelVision;

      values.cancelDependentFsa = cancelDependentFsa;
      values.cancelDependentAnnualFsa = cancelDependentFsa ? cancelDependentFsaAmount : "";

      values.cancelHealthAnnualFsa = cancelHealthAnnualFsa;
      values.cancelEmployeeHsa = cancelEmployeeHsa;
      values.cancelCoverHealthAnnualHsa = cancelCoverHealthAnnualHsa;

      values.cancelEmployee = cancelEmployee;
      values.cancelSpouse = cancelSpouse;
      values.cancelChild = cancelChild;
      values.cancelSpouseChild = cancelSpouse && cancelChild ? true : false;
      values.cancelDomesticPartner = cancelDP;
      values.cancelDomesticPartnerChild = cancelDPChild ? true : false;

      console.log(formData);

      let employeeData = "";
      let spouseData = "";
      let dpData = "";
      let childData: any = [];
      let domesticPartnerAndChildData: any = [];

      if (formData && formData.length > 0) {
        if (formData.findIndex((x: any) => x.title == "Employee") !== -1) {
          let employeeArr = formData.find((x: any) => x.title == "Employee");
          employeeData = employeeArr.candidateName;
        }
        if (formData.findIndex((x: any) => x.title == "Spouse") !== -1) {
          let spouseArr = formData.find((x: any) => x.title == "Spouse");
          spouseData = spouseArr.candidateName;
        }
        if (formData.findIndex((x: any) => x.title.includes("Spouse's Child(ren)")) !== -1) {
          let childArr = formData.filter((x: any) => x.title.includes("Spouse's Child(ren)"));
          childData = childArr.map((x: any) => x.candidateName);
        }
        if (formData.findIndex((x: any) => x.title == "Domestic Partner") !== -1) {
          let dpArr = formData.find((x: any) => x.title == "Domestic Partner");
          dpData = dpArr.candidateName;
        }
        if (formData.findIndex((x: any) => x.title.includes("Domestic Partner's Child(ren)")) !== -1) {
          let dpArr = formData.filter((x: any) => x.title.includes("Domestic Partner's Child(ren)"));
          domesticPartnerAndChildData = dpArr.map((x: any) => x.candidateName);
        }
      }

      values.employee = employeeData;
      values.spouse = spouseData;
      values.child = childData;
      values.domesticPartnersChild = domesticPartnerAndChildData;
      values.domesticPartner = dpData;

      console.log("values");
      console.log(values);

      let err = false;
      //if (cancelMedical && optionsMedId == 0) err = true;
      //if (cancelMedical && !optionsMedAmount) err = true;
      if (cancelDependentFsa && !cancelDependentFsaAmount) err = true;

      // if (
      //   cancelMedical && optionsMedId == 1 &&
      //   (parseInt(optionsMedAmount) > parseInt(step1Res.cancelHealthFsa)
      //     || parseInt(optionsMedAmount) == 0
      //     || !optionsMedAmount)) {
      //   err = true;
      // }
      // else if (
      //   cancelMedical && optionsMedId == 2 &&
      //   (parseInt(optionsMedAmount) > parseInt(step1Res.cancelEmpHealthCoverHsa)
      //     || parseInt(optionsMedAmount) == 0
      //     || !optionsMedAmount)) {
      //   err = true;
      // }
      // else if (
      //   cancelMedical && optionsMedId == 3 &&
      //   (parseInt(optionsMedAmount) > parseInt(step1Res.cancelAllHealthCoverHsa)
      //     || parseInt(optionsMedAmount) == 0
      //     || !optionsMedAmount)) {
      //   err = true;
      // }

      if (
        (parseInt(cancelHealthAnnualFsa) > parseInt(step1Res.cancelHealthFsa)
          || parseInt(cancelHealthAnnualFsa) == 0
        )) {
        err = true;
      }
      if (
        (parseInt(cancelEmployeeHsa) > parseInt(step1Res.cancelEmpHealthCoverHsa)
          || parseInt(cancelEmployeeHsa) == 0
        )) {
        err = true;
      }
      else if (
        (parseInt(cancelCoverHealthAnnualHsa) > parseInt(step1Res.cancelAllHealthCoverHsa)
          || parseInt(cancelCoverHealthAnnualHsa) == 0
        )) {
        err = true;
      }

      if (
        cancelDependentFsa &&
        (parseInt(cancelDependentFsaAmount) > parseInt(step1Res.cancelDependentFsa)
          || parseInt(cancelDependentFsaAmount) == 0
          || !cancelDependentFsaAmount))
        err = true;

      if (!cancelMedical && !cancelDental && !cancelVision && step1Res.dependentOption != 5)
        err = true;

      if (!cancelDependentFsa && step1Res && step1Res.dependentOption == 5)
        err = true;

      if (values.cancelSpouse && !values.spouse)
        err = true;

      // if (values.cancelEmployee && !values.employee)
      //   err = true;

      // if (values.cancelChild && !values.child && values.child.length == 0)
      // err = true ;
      // if (values.cancelSpouseChild && 
      //   !values.spouse && !values.child && values.child.length == 0)
      // err = true ;
      // if (values.cancelDomesticPartnerChild && 
      //   !values.domesticPartnerAndChild && values.domesticPartnerAndChild.length == 0)
      // err = true ;

      if (values.child.length > 0) {
        values.child.forEach((element: any) => {
          if (!element)
            err = true;
        });
      }

      if (values.domesticPartnersChild.length > 0) {
        values.domesticPartnersChild.forEach((element: any) => {
          if (!element)
            err = true;
        });
      }

      if (step1Res && step1Res.dependentOption == 1
        && !cancelEmployee && !cancelSpouse && !cancelChild && !cancelDP && !cancelDPChild) {
        err = true;
      }

      // else if (step1Res && step1Res.dependentOption == 2
      //   && !cancelChild) {
      //   err = true;
      // }
      // else if (step1Res && step1Res.dependentOption == 4
      //   && !cancelChild && (!cancelSpouse || !cancelDP)) {
      //   err = true;
      // }
      // else if (step1Res && step1Res.dependentOption == 6
      //   && !cancelChild) {
      //   err = true;
      // }
      // else if (step1Res && step1Res.dependentOption == 7
      //   && !cancelChild && !cancelSpouse) {
      //   err = true;
      // }
      // else if (step1Res && step1Res.dependentOption == 8
      //   && !cancelDP && !cancelDPChild) {
      //   err = true;
      // }

      if (benefitCertBoxStatus && infoCertBoxStatus && !err) {
        console.log("values");
        console.log(values);
        dispatch(fetchSTEP2CancelRequest(values));
      }
    }
  });

  const navigate = useNavigate();

  let step2Res: any = useSelector(getSTEP2CancelEnteredDetails);
  useEffect(() => {
    if (step2Res && step2Res.isSuccess) {
      toast.success(`Saved Step 2`);
      step2Res = null;
      setTimeout(() => {
        navigate(`/`+employerNameCoki+"/uploaddocument");
        document.location.reload();
      }, 1500);
    }
  }, [step2Res]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box>
        <table>
          <tr>
            <th className="text-muted">Name:</th>
            <td>{step1Res && step1Res.name}</td>
          </tr>
          <tr>
            <th className="text-muted">Event Type:</th>
            <td>{step1Res && step1Res.eventType}</td>
          </tr>
          <tr>
            <th className="text-muted"></th>
            <td>{step1Res && step1Res.eventSubType}</td>
          </tr>
          <tr>
            <th className="text-muted" >Confirmation Number:</th>
            <td  >{step1Res && step1Res.confirmationNumber}</td>

          </tr>
        </table>
        <Typography className="ques-styling" variant="h5" sx={{ marginTop: "25px" }}>
          What changes would you like to make?
        </Typography>

        <Typography className="ans-styling">
          Thanks for starting your qualifying life event (QLE). The next step is to let us know what changes you want to make to your benefits as the result of your QLE. Remember, you can only make changes that are related to your QLE.
        </Typography>

        <Typography className="ques-styling" variant="h5" sx={{ marginTop: "20px" }}>
          {" "}
          Based on your Event Type, you can make the following changes to your
          Randstad benefits:
        </Typography>

        {step1Res && (
          <p
            dangerouslySetInnerHTML={{
              __html: step1Res.qleWhatBenefitChangesStep2,
            }}
          ></p>
        )}
        <Typography className="ques-styling" variant="h5" style={{ margin: "16px 0px 0px 0px" }}>
          Who can you disenroll in coverage?
        </Typography>


        <Typography className="ans-styling" id="para">
          {step1Res && (
            <p
              dangerouslySetInnerHTML={{
                __html: step1Res.qleWhoChangedBenefitStep2,
              }}
            ></p>
          )}
        </Typography>

        <Typography className="ans-styling" id="paraLink" >
          {step1Res && (
            <p
              dangerouslySetInnerHTML={{ __html: step1Res.qleDisclaimerStep2 }}
            ></p>
          )}
        </Typography>
        <br />
        {/* <Typography className="ans-styling">
          If you need to log out of your QLE record before submitting it, you
          can get back into your record through the unique link in the email you
          received from support@qleservices.com.
        </Typography> */}

        <Typography className="ques-styling change" variant="h5">
          What are we changing?
        </Typography>

        {step1Res
          && (step1Res.dependentOption != 5
          ) ? (
          <Grid container className="cancel" style={{ marginTop: "20px" }}>

            <Grid item xs={12} md={2} >
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  id="cancelMedical"
                  label="Cancel Medical"
                  onChange={handleMedicalBoxChange}
                  checked={cancelMedical}
                />
              </FormGroup>
            </Grid>

            {/* <Grid item xs={12} md={10}>
              {cancelMedical && (
                <Grid container xs={12} spacing={2}>

                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-helper-label">
                        Options
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        label="Plan"
                        fullWidth
                        name="optionsMedId"
                        value={optionsMedId}
                        onChange={(e: any) => {
                          setOptionsMedId(e.target.value);
                          formik.handleChange(e);
                        }}
                      >
                        {medicalPlans.map((e: any) => (
                          <MenuItem value={e.value}>{e.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid container justifyContent="flex-end" >
                    {(
                      cancelMedical ? (
                        <Grid item xs={12} md={6} className="amount">
                          <FormControl fullWidth sx={{ m: 1 }}>
                            <InputLabel htmlFor="outlined-adornment-amount"></InputLabel>
                            <OutlinedInput
                              id="outlined-adornment-amount max"
                              startAdornment={
                                <InputAdornment position="start">$</InputAdornment>
                              }
                              label=""
                              placeholder={step1Res &&
                                optionsMedId == 1
                                ?
                                "Maximum " + "$" + step1Res.cancelHealthFsa
                                : optionsMedId == 2
                                  ?
                                  "Maximum " + "$" + step1Res.cancelEmpHealthCoverHsa
                                  : optionsMedId == 3
                                    ?
                                    "Maximum " + "$" + step1Res.cancelAllHealthCoverHsa
                                    :
                                    ""
                              }
                              name="optionsMedAmount"
                              value={optionsMedAmount}
                              onChange={(e: any) => {
                                setOptionsMedAmount(e.target.value);
                                formik.handleChange(e);
                              }}
                            />
                          </FormControl>
                        </Grid>
                      ) : (
                        ""
                      )
                    )}
                  </Grid>

                  <div
                    className={
                      (step1Res && (optionsMedId == 1)
                        && cancelMedical && !optionsMedAmount
                        && isSubmitted)
                        ? "error-span cert r2"
                        :
                        (step1Res && (optionsMedId == 1)
                          && parseInt(optionsMedAmount) > parseInt(step1Res.cancelHealthFsa)
                          && isSubmitted)
                          ? "error-span cert r2"
                          : (step1Res && (optionsMedId == 2)
                            && parseInt(optionsMedAmount) > parseInt(step1Res.cancelEmpHealthCoverHsa)
                            && isSubmitted)
                            ? "error-span cert r2"
                            : (step1Res && (optionsMedId == 3)
                              && parseInt(optionsMedAmount) > parseInt(step1Res.cancelAllHealthCoverHsa)
                              && isSubmitted)
                              ? "error-span cert r2"
                              :
                              "error-span"
                    }
                  >
                    {
                      (step1Res && (optionsMedId == 1)
                        && cancelMedical && !optionsMedAmount
                        && isSubmitted)
                        ? "Please enter amount"
                        : (step1Res && (optionsMedId == 1)
                          && parseInt(optionsMedAmount) > parseInt(step1Res.cancelHealthFsa)
                          && isSubmitted)
                          ? "Maximum amount allowed is " + step1Res.cancelHealthFsa
                          : (step1Res && (optionsMedId == 2)
                            && parseInt(optionsMedAmount) > parseInt(step1Res.cancelEmpHealthCoverHsa)
                            && isSubmitted)
                            ? "Maximum amount allowed is " + step1Res.cancelEmpHealthCoverHsa
                            : (step1Res && (optionsMedId == 3)
                              && parseInt(optionsMedAmount) > parseInt(step1Res.cancelAllHealthCoverHsa)
                              && isSubmitted)
                              ? "Maximum amount allowed is " + step1Res.cancelAllHealthCoverHsa
                              :
                              ""
                    }

                  </div>

                </Grid>
              )}
            </Grid> */}
          </Grid>
        )
          :
          <></>
        }

        {step1Res
          && (step1Res.dependentOption != 5
          ) ? (
          <Grid container  className="cancel">
            <Grid item xs={12} md={2}>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Cancel Dental"
                  onChange={handleDentalBoxChange}
                  checked={cancelDental}
                />
              </FormGroup>
            </Grid>
          </Grid>
        )
          :
          <></>
        }

        {step1Res
          && (step1Res.dependentOption != 5
          ) ? (
          <Grid container className="cancel">
            <Grid item xs={12} md={2}>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Cancel Vision"
                  onChange={handleVisionBoxChange}
                  checked={cancelVision}
                />
              </FormGroup>
            </Grid>
          </Grid>
        )
          :
          <></>
        }

        {/* <div
          className={
            !cancelMedical && !cancelDental && !cancelVision && isSubmitted && step1Res && step1Res.dependentOption != 5 ? "error-span cert anyone" : "error-span"
          }
        >
          {!cancelMedical && !cancelDental && !cancelVision && isSubmitted && step1Res && step1Res.dependentOption != 5 ? "Please select any one above" : ""}
        </div> */}
        <Grid container sx={{ margin: "14px 0px" }}>
          <Grid item xs={12} md={6}>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                label="Cancel or Change Dependent Care FSA Annual Contribution/Goal Amount:"
                onChange={handleDependentFSABoxChange}
                checked={cancelDependentFsa}
              />
            </FormGroup>
          </Grid>

          <Grid item xs={12} md={4}>
            {cancelDependentFsa && (
              <FormControl fullWidth sx={{ m: 1, ml: 0 }} className="max-amount">
                <InputLabel htmlFor="outlined-adornment-amount"></InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  label=""
                  name="cancelDependentFsaAmount"
                  placeholder={
                    (step1Res &&
                      "Maximum " + "$" + step1Res.cancelDependentFsa
                    )
                  }
                  value={cancelDependentFsaAmount}
                  onChange={(e: any) => {
                    setCancelDependentFsaAmount(e.target.value);
                    formik.handleChange(e);
                  }}

                />
              </FormControl>
            )}

            <div
              className={
                (cancelDependentFsa && !cancelDependentFsaAmount
                  && isSubmitted)
                  ? "error-span cert "
                  :
                  (cancelDependentFsa && step1Res
                    && (
                      parseInt(cancelDependentFsaAmount) > parseInt(step1Res.cancelDependentFsa)
                      ||
                      parseInt(cancelDependentFsaAmount) <= 0
                    )
                    && isSubmitted)
                    ? "error-span cert "
                    :
                    "error-span"
              }
            >
              {
                (cancelDependentFsa && !cancelDependentFsaAmount
                  && isSubmitted)
                  ? "Please enter amount"
                  : (cancelDependentFsa && step1Res
                    && (
                      parseInt(cancelDependentFsaAmount) > parseInt(step1Res.cancelDependentFsa)
                      ||
                      parseInt(cancelDependentFsaAmount) <= 0
                    )
                    && isSubmitted)
                    ? "Please enter a value between $0 and $" + step1Res.cancelDependentFsa + "."
                    :
                    ""
              }

            </div>

          </Grid>

        </Grid>

        <div
          className={
            !cancelDependentFsa && step1Res && step1Res.dependentOption == 5 && isSubmitted ? "error-span cert" : "error-span"
          }
        >
          {!cancelDependentFsa && step1Res && step1Res.dependentOption == 5 && isSubmitted ? "Please select FSA option" : ""}
        </div>


        {/**START*****************************************************/}
        <Grid container >
          <Grid item xs={12} >
            <FormControl fullWidth>
              <InputLabel className="label">
                Optional: Cancel in or Change Health Care Flexible Spending Account (FSA) Annual Contribution/Goal Amount:
              </InputLabel>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4} className="label_input">
            <FormControl fullWidth className="label_width">
              <InputLabel htmlFor="outlined-adornment-amount"></InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount max"
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                label=""
                placeholder={(step1Res && "Maximum " + "$" + step1Res.cancelHealthFsa)}
                name="cancelHealthAnnualFsa"
                value={cancelHealthAnnualFsa}
                onChange={(e: any) => {
                  setCancelHealthAnnualFsa(e.target.value);
                  formik.handleChange(e);
                }}
              />
            </FormControl>

            <div
              className={
                (step1Res
                  && (
                    parseInt(cancelHealthAnnualFsa) > parseInt(step1Res.cancelHealthFsa)
                    ||
                    parseInt(cancelHealthAnnualFsa) <= 0
                  )
                  && isSubmitted)
                  ? "error-span cert "
                  :
                  "error-span"
              }
            >
              {
                (step1Res
                  && (
                    parseInt(cancelHealthAnnualFsa) > parseInt(step1Res.cancelHealthFsa)
                    ||
                    parseInt(cancelHealthAnnualFsa) <= 0
                  )
                  && isSubmitted)
                  ? "Please enter a value between $0 and $" + + step1Res.cancelHealthFsa + "."
                  :
                  ""
              }

            </div>
          </Grid>
        </Grid>
        {/**END *****************************************************/}

        {/**START*****************************************************/}
        <Grid container sx={{ margin: "0px 0px" }}>
          <Grid item xs={12} >
            <FormControl fullWidth>
              <InputLabel className="label_1">
                Employee Only Coverage Optional: Cancel in or Change Health Care Health Savings Account (HSA) Annual Contribution/Goal Amount:
              </InputLabel>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4} className="label_input1">
            <FormControl fullWidth sx={{ m: 1 }} className="label_width" >
              <InputLabel htmlFor="outlined-adornment-amount"></InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount max"
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                label=""
                placeholder={(step1Res && "Maximum " + "$" + step1Res.cancelEmpHealthCoverHsa)}
                name="cancelEmpOnlyHsa"
                value={cancelEmployeeHsa}
                onChange={(e: any) => {
                  setCancelEmployeeHsa(e.target.value);
                  formik.handleChange(e);
                }}
              />
            </FormControl>

            <div
              className={
                (step1Res
                  && (
                    parseInt(cancelEmployeeHsa) > parseInt(step1Res.cancelEmpHealthCoverHsa)
                    ||
                    parseInt(cancelEmployeeHsa) <= 0
                  )
                  && isSubmitted)
                  ? "error-span cert "
                  :
                  "error-span"
              }
            >
              {
                (step1Res
                  && (
                    parseInt(cancelEmployeeHsa) > parseInt(step1Res.cancelEmpHealthCoverHsa)
                    ||
                    parseInt(cancelEmployeeHsa) <= 0
                  )
                  && isSubmitted)
                  ? "Please enter a value between $0 and $" + step1Res.cancelEmpHealthCoverHsa + "."
                  :
                  ""
              }

            </div>
          </Grid>
        </Grid>
        {/**END *****************************************************/}

        {/**START*****************************************************/}
        <Grid container sx={{ margin: "0px 0px" }}>
          <Grid item xs={12} className="label_align" >
            <FormControl fullWidth>
              <InputLabel className="label_2">
                All Other Coverage Optional: Cancel in or Change Health Care Health Savings Account (HSA) Annual Contribution/Goal Amount:
              </InputLabel>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4} className="label_input2">
            <FormControl fullWidth sx={{ m: 1 }} className="label_width">
              <InputLabel htmlFor="outlined-adornment"></InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount max"
                startAdornment={
                  <InputAdornment position="start" >$</InputAdornment>
                }
                label=""
                placeholder={(step1Res && "Maximum " + "$" + step1Res.cancelAllHealthCoverHsa)}
                name="cancelCoverHealthAnnualHsa"
                value={cancelCoverHealthAnnualHsa}
                onChange={(e: any) => {
                  setCancelCoverHealthAnnualHsa(e.target.value);
                  formik.handleChange(e);
                }}
              />
            </FormControl>

            <div
              className={
                (step1Res
                  && (
                    parseInt(cancelCoverHealthAnnualHsa) > parseInt(step1Res.cancelAllHealthCoverHsa)
                    ||
                    parseInt(cancelCoverHealthAnnualHsa) <= 0
                  )
                  && isSubmitted)
                  ? "error-span cert "
                  :
                  "error-span"
              }
            >
              {
                (step1Res
                  && (
                    parseInt(cancelCoverHealthAnnualHsa) > parseInt(step1Res.cancelAllHealthCoverHsa)
                    ||
                    parseInt(cancelCoverHealthAnnualHsa) <= 0
                  )
                  && isSubmitted)
                  ? "Please enter a value between $0 and $" + step1Res.cancelAllHealthCoverHsa + "."
                  :
                  ""
              }

            </div>
          </Grid>
        </Grid>
        {/**END *****************************************************/}

        <div
          className={
            !cancelMedical && !cancelDental && !cancelVision && isSubmitted && step1Res && step1Res.dependentOption != 5 ? "error-span cert anyone" : "error-span"
          }
        >
          {!cancelMedical && !cancelDental && !cancelVision && isSubmitted && step1Res && step1Res.dependentOption != 5 ? "Please select from the above options" : ""}
        </div>


        {/* <Typography className="ques-styling" variant="h6" sx={{ position: "relative", top: "30px" }}> */}
        {step1Res
          && (step1Res.dependentOption == 1
            || step1Res.dependentOption == 4
            || step1Res.dependentOption == 7
            || step1Res.dependentOption == 8
            || step1Res.dependentOption == 6) ? (
          <Typography className="ques-styling select" variant="h6" sx={{ position: "relative", bottom: "19px" }}>
            Select individuals to cancel from coverage
          </Typography>)
          :
          ""
        }

        {/* {step1Res && step1Res.dependentOption == 1 && !cancelSpouse && !cancelChild && !cancelDP && !cancelDPChild ? (
          <Typography className="error-span cert error1" variant="h6" >
            Please select atleast one dependent
          </Typography>)
          :
          ""
        } */}
        {/* {step1Res && step1Res.dependentOption == 2
          && !cancelChild ? (
          <Typography className="error-span cert error1" variant="h6" >
            Please select atleast one dependent child
          </Typography>)
          :
          ""
        } */}
        {/* {step1Res && step1Res.dependentOption == 4
          && !cancelChild && (!cancelSpouse || !cancelDP) ? (
          <Typography className="error-span cert error1" variant="h6" >
            Please select atleast one dependent child and select either spouse or domestic Partner
          </Typography>)
          :
          ""
        }
        {step1Res && step1Res.dependentOption == 6
          && !cancelChild ? (
          <Typography className="error-span cert error1" variant="h6" >
            Please select atleast one dependent child
          </Typography>)
          :
          ""
        }
        {step1Res && step1Res.dependentOption == 7
          && !cancelChild && !cancelSpouse ? (
          <Typography className="error-span cert error1" variant="h6" >
            Please select atleast one dependent child and spouse
          </Typography>)
          :
          ""
        }
        {step1Res && step1Res.dependentOption == 8
          && !cancelDP && !cancelDPChild ? (
          <Typography className="error-span cert error1" variant="h6" >
            Please select atleast one domestic partner's child and domestic partner
          </Typography>)
          :
          ""
        } */}

        <Grid container sx={{ margin: "27px 0px" }}>
          {console.log(step1Res && step1Res.dependentOption)}
          {step1Res
            && (step1Res.dependentOption == 1
              || step1Res.dependentOption == 4
            ) ? (
            <Grid item xs={12} md={6} className="spouse" >
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Employee"
                  onChange={handleCancelEmployee}
                  checked={cancelEmployee}
                />
              </FormGroup>
            </Grid>
          )
            :
            <></>
          }
        </Grid>
        {/* <Grid container sx={{ marginBottom: "-2%" }}>
          {step1Res
            && (step1Res.dependentOption == 1
              || step1Res.dependentOption == 4
            ) ? (
            <Grid item xs={12} md={6} sx={{ marginLeft: "-5px" }}>
              <Candidate_form title={"Employee"}
                formData={formData}
                setFormData={setFormData}
                employee={step1Res.benefitDetails.employee}
                child={step1Res.benefitDetails.child}
                dpChild={step1Res.benefitDetails.domesticPartnersChild}
                spouse={step1Res.benefitDetails.spouse}
                domesticPartner={step1Res.benefitDetails.domesticPartner}
                childrenData={[]}
                action={step1Res && (step1Res.benefitDetails.child || step1Res.benefitDetails.domesticPartnersChild) ? "edit" : "add"}
                isSubmitted={isSubmitted}
                enabled={cancelEmployee}
              />
            </Grid>
          )
            :
            <></>
          }
        </Grid> */}

        <Grid container className="spouse_checkbox">
          {console.log(step1Res && step1Res.dependentOption)}
          {step1Res
            && (step1Res.dependentOption == 1
              || step1Res.dependentOption == 4
              || step1Res.dependentOption == 7) ? (
            <Grid item xs={12} md={6} className="spouse">
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Spouse"
                  onChange={handleCancelSpouse}
                  checked={cancelSpouse}
                />
              </FormGroup>
            </Grid>
          )
            :
            <></>
          }
        </Grid>
        <Grid container sx={{ marginBottom: "-2%" }}>
          {step1Res
            && (step1Res.dependentOption == 1
              || step1Res.dependentOption == 4
              || step1Res.dependentOption == 7) ? (
            <Grid item xs={12} md={6} sx={{ marginLeft: "-5px" }}>
              <Candidate_form title={"Spouse"}
                formData={formData}
                setFormData={setFormData}
                employee={step1Res.benefitDetails.employee}
                child={step1Res.benefitDetails.child}
                dpChild={step1Res.benefitDetails.domesticPartnersChild}
                spouse={step1Res.benefitDetails.spouse}
                domesticPartner={step1Res.benefitDetails.domesticPartner}
                childrenData={[]}
                action={step1Res && (step1Res.benefitDetails.child || step1Res.benefitDetails.domesticPartnersChild) ? "edit" : "add"}
                isSubmitted={isSubmitted}
                enabled={cancelSpouse}
              />
            </Grid>
          )
            :
            <></>
          }
        </Grid>

        <Grid container sx={{ margin: "0px 0px 25px 0px" }} >
          {step1Res && (step1Res.dependentOption == 1
            || step1Res.dependentOption == 2
            || step1Res.dependentOption == 4
            || step1Res.dependentOption == 6
            || step1Res.dependentOption == 7) ? (
            <Grid item xs={12} md={8} className="spouse1" >
              <FormGroup>
                <FormControlLabel
                  className="Child"
                  control={<Checkbox />}
                  label="Dependent Child"
                  onChange={handleCancelChild}
                  checked={cancelChild}
                />
              </FormGroup>
            </Grid>
          )
            :
            <></>
          }
        </Grid>
        <Grid container >
          {step1Res && (step1Res.dependentOption == 1
            || step1Res.dependentOption == 2
            || step1Res.dependentOption == 4
            || step1Res.dependentOption == 6
            || step1Res.dependentOption == 7) ? (
            <Grid item xs={12} md={6}>
              {console.log(cancelChild)}
              {console.log("here")}
              {console.log(childArray)}
              <Candidate_form title={"Spouse's Child(ren)"}
                formData={formData}
                setFormData={setFormData}
                employee={step1Res.benefitDetails.employee}
                child={step1Res.benefitDetails.child}
                dpChild={step1Res.benefitDetails.domesticPartnersChild}
                spouse={step1Res.benefitDetails.spouse}
                domesticPartner={step1Res.benefitDetails.domesticPartner}
                childrenData={handleChild}
                action={step1Res && (step1Res.benefitDetails.child || step1Res.benefitDetails.domesticPartnersChild) ? "edit" : "add"}
                isSubmitted={isSubmitted}
                enabled={cancelChild}
              />
            </Grid>
          )
            :
            <></>
          }
        </Grid>

        <Grid container sx={{ margin: "27px 0px", marginTop: "-30px" }}>
          {step1Res && (step1Res.dependentOption == 1 || step1Res.dependentOption == 4 || step1Res.dependentOption == 8) ? (
            <Grid item xs={12} md={8} className="spouse">
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Domestic Partner"
                  onChange={handleCancelDP}
                  checked={cancelDP}
                />
              </FormGroup>
            </Grid>
          )
            :
            <></>
          }
        </Grid>
        <Grid container >
          {step1Res && (step1Res.dependentOption == 1 || step1Res.dependentOption == 4 || step1Res.dependentOption == 8) ? (
            <Grid item xs={12} md={6} sx={{ marginLeft: "-5px" }}>
              <Candidate_form title={"Domestic Partner"}
                formData={formData}
                setFormData={setFormData}
                employee={step1Res.benefitDetails.employee}
                child={step1Res.benefitDetails.child}
                dpChild={step1Res.benefitDetails.domesticPartnersChild}
                spouse={step1Res.benefitDetails.spouse}
                domesticPartner={step1Res.benefitDetails.domesticPartner}
                childrenData={[1]}
                action={step1Res && (step1Res.benefitDetails.child || step1Res.benefitDetails.domesticPartnersChild) ? "edit" : "add"}
                isSubmitted={isSubmitted}
                enabled={cancelDP}
              />
            </Grid>
          )
            :
            <></>
          }
        </Grid>

        <Grid container className="Domestic ">
          {step1Res && (step1Res.dependentOption == 1 || step1Res.dependentOption == 8) ? (
            <Grid item xs={12} md={8} className="spouse2">
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Domestic Partner's Child"
                  onChange={handleCancelDPChild}
                  checked={cancelDPChild}
                />
              </FormGroup>
            </Grid>
          )
            :
            <></>
          }
        </Grid>
        <Grid container sx={{ margin: "-8px 0px 40px 0px" }} className="Domestic Partner's">
          {console.log("arrrrr")}
          {console.log(dpChildArray)}
          {step1Res && (step1Res.dependentOption == 1 || step1Res.dependentOption == 8) ? (
            <Grid item xs={12} md={6} sx={{ marginLeft: "-5px" }}>
              <Candidate_form title={"Domestic Partner's Child(ren)"}
                formData={formData}
                setFormData={setFormData}
                employee={step1Res.benefitDetails.employee}
                child={step1Res.benefitDetails.child}
                dpChild={step1Res.benefitDetails.domesticPartnersChild}
                spouse={step1Res.benefitDetails.spouse}
                domesticPartner={step1Res.benefitDetails.domesticPartner}
                childrenData={handleDPChild}
                action={step1Res && (step1Res.benefitDetails.child || step1Res.benefitDetails.domesticPartnersChild) ? "edit" : "add"}
                isSubmitted={isSubmitted}
                enabled={cancelDPChild}
              />
            </Grid>
          )
            :
            <></>
          }
        </Grid>

        {isSubmitted && !cancelSpouse && !cancelChild && !cancelDP && !cancelDPChild ? (
          <Typography className="error-span cert individuals" variant="h6" >
            Please select atleast one of the above individuals.
          </Typography>)
          :
          ""
        }
        {/* {step1Res && step1Res.dependentOption == 2
          && !cancelChild ? (
          <Typography className="error-span cert error1" variant="h6" >
            Please select atleast one dependent child
          </Typography>)
          :
          ""
        } */}
        {/* {step1Res && step1Res.dependentOption == 4
          && !cancelChild && (!cancelSpouse || !cancelDP) ? (
          <Typography className="error-span cert error1" variant="h6" >
            Please select atleast one dependent child and select either spouse or domestic Partner
          </Typography>)
          :
          ""
        }
        {step1Res && step1Res.dependentOption == 6
          && !cancelChild ? (
          <Typography className="error-span cert error1" variant="h6" >
            Please select atleast one dependent child
          </Typography>)
          :
          ""
        }
        {step1Res && step1Res.dependentOption == 7
          && !cancelChild && !cancelSpouse ? (
          <Typography className="error-span cert error1" variant="h6" >
            Please select atleast one dependent child and spouse
          </Typography>)
          :
          ""
        }
        {step1Res && step1Res.dependentOption == 8
          && !cancelDP && !cancelDPChild ? (
          <Typography className="error-span cert error1" variant="h6" >
            Please select atleast one domestic partner's child and domestic partner
          </Typography>)
          :
          ""
        } */}
        <Typography className="ques-styling Additional" variant="h6" style={{ marginBottom: "10px" }} >
          Additional Comments
        </Typography>

        <Grid>
          <TextField
            id="outlined-basic"
            label="  comments here"
            variant="outlined"
            name="comments"
            fullWidth
            value={formik.values.comments}
            onChange={formik.handleChange}
            error={formik.touched.comments && Boolean(formik.errors.comments)}
            helperText={formik.touched.comments && formik.errors.comments}
          />
        </Grid>

        <Typography className="ques-styling Benefit" variant="h5" >
          Benefit Change Confirmation
        </Typography>

        <Grid container >
          <Grid>
            <FormGroup>
              <FormControlLabel
                label="I confirm that the requested benefit changes above are the only benefit changes that I'm requesting, and I authorize VCG to make these changes on my behalf. I understand that VCG will only make the benefit changes that I am eligible for based on my qualifying life event and the documentation I submit. Further, I understand that by authorizing and making changes to my benefits, there may be a change to my per paycheck benefit deductions, and I authorize Randstad to deduct from my earnings the amount for the coverage selected."
                value="end"
                id="qleCertBox"
                name="qleCertBox"
                control={<Checkbox className="alignment-ck-bx checkbox1" />}
                labelPlacement="end"
                sx={{ fontSize: ".875rem !important" }}
                onChange={handleBenefitCertBoxChange}
                checked={benefitCertBoxStatus}
              />
            </FormGroup>
          </Grid>
          <div
            className={
              !benefitCertBoxStatus && isSubmitted
                ? "error-span cert check"
                : "error-span"
            }
          >
            {!benefitCertBoxStatus && isSubmitted
              ? "Please accept information provide"
              : ""}
          </div>
        </Grid>

        <Grid container sx={{ marginTop: "20px" }}>
          <Grid>
            <FormGroup>
              <FormControlLabel
                value="end"
                id="qleCertBox"
                name="qleCertBox"
                control={<Checkbox className="alignment-ck-bx checkbox2" />}
                label="I certify that all of the information provided is true and correct. I further understand that providing any fraudulent statements, falsification, or material omission of information may subject me to discipline, up to and including termination of employment."
                labelPlacement="end"
                sx={{ fontSize: ".875rem !important" }}
                onChange={handleInfoCertBoxChange}
                checked={infoCertBoxStatus}
              />
            </FormGroup>
          </Grid>
          <div
            className={
              !infoCertBoxStatus && isSubmitted
                ? "error-span cert check"
                : "error-span"
            }
          >
            {!infoCertBoxStatus && isSubmitted
              ? "Please accept information provide"
              : ""}
          </div>
        </Grid>
        <Grid container style={{ marginLeft: "35px", marginTop: "37px" }}>
          <Grid item xs={12} md={3} >
            <TextField
              id="outlined-basic"
              label="Please type your first and last name here"
              variant="outlined"
              name="commenterName"
              // fullWidth
              value={formik.values.commenterName}
              onChange={formik.handleChange}
              error={formik.touched.commenterName && Boolean(formik.errors.commenterName)}
              helperText={formik.touched.commenterName && formik.errors.commenterName}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          sx={{
            backgroundColor: "red",
            "&:hover": {
              backgroundColor: "orange",
            },
            marginTop: "15px"
          }}
          variant="contained"
          className="flex-end btn-bg-red"
        >
          {completedSteps() === totalSteps() - 1
            ? "Submit"
            : "Save and continue"}
        </Button>
      </Box>
    </form>
  );
};

export default RequestBenefitChangesCancel;
