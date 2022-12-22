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
// import React from "react";
import { Link, useNavigate } from "react-router-dom";
import FormGroup from "@mui/material/FormGroup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { fetchSTEP2Request } from "../../actions/step2Actions";
import { Formik, useFormik, useFormikContext } from "formik";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import SelectBoxes from "../RequestBenefitChanges_SelectBoxes";

import Candidate_form from "../RequestBenefitChanges_Candidate_Details";
import { AnySchema } from "yup";
import { IStep2Form } from "../../interfaces/types";
import "./style.css";
import { getSTEP2EnteredDetails } from "../../reducers/step2Reducer";
import { getSTEP1EnteredDetails } from "../../reducers/step1Reducer";
import { fetchPlanRequest } from "../../actions/planActions";
import { getPlanDetails } from "../../reducers/planReducer";
import {
  coverageTier,
  //dentalPlans,
  FAQS,
  //medicalPlans,
  user,
  //visionPlans,
} from "./constants";
import { toast } from "react-toastify";
import { getStep1Details } from "../../reducers/getStep1Reducer";
import { fetchGetStep1Request } from "../../actions/getStep1Actions";
import { useParams } from "react-router-dom";
import ReactHtmlParser from 'html-react-parser';
import { DataArrayTwoTone, LegendToggle } from "@mui/icons-material";
import { domainToASCII } from "url";
import moment from "moment";

import useBeforeUnload from "../../useBeforeUnload"
import { setDefaultResultOrder } from "dns";
import StorageService from "../../services/Storage.service";

const steps = [
  "Start My QLE",
  "Request Benefit Changes",
  "Upload Documentation",
];
const RequestBenefitChanges = ({ amountPlaceholder, plan }: any) => {
  let employerNameCoki = StorageService.getCookies("employerName");
  const [goalAmount, setGoalAmount] = useState(false);
  const [selectedMedicalPlan, setSelectedMedicalPlan] = useState("0");
  const [selectedDentalPlan, setSelectedDentalPlan] = useState("0");
  const [selectedVisionPlan, setSelectedVisionPlan] = useState("0");
  const [selectedPlan, setSelectedPlan] = useState(0);
  const [selectedTier, setSelectedTier] = useState(0);
  const [isTierChanged, setIsTierChanged] = useState(false);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});
  const [formError, setFormError] = useState(false);

  // const PromptIfDirty = () => {
  //   const formik = useFormikContext();
  //   return (
  //     <Prompt
  //       when={formik.dirty && formik.submitCount === 0}
  //       message="Are you sure you want to leave? You have with unsaved changes."
  //     />
  //   );
  // };

  //const formik = useFormikContext();
  // useBeforeUnload({
  //   when: {formik.dirty && formik1.submitCount === 0}
  //   message: 'Are you sure you want to leave?',
  // })



  const dispatch = useDispatch();
  let params = useParams();

  const handleRender = () => { };
  const completedSteps = () => {
    return Object.keys(completed).length;
  };
  const totalSteps = () => {
    return steps.length;
  };

  const [enrollInMedical, setEnrollInMedical] = React.useState(false);
  const handleMedicalBoxChange = (e: any) => {
    let valStatus = e.target.checked;
    if (e.target.checked == true) {
      setEnrollInMedical(true);
    } else {
      setEnrollInMedical(false);
    }
  };

  const [enrollInDental, setEnrollInDental] = React.useState(false);
  //const [contactCertBoxStatus, setContactCertBoxStatus] = React.useState(false);
  const handleDentalBoxChange = (e: any) => {
    let valStatus = e.target.checked;
    if (e.target.checked == true) {
      setEnrollInDental(true);
    } else {
      setEnrollInDental(false);
    }
  };

  const [enrollInVision, setEnrollInVision] = React.useState(false);
  const handleVisionBoxChange = (e: any) => {
    let valStatus = e.target.checked;
    if (e.target.checked == true) {
      setEnrollInVision(true);
    } else {
      setEnrollInVision(false);
    }
  };

  const [enrollInDependentFSA, setEnrollInDependentFSA] = React.useState(false);
  const handleDependentFSABoxChange = (e: any) => {
    let valStatus = e.target.checked;
    if (e.target.checked == true) {
      setEnrollInDependentFSA(true);
    } else {
      setEnrollInDependentFSA(false);
    }
  };

  const [optionsMedAmount, setOptionsMedAmount] = React.useState("");
  const [dependentFsaAmount, setDependentFsaAmount] = React.useState("");

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

  const [enrollCertBoxStatus, setEnrollCertBoxStatus] = useState(false);
  const handleEnrollCertBoxChange = (e: any) => {
    let valStatus = e.target.checked;
    if (e.target.checked == true) {
      setEnrollCertBoxStatus(true);
    } else {
      setEnrollCertBoxStatus(false);
    }
  };
  const [isSubmitted, setSubmitted] = useState(false);

  const validationSchema = yup.object({
    //comments: yup.string().required("Field is required"),
    //commenterName: yup.string().required("Field is required"),
    //annualFsa: yup.string().required("Field is required"),
    //dependentFsa: yup.string().required("Field is required"),
    //medPlanId: yup.string().required("Field is required"),
    //medCoverageTier: yup.string().required("Field is required"),
    //dentCoverageTier: yup.string().required("Field is required"),
    //dentPlanId: yup.string().required("Field is required"),
    //visionCoverageTier: yup.string().required("Field is required"),
    //visionPlanId: yup.string().required("Field is required"),
    //optMedFsa: yup.string().required("Field is required"),
  });

  // for save step 2
  const [formData, setFormData] = useState<any>([]);
  const [selectedCoverages, setSelectedCoverages] = useState<any>([]);
  let dependentSet: any = [];

  const formatDependentArr = (arr: any) => {

    arr.forEach((element: any) => {

      let data = {
        dependentType: "",
        firstName: "",
        lastName: "",
        middleName: "",
        ssn: "",
        dob: "",
        gender: "",
        enrolledIn: "",
        elgForMedCare: "No",
        elgForRanstadBenefits: "No",
        coverageThroughEmp: "No",
        childTypeIn: "",
      }

      if (element.title.includes("Child(ren)")) {
        if (element.title.includes("Domestic")) {
          data.dependentType = "3";
        }
        else {
          data.dependentType = "1";
        }
      }
      else if (element.title == "Spouse")
        data.dependentType = "0";
      else if (element.title == "Domestic Partner")
        data.dependentType = "2";
      // else if (element.title == "Domestic Partner's Child(ren)")
      //   data.dependentType = "3";

      data.firstName = element.firstName;
      data.lastName = element.lastName;
      data.middleName = element.middleName;
      data.ssn = element.SSN;
      //data.dob = element.dob;
      data.dob = moment(new Date(element.dob)).format("MM/DD/YYYY");
      data.gender = element.gender;

      let enrollData = element.enrollIn.length > 0 ? element.enrollIn.join("And") : element.enrollIn.join("");
      if (enrollData == "Medical")
        data.enrolledIn = "1";
      else if (enrollData == "Dental")
        data.enrolledIn = "2";
      else if (enrollData == "Vision")
        data.enrolledIn = "3";
      else if (enrollData == "MedicalAndDental" || enrollData == "DentalAndMedical")
        data.enrolledIn = "4";
      else if (enrollData == "MedicalAndVision" || enrollData == "VisionAndMedical")
        data.enrolledIn = "5";
      else if (enrollData == "DentalAndVision" || enrollData == "VisionAndDental")
        data.enrolledIn = "6";
      else if (enrollData == "")
        data.enrolledIn = "";
      else
        data.enrolledIn = "0";

      data.elgForMedCare = element.eligibleForMedicare ? element.eligibleForMedicare : "No";
      data.elgForRanstadBenefits = element.eligibleForRanstad ? element.eligibleForRanstad : "No";
      data.coverageThroughEmp = element.hasAccessToCoverage ? element.hasAccessToCoverage : "No";

      data.childTypeIn = element.childTypeIn;

      dependentSet.push(data);

    });
  }

  const handleTier1 = (e: any) => {

    let tierRow: any = coverageTier.find(x => x.value == e.target.value);
    let tierName: any = tierRow.options.join(",");

    if (selectedCoverages.length > 0) {
      if (selectedCoverages.findIndex((x: any) => x.name == "medCoverageTier") == -1
        && selectedCoverages.findIndex((x: any) => x.name == "dentCoverageTier") == -1
        && selectedCoverages.findIndex((x: any) => x.name == "visionCoverageTier") == -1) {
        selectedCoverages.push({
          name: e.target.name,
          value: e.target.value,
          tier: tierName
        })
      }
      else {
        if (e.target.name == "medCoverageTier") {
          let idx = selectedCoverages.findIndex((x: any) => x.name == "medCoverageTier");
          if (idx >= 0) {
            selectedCoverages.splice(idx, 1);
          }
          selectedCoverages.push({
            name: e.target.name,
            value: e.target.value,
            tier: tierName
          })
        }
        else if (e.target.name == "dentCoverageTier") {
          let idx = selectedCoverages.findIndex((x: any) => x.name == "dentCoverageTier");
          if (idx >= 0) {
            selectedCoverages.splice(idx, 1);
          }
          selectedCoverages.push({
            name: e.target.name,
            value: e.target.value,
            tier: tierName
          })
        }
        else if (e.target.name == "visionCoverageTier") {
          let idx = selectedCoverages.findIndex((x: any) => x.name == "visionCoverageTier");
          if (idx >= 0) {
            selectedCoverages.splice(idx, 1);
          }
          selectedCoverages.push({
            name: e.target.name,
            value: e.target.value,
            tier: tierName
          })
        }
      }
    }
    else {
      selectedCoverages.push({
        name: e.target.name,
        value: e.target.value,
        tier: tierName
      })
    }
    const { value, name } = e.target;
    switch (name) {
      case "medCoverageTier":
        setSelectedMedicalPlan(value);
        break;
      case "dentCoverageTier":
        setSelectedDentalPlan(value);
        break;
      case "visionCoverageTier":
        setSelectedVisionPlan(value);
        break;
      default:
        break;
    }
  };

  const [medicalPlans, setMedicalPlans] = useState([]);
  const [dentalPlans, setDentalPlans] = useState([]);
  const [visionPlans, setVisionPlans] = useState([]);

  const planRes = useSelector(getPlanDetails);
  useEffect(() => {
    getPlansByEmployerId();
  }, []);

  const getPlansByEmployerId = () => {
    dispatch(
      fetchPlanRequest({})
    );
  };

  useEffect(() => {
    if (planRes && planRes.response) {
      if (planRes.response.medicalPlans) {
        setMedicalPlans(planRes.response.medicalPlans);
      }
      if (planRes.response.dentalPlans)
        setDentalPlans(planRes.response.dentalPlans);
      if (planRes.response.visionPlan)
        setVisionPlans(planRes.response.visionPlan);
      getStep1ByEventId();
    }
  }, [planRes]);

  let step1Res: any = useSelector(getStep1Details);

  useEffect(() => {
    step1Res = null;
    getStep1ByEventId();
  }, []);

  const getStep1ByEventId = () => {
    step1Res = null;
    let eventToken = StorageService.getCookies("eventToken");
    let token: any = params.token ? params.token : eventToken;
    if (token && token !== "0")
      dispatch(
        fetchGetStep1Request({ token })
      );
  };

  useEffect(() => {
    // let id: any = params.eventId;
    let eventToken = StorageService.getCookies("eventToken");
    let token: any = params.token ? params.token : eventToken;
    // if (parseInt(id) > 0) {
    if (token) {
      // if (step1Res && step1Res['eventId'] > 0 && step1Res['step'] == 2) {
      if (step1Res && step1Res['eventId'] > 0 && step1Res['step'] == 2) {
        setInitialValues({
          eventId: step1Res['eventId'],
          comments: step1Res['benefitDetails'].comments,
          commenterName: step1Res['commenterName'],
          dependentFsa: step1Res['benefitDetails'].dependentFsa,
          medCoverageTier: step1Res['benefitDetails'].medCoverageTier,
          medPlanId: step1Res['benefitDetails'].medPlanId,
          dentCoverageTier: step1Res['benefitDetails'].dentCoverageTier,
          dentPlanId: step1Res['benefitDetails'].dentPlanId,
          visionCoverageTier: step1Res['benefitDetails'].visionCoverageTier,
          visionPlanId: step1Res['benefitDetails'].visionPlanId,
          optMedFsa: step1Res['benefitDetails'].optMedFsa,
          optMedHsa: step1Res['benefitDetails'].optMedHsa,
          confirmationNumber: step1Res['confirmationNumber'],
          dependentSet: step1Res['benefitDetails'].dependentSet,
        });

        if (step1Res['benefitDetails'] && step1Res['benefitDetails'].medPlanId) {
          setEnrollInMedical(true);
        }
        if (step1Res['benefitDetails'] && (step1Res['benefitDetails'].medPlanId == 1 || step1Res['benefitDetails'].medPlanId == 2
          || step1Res['benefitDetails'].medPlanId == 3)) {
          setOptionsMedAmount(step1Res.benefitDetails.optMedFsa);
        }
        else if (step1Res['benefitDetails'] && step1Res['benefitDetails'].medPlanId == 4) {
          setOptionsMedAmount(step1Res.benefitDetails.optMedHsa);
        }

        if (step1Res['benefitDetails'] && step1Res['benefitDetails'].dentPlanId) {
          setEnrollInDental(true);
        }
        if (step1Res['benefitDetails'] && step1Res['benefitDetails'].visionPlanId) {
          setEnrollInVision(true);
        }

        if (step1Res['benefitDetails'] && step1Res['benefitDetails'].dependentFsa) {
          setEnrollInDependentFSA(true);
        }
        if (step1Res['benefitDetails'] && (step1Res['benefitDetails'].dependentFsa)) {
          setDependentFsaAmount(step1Res.benefitDetails.dependentFsa);
        }

        setBenefitCertBoxStatus(true);
        setInfoCertBoxStatus(true);
        setEnrollCertBoxStatus(true);

        if (step1Res['benefitDetails'].medCoverageTier) {
          setSelectedMedicalPlan(step1Res['benefitDetails'].medCoverageTier);
          let tierRow: any = coverageTier.find(x => x.value == parseInt(step1Res['benefitDetails'].medCoverageTier));
          let tierName: any = tierRow.options.join(",");
          if (selectedCoverages.findIndex((x: any) => x.name == "medCoverageTier") == -1)
            selectedCoverages.push({
              name: "medCoverageTier",
              value: tierRow.value,
              tier: tierName
            })
        }
        if (step1Res['benefitDetails'].dentCoverageTier) {
          setSelectedDentalPlan(step1Res['benefitDetails'].dentCoverageTier);
          let tierRow: any = coverageTier.find(x => x.value == parseInt(step1Res['benefitDetails'].dentCoverageTier));
          let tierName: any = tierRow.options.join(",");
          if (selectedCoverages.findIndex((x: any) => x.name == "dentCoverageTier") == -1)
            selectedCoverages.push({
              name: "dentCoverageTier",
              value: tierRow.value,
              tier: tierName
            })
        }
        if (step1Res['benefitDetails'].visionCoverageTier) {
          setSelectedVisionPlan(step1Res['benefitDetails'].visionCoverageTier);
          let tierRow: any = coverageTier.find(x => x.value == parseInt(step1Res['benefitDetails'].visionCoverageTier));
          let tierName: any = tierRow.options.join(",");
          if (selectedCoverages.findIndex((x: any) => x.name == "visionCoverageTier") == -1)
            selectedCoverages.push({
              name: "visionCoverageTier",
              value: tierRow.value,
              tier: tierName
            })
        }
      }
      else {
        setInitialValues({
          comments: "",
          commenterName: "",
          // annualFsa: "",
          dependentFsa: "",
          medCoverageTier: "",
          medPlanId: "",
          dentCoverageTier: "",
          dentPlanId: "",
          visionCoverageTier: "",
          visionPlanId: "",
          optMedFsa: "",
          optMedHsa: "",
          confirmationNumber: "",
          eventId: 0,
          dependentSet: [],
        });
      }
    }
  }, [step1Res]);

  const [initialValues, setInitialValues] = useState<IStep2Form>({
    comments: "",
    commenterName: "",
    //annualFsa: "",
    dependentFsa: "",
    medCoverageTier: "",
    medPlanId: "",
    dentCoverageTier: "",
    dentPlanId: "",
    visionCoverageTier: "",
    visionPlanId: "",
    optMedFsa: "",
    optMedHsa: "",
    confirmationNumber: "",
    eventId: 0,
    dependentSet: [],
  });

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: validationSchema,

    onSubmit: (values: IStep2Form) => {
      setSubmitted(true);
      if (formData && formData.length > 0) {
        let strCoverage = Array.prototype.map.call(selectedCoverages, function (item: any) { return item.tier; }).join(",");
        let arrCov = strCoverage.split(",");
        let idx = arrCov.indexOf("");
        if (idx >= 0) {
          arrCov.splice(idx, 1);
        }
        formData.forEach((e: any, index: any) => {
          let isFounded = false;
          arrCov.forEach((sub: any, idx: any) => {
            if (sub) {
              if (!e.title.includes(sub)) {
              }
              else {
                isFounded = true;
              }
            }
          })
          if (!isFounded) {
            formData.splice(index, 1);
          }
        })
      }

      formatDependentArr(formData);

      values.confirmationNumber = step1Res && step1Res.confirmationNumber ? step1Res.confirmationNumber : "";
      values.eventId = step1Res && step1Res.eventId ? step1Res.eventId : 0;
      values.dependentSet = dependentSet;

      values.optMedFsa = enrollInMedical
        && (parseInt(values.medPlanId) == 1 || parseInt(values.medPlanId) == 2 || parseInt(values.medPlanId) == 3)
        ? optionsMedAmount : "";
      values.optMedHsa = enrollInMedical
        && parseInt(values.medPlanId) == 4 ? optionsMedAmount : "";
      values.dependentFsa = enrollInDependentFSA ? dependentFsaAmount : "";

      let err = false;
      if (enrollInMedical && !values.medPlanId) err = true;
      if (enrollInDental && !values.dentPlanId) err = true;
      if (enrollInVision && !values.visionPlanId) err = true;
      if (enrollInMedical && !values.medCoverageTier) err = true;
      if (enrollInDental && !values.dentCoverageTier) err = true;
      if (enrollInVision && !values.visionCoverageTier) err = true;

      if (
        enrollInMedical && step1Res
        && (parseInt(values.medPlanId) == 1 || parseInt(values.medPlanId) == 2 || parseInt(values.medPlanId) == 3)
        && parseInt(optionsMedAmount) > parseInt(step1Res.optionalMedFsa)
      ) {
        err = true;
      }
      else if (
        enrollInMedical && step1Res
        && parseInt(values.medPlanId) == 4
        && parseInt(values.medCoverageTier) == 1
        && parseInt(optionsMedAmount) > parseInt(step1Res.optionalEmpOnlyHsa)
      ) {
        err = true;
      }
      else if (
        enrollInMedical && step1Res
        && parseInt(values.medPlanId) == 4
        && parseInt(values.medCoverageTier) > 0
        && parseInt(values.medCoverageTier) != 1
        && parseInt(optionsMedAmount) > parseInt(step1Res.optionalAllTierMedHsa)
      ) {
        err = true;
      }

      if (enrollInDependentFSA && !dependentFsaAmount)
        err = true;

      if (
        enrollInDependentFSA && step1Res
        && parseInt(dependentFsaAmount) > parseInt(step1Res.dependentAnnualFsa))
        err = true;

      if (!enrollInMedical && !enrollInDental && !enrollInVision)
        err = true;

      if (values.medCoverageTier && values.medCoverageTier != "" && coverageTier[parseInt(values.medCoverageTier)].options.length > 0
        && values.dependentSet.length == 0)
        err = true;

      if (values.dentCoverageTier && values.dentCoverageTier != "" && coverageTier[parseInt(values.dentCoverageTier)].options.length > 0
        && values.dependentSet.length == 0)
        err = true;

      if (values.visionCoverageTier && values.visionCoverageTier != "" && coverageTier[parseInt(values.visionCoverageTier)].options.length > 0
        && values.dependentSet.length == 0)
        err = true;

      let strCoverage = Array.prototype.map.call(selectedCoverages, function (item: any) { return item.tier; }).join(",");
      // let arrCov = strCoverage.split(",");
      // let idx = arrCov.indexOf("");
      // if (idx >= 0) {
      //   arrCov.splice(idx, 1);
      // }

      //let strTitle = Array.prototype.map.call(formData, function (item: any) { return item.title; }).join(",");

      if (strCoverage && strCoverage.includes("Child(ren)")) {
        let idxChild = formData.findIndex((x: any) => x.title.includes("Child(ren)"));
        let idxDPC = formData.findIndex((x: any) => x.title.includes("Domestic Partner's Child(ren)"));
        if (idxChild == -1 && idxDPC == -1) {
          err = true;
        }
      }
      if (strCoverage && strCoverage.includes("Spouse")) {
        let idxDP = formData.findIndex((x: any) => x.title.includes("Domestic Partner"));
        let idxSpouse = formData.findIndex((x: any) => x.title.includes("Spouse"));
        if (idxDP == -1 && idxSpouse == -1) {
          err = true;
        }
      }
      if (strCoverage && strCoverage.includes("Domestic Partner")) {
        let idxSpouse = formData.findIndex((x: any) => x.title.includes("Spouse"));
        let idxDP = formData.findIndex((x: any) => x.title.includes("Domestic Partner"));
        if (idxSpouse == -1 && idxDP == -1) {
          err = true;
        }
      }
      if (strCoverage && strCoverage.includes("Domestic Partner's Child(ren)")) {
        let idxDPC = formData.findIndex((x: any) => x.title.includes("Domestic Partner's Child(ren)"));
        let idxChild = formData.findIndex((x: any) => x.title.includes("Child(ren)"));
        if (idxChild == -1 && idxDPC == -1) {
          err = true;
        }
      }

      if (values.dependentSet.length > 0) {
        values.dependentSet.forEach(element => {
          if (!element.firstName || !element.lastName || !element.dob
            || !element.gender || !element.ssn || !element.enrolledIn)
            err = true;
        });
      }

      if (benefitCertBoxStatus && infoCertBoxStatus && enrollCertBoxStatus
        && !err) {
        dispatch(fetchSTEP2Request(values));
      }
    },
  });

  // useBeforeUnload(formik.dirty, "Are you sure you want to leave?");

  const navigate = useNavigate();

  let step2Res: any = useSelector(getSTEP2EnteredDetails);
  useEffect(() => {
    if (step2Res && step2Res.isSuccess == false) {
      toast.error(step2Res.errorMessages[0]);
    }
    else if (step2Res && step2Res.token) {
      toast.success(`Saved Step 2 Info Successfully`);
      step2Res = null;
      setTimeout(() => {
        navigate(`/`+employerNameCoki+"/uploaddocument");
        //history.push('/step1/' + step1Res.token)
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
            <th className="text-muted" style={{ textAlign: "inherit" }}>Confirmation Number:</th>
            <td  >{step1Res && step1Res.confirmationNumber}</td>
          </tr>
        </table>
        <Typography className="ques-styling" variant="h5" sx={{ marginTop: "22px" }}>
          What changes would you like to make?
        </Typography>

        <Typography className="ans-styling">
          Thanks for starting your qualifying life event (QLE). The next step is to let us know what changes you want to make to your benefits as the result of your QLE. Remember, you can only make changes that are related to your QLE.
        </Typography>

        <Typography className="ques-styling" variant="h5" sx={{ marginTop: "26px" }}>
          {" "}
          Based on your Event Type, you can make the following changes to your
          Randstad benefits:
        </Typography>

        {step1Res && (
          <p
            className="list_items"
            dangerouslySetInnerHTML={{
              __html: step1Res.qleWhatBenefitChangesStep2,
            }}
          ></p>
        )}
        <Typography className="ques-styling" variant="h5" style={{margin:"16px 0px 0px 0px"}}>
          Who can you enroll in coverage?
        </Typography>

        <Typography className="ans-styling">
          {step1Res && (
            <p
              dangerouslySetInnerHTML={{
                __html: step1Res.qleWhoChangedBenefitStep2,
              }}
            ></p>
          )}
        </Typography>
        <br />

        <Typography className="ans-styling" sx={{ position: "relative", bottom: "20px" }}>
          {step1Res && (
            <p
              dangerouslySetInnerHTML={{ __html: step1Res.qleDisclaimerStep2 }}
            ></p>
          )}
        </Typography>
        {/* <br /> */}
        {/* <Typography className="ans-styling">
          If you need to log out of your QLE record before submitting it, you
          can get back into your record through the unique link in the email you
          received from support@qleservices.com.
        </Typography> */}

        <Typography className="ques-styling " variant="h5" >
          What are we changing?
        </Typography>

        <Grid container className="enroll" sx={{ margin: "0px 0px" }} >
          <Grid item xs={12} md={2}>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                id="enrollInMedical"
                label="Enroll in Medical"
                onChange={handleMedicalBoxChange}
                checked={enrollInMedical}
              />
            </FormGroup>
          </Grid>

          <Grid item xs={12} md={10} >
            {enrollInMedical && (
              <Grid container xs={12} spacing={2} className="plan" >
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-helper-label">
                      Plan
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      label="Plan"
                      onChange={formik.handleChange}
                      fullWidth
                      name="medPlanId"
                      value={formik.values.medPlanId}
                      error={
                        formik.touched.medPlanId &&
                        Boolean(formik.errors.medPlanId)
                      }
                    >
                      {medicalPlans.map((e: any) => (
                        <MenuItem value={e.id}>{e.name}</MenuItem>
                      ))}
                    </Select>

                    <div
                      className={
                        enrollInMedical && !formik.values.medPlanId && isSubmitted ? "error-span cert" : "error-span"
                      }
                    >
                      {enrollInMedical && !formik.values.medPlanId && isSubmitted ? "Please select the plan" : ""}
                    </div>
                    <FormHelperText sx={{ display: "inline-flex" }}>
                      {/* {!selectedPlan
                          ? ""
                          : medicalPlans[selectedPlan].helperText} */}
                      {
                        (parseInt(formik.values.medPlanId) == 1 ||
                          parseInt(formik.values.medPlanId) == 2 ||
                          parseInt(formik.values.medPlanId) == 3)
                          ?
                          "Optional: Enroll in or Change Health Care Flexible Spending Account (FSA) Annual Contribution/Goal Amount:"
                          : (parseInt(formik.values.medPlanId) == 4)
                            ?
                            `Optional: Enroll in or Change Health Savings Account (HSA) Annual Contribution/Goal Amount:
                            (Maximum of $3,650 if you have Employee Only coverage and up to $7,300 for all other coverage levels)`
                            :
                            ""
                      }
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
                      //  value={selectedTier}
                      label="Coverage Tier"
                      fullWidth
                      name="medCoverageTier"
                      onChange={(e: any) => {
                        handleTier1(e);
                        setSelectedTier(e.target.value);
                        setIsTierChanged(true);
                        formik.handleChange(e);
                      }}
                      value={formik.values.medCoverageTier}
                      error={
                        formik.touched.medCoverageTier &&
                        Boolean(formik.errors.medCoverageTier)
                      }
                    >
                      {coverageTier.map((e: any) => (
                        <MenuItem value={e.value}>{e.name}</MenuItem>
                      ))}
                    </Select>

                    <div
                      className={
                        enrollInMedical && !formik.values.medCoverageTier && isSubmitted ? "error-span cert" : "error-span"
                      }
                    >
                      {enrollInMedical && !formik.values.medCoverageTier && isSubmitted ? "Please select the coverage" : ""}
                    </div>
                  </FormControl>
                </Grid>

                <Grid container justifyContent="flex-end">
                  {(
                    enrollInMedical &&
                      (parseInt(formik.values.medPlanId) == 1 ||
                        parseInt(formik.values.medPlanId) == 2 ||
                        parseInt(formik.values.medPlanId) == 3 ||
                        parseInt(formik.values.medPlanId) == 4)
                      ? (
                        <Grid item xs={12} md={6}>
                          <FormControl fullWidth sx={{ m: 1 }} className="input_amount">
                            <InputLabel htmlFor="outlined-adornment-amount"></InputLabel>
                            <OutlinedInput
                              id="outlined-adornment-amount"
                              startAdornment={
                                <InputAdornment position="start">$</InputAdornment>
                              }
                              label=""
                              placeholder={
                                (step1Res && (parseInt(formik.values.medPlanId) == 1 ||
                                  parseInt(formik.values.medPlanId) == 2 ||
                                  parseInt(formik.values.medPlanId) == 3))
                                  ?
                                  "Maximum " + "$" + step1Res.optionalMedFsa
                                  : (step1Res && parseInt(formik.values.medPlanId) == 4
                                    && parseInt(formik.values.medCoverageTier) == 1)
                                    ?
                                    "Maximum " + "$" + step1Res.optionalEmpOnlyHsa
                                    : (step1Res && parseInt(formik.values.medPlanId) == 4
                                      && parseInt(formik.values.medCoverageTier) == 0)
                                      ?
                                      ""
                                      : (step1Res && parseInt(formik.values.medPlanId) == 4
                                        && parseInt(formik.values.medCoverageTier) > 0
                                        && parseInt(formik.values.medCoverageTier) != 1)
                                        ?
                                        "Maximum " + "$" + step1Res.optionalAllTierMedHsa
                                        :
                                        ""
                              }
                              //name="optMedFsa"
                              //value={formik.values.optMedFsa}
                              //onChange={formik.handleChange}
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
                  // className={
                  //   (parseInt(formik.values.optMedFsa) > 2750
                  //     || parseInt(formik.values.optMedFsa) == 0)
                  //     && isSubmitted ? "error-span cert r1" : "error-span"
                  // }
                  className={
                    (step1Res && (parseInt(formik.values.medPlanId) == 1 ||
                      parseInt(formik.values.medPlanId) == 2 ||
                      parseInt(formik.values.medPlanId) == 3)
                      && parseInt(optionsMedAmount) > parseInt(step1Res.optionalMedFsa)
                      && isSubmitted)
                      ? "error-span cert r1"
                      : (step1Res && parseInt(formik.values.medPlanId) == 4
                        && parseInt(formik.values.medCoverageTier) == 1
                        && parseInt(optionsMedAmount) > parseInt(step1Res.optionalEmpOnlyHsa)
                        && isSubmitted)
                        ? "error-span cert r1"
                        : (step1Res && parseInt(formik.values.medPlanId) == 4
                          && parseInt(formik.values.medCoverageTier) > 0
                          && parseInt(formik.values.medCoverageTier) != 1
                          && parseInt(optionsMedAmount) > parseInt(step1Res.optionalAllTierMedHsa)
                          && isSubmitted)
                          ? "error-span cert r1"
                          :
                          "error-span"
                  }
                >
                  {/* {(parseInt(formik.values.optMedFsa) > 2750
                    || parseInt(formik.values.optMedFsa) == 0)
                    && isSubmitted ? "Please enter correct amount" : ""} */}
                  {
                    (step1Res && (parseInt(formik.values.medPlanId) == 1 ||
                      parseInt(formik.values.medPlanId) == 2 ||
                      parseInt(formik.values.medPlanId) == 3)
                      && parseInt(optionsMedAmount) > parseInt(step1Res.optionalMedFsa)
                      && isSubmitted)
                      ? "Maximum amount allowed is " + step1Res.optionalMedFsa
                      : (step1Res && parseInt(formik.values.medPlanId) == 4
                        && parseInt(formik.values.medCoverageTier) == 1
                        && parseInt(optionsMedAmount) > parseInt(step1Res.optionalEmpOnlyHsa)
                        && isSubmitted)
                        ? "Maximum amount allowed is " + step1Res.optionalEmpOnlyHsa
                        : (step1Res && parseInt(formik.values.medPlanId) == 4
                          && parseInt(formik.values.medCoverageTier) > 0
                          && parseInt(formik.values.medCoverageTier) != 1
                          && parseInt(optionsMedAmount) > parseInt(step1Res.optionalAllTierMedHsa)
                          && isSubmitted)
                          ? "Maximum amount allowed is " + step1Res.optionalAllTierMedHsa
                          :
                          ""
                  }
                </div>
              </Grid>
            )}
          </Grid>
        </Grid>

        <Grid container className="enroll" sx={{ margin: "10px 0px" }}>
          <Grid item xs={12} md={2}>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                label="Enroll in Dental"
                onChange={handleDentalBoxChange}
                checked={enrollInDental}
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12} md={10} >
            {enrollInDental && (
              <Grid container xs={12} spacing={2} className="plan">
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-helper-label">
                      Plan
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      label="Plan"
                      fullWidth
                      name="dentPlanId"
                      value={formik.values.dentPlanId}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.dentPlanId &&
                        Boolean(formik.errors.dentPlanId)
                      }
                    >
                      {dentalPlans.map((e: any) => (
                        <MenuItem value={e.id}>{e.name}</MenuItem>
                      ))}
                    </Select>

                    <div
                      className={
                        enrollInDental && !formik.values.dentPlanId && isSubmitted ? "error-span cert" : "error-span"
                      }
                    >
                      {enrollInDental && !formik.values.dentPlanId && isSubmitted ? "Please select the plan" : ""}
                    </div>
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
                      //  value={selectedTier}
                      label="Coverage Tier"
                      fullWidth
                      name="dentCoverageTier"
                      onChange={(e: any) => {
                        handleTier1(e);
                        setSelectedTier(e.target.value);
                        setIsTierChanged(true);
                        formik.handleChange(e);
                      }}
                      value={formik.values.dentCoverageTier}
                      error={
                        formik.touched.dentCoverageTier &&
                        Boolean(formik.errors.dentCoverageTier)
                      }
                    >
                      {coverageTier.map((e: any) => (
                        <MenuItem value={e.value}>{e.name}</MenuItem>
                      ))}
                    </Select>

                    <div
                      className={
                        enrollInDental && !formik.values.dentCoverageTier && isSubmitted ? "error-span cert" : "error-span"
                      }
                    >
                      {enrollInDental && !formik.values.dentCoverageTier && isSubmitted ? "Please select the coverage" : ""}
                    </div>
                  </FormControl>
                </Grid>

              </Grid>
            )}
          </Grid>
        </Grid>

        <Grid container sx={{ margin: "20px 0px" }}>
          <Grid item xs={12} md={2}>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                label="Enroll in Vision"
                onChange={handleVisionBoxChange}
                checked={enrollInVision}
              />
            </FormGroup>
          </Grid>

          <Grid item xs={12} md={10}>
            {enrollInVision && (
              <Grid container xs={12} spacing={2} className="plan">
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-helper-label">
                      Plan
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      label="Plan"
                      fullWidth
                      name="visionPlanId"
                      value={formik.values.visionPlanId}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.visionPlanId &&
                        Boolean(formik.errors.visionPlanId)
                      }
                    // helperText={formik.touched.medPlanId && formik.errors.medPlanId}
                    >
                      {visionPlans.map((e: any) => (
                        <MenuItem value={e.id}>{e.name}</MenuItem>
                      ))}
                    </Select>

                    <div
                      className={
                        enrollInVision && !formik.values.visionPlanId && isSubmitted ? "error-span cert" : "error-span"
                      }
                    >
                      {enrollInVision && !formik.values.visionPlanId && isSubmitted ? "Please select the plan" : ""}
                    </div>
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
                      //  value={selectedTier}
                      label="Coverage Tier"
                      fullWidth
                      name="visionCoverageTier"
                      onChange={(e: any) => {
                        handleTier1(e);
                        setSelectedTier(e.target.value);
                        setIsTierChanged(true);
                        formik.handleChange(e);
                      }}
                      value={formik.values.visionCoverageTier}
                      error={
                        formik.touched.visionCoverageTier &&
                        Boolean(formik.errors.visionCoverageTier)
                      }
                    >
                      {coverageTier.map((e: any) => (
                        <MenuItem value={e.value}>{e.name}</MenuItem>
                      ))}
                    </Select>

                    <div
                      className={
                        enrollInVision && !formik.values.visionCoverageTier && isSubmitted ? "error-span cert" : "error-span"
                      }
                    >
                      {enrollInVision && !formik.values.visionCoverageTier && isSubmitted ? "Please select the coverage" : ""}
                    </div>
                  </FormControl>
                </Grid>

              </Grid>
            )}
          </Grid>
        </Grid>

        <div
          className={
            !enrollInMedical && !enrollInDental && !enrollInVision && isSubmitted ? "error-span cert anyone" : "error-span"
          }
        >
          {!enrollInMedical && !enrollInDental && !enrollInVision && isSubmitted ? "Please accept any one above" : ""}
        </div>
        <Grid container sx={{ margin: "20px 0px", }}>
          <Grid item xs={12} md={6}>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                label="Enroll in or Change Dependent Care FSA Annual Contribution/Goal Amount:"
                onChange={handleDependentFSABoxChange}
                checked={enrollInDependentFSA}
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12} md={4} className="amount" style={{ margin: "0rem 0rem 0rem 2rem" }} >
            {enrollInDependentFSA && (
              <FormControl fullWidth sx={{ mt: 1 }}>
                <InputLabel htmlFor="outlined-adornment-amount"></InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount max"
                  // value={null}
                  // onChange={handleChange("amount")}
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  label=""
                  name="dependentFsaAmount"
                  // placeholder="Maximum of $5,000"
                  placeholder={
                    step1Res ?
                      "Maximum " + "$" + step1Res.dependentAnnualFsa
                      :
                      ""
                  }
                  // value={formik.values.dependentFsa}
                  // onChange={formik.handleChange}
                  value={dependentFsaAmount}
                  onChange={(e: any) => {
                    setDependentFsaAmount(e.target.value);
                    formik.handleChange(e);
                  }}
                />
              </FormControl>
            )}

            <div
              className={
                enrollInDependentFSA && !dependentFsaAmount && isSubmitted
                  ?
                  "error-span cert"
                  : enrollInDependentFSA && step1Res && parseInt(dependentFsaAmount) > parseInt(step1Res.dependentAnnualFsa)
                    && isSubmitted ?
                    "error-span cert"
                    : "error-span"
              }
            >
              {enrollInDependentFSA && !dependentFsaAmount && isSubmitted
                ?
                "DependentFsa Amount has to be entered"
                :
                step1Res && parseInt(dependentFsaAmount) > parseInt(step1Res.dependentAnnualFsa)
                  && isSubmitted ?
                  "Maximum amount allowed is " + step1Res.dependentAnnualFsa
                  : ""}
            </div>
          </Grid>

          <Grid container xs={12} sx={{ marginTop: "43px" }}>

            {enrollInMedical
              ? coverageTier[parseInt(selectedMedicalPlan)].options.map(
                (e: any, index: number) => {

                  let dt = "";
                  // if (e.includes("Child(ren)"))
                  //   dt = "1";
                  // else if (e.includes("Domestic Partner's Child(ren)"))
                  //   dt = "3";

                  if (e.includes("Child(ren)")) {
                    if (e.includes("Domestic")) {
                      dt = "3";
                    }
                    else {
                      dt = "1";
                    }
                  }

                  let arr: any = [];
                  let filteredArr = step1Res['benefitDetails'].dependentSet.filter((x: any) => x.dependentType == dt);

                  if (filteredArr && filteredArr.length > 0) {
                    for (let i = 0; i <= filteredArr.length - 1; i++)
                      arr.push(1);
                  }

                  if (arr && arr.length == 0) {
                    arr.push(1);
                  }

                  return (<Candidate_form title={e} formData={formData} setFormData={setFormData} selectedCoverages={selectedCoverages}
                    dependentData={step1Res && step1Res['benefitDetails'].dependentSet}
                    childrenData={arr}
                    action={step1Res && step1Res['benefitDetails'].dependentSet ? "edit" : "add"}
                    isTierChanged={isTierChanged}
                    isSubmitted={isSubmitted}
                    setFormError={setFormError}
                  />)
                }
              )
              : null}
          </Grid>

          <Grid container xs={12}>
            {enrollInDental
              ? coverageTier[parseInt(selectedDentalPlan)].options
                .filter((e: any) => {
                  if (
                    coverageTier[
                      parseInt(selectedMedicalPlan)
                    ].options.includes(e)
                  )
                    return false;
                  else return true;
                })
                .map((e: any, index: number) => {
                  let dt = "";
                  // if (e.includes("Child(ren)"))
                  //   dt = "1";
                  // else if (e.includes("Domestic Partner's Child(ren)"))
                  //   dt = "3";

                  if (e.includes("Child(ren)")) {
                    if (e.includes("Domestic")) {
                      dt = "3";
                    }
                    else {
                      dt = "1";
                    }
                  }

                  let arr: any = [];
                  let filteredArr = step1Res['benefitDetails'].dependentSet.filter((x: any) => x.dependentType == dt);

                  if (filteredArr && filteredArr.length > 0) {
                    for (let i = 0; i <= filteredArr.length - 1; i++)
                      arr.push(1);
                  }

                  if (arr && arr.length == 0) {
                    arr.push(1);
                  }

                  return (<Candidate_form title={e} formData={formData} setFormData={setFormData} selectedCoverages={selectedCoverages}
                    dependentData={step1Res && step1Res['benefitDetails'].dependentSet}
                    childrenData={arr}
                    action={step1Res && step1Res['benefitDetails'].dependentSet ? "edit" : "add"}
                    isTierChanged={isTierChanged}
                    isSubmitted={isSubmitted}
                    setFormError={setFormError}
                  />)
                })
              : null}
          </Grid>

          <Grid container xs={12}>
            {enrollInVision
              ? coverageTier[parseInt(selectedVisionPlan)].options
                .filter((e: any) => {
                  if (
                    coverageTier[
                      parseInt(selectedMedicalPlan)
                    ].options.includes(e)
                  )
                    return false;
                  else if (
                    coverageTier[
                      parseInt(selectedDentalPlan)
                    ].options.includes(e)
                  )
                    return false;
                  else return true;
                })
                .map((e: any, index: number) => {
                  let dt = "";
                  // if (e.includes("Child(ren)"))
                  //   dt = "1";
                  // else if (e.includes("Domestic Partner's Child(ren)"))
                  //   dt = "3";

                  if (e.includes("Child(ren)")) {
                    if (e.includes("Domestic")) {
                      dt = "3";
                    }
                    else {
                      dt = "1";
                    }
                  }

                  let arr: any = [];
                  let filteredArr = step1Res['benefitDetails'].dependentSet.filter((x: any) => x.dependentType == dt);

                  if (filteredArr && filteredArr.length > 0) {
                    for (let i = 0; i <= filteredArr.length - 1; i++)
                      arr.push(1);
                  }

                  if (arr && arr.length == 0) {
                    arr.push(1);
                  }

                  return (<Candidate_form title={e} formData={formData} setFormData={setFormData} selectedCoverages={selectedCoverages}
                    dependentData={step1Res && step1Res['benefitDetails'].dependentSet}
                    childrenData={arr}
                    action={step1Res && step1Res['benefitDetails'].dependentSet ? "edit" : "add"}
                    isTierChanged={isTierChanged}
                    isSubmitted={isSubmitted}
                    setFormError={setFormError}
                  />)
                })
              : null}
          </Grid>
        </Grid>

        <Typography className="ques-styling Additional" variant="h6" style={{ marginTop: "30px", marginBottom: "10px" }}>
          Additional Comments
        </Typography>

        <Grid>
          <TextField
            id="outlined-basic"
            label="Please type your comments here"
            variant="outlined"
            name="comments"
            fullWidth
            value={formik.values.comments}
            onChange={formik.handleChange}
            error={formik.touched.comments && Boolean(formik.errors.comments)}
            helperText={formik.touched.comments && formik.errors.comments}
          />
        </Grid>

        <Typography className="ques-styling Benefit" variant="h5">
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
        <Grid container sx={{ marginTop: "20px" }}>
          <Grid item>
            <FormGroup>
              <FormControlLabel
                value="end"
                id="qleCertBox"
                name="qleCertBox"
                control={<Checkbox className="alignment-ck-bx checkbox3" />}
                label="I certify that if I am enrolling my spouse or domestic partner in Randstad coverage and I answered 'No' to the question above about whether my spouse/domestic partner is eligible for coverage through his or her employer's health plan, I am certifying to the fact that either my spouse/domestic partner is not currently employed, or that my employed spouse/domestic partner does not have the option to enroll in health coverage through his or her employer. I agree to notify Randstad's Benefits Department within 31 days if my spouse/domestic partner becomes eligible for other employer-sponsored coverage. I understand that any misrepresentation of fact may result in my coverage being suspended for one year and that I may be required to repay all benefits and claims paid by the Plan on behalf of my spouse/domestic partner. I further understand that any misrepresentation of this information may also lead to disciplinary action, up to and including termination."
                labelPlacement="end"
                sx={{ fontSize: ".875rem !important" }}
                onChange={handleEnrollCertBoxChange}
                checked={enrollCertBoxStatus}
              />
            </FormGroup>
            <div
            className={
              !enrollCertBoxStatus && isSubmitted
                ? "error-span cert check"
                : "error-span"
            }
          >
            {!enrollCertBoxStatus && isSubmitted
              ? "Please accept terms and conditions"
              : ""}
          </div>
          </Grid>
          
        </Grid>
        <Grid container sx={{ marginTop: "35px",marginLeft: "29px" }}>
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

export default RequestBenefitChanges;
